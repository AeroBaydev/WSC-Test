"use client"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Categories() {
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const categories = [
    {
      name: "IDEA IGNITE",
      subtitle: "Research-Based Competition",
      description:
        "Dive into research! Study and explore advancements in science. Submit a video explaining your research idea, findings, and relevance.",
      icon: "🔬",
      color: "from-orange-400 to-orange-600",
      fee2: "₹699",
      fee1: "₹399 ",
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
      fee2: "₹1,899",
      fee1: "₹1,499 ",
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
      fee2: "₹2,299",
      fee1: "₹1,999 ",
      team: "3 Students + 1 Mentor",
      // prizes: ["1st: ₹11,000", "2nd: ₹7,000", "3rd: ₹4,000"],
      addon: "Robotics Kit: ₹2,999 Including GST (optional)",
    },
    {
      name: "TECH THROTTLE",
      subtitle: "Gaming - RC Cars + BattleBots",
      description:
        "Race. Smash. Survive. Bring your own RC car and BattleBot! Compete in RC car hurdles and BattleBot showdowns.",
      icon: "🏎️",
      color: "from-red-500 to-orange-600",
      fee2: "₹5,999",
      fee1: "₹3,599 ",
      team: "3 Students + 1 Mentor",
      // prizes: ["1st: ₹17,000", "2nd: ₹10,000", "3rd: ₹7,000"],
      note: "Dimensions and weight rules will be provided",
    },
  ]

  const detailedGuidelines = {
  "IDEA IGNITE": {
    title: "IDEA IGNITE (Research-Based)",
    details: [
      "• Participation: Individual only.",
      "• Objective: Students research real-life problems and propose innovative, practical solutions.",
      "• Submission Process:",
      "  ◦ Upload a research report on the WSC website.",
      "  ◦ Report should include problem statement, background research, proposed solution, feasibility, and impact.",
      "• Regional Round:",
      "  ◦ Live 4–5 min presentation of the research findings.",
      "  ◦ Must explain scientific logic, data used, and real-world impact.",
      "• Evaluation: Based on innovation, depth of research, clarity, and communication.",
      "• Pro Tip: Use simple visuals, real-world examples, and cite credible sources."
    ]
  },

  
  "TECH FOR GOOD": {
    title: "TECH FOR GOOD (Robotics Competition)",
    details: [
      "• Team: 3 students + 1 mentor.",
      "• Theme: 'Using Technology for the Betterment of Mankind'.",
      "• Objective: Create meaningful tech solutions and present your robotics project.",
      "• Submission Requirements:",
      "  ◦ Working robotics prototype",
      "  ◦ Technical documentation",
      "  ◦ Presentation explaining real-world impact",
      "• Evaluation: Innovation, technical execution, social impact, and presentation quality.",
      "• Optional Robotics Kit available for ₹2,999 (Including GST)"
    ]
  },
  "A": {
    "title": "MYSTERY MAKERS",
    "subtitle": "(A) Kit-Based Challenge",
    "details": [
      "Team: 3 students + 1 mentor.",
      "On-the-Spot Challenge Flow:",
      "1. Teams receive an unknown STEAM kit.",
      "2. 20 minutes – Analyze and plan how to use the kit.",
      "3. 30 minutes – Build the model.",
      "4. 10 minutes – Present the working model, explaining the scientific/STEAM principles involved.",
      "Judging Criteria:",
      "1. Creativity in approach",
      "2. Accuracy and completeness of build",
      "3. Scientific explanation during presentation",
      "4. Teamwork and time management"
    ]
  },
  "B": {
    "title": "MYSTERY MAKERS",
    "subtitle": "(B) Popsicle Bridge Challenge",
    "details": [
      "Task: Construct a bridge using only popsicle sticks.",
      "Judging Criteria:",
      "1. Bridge tested for maximum weight load.",
      "2. Additional marks for design aesthetics and explanation of engineering principles (load distribution, symmetry, balance).",
      "Winner: Bridge with the highest load capacity and strongest explanation."
    ]
  },
  "TECH THROTTLE": {
    title: "TECH THROTTLE (Gaming - RC Cars + BattleBots)",
    details: [
      "• Team: 3 students + 1 mentor.",
      "• Competition Format: Race. Smash. Survive.",
      "• Requirements:",
      "  ◦ Bring your own RC car and BattleBot",
      "  ◦ Must comply with dimension and weight specifications",
      "• Events:",
      "  ◦ RC car hurdle races",
      "  ◦ BattleBot combat competitions",
      "• Evaluation: Performance, design innovation, and strategic gameplay.",
      "• Note: Detailed dimensions and weight rules will be provided upon registration."
    ]
  }
}

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
                    <span className="text-gray-500 text-sm">General Fee:</span>
                    <span className="text-orange-600 font-bold">{category.fee2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Supporting Partner Fee:</span>
                    <span className="text-orange-600 font-bold">{category.fee1}</span>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowDetailsModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            More Details
          </button>
        </motion.div>

        {showDetailsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Category Guidelines</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-8">
                {Object.entries(detailedGuidelines).map(([key, guideline]) => (
                  <div key={key} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{guideline.title}</h3>
                    {guideline.subtitle && (
                      <h4 className="text-lg font-semibold text-orange-500 mb-3">{guideline.subtitle}</h4>
                    )}
                    <div className="space-y-2">
                      {guideline.details.map((detail, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
