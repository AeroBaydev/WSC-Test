"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} World Skill Challenge. All rights reserved.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm text-gray-700 p-0 h-auto">
                    Terms & Conditions
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>World Skill Challenge — Terms & Conditions</DialogTitle>
                    <DialogDescription className="sr-only">
                      Please review the terms and conditions for participation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto space-y-5 text-sm text-gray-700 leading-6">
                    <section>
                      <h3 className="font-semibold mb-1">1. Definitions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Organizer</strong>: the entity conducting the World Skill Challenge (WSC).
                        </li>
                        <li>
                          <strong>Participant</strong>: any student or team registering to compete in WSC.
                        </li>
                        <li>
                          <strong>Category/Categories</strong>: competition areas offered (e.g., Robotics, Aeromodelling, Design Thinking).
                        </li>
                        <li>
                          <strong>Entry Fee</strong>: the registration fee paid as per category requirements.
                        </li>
                        <li>
                          <strong>Intellectual Property (IP)</strong>: ideas, designs, code, inventions, prototypes, videos, documentation, etc., submitted in the competition.
                        </li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">2. Eligibility</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Participants must fall into one of the designated age/grade categories (Primary, Junior, Senior).</li>
                        <li>Must comply with all category requirements (team size, mentor, materials, etc.).</li>
                        <li>Participation is void where prohibited by law.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">3. Registration & Fees</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Registration must be completed via the official WSC website by the stated deadline.</li>
                        <li>Payment of the applicable entry fee is necessary for registration to be valid.</li>
                        <li>Fees are non-refundable.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">4. Submission Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Participants must follow all guidelines for submissions (dimensions, formats, materials, deadlines).</li>
                        <li>Late submissions may be disqualified or penalized.</li>
                        <li>All submissions must be authentic and original (no plagiarism or copying).</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">5. Competition Process</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>The Organizer reserves the right to modify or cancel stages of the competition if required.</li>
                        <li>Decisions of judging panels are final and binding.</li>
                        <li>Participants must follow all conduct rules: respectful behavior, safety, fairness, no cheating.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">6. Prizes & Recognition</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Prizes (cash, trophies, certificates, etc.) will be awarded as described on the official website.</li>
                        <li>Winners are responsible for any applicable taxes on prizes.</li>
                        <li>The Organizer may use photos, videos, names, and project summaries of winners for promotional purposes.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">7. Intellectual Property</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Participants retain ownership of their creations unless otherwise agreed.</li>
                        <li>By entering, participants grant the Organizer a royalty-free license to use submitted materials for promotional, educational, or marketing purposes.</li>
                        <li>Participants warrant that their work is original and does not infringe third-party rights.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">8. Use of Materials & Equipment</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>If provided by the Organizer, participants must use equipment/materials as instructed and return any borrowed items in good condition.</li>
                        <li>If participants bring their own equipment, they bear liability for loss or damage.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">9. Safety & Liability</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Participants must comply with all safety instructions, venue rules, and laws.</li>
                        <li>The Organizer will take reasonable safety measures, but participants assume the risk of injury during hands‑on activities.</li>
                        <li>The Organizer is not liable for personal injury, loss, or property damage beyond what is required by law.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">10. Cancellation & Changes</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>The Organizer reserves the right to cancel, postpone, or modify rules/categories with prior notice.</li>
                        <li>In case of cancellation, the Organizer may offer refunds, credits, or alternate arrangements at its discretion.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">11. Privacy & Data Protection</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Personal data (name, contact info, school, age/grade) will be collected for administration and communication.</li>
                        <li>Data will not be shared with third parties except as required for operations or by law.</li>
                        <li>Photos/videos taken during the event may be used for marketing, with consent implied by registration.</li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="font-semibold mb-1">12. Disqualification</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>The Organizer may disqualify any participant who violates rules, plagiarizes, cheats, or fails to meet requirements.</li>
                        <li>Disqualified participants may forfeit awards or prizes.</li>
                      </ul>
                    </section>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

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
