"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setIsRegistered(true)
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (err) {
      setError("Something went wrong")
    }
    setLoading(false)
  }

  const pricingTiers = [
    {
      title: "IDEA IGNITE",
      subtitle: "Research-Based",
      price: "₹299",
      gst: "+ GST",
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
      prizes: "Up to ₹3,000",
      formLink: "#",
    },
    {
      title: "MYSTERY MAKERS",
      subtitle: "STEAM + Kit-Based",
      price: "₹1,199",
      gst: "+ GST",
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
      prizes: "Up to ₹8,000",
      formLink: "#",
    },
    {
      title: "TECH FOR GOOD",
      subtitle: "Robotics Competition",
      price: "₹1,499",
      gst: "",
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
      prizes: "Up to ₹11,000",
      formLink: "#",
    },
    {
      title: "TECH THROTTLE",
      subtitle: "RC Cars + BattleBots",
      price: "₹2,999",
      gst: "",
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
      prizes: "Up to ₹17,000",
      formLink: "#",
    },
  ]

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
                Registration closes on <span className="font-semibold text-orange-600">30th August 2025</span>
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
                <div className="grid lg:grid-cols-2 gap-8">
                  {pricingTiers.map((tier, index) => (
                    <motion.div
                      key={tier.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                        tier.popular ? "border-orange-500" : "border-gray-200"
                      } hover:shadow-2xl transition-all duration-300`}
                    >
                      {tier.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-semibold">
                          🔥 MOST POPULAR
                        </div>
                      )}
                      <div className={`bg-gradient-to-r ${tier.color} p-6 text-white ${tier.popular ? "pt-12" : ""}`}>
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
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            tier.popular
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          Register for {tier.title}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                  <p className="text-orange-700 font-semibold">
                    📅 Registration Deadline: 30th August 2025 (Tentative)
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingTiers.map((tier, index) => (
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
                      <div className="absolute top-0 left-0 right-0 orange-accent text-white text-center py-2 text-sm font-semibold">
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

                      <motion.a
                        href={tier.formLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${tier.color} hover:opacity-90 transition-opacity text-sm text-center`}
                      >
                        Register Now
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
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
                  <div className="relative orange-accent rounded-2xl p-8 md:p-12 card-shadow-lg border-4 border-orange-200">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <div className="text-4xl md:text-6xl mb-4">💰</div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Total Prize Pool</h3>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-white/20 rounded-xl p-6 md:p-8 backdrop-blur-sm border border-white/30 mb-6"
                    >
                      <p className="text-white text-xl md:text-2xl mb-2">
                        Up to <span className="font-bold text-3xl md:text-5xl text-yellow-300">₹1-Lakh!</span>
                      </p>
                      <p className="text-orange-100 text-base md:text-lg">in cash prizes across all categories!</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-4 text-white">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏆</div>
                        <p className="font-semibold text-sm">Certificates & Trophies</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">🌍</div>
                        <p className="font-semibold text-sm">International Opportunities</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">🎓</div>
                        <p className="font-semibold text-sm">Expert Mentorship</p>
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
