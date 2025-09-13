import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"]
    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Env validation
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.zoho.com"
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
    const SMTP_SECURE =
      typeof process.env.SMTP_SECURE !== "undefined"
        ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
        : SMTP_PORT === 465

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables." },
        { status: 500 },
      )
    }

    // Create transporter for Zoho
    // - Port 587 -> STARTTLS (secure: false, requireTLS: true)
    // - Port 465 -> SSL (secure: true)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      authMethod: "LOGIN",
      requireTLS: !SMTP_SECURE,
      tls: {
        minVersion: "TLSv1.2",
        // rejectUnauthorized: true, // keep strict in production
      },
      // timeouts to avoid hanging
      connectionTimeout: 15_000,
      socketTimeout: 20_000,
    })

    // Verify SMTP credentials/connection before sending for clearer errors
    try {
      await transporter.verify()
      // console.log("[v0] SMTP verify OK for host:", SMTP_HOST, "port:", SMTP_PORT, "secure:", SMTP_SECURE)
    } catch (verifyErr) {
      const hint = [
        "Use a Zoho App Password (not your normal account password) if 2FA is enabled.",
        "Ensure From matches the authenticated mailbox (EMAIL_USER).",
        "For Zoho regional accounts, try the correct host: smtp.zoho.com, smtp.zoho.in, smtp.zoho.eu.",
        "Use port 587 (secure=false, STARTTLS) or 465 (secure=true).",
        "Make sure SMTP access is enabled for the mailbox.",
      ].join(" ")
      return NextResponse.json(
        {
          error: "SMTP verification failed",
          code: "SMTP_VERIFY_FAILED",
          details: verifyErr?.message || String(verifyErr),
          hint,
        },
        { status: 500 },
      )
    }

    const name = String(body.name).trim()
    const email = String(body.email).trim()
    const phone = String(body.phone || "").trim()
    const subject = String(body.subject).trim()
    const message = String(body.message).trim()

    const mailSubject = `[Contact Form] ${subject}`

    const text = `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}
`.trim()

    const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2 style="margin: 0 0 12px;">New contact form submission</h2>
    <p style="margin: 0 0 6px;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 0 0 6px;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 0 0 12px;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p style="margin: 0 0 6px;"><strong>Subject:</strong> ${subject}</p>
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 12px 0;" />
    <p style="white-space: pre-wrap; margin: 12px 0;">${message}</p>
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 12px 0;" />
    <p style="font-size: 12px; color: #6b7280;">Sent at ${new Date().toISOString()}</p>
  </div>
`.trim()

    // Send the email (From must be the authenticated mailbox)
    const info = await transporter.sendMail({
      from: `"World Skill Challenge" <${EMAIL_USER}>`,
      to: EMAIL_USER, // deliver to the same mailbox
      replyTo: email,
      subject: mailSubject,
      text,
      html,
    })

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    // Normalize common SMTP errors for clearer UI messages
    const raw = error?.response || error?.message || String(error)
    let code = "UNKNOWN"
    let hint = undefined

    if (error?.code === "EAUTH" || /535/.test(raw)) {
      code = "SMTP_AUTH_FAILED"
      hint =
        "Authentication failed. Use a Zoho App Password (if 2FA), ensure EMAIL_USER is the full mailbox address, and that From matches EMAIL_USER. Also verify the correct Zoho SMTP host for your region."
    } else if (error?.code === "ESOCKET") {
      code = "SMTP_SOCKET_ERROR"
      hint = "Network/TLS issue. Check port/secure pairing (587 STARTTLS or 465 SSL) and firewall settings."
    } else if (error?.code === "ETIMEDOUT" || /timed out/i.test(raw)) {
      code = "SMTP_TIMEOUT"
      hint = "Connection timed out. Confirm host/port reachability and try again."
    }

    console.error("Contact form error:", { code, raw })
    return NextResponse.json({ error: error?.message || "Failed to send message.", code, hint }, { status: 500 })
  }
}
