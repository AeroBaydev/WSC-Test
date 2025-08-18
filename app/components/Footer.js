"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/wsc-logo.png"
                alt="World Skill Challenge Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h3 className="text-xl font-bold text-gray-900">World Skill Challenge</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Crafting Champions of Tomorrow through innovation, teamwork, and real-world problem solving.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#categories" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#stages" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Stages
                </a>
              </li>
              <li>
                <a href="#register" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 worldskillchallenge@gmail.com</p>
              <p>📞 +91 9266300825</p>
              <p>📅 Registration: 30th August 2025 (Tentative)</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">© 2025 World Skill Challenge. All rights reserved.</p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-orange-500 text-sm font-semibold">Sponsored by:</p>
              <div className="flex items-center space-x-6">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image
                    src="/images/aerobay-logo.png"
                    alt="AeroBay Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image
                    src="/images/stemed-logo.png"
                    alt="STEM Educational Research Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
