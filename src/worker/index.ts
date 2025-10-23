import { Hono } from "hono";
import type { R2Bucket } from "@cloudflare/workers-types";
import { cors } from "hono/cors";
import axios from "axios";

interface Env {
  R2: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:5173/", "https://paperfi.trade/"],
  })
);

const target_proxy_base_url =
  "https://charting-library.tradingview-widget.com/charting_library";

app.get("/api/charts/*", async c => {
  // Remove "/api/charts" from the path
  const path = c.req.path.replace(/^\/api\/charts/, "");
  // Make axios GET request to the stripped path
  try {
    const fetchResponse = await fetch(target_proxy_base_url + path);
    // Set response headers to match fetch response
    fetchResponse.headers.forEach((value, key) => {
      c.header(key, value);
    });
    const data = await fetchResponse.arrayBuffer();
    return new Response(data, {
      status: fetchResponse.status,
      headers: fetchResponse.headers,
    });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

// Health check
app.get("/api/", c => c.json({ status: "ok" }));

// Avatar upload route
app.post("/api/avatar", async c => {
  try {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Missing user ID" }, 400);

    const formData = await c.req.formData();
    const file = formData.get("avatar") as File;
    if (!file) return c.json({ error: "No file uploaded" }, 400);

    const objectKey = `${userId}/avatar`;
    const data = await file.arrayBuffer();

    await c.env.R2.put(objectKey, data, {
      httpMetadata: { contentType: file.type },
    });

    const publicUrl = `https://cdn.paper.19700102.xyz/${objectKey}`;
    return c.json({ url: publicUrl });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

export default app;
