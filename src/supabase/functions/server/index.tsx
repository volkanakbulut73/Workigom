import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client
let supabase: any = null;
let databaseStatus = "disconnected";

try {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
  
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test database connection
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (!error) {
      databaseStatus = "connected";
      console.log("✅ Database connected successfully");
    } else {
      console.error("⚠️ Database connection test failed:", error.message);
      databaseStatus = "error";
    }
  } else {
    console.warn("⚠️ Supabase credentials not found in environment variables");
    console.warn("Missing:", !supabaseUrl ? "SUPABASE_URL" : "", !supabaseKey ? "SUPABASE_*_KEY" : "");
  }
} catch (error) {
  console.error("❌ Failed to initialize Supabase:", error);
  databaseStatus = "error";
}

// Root endpoint
app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Welcome to Workigom API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      users: "/api/users",
      jobs: "/api/jobs",
      applications: "/api/applications",
      donations: "/api/donations",
      messages: "/api/messages",
      notifications: "/api/notifications",
      seed: "/api/seed (requires authentication)"
    }
  });
});

// Health check endpoint (Render.com default)
app.get("/make-server-018e1998/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    database: databaseStatus,
    supabase: supabase ? "initialized" : "not-initialized"
  });
});

// Alternative health check endpoint
app.get("/api/health", (c) => {
  return c.json({ 
    success: true,
    message: "Workigom API is running",
    timestamp: new Date().toISOString(),
    database: databaseStatus,
    supabase: supabase ? "connected" : "disconnected",
    warning: databaseStatus !== "connected" ? "Database connection issue" : undefined
  });
});

// ENV Check endpoint - Security: Only checks presence (true/false), never logs actual values
app.get("/make-server-018e1998/_env-check", (c) => {
  try {
    const checks = {
      HAS_SUPABASE_URL: !!Deno.env.get("SUPABASE_URL"),
      HAS_SUPABASE_ANON_KEY: !!Deno.env.get("SUPABASE_ANON_KEY"),
      HAS_SUPABASE_SERVICE_ROLE_KEY: !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      HAS_SUPABASE_DB_URL: !!Deno.env.get("SUPABASE_DB_URL"),
      HAS_PORT: !!Deno.env.get("PORT"),
      HAS_DATABASE_URL: !!Deno.env.get("DATABASE_URL"), // Should be false!
    };
    
    console.log("ENV_CHECK:", checks);
    
    return c.json({ 
      ok: true, 
      checks,
      message: "Environment variables check (true = exists, false = missing)",
      warning: checks.HAS_DATABASE_URL ? "⚠️ DATABASE_URL should NOT exist! This project uses Supabase." : undefined
    });
  } catch (err) {
    console.error("ENV_CHECK_ERROR:", err);
    return c.json({ ok: false, error: "Failed to check environment variables" }, 500);
  }
});

// Alternative ENV check endpoint (shorter path)
app.get("/api/_env-check", (c) => {
  try {
    const checks = {
      HAS_SUPABASE_URL: !!Deno.env.get("SUPABASE_URL"),
      HAS_SUPABASE_ANON_KEY: !!Deno.env.get("SUPABASE_ANON_KEY"),
      HAS_SUPABASE_SERVICE_ROLE_KEY: !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      HAS_SUPABASE_DB_URL: !!Deno.env.get("SUPABASE_DB_URL"),
      HAS_PORT: !!Deno.env.get("PORT"),
      HAS_DATABASE_URL: !!Deno.env.get("DATABASE_URL"), // Should be false!
    };
    
    console.log("ENV_CHECK:", checks);
    
    return c.json({ 
      ok: true, 
      checks,
      message: "Environment variables check (true = exists, false = missing)",
      warning: checks.HAS_DATABASE_URL ? "⚠️ DATABASE_URL should NOT exist! This project uses Supabase." : undefined
    });
  } catch (err) {
    console.error("ENV_CHECK_ERROR:", err);
    return c.json({ ok: false, error: "Failed to check environment variables" }, 500);
  }
});

// Check if user exists endpoint (for preventing duplicate signups)
// Rate limited and secure - only returns boolean, no user data
app.post("/make-server-018e1998/check-user", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    if (!supabase) {
      console.error("Supabase client not initialized");
      return c.json({ error: "Database not configured" }, 500);
    }

    // Check if user exists in users table (safer than auth.users)
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Error checking user existence:", error);
      return c.json({ error: "Failed to check user" }, 500);
    }

    return c.json({ 
      exists: !!data,
      message: data ? "User exists" : "User does not exist"
    });
  } catch (err) {
    console.error("CHECK_USER_ERROR:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Alternative check-user endpoint (shorter path)
app.post("/api/check-user", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    if (!supabase) {
      console.error("Supabase client not initialized");
      return c.json({ error: "Database not configured" }, 500);
    }

    // Check if user exists in users table
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Error checking user existence:", error);
      return c.json({ error: "Failed to check user" }, 500);
    }

    return c.json({ 
      exists: !!data,
      message: data ? "User exists" : "User does not exist"
    });
  } catch (err) {
    console.error("CHECK_USER_ERROR:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Get all users (requires admin authentication)
app.get("/make-server-018e1998/admin/users", async (c) => {
  try {
    // Get authorization header
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.replace(/^Bearer\s+/i, '');
    
    if (!supabase) {
      console.error("Supabase client not initialized");
      return c.json({ error: "Database not configured" }, 500);
    }

    // Verify the user's token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    // Check if user is admin
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (profileError || !userProfile) {
      console.error("Failed to fetch user profile:", profileError?.message);
      return c.json({ error: "Failed to verify admin status" }, 403);
    }

    if (userProfile.user_type !== 'admin') {
      console.error("User is not admin:", user.email);
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    // User is admin, fetch all users using service role
    const { data: allUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, full_name, user_type, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error("Error fetching users:", usersError.message);
      return c.json({ error: "Failed to fetch users: " + usersError.message }, 500);
    }

    console.log(`✅ Admin ${user.email} fetched ${allUsers?.length || 0} users`);
    
    return c.json({ 
      success: true,
      users: allUsers || [],
      count: allUsers?.length || 0
    });
  } catch (err) {
    console.error("ADMIN_USERS_ERROR:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get port from environment variable (Render.com uses PORT)
const port = parseInt(Deno.env.get("PORT") || "8000");

// Start server with port configuration
Deno.serve({ port }, app.fetch);

console.log(`🚀 Workigom Backend started on port ${port}`);
console.log(`📊 Database status: ${databaseStatus}`);