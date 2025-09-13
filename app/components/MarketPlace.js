// "use client";
// import { motion } from "framer-motion";

// const items = [
//   {
//     name: "Robotic Box",
//     description: "A complete robotics starter kit.",
//     price: "2,999",
//   },
//   {
//     name: "Balsa Glider",
//     description: "Lightweight glider for aeromodelling.",
//     price: "999",
//   },
//   {
//     name: "3D Plane",
//     description: "Advanced 3D aerobatic plane.",
//     price: "14,999",
//   },
//   {
//     name: "AV1 Plane",
//     description: "High-performance AV1 model plane.",
//     price: "12,999",
//   },
//   {
//     name: "Pocket Drone",
//     description: "Compact drone for beginners.",
//     price: "7,999",
//   },
//   {
//     name: "Quadcopter with Naza Controller",
//     description: "Professional quadcopter kit.",
//     price: "36,999",
//   },
// ];

// export default function MarketPlace() {
//   return (
//     <section id="MarketPlace" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
//             Maker’s Market
//           </h2>
//           <p className="text-lg text-orange-600 font-semibold mb-4">
//             We will sold it! Create, share, and empower.
//           </p>
//           <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-2">
//             At World Skill Challenge, we believe that innovation isn’t just
//             about showcasing ideas — it’s about creating, sharing, and
//             empowering. To support makers, tinkerers, and young innovators, we
//             are excited to launch the Maker’s Market — a dedicated marketplace
//             for selling & buying STEM, robotics, aeromodelling, drone-kit gear,
//             and more.
//           </p>
//         </motion.div>
//         <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
//           {items.map((item, idx) => (
//             <motion.div
//               key={item.name}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1.03, y: -5 }}
//               className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
//             >
//               <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
//               <div className="p-6 flex flex-col flex-1">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {item.name}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//                 <div className="mt-auto">
//                   <p className="font-bold text-orange-600 mb-2">
//                     Price: ₹{item.price}
//                   </p>
//                   <a
//                     href="#"
//                     className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold text-base w-full block text-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow"
//                   >
//                     Buy Now
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <br /> <br />
//         <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
//           Maker’s Market is an online marketplace integrated into the WSC
//           platform where participants, alumni, educators, and
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suppliers
//           can offer maker gear, kits, components, and educational tools.
//         </p>
//       </div>
//     </section>
//   );
// }
