import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-018e1998/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get port from environment variable (Render.com uses PORT)
const port = parseInt(Deno.env.get("PORT") || "8000");

// Start server with port configuration
Deno.serve({ port }, app.fetch);

console.log(`🚀 Workigom Backend started on port ${port}`);