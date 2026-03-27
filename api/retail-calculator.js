import { kv } from "@vercel/kv";

const CALCULATOR_KEY = "oak-compass-retail-calculator";

function isAuthorized(req) {
  const password = req.headers["x-admin-password"];
  return password && password === process.env.LEADS_ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      const calculator = await kv.get(CALCULATOR_KEY);
      return res.status(200).json({ calculator: calculator || null });
    }

    if (req.method === "POST") {
      const calculator = req.body?.calculator || req.body || {};
      await kv.set(CALCULATOR_KEY, calculator);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Retail calculator API error:", error);
    return res.status(500).json({
      error: error?.message || "Server error",
    });
  }
}
