"use client"
import { motion } from "framer-motion"

export default function Register() {
  const pricingTiers = [
    {
      title: "IDEA IGNITE",
      subtitle: "Research-Based",
      price: "₹299",
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Register Now</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your category and compete for exciting cash prizes
          </p>
          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-700 font-semibold">📅 Registration Deadline: 7th September 2025</p>
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

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-600 text-xs">
                      <svg
                        className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

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
      </div>
    </section>
  )
}
