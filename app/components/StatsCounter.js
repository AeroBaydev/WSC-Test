"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, School, Users, ChevronRight } from "lucide-react"

const STATS = [
  { value: 1600, suffix: "+", label: "STUDENTS", icon: Users, step: 10 },
  { value: 65, suffix: "+", label: "SCHOOLS", icon: School, step: 1 },
  { label: "INDIA", icon: MapPin, isPanIndia: true },
]

function useCountUp(end, duration, start, step = 1, initial = 1) {
  const [count, setCount] = useState(initial)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start || end === undefined) return

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      const target = end
      const raw = eased * target
      const stepped =
        step > 1 ? Math.round(raw / step) * step : Math.round(raw)
      const next = progress === 1 ? target : Math.min(target, stepped)
      setCount(next)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration, start, step])

  return count
}

function CounterCard({ stat, displayValue, started, tone = "dark", size = "lg" }) {
  const Icon = stat.icon
  const isDark = tone === "dark"
  const cardClass = isDark
    ? "bg-gray-900 border-gray-800 text-white"
    : "bg-white border-gray-200 text-gray-900"
  const iconWrapClass = isDark
    ? "bg-black/40 text-orange-400 border border-gray-800"
    : "bg-orange-100 text-orange-500"
  const subTextClass = isDark ? "text-white" : "text-gray-900"
  const valueClass =
    size === "md"
      ? "text-3xl sm:text-4xl md:text-5xl"
      : "text-4xl sm:text-5xl lg:text-6xl"
  const labelClass = size === "md" ? "text-sm sm:text-base" : "text-base sm:text-lg"

  const hoverTransition = { type: "spring", stiffness: 260, damping: 18 }
  const hoverAnim = {
    y: -6,
    rotateX: 4,
    rotateY: -4,
    boxShadow: isDark
      ? "0 24px 60px rgba(0,0,0,0.45)"
      : "0 24px 60px rgba(0,0,0,0.18)",
  }

  if (stat.isPanIndia) {
    return (
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        whileHover={hoverAnim}
        transition={hoverTransition}
        className={`rounded-2xl border p-6 sm:p-8 shadow-xl ${cardClass} hover:border-orange-200`}
      >
        <div className="flex items-center gap-6">
          <div className={`flex items-center justify-center rounded-2xl w-16 h-16 sm:w-20 sm:h-20 ${iconWrapClass}`}>
            <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2} />
          </div>
          <div className="ml-auto text-right min-w-0">
            <div className={`${valueClass} font-bold leading-none ${subTextClass}`}>
              PAN
            </div>
            <div className={`mt-2 ${labelClass} font-bold uppercase tracking-wider ${subTextClass}`}>
              {stat.label}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      style={{ transformStyle: "preserve-3d" }}
      whileHover={hoverAnim}
      transition={hoverTransition}
      className={`rounded-2xl border p-6 sm:p-8 shadow-xl ${cardClass} hover:border-orange-200`}
    >
      <div className="flex items-center gap-6">
        <div className={`flex items-center justify-center rounded-2xl w-16 h-16 sm:w-20 sm:h-20 ${iconWrapClass}`}>
          <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2} />
        </div>
        <div className="ml-auto text-right min-w-0">
          <div className={`${valueClass} font-bold leading-none tabular-nums ${subTextClass} whitespace-nowrap`}>
            {started ? `${displayValue}${stat.suffix}` : "1"}
          </div>
          <div className={`mt-2 ${labelClass} font-bold uppercase tracking-wider ${subTextClass}`}>
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsCounter({ variant = "home" }) {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const durationMs = 3800
  const studentsCount = useCountUp(1600, durationMs, started, 10, 1)
  const schoolsCount = useCountUp(65, durationMs, started, 1, 1)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.6, rootMargin: "0px 0px -20% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  if (variant === "about") {
    return (
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            WSC 2025 participation snapshot
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            More than <span className="font-semibold">1600+ students</span> from{" "}
            <span className="font-semibold">65+ schools</span> across India participated in World
            Skill Challenge 2025.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {STATS.map((stat) => (
            <CounterCard
              key={stat.label}
              stat={stat}
              displayValue={stat.value === 1600 ? studentsCount : stat.value === 65 ? schoolsCount : 0}
              started={started}
              tone="light"
              size="md"
            />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-top bg-repeat relative overflow-hidden"
      style={{ backgroundImage: "url(/images/stagesbg.jpg)", backgroundSize: "50%" }}
    >
      <div className="absolute inset-0 bg-white/85" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
            WSC 2025 participation
          </h2>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-orange-500 text-orange-600 px-5 py-2.5 text-sm font-semibold hover:bg-orange-500 hover:text-white transition-colors bg-white/80 shadow-sm"
          >
            KNOW MORE
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <CounterCard
              key={stat.label}
              stat={stat}
              displayValue={stat.value === 1600 ? studentsCount : stat.value === 65 ? schoolsCount : 0}
              started={started}
              tone="light"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
