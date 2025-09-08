import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "World Skill Challenge 2025 - Crafting Champions of Tomorrow | National & International Competition",
  description:
    "Join World Skill Challenge 2025! National & international skill hunt for students. Compete in IDEA IGNITE, MYSTERY MAKERS, TECH FOR GOOD, TECH THROTTLE. Cash prizes up to ₹1-Lakh! Register now.",
  keywords: [
    "World Skill Challenge 2025",
    "student competition India",
    "robotics competition",
    "national competition students",
    "international competition",
    "IDEA IGNITE",
    "MYSTERY MAKERS",
    "TECH FOR GOOD",
    "TECH THROTTLE",
    "student innovation contest",
    "school competition",
    "cash prizes students",
    "robotics contest India",
    "RC car competition",
    "BattleBot competition",
    "research competition students",
    "engineering competition",
    "technology competition",
  ].join(", "),
  publisher: "World Skill Challenge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/images/wsc-logo.png" />
          <link rel="shortcut icon" href="/images/wsc-logo.png" />
          <link rel="apple-touch-icon" href="/images/wsc-logo.png" />
          <meta name="theme-color" content="#ff6b35" />
          <meta name="msapplication-TileColor" content="#ff6b35" />
          <meta name="msapplication-TileImage" content="/images/wsc-logo.png" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
