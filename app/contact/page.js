import Contact from "../components/Contact"

export const metadata = {
  title: "Contact Us - World Skill Challenge 2025",
  description: "Get in touch with World Skill Challenge 2025. Contact us via email, phone, or send us a message. We're here to help with registration queries, category information, and technical support.",
  keywords: [
    "World Skill Challenge contact",
    "WSC 2025 support",
    "student competition contact",
    "registration help",
    "competition enquiry"
  ].join(", "),
  alternates: {
    canonical: "https://worldskillchallenge.com/contact",
  },
  openGraph: {
    title: "Contact Us - World Skill Challenge 2025",
    description: "Get in touch with World Skill Challenge 2025. We're here to help with your questions.",
    url: "https://worldskillchallenge.com/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - World Skill Challenge 2025",
    description: "Have questions about World Skill Challenge 2025? Contact our team for support.",
  },
}

export default function ContactPage() {
  return <Contact />
}

