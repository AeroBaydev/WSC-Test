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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://world-skill-challenge.vercel.app/#organization",
      name: "World Skill Challenge",
      url: "https://world-skill-challenge.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://world-skill-challenge.vercel.app/images/wsc-logo.png",
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9266300825",
        contactType: "customer service",
        email: "worldskillchallenge@gmail.com",
      },
    },
    {
      "@type": "Event",
      "@id": "https://world-skill-challenge.vercel.app/#event",
      name: "World Skill Challenge 2025",
      description:
        "Crafting Champions of Tomorrow. A national and international skill hunt for students across age groups.",
      startDate: "2025-08-30",
      endDate: "2025-12-20",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Regional Centers",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
        },
        {
          "@type": "Place",
          name: "National Finale",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
        },
      ],
      organizer: {
        "@id": "https://world-skill-challenge.vercel.app/#organization",
      },
      offers: [
        {
          "@type": "Offer",
          name: "IDEA IGNITE",
          price: "399",
          priceCurrency: "INR",
          description: "Research-Based Individual Competition",
          url: "https://world-skill-challenge.vercel.app/#register",
        },
        {
          "@type": "Offer",
          name: "MYSTERY MAKERS",
          price: "1499",
          priceCurrency: "INR",
          description: "STEAM + Kit-Based Team Competition",
          url: "https://world-skill-challenge.vercel.app/#register",
        },
        {
          "@type": "Offer",
          name: "TECH FOR GOOD",
          price: "1999",
          priceCurrency: "INR",
          description: "Robotics Team Competition",
          url: "https://world-skill-challenge.vercel.app/#register",
        },
        {
          "@type": "Offer",
          name: "TECH THROTTLE",
          price: "3599",
          priceCurrency: "INR",
          description: "Gaming - RC Cars + BattleBots",
          url: "https://world-skill-challenge.vercel.app/#register",
        },
      ],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      image: "https://world-skill-challenge.vercel.app/images/wsc-logo.png",
      url: "https://world-skill-challenge.vercel.app",
    },
    {
      "@type": "WebSite",
      "@id": "https://world-skill-challenge.vercel.app/#website",
      url: "https://world-skill-challenge.vercel.app",
      name: "World Skill Challenge 2025",
      description: "National & International Skill Hunt for Young Innovators",
      publisher: {
        "@id": "https://world-skill-challenge.vercel.app/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://world-skill-challenge.vercel.app/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
  ],
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
