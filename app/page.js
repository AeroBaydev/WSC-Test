import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import ExperienceX from "./components/ExperienceX"
import SoarFest from "./components/SoarFest"
// import Marketplace from "./components/MarketPlace"
import Stages from "./components/Stages"
import Register from "./components/Register"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export const metadata = {
  alternates: {
    canonical: "https://wsc-test.vercel.app/",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wsc-test.vercel.app/#organization",
      name: "World Skill Challenge",
      url: "https://wsc-test.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://wsc-test.vercel.app/images/wsc-logo.png",
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
      "@id": "https://wsc-test.vercel.app/#event",
      name: "World Skill Challenge 2025",
      description:
        "Crafting Champions of Tomorrow. A national and international skill hunt for students across age groups.",
      startDate: "2025-08-30T09:00:00+05:30",
      endDate: "2025-12-20T18:00:00+05:30",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      performer: {
        "@id": "https://wsc-test.vercel.app/#organization",
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
        "@id": "https://wsc-test.vercel.app/#organization",
      },
      offers: [
        {
          "@type": "Offer",
          name: "IDEA IGNITE",
          price: "0",
          priceCurrency: "INR",
          description: "Research-Based Individual Competition - Price to be announced soon",
          url: "https://wsc-test.vercel.app/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "MYSTERY MAKERS",
          price: "0",
          priceCurrency: "INR",
          description: "STEAM + Kit-Based Team Competition - Price to be announced soon",
          url: "https://wsc-test.vercel.app/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "TECH FOR GOOD",
          price: "0",
          priceCurrency: "INR",
          description: "Robotics Team Competition - Price to be announced soon",
          url: "https://wsc-test.vercel.app/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "TECH THROTTLE",
          price: "0",
          priceCurrency: "INR",
          description: "Gaming - RC Cars + BattleBots - Price to be announced soon",
          url: "https://wsc-test.vercel.app/#register",
          validFrom: "2025-07-01T09:00:00+05:30",
          availability: "https://schema.org/InStock",
        },
      ],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      image: "https://wsc-test.vercel.app/images/wsc-logo.png",
      url: "https://wsc-test.vercel.app",
    },
    {
      "@type": "WebSite",
      "@id": "https://wsc-test.vercel.app/#website",
      url: "https://wsc-test.vercel.app",
      name: "World Skill Challenge 2025",
      description: "National & International Skill Hunt for Young Innovators",
      publisher: {
        "@id": "https://wsc-test.vercel.app/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://wsc-test.vercel.app/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <section id="experiencex">
          <ExperienceX />
        </section>
        <SoarFest />
        {/* <Marketplace /> */}
        <Stages />
        <Register />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
