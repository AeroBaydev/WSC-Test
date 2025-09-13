"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-14 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
          {/* Brand */}
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
              <h3 className="text-xl font-bold">World Skill Challenge</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Crafting Champions of Tomorrow through innovation, teamwork, and real-world problem solving.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Categories", "Stages", "Register", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📧 info@worldskillchallenge.com</li>
              <li>📞 +91 9266300825</li>
              <li>📅 Registration Opens: 4th Oct 2025</li>
            </ul>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Our Offices</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 HQ: 1606, Silver Tower, Business Bay, Dubai</li>
              <li>📍 India: E-14, Noida Sector 63, U.P.</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} World Skill Challenge. All rights reserved.
            </p>

            {/* Sponsors */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span className="text-orange-500 text-sm font-semibold">Sponsored by:</span>
              <div className="flex items-center gap-6 flex-wrap justify-center">
                {[
                  { src: "/images/stemed-logo.png", alt: "STEM Educational Research" },
                  { src: "/images/AMAILOGO.png", alt: "Aero Modellers Association of India" },
                  { src: "/images/NSDCLOGO.png", alt: "NSDC" },
                  { src: "/images/skillindialogo.png", alt: "Skill India" },
                ].map((sponsor, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.08 }}>
                    <Image
                      src={sponsor.src}
                      alt={sponsor.alt}
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
