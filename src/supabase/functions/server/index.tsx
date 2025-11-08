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

// Get port from environment variable (Render.com uses PORT)
const port = parseInt(Deno.env.get("PORT") || "8000");

// Start server with port configuration
Deno.serve({ port }, app.fetch);

console.log(`🚀 Workigom Backend started on port ${port}`);
console.log(`📊 Database status: ${databaseStatus}`);