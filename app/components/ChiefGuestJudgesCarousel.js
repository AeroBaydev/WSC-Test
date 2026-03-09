"use client"

import Image from "next/image"
import { useMemo } from "react"

export default function ChiefGuestJudgesCarousel() {
  const slides = useMemo(
    () => [
      { src: "/images/cg1.jpg.jpeg", alt: "Chief Guest - WSC", tag: "Chief Guest" },
      { src: "/images/judge1.jpeg", alt: "Judge 1 - WSC", tag: "Judge" },
      { src: "/images/judge2.jpeg", alt: "Judge 2 - WSC", tag: "Judge" },
      { src: "/images/judge3.jpeg", alt: "Judge 3 - WSC", tag: "Judge" },
    ],
    []
  )

  return (
    <div className="mt-10">
      <div className="text-center mb-6">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider">
          Chief Guest & Judges
        </span>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Highlights from WSC Season 2025.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-300 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {slides.map((slide) => (
            <div key={slide.src} className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs mx-auto h-[260px] sm:h-[280px] md:h-[300px] bg-white">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                {slide.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

