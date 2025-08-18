import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"

export async function POST(request) {
  let client

  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "schoolName",
      "contactPerson",
      "email",
      "phone",
      "category",
      "teamName",
      "studentNames",
      "mentorName",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate student names array
    if (
      !Array.isArray(body.studentNames) ||
      body.studentNames.length === 0 ||
      body.studentNames.some((name) => !name.trim())
    ) {
      return NextResponse.json({ error: "Student names are required" }, { status: 400 })
    }

    // Connect to MongoDB
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db("worldskillchallenge")
    const collection = db.collection("registrations")

    // Check if team name already exists for the same school
    const existingTeam = await collection.findOne({
      schoolName: body.schoolName,
      teamName: body.teamName,
    })

    if (existingTeam) {
      return NextResponse.json({ error: "Team name already exists for this school" }, { status: 409 })
    }

    // Create registration document
    const registration = {
      ...body,
      registrationDate: new Date(),
      status: "pending",
    }

    // Insert registration
    const result = await collection.insertOne(registration)

    return NextResponse.json(
      {
        message: "Registration successful",
        registrationId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
