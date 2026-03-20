import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      inquiryType,
      firstName,
      lastName,
      phone,
      email,
      needsSpanish,
      insuranceType,
      zipCode,
      notes,
    } = req.body;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `New Oak & Compass lead: ${firstName} ${lastName}`,
      html: `
        <h2>New Lead</h2>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Spanish-speaking agent requested:</strong> ${needsSpanish}</p>
        <p><strong>Insurance Type:</strong> ${insuranceType}</p>
        <p><strong>ZIP Code:</strong> ${zipCode}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return res.status(500).json({ error: "Failed to send lead email" });
  }
}