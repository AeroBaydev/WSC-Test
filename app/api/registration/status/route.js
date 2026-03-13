import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import dbConnect from "@/lib/dbConnect"
import CategoryRegistration from "@/lib/categoryRegistrationModel"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    if (!category) return NextResponse.json({ error: "Missing category" }, { status: 400 })

    await dbConnect()
    const reg = await CategoryRegistration.findOne({ clerkUserId: userId, category }).select(
      "paymentStatus paymentLinkId paymentOrderId transactionId category registeredAt finalPricePaise basePricePaise couponCode"
    )

    if (!reg) {
      return NextResponse.json({ ok: true, found: false })
    }

    return NextResponse.json({
      ok: true,
      found: true,
      registration: {
        category: reg.category,
        paymentStatus: reg.paymentStatus,
        registeredAt: reg.registeredAt,
        paymentLinkId: reg.paymentLinkId,
        paymentOrderId: reg.paymentOrderId,
        transactionId: reg.transactionId,
        basePricePaise: reg.basePricePaise,
        finalPricePaise: reg.finalPricePaise,
        couponCode: reg.couponCode,
      },
    })
  } catch (err) {
    console.error("registration/status error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

