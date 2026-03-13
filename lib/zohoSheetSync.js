export async function syncRegistrationToZohoSheet(registration) {
  const url = process.env.ZOHO_SHEET_WEBHOOK_URL
  if (!url) {
    return { ok: false, skipped: true, error: "ZOHO_SHEET_WEBHOOK_URL not configured" }
  }

  const secret = process.env.ZOHO_SHEET_WEBHOOK_SECRET
  const headers = { "Content-Type": "application/json" }
  if (secret) headers["x-wsc-secret"] = secret

  const fd = registration.formData || {}
  const members = Array.isArray(fd.members) ? fd.members : []

  // Flattened payload (best for Zoho Sheet columns)
  const payload = {
    // identity
    clerkUserId: registration.clerkUserId,
    email: registration.email,
    category: registration.category,

    // form details
    teamName: fd.teamName || "", 
    teamSize: fd.teamSize || "",
    member1Name: members[0] || "",
    member2Name: members[1] || "",
    member3Name: members[2] || "",
    member4Name: members[3] || "",
    member5Name: members[4] || "",
    schoolName: fd.schoolName || "",
    ageCategory: fd.ageCategory || "",
    classStd: fd.classStd || "",
    parentName: fd.parentName || "",
    studentContact: fd.studentContact || "",
    parentContact: fd.parentContact || "",
    mentorName: fd.mentorName || "",
    mentorContact: fd.mentorContact || "",
    acceptTerms: fd.acceptTerms === true,

    // coupon + pricing
    couponCode: registration.couponCode || "",
    basePricePaise: registration.basePricePaise ?? null,
    finalPricePaise: registration.finalPricePaise ?? null,
    basePriceINR: typeof registration.basePricePaise === "number" ? registration.basePricePaise / 100 : null,
    finalPriceINR: typeof registration.finalPricePaise === "number" ? registration.finalPricePaise / 100 : null,
    discountApplied: registration.discountApplied === true,
    discountReason: registration.discountReason || "",

    // payment details (after success)
    paymentStatus: registration.paymentStatus,
    paymentLinkId: registration.paymentLinkId || "",
    paymentOrderId: registration.paymentOrderId || "",
    transactionId: registration.transactionId || "",
    paymentAmountPaise: registration.paymentAmount ? Number(registration.paymentAmount) : null,
    paymentAmountINR: registration.paymentAmount ? Number(registration.paymentAmount) / 100 : null,

    // timestamps
    registeredAt: registration.registeredAt,
    createdAt: registration.createdAt,
    updatedAt: registration.updatedAt,
  }

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    return { ok: false, error: `Zoho sheet webhook failed: ${resp.status} ${text}` }
  }

  return { ok: true }
}

