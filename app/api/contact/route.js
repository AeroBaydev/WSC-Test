import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Log the contact form data (in production, you'd send an email)
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      phone: body.phone || "Not provided",
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
