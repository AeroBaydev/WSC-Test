"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import StatsCounter from "./StatsCounter"

export default function About() {
  const ageCategories = [
    { name: "Primary", range: "Classes 3 to 5", color: "bg-orange-500" },
    { name: "Junior", range: "Classes 6 to 8", color: "bg-orange-500" },
    { name: "Senior", range: "Classes 9 to 12", color: "bg-orange-500" },
  ]

  const benefits = [
    "Up to ₹1 Lakh Prize Money 🏆",
    "Mentorship from Industry Leaders 🤝",
    "Premium Learning Access 📚",
    "Grants & Funding Support for Top Ideas 💡"
  ]

  const incentives = [
    "Up to ₹1 Lakh Prize Money – Rewards for national winners",
    "Funding for Top Ideas – Turn your innovation into reality",
    "Global Recognition – Represent India on an international stage",
    "Expert Mentorship – Learn directly from global leaders & innovators",
    "Premium Learning Access – Unlock advanced skill modules & tools",
    "Publish & Showcase – Get featured in international journals & platforms",
    "Digital Badges & Certificates – Boost resumes, college, and career prospects",
    "Global Networking – Connect with peers, mentors & innovators worldwide",
    "Entrepreneurship Edge – Build problem-solving & leadership skills early",
    "Lifelong Impact – Confidence, creativity & future-ready mindset"
  ]

  const sponsors = [
    {
      name: "STEM Educational Research",
      logo: "/images/stemed-logo.png",
      width: 140,
      height: 50,
    },
    {
      name: "NSDC",
      logo: "/images/NSDCLOGO.png",
      width: 120,
      height: 50,
    },
    {
      name: "Aero Modellers Association of India",
      logo: "/images/AMAILOGO.png",
      width: 120,
      height: 50,
    },
    // {
    //   name: "Skill India",
    //   logo: "/images/skillindialogo.png",
    //   width: 120,
    //   height: 50,
    // },
  ]

  return (
    <section id="about" className="py-20 bg-top md:bg-cover bg-contain bg-no-repeat bg-fixed relative" style={{backgroundImage: 'url(/images/aboutbg.jpg)'}}>
      <div className="absolute inset-0 bg-white/85"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">About the Challenge</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            World Skill Challenge 2025 is the biggest platform for young innovators, designed to ignite creativity, teamwork, and real-world problem-solving. Bringing together the brightest minds, it features a diverse range of competitions – from research-based challenges to STEAM innovation, hands-on robotics, RC car, battle bots, gaming, aeromodelling, and drone flying. Students get the opportunity to showcase their talent, push boundaries of innovation, and compete at national and international levels, making it a true celebration of skills, science, and future-ready learning.
          </p>
        </motion.div>

        <StatsCounter variant="about" />

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
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
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
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

        {/* Competition Stages Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Competition Stages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Your journey from registration to international recognition
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12 mb-16">
          {[
            { stage: "Stage 1", title: "Registration & Online Submission", description: "Register for your chosen category and submit your initial ideas, reports, or videos online.", icon: "📝", color: "bg-orange-500", date: "Regsitration Closed" },
            { stage: "Stage 2", title: "Regional Round", description: "Present your projects live at regional centers. Showcase your innovations and compete with local teams.", icon: "🏆", color: "bg-orange-600", date: " Mentioned Below With Complete Details" },
            { stage: "Stage 3", title: "National Finale", description: "Top teams from each region compete at the National Finale. The ultimate showdown with industry leaders in attendance.", icon: "🥇", color: "bg-red-500", date: "January 2026" },
            { stage: "Stage 4", title: "International Round", description: "National winners get the opportunity to represent their country on the global stage!", icon: "🌍", color: "bg-red-600", date: "To Be Announced" },
          ].map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"} gap-8`}
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${stage.color} rounded-full flex items-center justify-center mr-4`}>
                      <span className="text-xl md:text-2xl">{stage.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-orange-500">{stage.stage}</h3>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900">{stage.title}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">{stage.description}</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-orange-700 font-semibold text-sm">📅 {stage.date}</p>
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className={`w-16 h-16 md:w-20 md:h-20 ${stage.color} rounded-full flex items-center justify-center`}>
                  <span className="text-2xl md:text-3xl">{stage.icon}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl"></div>
            <div className="relative orange-accent rounded-2xl p-8 md:p-12 text-center card-shadow-lg border-4 border-orange-200">
              <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-6">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">🗓️ Competition Timeline</h3>
                <p className="text-orange-100 text-lg">Mark your calendars for these important dates!</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3">📝</div>
                  <h4 className="font-bold text-lg mb-2">Registration Closed</h4>
                  <p className="text-orange-100 text-sm">😎</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3">🏆</div>
                  <h4 className="font-bold text-lg mb-2">Regional Rounds</h4>
                  <p className="text-orange-100 text-sm">Mentioned Above With Complete Details</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3">🥇</div>
                  <h4 className="font-bold text-lg mb-2">National Finale</h4>
                  <p className="text-orange-100 text-sm">January 2026</p>
                </motion.div>
              </div>
            </div>
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-orange-500 rounded-lg p-8 text-center card-shadow-lg mb-16"
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
                className="bg-white/10 rounded-lg p-4 flex items-center justify-center text-center"
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
          className="bg-white rounded-lg p-8 card-shadow mb-16"
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-8 card-shadow"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Ecosystem Partner</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sponsor.logo ? (
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={`${sponsor.name} Logo`}
                    width={sponsor.width}
                    height={sponsor.height}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-orange-500 font-bold text-lg text-center">{sponsor.name}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
