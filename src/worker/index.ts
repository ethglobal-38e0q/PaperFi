import { Hono } from "hono";
import type { R2Bucket } from "@cloudflare/workers-types";
import { cors } from "hono/cors";

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
