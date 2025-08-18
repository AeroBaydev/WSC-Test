import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User from "@/lib/userModel"
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { firstName, lastName, username, schoolName } = body

  try {
    const existingUser = await User.findOne({ userId: clerkUser.id })

    if (existingUser) {
      return NextResponse.json({ success: true, user: existingUser, alreadyExists: true })
    }

    const user = await User.create({
      userId: clerkUser.id,
      firstName,
      lastName,
      username,
      schoolName,
    })
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Save user error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function GET(req) {
  await dbConnect()
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await User.findOne({ userId: clerkUser.id })
    return NextResponse.json({ exists: !!user, user })
  } catch (error) {
    console.error("Check user error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
