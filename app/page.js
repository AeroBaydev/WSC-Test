"use client"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Categories from "./components/Categories"
import Stages from "./components/Stages"
import Register from "./components/Register"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Stages />
      <Register />
      <Contact />
      <Footer />
    </div>
  )
}
