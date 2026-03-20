import { kv } from "@vercel/kv";

const LEADS_KEY = "oak-compass-leads";

function isAuthorized(req) {
  const password = req.headers["x-admin-password"];
  return password && password === process.env.LEADS_ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const lead = req.body || {};

      const newLead = {
        ...lead,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        submittedAt: new Date().toLocaleString(),
      };

      await kv.lpush(LEADS_KEY, JSON.stringify(newLead));

      return res.status(200).json({ success: true });
    }

    if (req.method === "GET") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const rawLeads = await kv.lrange(LEADS_KEY, 0, -1);
      const leads = rawLeads.map((item) =>
        typeof item === "string" ? JSON.parse(item) : item
      );

      return res.status(200).json({ leads });
    }

    if (req.method === "DELETE") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await kv.del(LEADS_KEY);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Leads API error:", error);
    return res.status(500).json({
      error: error?.message || "Server error",
    });
  }
}