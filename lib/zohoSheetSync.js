async function getZohoAccessToken() {
  const clientId = process.env.ZOHO_CLIENT_ID
  const clientSecret = process.env.ZOHO_CLIENT_SECRET
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return { ok: false, error: "Missing Zoho OAuth env vars (ZOHO_CLIENT_ID/ZOHO_CLIENT_SECRET/ZOHO_REFRESH_TOKEN)" }
  }

  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  })

  const resp = await fetch("https://accounts.zoho.in/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(15000),
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    return { ok: false, error: `Failed to refresh Zoho access token: ${resp.status} ${text}` }
  }

  const data = await resp.json().catch(() => ({}))
  if (!data?.access_token) {
    return { ok: false, error: `Zoho token response missing access_token: ${JSON.stringify(data)}` }
  }

  return { ok: true, accessToken: data.access_token }
}

async function appendRowToZohoSheet({ resourceId, worksheetName, accessToken, rowData }) {
  // Zoho Sheet Data API v2 uses sheet.zoho.com endpoint with method param
  const url = `https://sheet.zoho.com/api/v2/${encodeURIComponent(resourceId)}`

  const params = new URLSearchParams()
  params.set("method", "worksheet.jsondata.append")
  params.set("worksheet_name", worksheetName)
  params.set("json_data", JSON.stringify([rowData]))

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    signal: AbortSignal.timeout(15000),
  })

  const text = await resp.text().catch(() => "")
  if (!resp.ok) {
    return { ok: false, error: `Zoho Sheet append failed: ${resp.status} ${text}` }
  }

  let parsed = null
  try {
    parsed = text ? JSON.parse(text) : null
  } catch (_) {
    // Zoho sometimes returns non-JSON
  }

  if (parsed?.status && String(parsed.status).toLowerCase() !== "success") {
    return { ok: false, error: `Zoho Sheet append returned failure: ${text}` }
  }

  return { ok: true, response: parsed || text }
}

export async function syncRegistrationToZohoSheet(registration) {
  const resourceId = process.env.ZOHO_SHEET_RESOURCE_ID
  const worksheetName = process.env.ZOHO_SHEET_WORKSHEET_NAME || "Sheet1"

  if (!resourceId) {
    return {
      ok: false,
      skipped: true,
      error: "ZOHO_SHEET_RESOURCE_ID not configured (open your Zoho Sheet and copy resource_id from its URL)",
    }
  }

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

  const token = await getZohoAccessToken()
  if (!token.ok) return token

  return await appendRowToZohoSheet({
    resourceId,
    worksheetName,
    accessToken: token.accessToken,
    rowData: payload,
  })
}

