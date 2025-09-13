"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt="Tech Innovation Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-shrink-0"
          >
            <Image
              src="/images/wsc-logo.png"
              alt="World Skill Challenge Logo"
              width={300}
              height={300}
              className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
            />
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              World Skill Challenge 2025
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-500 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Crafting Champions of Tomorrow
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              A national and international skill hunt for students across age groups, blending innovation, teamwork, and
              real-world problem solving. Compete in exciting categories with cash prizes up to ₹1-Lakh!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.a
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Register Now
              </motion.a>
              <motion.a
                href="#experiencex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Categories
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
