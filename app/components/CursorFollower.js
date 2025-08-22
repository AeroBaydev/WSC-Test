// "use client"
// import { useEffect, useState } from "react"
// import { motion, useMotionValue, useSpring } from "framer-motion"

// export default function CursorFollower() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
//   const [smokeTrails, setSmokeTrails] = useState([])
//   const [isMoving, setIsMoving] = useState(false)
//   const [lastMoveTime, setLastMoveTime] = useState(Date.now())

//   const cursorX = useMotionValue(0)
//   const cursorY = useMotionValue(0)

//   const springConfig = { damping: 25, stiffness: 700 }
//   const cursorXSpring = useSpring(cursorX, springConfig)
//   const cursorYSpring = useSpring(cursorY, springConfig)

//   const createSmokeTrail = (x, y) => {
//     const newSmoke = {
//       id: Date.now() + Math.random(),
//       x: x + 35, // adjusted smoke position for new robot placement (20px below, 15px to the right)
//       y: y + 60,
//       createdAt: Date.now(),
//     }
//     setSmokeTrails((prev) => [...prev.slice(-8), newSmoke])
//   }

//   useEffect(() => {
//     setWindowSize({ width: window.innerWidth, height: window.innerHeight })

//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight })
//     }

//     const handleMouseMove = (e) => {
//       cursorX.set(e.clientX + 15) // position robot 15px to the right of cursor
//       cursorY.set(e.clientY + 20) // position robot 20px below cursor tip
//       setIsVisible(true)

//       setIsMoving(true)
//       setLastMoveTime(Date.now())

//       if (Math.random() > 0.7) {
//         createSmokeTrail(e.clientX + 15, e.clientY + 20) // updated smoke trail coordinates to match new robot position
//       }
//     }

//     const handleMouseLeave = () => {
//       setIsVisible(false)
//     }

//     const checkMovement = setInterval(() => {
//       if (Date.now() - lastMoveTime > 1000) {
//         setIsMoving(false)
//       }
//     }, 100)

//     window.addEventListener("mousemove", handleMouseMove)
//     window.addEventListener("mouseleave", handleMouseLeave)
//     window.addEventListener("resize", handleResize)

//     const smokeCleanup = setInterval(() => {
//       setSmokeTrails((prev) => prev.filter((smoke) => Date.now() - smoke.createdAt < 5000))
//     }, 1000)

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//       window.removeEventListener("mouseleave", handleMouseLeave)
//       window.removeEventListener("resize", handleResize)
//       clearInterval(smokeCleanup)
//       clearInterval(checkMovement)
//     }
//   }, [cursorX, cursorY, lastMoveTime])

//   if (windowSize.width < 768) return null

//   return (
//     <>
//       {smokeTrails.map((smoke) => {
//         const age = Date.now() - smoke.createdAt
//         const opacity = Math.max(0, 1 - age / 5000)
//         const scale = 0.5 + age / 10000

//         return (
//           <motion.div
//             key={smoke.id}
//             className="fixed pointer-events-none z-40"
//             style={{
//               left: smoke.x,
//               top: smoke.y,
//             }}
//             initial={{ opacity: 0.6, scale: 0.3 }}
//             animate={{
//               opacity: opacity * 0.4,
//               scale: scale,
//               y: smoke.y - age / 50,
//             }}
//             transition={{ duration: 0.5 }}
//           >
//             <div
//               className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 blur-sm"
//               style={{
//                 background: `radial-gradient(circle, rgba(200,200,200,${opacity * 0.6}) 0%, rgba(150,150,150,${opacity * 0.3}) 50%, transparent 100%)`,
//               }}
//             />
//           </motion.div>
//         )
//       })}

//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-50"
//         style={{
//           x: cursorXSpring,
//           y: cursorYSpring,
//         }}
//         animate={{
//           opacity: isVisible ? 0.9 : 0,
//           scale: isVisible ? 1 : 0.8,
//         }}
//         transition={{
//           opacity: { duration: 0.2 },
//           scale: { duration: 0.2 },
//         }}
//       >
//         <div className="relative w-16 h-20">
//           {/* Robot Head */}
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg border-2 border-slate-500 shadow-lg">
//             {/* Antenna */}
//             <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-slate-600 rounded-full">
//               <motion.div
//                 className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
//                 animate={{ opacity: [1, 0.3, 1], boxShadow: ["0 0 4px #22d3ee", "0 0 8px #22d3ee", "0 0 4px #22d3ee"] }}
//                 transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//               />
//             </div>

//             {/* Eyes */}
//             <div className="absolute top-2 left-2 flex space-x-2">
//               <motion.div
//                 className="w-2 h-2 bg-cyan-300 rounded-full border border-cyan-500 shadow-inner"
//                 animate={{
//                   scaleY: isMoving ? 1 : 0.1,
//                   backgroundColor: isMoving ? "#67e8f9" : "#0891b2",
//                   boxShadow: isMoving ? "0 0 4px #22d3ee" : "inset 0 1px 2px rgba(0,0,0,0.3)",
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.div
//                 className="w-2 h-2 bg-cyan-300 rounded-full border border-cyan-500 shadow-inner"
//                 animate={{
//                   scaleY: isMoving ? 1 : 0.1,
//                   backgroundColor: isMoving ? "#67e8f9" : "#0891b2",
//                   boxShadow: isMoving ? "0 0 4px #22d3ee" : "inset 0 1px 2px rgba(0,0,0,0.3)",
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </div>

//             {/* Mouth */}
//             <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-slate-700 rounded-full shadow-inner" />
//           </div>

//           {/* Robot Body */}
//           <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-slate-200 to-slate-300 rounded border-2 border-slate-400 shadow-md">
//             {/* Chest Panel */}
//             <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-slate-800 rounded border border-slate-600 shadow-inner">
//               <motion.div
//                 className="absolute top-1 left-1 w-1 h-1 bg-emerald-400 rounded-full shadow-lg"
//                 animate={{ opacity: [1, 0.5, 1], boxShadow: ["0 0 2px #34d399", "0 0 4px #34d399", "0 0 2px #34d399"] }}
//                 transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//               />
//               <motion.div
//                 className="absolute top-1 right-1 w-1 h-1 bg-red-400 rounded-full shadow-lg"
//                 animate={{
//                   opacity: [0.5, 1, 0.5],
//                   boxShadow: ["0 0 2px #f87171", "0 0 4px #f87171", "0 0 2px #f87171"],
//                 }}
//                 transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//               />
//               <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-slate-500 rounded shadow-inner" />
//             </div>
//           </div>

//           {/* Arms */}
//           <motion.div
//             className="absolute top-9 left-0 w-2 h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded border border-slate-500 shadow-sm"
//             animate={{ rotate: isMoving ? [-5, 5, -5] : 0 }}
//             transition={{ duration: 0.5, repeat: isMoving ? Number.POSITIVE_INFINITY : 0 }}
//           />
//           <motion.div
//             className="absolute top-9 right-0 w-2 h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded border border-slate-500 shadow-sm"
//             animate={{ rotate: isMoving ? [5, -5, 5] : 0 }}
//             transition={{ duration: 0.5, repeat: isMoving ? Number.POSITIVE_INFINITY : 0 }}
//           />

//           {/* Legs */}
//           <div className="absolute bottom-0 left-2 w-2 h-4 bg-gradient-to-b from-slate-400 to-slate-500 rounded border border-slate-600 shadow-sm" />
//           <div className="absolute bottom-0 right-2 w-2 h-4 bg-gradient-to-b from-slate-400 to-slate-500 rounded border border-slate-600 shadow-sm" />
//         </div>
//       </motion.div>
//     </>
//   )
// }
