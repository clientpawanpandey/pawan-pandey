// src/app/page.tsx
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { ServiceLocations } from '@/components/service-locations'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

// Enhanced page-specific metadata
export const metadata = {
  title: "Gorakhpur MSC | Professional Appliance Repair Services | Book Online",
  description: "Book expert appliance repair for fridge, AC, washing machine, microwave in Gorakhpur. Same day service, certified technicians, 100% warranty. Call 7068178070 now!",
  keywords: [
    "gorakhpur msc booking",
    "appliance repair booking gorakhpur", 
    "fridge repair gorakhpur same day",
    "washing machine service gorakhpur urgent",
    "AC repair gorakhpur emergency",
    "microwave service gorakhpur fast",
    "home appliance repair near me",
    "gorakhpur msc contact number",
    "appliance technician gorakhpur certified",
    "machine care services gorakhpur reliable"
  ],
  alternates: {
    canonical: "https://www.gorakhpurservices.in.net/",
  },
  openGraph: {
    title: "Gorakhpur MSC - Book Professional Appliance Repair Online", 
    description: "Fast, reliable appliance repair services in Gorakhpur. Same day service for all major brands.",
    images: [
      {
        url: "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg",
        width: 1200,
        height: 630,
        alt: "Gorakhpur MSC Appliance Repair"
      }
    ],
  }
};

export default function Home() {
  return (
    <>
      {/* SEO-friendly semantic markup */}
      <main role="main">
        <Header />
        <Hero />
        <About />
        <Services />
        <ServiceLocations />
        <Contact />
        <Footer />
      </main>
      
      {/* Additional structured data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What appliance repair services does Gorakhpur MSC provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gorakhpur MSC provides professional repair services for refrigerators, washing machines, microwaves, and air conditioners. We offer same-day service with certified technicians."
                }
              },
              {
                "@type": "Question", 
                "name": "How can I book appliance repair service in Gorakhpur?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book our services by calling 7068178070, WhatsApp, or through our online contact form. We provide quick response within 2 hours."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide warranty on appliance repairs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide 100% warranty on all repair services. Our certified technicians ensure quality work with genuine parts."
                }
              }
            ]
          }),
        }}
      />
    </>
  );
}
