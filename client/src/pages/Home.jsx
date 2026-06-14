import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Portfolio from '../components/Portfolio/Portfolio'
import Services from '../components/Services/Services'
import Pricing from '../components/Pricing/Pricing'
import Shop from '../components/Shop/Shop'
import Booking from '../components/Booking/Booking'
import Testimonials from '../components/Testimonials/Testimonials'
import Footer from '../components/Footer/Footer'

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