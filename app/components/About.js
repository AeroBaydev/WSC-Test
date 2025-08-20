"use client"
import { motion } from "framer-motion"

export default function About() {
  const ageCategories = [
    { name: "Junior", range: "Classes 6 to 8", color: "bg-orange-500" },
    { name: "Senior", range: "Classes 9 to 12", color: "bg-orange-600" },
  ]

  const benefits = [
    "National & International Recognition",
    "Cash Prizes up to ₹1-Lakh!",
    "Expert Mentorship & Guidance",
    "Certificates & Trophies",
  ]

  const incentives = [
    "Access to One Premium Skill Module – gain specialized knowledge in cutting-edge areas",
    "Tablet + ChatGPT Premium Subscription – tools to enhance learning and innovation",
    "Opportunity to Publish in International Journals/Platforms – showcase your research globally",
    "E-Certificates of Participation & Achievement – official recognition of your skills",
    "Digital Badges – shareable on LinkedIn, resumes, and portfolios",
    "Exclusive Community Access – join a vibrant network of peers and mentors via dedicated WhatsApp groups",
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">About the Challenge</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            World Skill Challenge 2025 is designed to nurture young minds through innovation, teamwork, and real-world
            problem solving. From research-based competitions to hands-on robotics and gaming challenges, we provide a
            platform for students to showcase their talents and compete at national and international levels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 card-shadow"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Mission</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                To ignite creativity, innovation, and scientific temper among students by providing a platform that
                nurtures real-world problem-solving, teamwork, and skill development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 card-shadow"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Vision</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                To become a premier national and international skill challenge that empowers young minds to craft
                impactful solutions, inspire future leaders, and foster a culture of fairness, innovation, and
                collaboration.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">Age Categories</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ageCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-8 text-center card-shadow"
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-xl">{category.name[0]}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{category.name}</h4>
                <p className="text-gray-600">{category.range}</p>
                <p className="text-sm text-gray-500 mt-4">Compete with peers in your age group across all categories</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="orange-accent rounded-lg p-8 text-center card-shadow-lg mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Why Join World Skill Challenge 2025?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white font-semibold text-sm md:text-base">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-8 card-shadow"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Incentives of WSC</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {incentives.map((incentive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 p-4 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed">{incentive}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
