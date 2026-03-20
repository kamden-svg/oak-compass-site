import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const lead = req.body || {};

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `New Oak & Compass lead: ${lead.firstName || ""} ${lead.lastName || ""}`.trim(),
      html: `
        <h2>New Lead</h2>
        <p><strong>Inquiry Type:</strong> ${lead.inquiryType || ""}</p>
        <p><strong>First Name:</strong> ${lead.firstName || ""}</p>
        <p><strong>Last Name:</strong> ${lead.lastName || ""}</p>
        <p><strong>Phone:</strong> ${lead.phone || ""}</p>
        <p><strong>Email:</strong> ${lead.email || ""}</p>
        <p><strong>Spanish-speaking agent requested:</strong> ${lead.needsSpanish || ""}</p>
        <p><strong>Insurance Type:</strong> ${lead.insuranceType || ""}</p>
        <p><strong>ZIP Code:</strong> ${lead.zipCode || ""}</p>
        <p><strong>Notes:</strong> ${lead.notes || ""}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return res.status(500).json({
      error: error?.message || "Failed to send lead email",
    });
  }
}