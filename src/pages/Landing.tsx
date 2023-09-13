import About from "../components/About"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Landing = () => {
  return (
    <div className="site-content">
    <Navbar/>

    <Hero/>

    <Features/>

    <About/>

    <Footer/>
  </div>

  )
}

export default Landing
