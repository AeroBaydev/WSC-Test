import Navbar from "../components/Navbar"
import Updates from "../components/Updates"
import Footer from "../components/Footer"

export const metadata = {
  alternates: {
    canonical: "https://wsc-test.vercel.app/updates",
  },
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Updates />
      <Footer />
    </div>
  )
}
