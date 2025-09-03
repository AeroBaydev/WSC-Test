"use client"
import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Register() {
  const { user } = useUser()
  const [isRegistered, setIsRegistered] = useState(false)
  const [checkingRegistration, setCheckingRegistration] = useState(true)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    schoolName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userCategories, setUserCategories] = useState([])

  useEffect(() => {
    const checkRegistration = async () => {
      if (user) {
        try {
          const res = await fetch("/api/save-user", {
            method: "GET",
          })
          const data = await res.json()
          if (data.exists) {
            setIsRegistered(true)
          }

          // Fetch user's category registrations from the new API
          const categoriesRes = await fetch("/api/check-category-registration", {
            method: "GET",
          })
          const categoriesData = await categoriesRes.json()
          if (categoriesData.success) {
            setUserCategories(categoriesData.registrations || [])
          }
        } catch (err) {
          console.error("Error checking registration:", err)
        }
        setCheckingRegistration(false)
      }
    }

    checkRegistration()
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function ensureSerializable(input, path = "root") {
    try {
      // Primitive fast-path
      if (input === null || typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
        return input
      }
      // Arrays
      if (Array.isArray(input)) {
        return input.map((v, i) => ensureSerializable(v, `${path}[${i}]`))
      }
      // Dates
      if (input instanceof Date) return input.toISOString()
      // Objects
      if (typeof input === "object") {
        const out = {}
        for (const [k, v] of Object.entries(input)) {
          if (typeof v === "function") {
            console.warn("[v0] Stripping function from payload at:", `${path}.${k}`)
            continue
          }
          if (typeof v === "undefined") continue
          out[k] = ensureSerializable(v, `${path}.${k}`)
        }
        return out
      }
      // Fallback: stringify-able types like BigInt unsupported
      console.warn("[v0] Non-serializable value encountered at:", path, "type:", typeof input)
      return String(input)
    } catch (e) {
      console.error("[v0] ensureSerializable error at:", path, e)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const safeBody = ensureSerializable(form)
      console.log("[v0] Register submit payload:", safeBody)

      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeBody),
      })
      const data = await res.json()
      if (data.success) {
        setIsRegistered(true)
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (err) {
      console.error("[v0] Registration submit error:", err)
      setError("Something went wrong")
    }
    setLoading(false)
  }

  const pricingTiers = [
    {
      title: "IDEA IGNITE",
      subtitle: "Research-Based",
      price: "₹399",
      gst: "Including GST",
      description: "Individual competition for research enthusiasts",
      features: [
        "Individual participation",
        "Video submission for Stage 1",
        "Regional presentation opportunity",
        "Research mentorship",
        "Certificate of participation",
      ],
      color: "from-orange-400 to-orange-600",
      popular: false,
      prizes: "Revealing Soon",
      formLink: "#",
    },
    {
      title: "MYSTERY MAKERS",
      subtitle: "STEAM + Kit-Based",
      price: "₹1,499",
      gst: "Including GST",
      description: "Team-based STEAM challenges",
      features: [
        "3 Students + 1 Mentor team",
        "Kit-based challenges",
        "Popsicle bridge building",
        "STEAM principle explanation",
        "Hands-on learning experience",
      ],
      color: "from-orange-500 to-orange-700",
      popular: false,
      prizes: "Revealing Soon",
      formLink: "#",
    },
    {
      title: "TECH FOR GOOD",
      subtitle: "Robotics Competition",
      price: "₹1,999",
      gst: "Including GST",
      description: "Technology for mankind's betterment",
      features: [
        "3 Students + 1 Mentor team",
        "Robotics project development",
        "Optional robotics kit (₹2,500 + GST)",
        "Expert technical guidance",
        "Innovation showcase platform",
      ],
      color: "from-orange-600 to-red-500",
      popular: true,
      prizes: "Revealing Soon",
      formLink: "#",
    },
    {
      title: "TECH THROTTLE",
      subtitle: "RC Cars + BattleBots",
      price: "₹3,599",
      gst: "Including GST",
      description: "Ultimate gaming competition",
      features: [
        "3 Students + 1 Mentor team",
        "RC Car racing with hurdles",
        "BattleBot combat arena",
        "Bring your own equipment",
        "Competitive gaming experience",
      ],
      color: "from-red-500 to-orange-600",
      popular: false,
      prizes: "Revealing Soon",
      formLink: "#",
    },
  ]

  // Map each category to its Zoho Form base URL (replace placeholders with real URLs)
  const categoryFormBaseUrls = {
    "IDEA IGNITE":
      "https://forms.zohopublic.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1/formperma/yuklwYd2IfosCywtkVgrQaHZuGAPdA1AaVUaTuoCmT8",
    "MYSTERY MAKERS": "https://forms.zohopublic.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
    "TECH FOR GOOD": "https://forms.zohopublic.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
    "TECH THROTTLE": "https://forms.zohopublic.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
  }

  // Build Zoho form link with Clerk user params
  const buildZohoFormUrl = (categoryTitle) => {
    const baseUrl = categoryFormBaseUrls[categoryTitle]
    if (!baseUrl || !user) return "#"
    try {
      const url = new URL(baseUrl)
      url.searchParams.set("clerkUserId", user.id)
      url.searchParams.set("email", user.primaryEmailAddress?.emailAddress || "")
      url.searchParams.set("category", categoryTitle)
      return url.toString()
    } catch (e) {
      return "#"
    }
  }

  // Harden normalization: trim, normalize separators, expand synonyms
  const normalizeStatus = (status) => {
    if (!status) return "pending"
    const s = String(status).trim().toLowerCase().replace(/[_-]+/g, " ")
    if (
      ["success", "successful", "completed", "complete", "paid", "payment success", "payment completed"].includes(s)
    ) {
      return "registered"
    }
    if (["pending", "processing", "initiated", "in progress"].includes(s)) {
      return "pending"
    }
    if (["failed", "failure", "canceled", "cancelled", "declined"].includes(s)) {
      return "failed"
    }
    return "pending"
  }

  // Derive normalized statuses once to ensure UI never uses raw values accidentally
  const normalizedCategories = useMemo(() => {
    return (userCategories || []).map((r) => ({
      ...r,
      normalizedStatus: normalizeStatus(r?.paymentStatus),
    }))
  }, [userCategories])

  const getCategoryStatus = (categoryTitle) => {
    // Read from normalizedCategories first, fallback to raw
    const reg =
      normalizedCategories.find((r) => r?.category === categoryTitle) ||
      userCategories.find((r) => r?.category === categoryTitle)
    if (!reg) return "not-registered"
    return reg.normalizedStatus ?? normalizeStatus(reg.paymentStatus)
  }

  // Kept for backwards compatibility
  const isRegisteredInCategory = (categoryTitle) => {
    return getCategoryStatus(categoryTitle) === "registered"
  }

  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignedOut>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hero Section */}
            <div className="mb-12">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl mb-6"
              >
                🏆
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Join the Ultimate
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {" "}
                  Competition
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Compete with the brightest minds across India and win up to{" "}
                <span className="font-bold text-orange-600">₹1 Lakh</span> in cash prizes!
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
              >
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Massive Prize Pool</h3>
                <p className="text-gray-600">Win up to ₹1 Lakh in cash prizes across 4 exciting categories</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
              >
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Skill Development</h3>
                <p className="text-gray-600">
                  Enhance your STEAM, robotics, and research skills with expert mentorship
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
              >
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recognition</h3>
                <p className="text-gray-600">Get certificates, trophies, and international opportunities</p>
              </motion.div>
            </div>

            {/* Competition Categories Preview */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">4 Exciting Categories</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {pricingTiers.map((tier, index) => (
                  <div key={tier.title} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="font-bold">{tier.title}</div>
                    <div className="text-orange-100">{tier.subtitle}</div>
                    <div className="text-yellow-300 font-bold">{tier.price}</div>
                    <SignInButton mode="modal">
                      <button className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded transition-all">
                        Sign in to Register
                      </button>
                    </SignInButton>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Compete?</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Sign in to unlock your registration and choose your competition category
              </p>
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🚀 Sign In to Register
                </motion.button>
              </SignInButton>
              <p className="text-sm text-gray-500 mt-4">
                Registration closes on <span className="font-semibold text-orange-600">7th September 2025</span>
              </p>
            </div>
          </motion.div>
        </SignedOut>

        <SignedIn>
          {checkingRegistration ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-xl text-gray-600">Checking your registration status...</p>
            </div>
          ) : !isRegistered ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              {/* Welcome message for signed-in users */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-6xl md:text-8xl mb-6"
                >
                  🎯
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {user?.firstName}!
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Complete your registration and choose your competition category
                </p>
              </div>

              {/* Registration form for signed-in users */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Your Profile</h3>

                {!isRegistered && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📝</div>
                      <div>
                        <p className="text-orange-800 font-semibold">Step 1: Complete Your Profile</p>
                        <p className="text-orange-700 text-sm">
                          Fill out the form below to unlock access to competition categories and registration forms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Choose a unique username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                      <input
                        type="text"
                        name="schoolName"
                        value={form.schoolName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your school name"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
                  )}
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Complete Registration"}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Competition categories for signed-in users */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Competition Category</h3>

                {isRegistered && (
                  <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Your Registration Status</h4>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {pricingTiers.map((tier) => {
                          const status = getCategoryStatus(tier.title)
                          const chip =
                            status === "registered"
                              ? {
                                  bg: "bg-green-50",
                                  border: "border-green-200",
                                  text: "text-green-700",
                                  label: "Registered ✓",
                                }
                              : status === "pending"
                                ? {
                                    bg: "bg-yellow-50",
                                    border: "border-yellow-200",
                                    text: "text-yellow-700",
                                    label: "Pending ⏳",
                                  }
                                : status === "failed"
                                  ? {
                                      bg: "bg-red-50",
                                      border: "border-red-200",
                                      text: "text-red-700",
                                      label: "Payment Failed",
                                    }
                                  : {
                                      bg: "bg-gray-50",
                                      border: "border-gray-200",
                                      text: "text-gray-700",
                                      label: "Not Registered",
                                    }

                          return (
                            <div
                              key={tier.title}
                              className={`flex items-center justify-between rounded-lg ${chip.bg} border ${chip.border} px-3 py-2`}
                              aria-live="polite"
                            >
                              <span className="text-sm font-medium text-gray-900">{tier.title}</span>
                              <span className={`text-xs font-semibold ${chip.text}`}>{chip.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {isRegistered ? (
                  // Show actual registration categories when user has completed registration
                  <div className="grid lg:grid-cols-2 gap-8">
                    {pricingTiers.map((tier, index) => {
                      const status = getCategoryStatus(tier.title)
                      const isRegistered = status === "registered"
                      const isPending = status === "pending"
                      const isFailed = status === "failed"

                      return (
                        <motion.div
                          key={tier.title}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          className={`relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 ${
                            tier.popular ? "ring-2 ring-orange-500" : ""
                          }`}
                        >
                          {tier.popular && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-semibold">
                              🔥 MOST POPULAR
                            </div>
                          )}

                          <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>

                          <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.title}</h3>
                            <p className="text-sm text-orange-500 mb-4">{tier.subtitle}</p>

                            <div className="mb-4">
                              <span className="text-2xl md:text-3xl font-bold text-gray-900">{tier.price}</span>
                              {tier.gst && <span className="text-gray-500 ml-1 text-sm">{tier.gst}</span>}
                            </div>

                            <p className="text-gray-600 mb-4 text-sm">{tier.description}</p>

                            <div className="mb-6">
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
                                <p className="text-orange-700 font-bold text-sm">Prize Money: {tier.prizes}</p>
                              </div>
                            </div>

                            {isRegistered ? (
                              <div className="block w-full py-3 px-4 rounded-lg font-semibold text-green-700 bg-green-50 border border-green-200 text-sm text-center">
                                ✓ Already Registered
                              </div>
                            ) : isPending ? (
                              <div className="block w-full py-3 px-4 rounded-lg font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 text-sm text-center">
                                ⏳ Payment Pending - Check your email
                              </div>
                            ) : (
                              <motion.a
                                href={buildZohoFormUrl(tier.title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`block w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition-opacity text-sm text-center`}
                                aria-label={`Register for ${tier.title}`}
                              >
                                {isFailed ? "Retry Registration" : "Register Now"}
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  // Show preview categories when user hasn't completed registration
                  <div className="text-center py-12">
                    <div className="text-6xl mb-6">🔒</div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Registration First</h4>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                      Please complete your profile information above to unlock access to competition categories and
                      registration forms.
                    </p>

                    {/* Preview of categories (non-clickable) */}
                    <div className="grid lg:grid-cols-2 gap-8 opacity-60">
                      {pricingTiers.map((tier, index) => (
                        <motion.div
                          key={tier.title}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200`}
                        >
                          {tier.popular && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-semibold">
                              🔥 MOST POPULAR
                            </div>
                          )}
                          <div
                            className={`bg-gradient-to-r ${tier.color} p-6 text-white ${tier.popular ? "pt-12" : ""}`}
                          >
                            <h4 className="text-2xl font-bold mb-2">{tier.title}</h4>
                            <p className="text-lg opacity-90 mb-4">{tier.subtitle}</p>
                            <div className="flex items-baseline mb-2">
                              <span className="text-4xl font-bold">{tier.price}</span>
                              {tier.gst && <span className="text-lg ml-2 opacity-75">{tier.gst}</span>}
                            </div>
                            <div className="bg-white/20 rounded-lg px-3 py-1 inline-block">
                              <span className="text-yellow-300 font-bold">Prize: {tier.prizes}</span>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-600 mb-6">{tier.description}</p>
                            <ul className="space-y-3 mb-8">
                              {tier.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-orange-500 mr-3 mt-1">✓</span>
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="w-full py-4 rounded-xl font-semibold text-lg bg-gray-100 text-gray-500 border border-gray-200 text-center cursor-not-allowed">
                              🔒 Complete Registration to Unlock
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {user?.firstName}!
                  </span>
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Register Now</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose your category and compete for exciting cash prizes
                </p>
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-700 font-semibold">📅 Registration Deadline: 7th September 2025</p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingTiers.map((tier, index) => {
                  const status = getCategoryStatus(tier.title)
                  const isRegistered = status === "registered"
                  const isPending = status === "pending"
                  const isFailed = status === "failed"

                  return (
                    <motion.div
                      key={tier.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className={`relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 ${
                        tier.popular ? "ring-2 ring-orange-500" : ""
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-semibold">
                          Most Popular
                        </div>
                      )}

                      <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.title}</h3>
                        <p className="text-sm text-orange-500 mb-4">{tier.subtitle}</p>

                        <div className="mb-4">
                          <span className="text-2xl md:text-3xl font-bold text-gray-900">{tier.price}</span>
                          {tier.gst && <span className="text-gray-500 ml-1 text-sm">{tier.gst}</span>}
                        </div>

                        <p className="text-gray-600 mb-4 text-sm">{tier.description}</p>

                        <div className="mb-6">
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
                            <p className="text-orange-700 font-bold text-sm">Prize Money: {tier.prizes}</p>
                          </div>
                        </div>

                        {isRegistered ? (
                          <div className="block w-full py-3 px-4 rounded-lg font-semibold text-green-700 bg-green-50 border border-green-200 text-sm text-center">
                            ✓ Already Registered
                          </div>
                        ) : isPending ? (
                          <div className="block w-full py-3 px-4 rounded-lg font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 text-sm text-center">
                            ⏳ Payment Pending - Check your email
                          </div>
                        ) : (
                          <motion.a
                            href={buildZohoFormUrl(tier.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`block w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition-opacity text-sm text-center`}
                            aria-label={`Register for ${tier.title}`}
                          >
                            {isFailed ? "Retry Registration" : "Register Now"}
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                {/* Enhanced Prize Pool Section */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl"></div>
                  <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-lg border-4 border-orange-200">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <div className="text-4xl md:text-6xl mb-4">💰</div>
                      <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Total Prize Pool</h3>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-orange-50 border border-orange-200 rounded-lg p-6 md:p-8 shadow-lg mb-6"
                    >
                      <p className="text-gray-900 text-xl md:text-2xl mb-2">
                        Up to <span className="font-bold text-3xl md:text-5xl text-orange-700">₹1-Lakh!</span>
                      </p>
                      <p className="text-gray-600 text-base md:text-lg">in cash prizes across all categories!</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏆</div>
                        <p className="font-semibold text-gray-900 text-sm">Certificates & Trophies</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl mb-2">🌍</div>
                        <p className="font-semibold text-gray-900 text-sm">International Opportunities</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl mb-2">🎓</div>
                        <p className="font-semibold text-gray-900 text-sm">Expert Mentorship</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </SignedIn>
      </div>
    </section>
  )
}
