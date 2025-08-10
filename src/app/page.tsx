import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { ServiceLocations } from '@/components/service-locations'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <ServiceLocations />
      <Contact />
      <Footer />
    </main>
  )
}
