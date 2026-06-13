import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import Shop from '../components/Shop'
import Booking from '../components/Booking'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Pricing />
      <Shop />
      <Booking />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home