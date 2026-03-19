import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Partners from '@/components/Partners'
import About from '@/components/About'
import ContactSection from '@/components/ContactSection'
import Announcements from '@/components/Announcements'

export default function Home() {
  return (
    <>
      <Header />
      <Announcements />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Partners />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
