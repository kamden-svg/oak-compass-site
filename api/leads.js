import { kv } from "@vercel/kv";
import { Resend } from "resend";

const LEADS_KEY = "oak-compass-leads";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isAuthorized(req) {
  const password = req.headers["x-admin-password"];
  return password && password === process.env.LEADS_ADMIN_PASSWORD;
}

function parseLead(item) {
  return typeof item === "string" ? JSON.parse(item) : item;
}

function formatInquiryType(value) {
  if (value === "quote") return "Quote";
  if (value === "referral") return "Referral";
  if (value === "job") return "Job Application";
  if (value === "collectibles") return "Collectibles";
  return value || "Lead";
}

function buildLeadEmailHtml(lead) {
  const referralSource =
    lead.referralSourceType === "employee"
      ? "Employee Referral"
      : lead.referralSourceType || "";

  const rows = [
    ["Inquiry Type", formatInquiryType(lead.inquiryType)],
    ["First Name", lead.firstName],
    ["Last Name", lead.lastName],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Needs Spanish", lead.needsSpanish],
    ["Insurance Type", lead.insuranceType],
    ["ZIP Code", lead.zipCode],
    ["Desired Role", lead.desiredRole],
    ["Years of Experience", lead.yearsExperience],
    ["Availability", lead.availability],
    ["Resume Link", lead.resumeLink],
    ["Collectible Type", lead.collectibleType],
    ["Collection Value", lead.collectionValue],
    ["Estimated Items", lead.estimatedItems],
    ["Storage Method", lead.storageMethod],
    ["Condition", lead.collectibleCondition],
    ["Referral Source", referralSource],
    ["Referred By", lead.referralSourceName],
    ["Referrer Email", lead.referralSourceEmail],
    ["Referrer Phone", lead.referralSourcePhone],
    ["Notes", lead.notes],
    ["Submitted", lead.submittedAt],
  ].filter(([, value]) => value);

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h1 style="margin-bottom: 16px;">New Oak & Compass Lead</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 700; width: 220px; vertical-align: top;">${label}</td>
                  <td style="padding: 10px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${String(value)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

async function sendLeadNotification(lead) {
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!resend || !to || !from) {
    return { sent: false, reason: "missing_email_configuration" };
  }

  const subjectParts = [
    "New Lead",
    formatInquiryType(lead.inquiryType),
    [lead.firstName, lead.lastName].filter(Boolean).join(" "),
  ].filter(Boolean);

  const recipients = String(to)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const result = await resend.emails.send({
    from,
    to: recipients,
    subject: subjectParts.join(" | "),
    html: buildLeadEmailHtml(lead),
  });

  return { sent: true, result };
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const lead = req.body || {};

      const newLead = {
        ...lead,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        submittedAt: new Date().toLocaleString(),
        portalNotes: "",
      };

      await kv.lpush(LEADS_KEY, JSON.stringify(newLead));

      let emailNotification = { sent: false };
      try {
        emailNotification = await sendLeadNotification(newLead);
      } catch (emailError) {
        console.error("Lead email notification error:", emailError);
        emailNotification = {
          sent: false,
          reason: emailError?.message || "email_send_failed",
        };
      }

      return res.status(200).json({ success: true, emailNotification });
    }

    if (req.method === "GET") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const rawLeads = await kv.lrange(LEADS_KEY, 0, -1);
      const leads = rawLeads.map(parseLead);

      return res.status(200).json({ leads });
    }

    if (req.method === "PATCH") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id, portalNotes } = req.body || {};

      if (!id) {
        return res.status(400).json({ error: "Lead id is required" });
      }

      const rawLeads = await kv.lrange(LEADS_KEY, 0, -1);
      const leads = rawLeads.map(parseLead);

      const updatedLeads = leads.map((lead) =>
        lead.id === id ? { ...lead, portalNotes: portalNotes || "" } : lead
      );

      await kv.del(LEADS_KEY);

      if (updatedLeads.length > 0) {
        await kv.rpush(
          LEADS_KEY,
          ...updatedLeads.map((lead) => JSON.stringify(lead))
        );
      }

      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.query || {};

      if (id) {
        const rawLeads = await kv.lrange(LEADS_KEY, 0, -1);
        const leads = rawLeads.map(parseLead);
        const remainingLeads = leads.filter((lead) => lead.id !== id);

        await kv.del(LEADS_KEY);

        if (remainingLeads.length > 0) {
          await kv.rpush(
            LEADS_KEY,
            ...remainingLeads.map((lead) => JSON.stringify(lead))
          );
        }

        return res.status(200).json({ success: true });
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
