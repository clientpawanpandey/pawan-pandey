// src/app/page.tsx
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { ServiceLocations } from '@/components/service-locations'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

// This meta info is optional if handled globally in layout.tsx, but can be added for page-specific SEO
export const metadata = {
  title: "Fridge, AC, Washing Machine Repair in Gorakhpur | Service Near Me",
  description: "Book expert appliance repair for fridge, AC, washing machine, and more in Gorakhpur. Fast service, all brands, all locations.",
  keywords: [
    "fridge repair gorakhpur",
    "fridge service near me",
    "AC repair gorakhpur",
    "washing machine repair near me",
    "microwave service gorakhpur",
    "home appliance service",
    "emergency technician",
    "machine care gorakhpur"
  ]
};

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
  );
}
