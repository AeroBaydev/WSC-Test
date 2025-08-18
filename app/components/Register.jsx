"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Register() {
  const { user } = useUser()
  const [isRegistered, setIsRegistered] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    schoolName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user data exists in DB (optional, for demo just skip)
    if (user) {
      // You can fetch from /api/save-user?userId=user.id to check
      setIsRegistered(false) // Assume not registered for demo
    }
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
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold">IDEA IGNITE</div>
                  <div className="text-orange-100">Research Competition</div>
                  <div className="text-yellow-300 font-bold">₹3,000 Prize</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold">MYSTERY MAKERS</div>
                  <div className="text-orange-100">STEAM Challenges</div>
                  <div className="text-yellow-300 font-bold">₹8,000 Prize</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border-2 border-yellow-300">
                  <div className="font-bold">TECH FOR GOOD</div>
                  <div className="text-orange-100">Robotics</div>
                  <div className="text-yellow-300 font-bold">₹11,000 Prize</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold">TECH THROTTLE</div>
                  <div className="text-orange-100">RC Cars & BattleBots</div>
                  <div className="text-yellow-300 font-bold">₹17,000 Prize</div>
                </div>
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

        <SignedIn></SignedIn>
      </div>
    </section>
  )
}
