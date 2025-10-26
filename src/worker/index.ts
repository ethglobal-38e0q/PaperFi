import { Hono } from "hono";
import type { R2Bucket } from "@cloudflare/workers-types";
import { cors } from "hono/cors";
import { ethers } from "ethers";

interface Env {
  R2: R2Bucket;
  VAULT_PRIVATE_KEY: string;
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

app.get("/api/pyusd", async c => {
  const targetWallet = c.req.query("wallet");
  const pyUsdAmount = c.req.query("reward");
  // Load environment variables
  const PRIVATE_KEY = c.env.VAULT_PRIVATE_KEY; // MetaMask wallet private key
  const ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID; // Ethereum provider URL (e.g., Infura/Alchemy)
  const TOKEN_ADDRESS = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9"; // PYUSD contract address
  const TOKEN_ABI = ["function transfer(address to, uint amount)"];

  try {
    const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`;
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, wallet);
    const decimals = 6;
    const tokenAmount = ethers.parseUnits(pyUsdAmount.toString(), decimals);

    const tx = await tokenContract.transfer(targetWallet, tokenAmount);
    console.log("Transaction hash:", tx.hash);

    await tx.wait();
    console.log("Transfer confirmed!");

    return c.json({ success: true, txHash: tx.hash }, 200);
  } catch (err) {
    console.error("Token transfer failed:", err);
    return c.json({ success: false, error: err.message }, 500);
  }
});

export default app;
