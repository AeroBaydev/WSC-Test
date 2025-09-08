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
      "@id": "https://worldskillchallenge.com/#organization",
      name: "World Skill Challenge",
      url: "https://worldskillchallenge.com",
      logo: {
        "@type": "ImageObject",
        url: "https://worldskillchallenge.com/images/wsc-logo.png",
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
      "@id": "https://worldskillchallenge.com/#event",
      name: "World Skill Challenge 2025",
      description:
        "Crafting Champions of Tomorrow. A national and international skill hunt for students across age groups.",
      startDate: "2025-08-30T09:00:00+05:30",
      endDate: "2025-12-20T18:00:00+05:30",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      performer: {
        "@id": "https://worldskillchallenge.com/#organization",
      },
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
        "@id": "https://worldskillchallenge.com/#organization",
      },
      offers: [
        {
          "@type": "Offer",
          name: "IDEA IGNITE",
          price: "0",
          priceCurrency: "INR",
          description: "Research-Based Individual Competition - Price to be announced soon",
          url: "https://worldskillchallenge.com/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "MYSTERY MAKERS",
          price: "0",
          priceCurrency: "INR",
          description: "STEAM + Kit-Based Team Competition - Price to be announced soon",
          url: "https://worldskillchallenge.com/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "TECH FOR GOOD",
          price: "0",
          priceCurrency: "INR",
          description: "Robotics Team Competition - Price to be announced soon",
          url: "https://worldskillchallenge.com/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "TECH THROTTLE",
          price: "0",
          priceCurrency: "INR",
          description: "Gaming - RC Cars + BattleBots - Price to be announced soon",
          url: "https://worldskillchallenge.com/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
      ],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      image: "https://worldskillchallenge.com/images/wsc-logo.png",
      url: "https://worldskillchallenge.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://worldskillchallenge.com/#website",
      url: "https://worldskillchallenge.com",
      name: "World Skill Challenge 2025",
      description: "National & International Skill Hunt for Young Innovators",
      publisher: {
        "@id": "https://worldskillchallenge.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://worldskillchallenge.com/?s={search_term_string}",
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
