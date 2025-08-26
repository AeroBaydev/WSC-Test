"use client"
import { motion } from "framer-motion"

export default function Categories() {
  const categories = [
    {
      name: "IDEA IGNITE",
      subtitle: "Research-Based Competition",
      description:
        "Dive into research! Study and explore advancements in science. Submit a video explaining your research idea, findings, and relevance.",
      icon: "🔬",
      color: "from-orange-400 to-orange-600",
      fee: "₹399 including GST",
      team: "Individual",
      // prizes: ["1st: ₹3,000", "2nd: ₹1,500", "3rd: ₹1,000"],
    },
    {
      name: "MYSTERY MAKERS",
      subtitle: "STEAM + Kit-Based Competition",
      description:
        "Two exciting challenges: Kit-Based Challenge with mystery kits and D&T Popsicle Bridge Challenge. Complete challenges and explain STEAM principles.",
      icon: "🧩",
      color: "from-orange-500 to-orange-700",
      fee: "₹1,499 including GST",
      team: "3 Students + 1 Mentor",
      // prizes: ["1st: ₹8,000", "2nd: ₹5,000", "3rd: ₹3,000"],
    },
    {
      name: "TECH FOR GOOD",
      subtitle: "Robotics Competition",
      description:
        "Theme: 'Using Technology for the Betterment of Mankind'. Create meaningful tech solutions and present your robotics project.",
      icon: "🤖",
      color: "from-orange-600 to-red-500",
      fee: "₹1,999 including GST",
      team: "3 Students + 1 Mentor",
      // prizes: ["1st: ₹11,000", "2nd: ₹7,000", "3rd: ₹4,000"],
      addon: "Robotics Kit: ₹2,500 + GST (optional)",
    },
    {
      name: "TECH THROTTLE",
      subtitle: "Gaming - RC Cars + BattleBots",
      description:
        "Race. Smash. Survive. Bring your own RC car and BattleBot! Compete in RC car hurdles and BattleBot showdowns.",
      icon: "🏎️",
      color: "from-red-500 to-orange-600",
      fee: "₹3,599 including GST",
      team: "3 Students + 1 Mentor",
      // prizes: ["1st: ₹17,000", "2nd: ₹10,000", "3rd: ₹7,000"],
      note: "Dimensions and weight rules will be provided",
    },
  ]

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Competition Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your arena and showcase your skills in these exciting categories
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="text-3xl md:text-4xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{category.name}</h3>
                    <h4 className="text-base md:text-lg font-semibold text-orange-500">{category.subtitle}</h4>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">{category.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Team:</span>
                    <span className="text-gray-900 font-semibold text-sm">{category.team}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Fee:</span>
                    <span className="text-orange-600 font-bold">{category.fee}</span>
                  </div>
                  {category.addon && (
                    <div className="text-xs text-orange-700 bg-orange-50 p-2 rounded border border-orange-200">
                      {category.addon}
                    </div>
                  )}
                  {category.note && (
                    <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-200">
                      Note: {category.note}
                    </div>
                  )}
                </div>

                {/* Prize Money section commented out
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="text-gray-900 font-semibold mb-2 text-sm">Prize Money:</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {category.prizes.map((prize, prizeIndex) => (
                      <div key={prizeIndex} className="text-center">
                        <div
                          className={`text-xs font-bold ${
                            prizeIndex === 0
                              ? "text-yellow-600"
                              : prizeIndex === 1
                              ? "text-gray-600"
                              : "text-orange-600"
                          }`}
                        >
                          {prize}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
