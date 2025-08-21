// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gorakhpur MSC | Machine Care Services | Appliance Repair Near Me",
  description: "Professional appliance repair, installation and maintenance services for refrigerators, washing machines, microwaves, and air conditioners in Gorakhpur and major cities. Book expert technician today!",
  keywords: [
    "Gorakhpur MSC",
    "Gorakhpur Machine Care Services", 
    "appliance repair gorakhpur",
    "fridge repair gorakhpur",
    "refrigerator service gorakhpur",
    "washing machine repair gorakhpur",
    "microwave repair gorakhpur",
    "AC repair gorakhpur",
    "home appliance service",
    "appliance technician gorakhpur",
    "machine care services gorakhpur",
    "emergency appliance repair",
    "same day appliance service",
    "local appliance repair near me",
    "gorakhpur services MSC",
    "MSC gorakhpur contact",
    "appliance installation gorakhpur",
    "refrigerator installation gorakhpur",
    "AC installation gorakhpur",
    "washing machine installation",
    "microwave service center gorakhpur"
  ],
  authors: [{ name: "Gorakhpur MSC Team" }],
  creator: "Gorakhpur Machine Care Services",
  publisher: "Gorakhpur MSC",
  category: "Home Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Gorakhpur MSC - Machine Care Services | Expert Appliance Repair",
    description: "Fast, professional appliance repair services in Gorakhpur. Book fridge, washing machine, microwave, and AC repair online. Same day service available!",
    url: "https://www.gorakhpurservices.in.net/",
    siteName: "Gorakhpur Machine Care Services (MSC)",
    images: [
      {
        url: "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg",
        width: 1200,
        height: 630,
        alt: "Gorakhpur MSC Appliance Repair Services"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorakhpur MSC - Professional Appliance Repair Services",
    description: "Book expert appliance repair in Gorakhpur. Fridge, AC, microwave, washing machine service near you. Same day service!",
    images: ["https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg"],
  },
  alternates: {
    canonical: "https://www.gorakhpurservices.in.net/",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enhanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href="https://www.gorakhpurservices.in.net/" />
        <meta name="author" content="Gorakhpur MSC Team" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Gorakhpur" />
        <meta name="geo.position" content="26.7606;83.3732" />
        <meta name="ICBM" content="26.7606, 83.3732" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg" as="image" />
        
        {/* Enhanced Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gorakhpur Machine Care Services (MSC)",
              "alternateName": ["Gorakhpur MSC", "Machine Care Services Gorakhpur"],
              "url": "https://www.gorakhpurservices.in.net/",
              "telephone": "+91-7068178070",
              "email": "contact@gorakhpurservices.in.net",
              "logo": "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg",
              "image": [
                "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg",
                "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/refrigeratorlanscape.jpg",
                "https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/washingmachinemobile.jpg"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gorakhpur",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN",
                "postalCode": "273001"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.7606,
                "longitude": 83.3732
              },
              "description": "Professional appliance repair and maintenance services in Gorakhpur. Specializing in refrigerator, washing machine, microwave, and AC repair with same-day service.",
              "priceRange": "₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": "Cash, UPI, Card",
              "openingHours": "Mo-Su 24:00",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.7606,
                  "longitude": 83.3732
                },
                "geoRadius": 50000
              },
              "areaServed": [
                "Gorakhpur", "Lucknow", "Varanasi", "Pune", "Mumbai", "Delhi NCR", 
                "Bangalore", "Surat", "Ahmedabad", "Rajkot", "Kolkata", "Chennai", 
                "Hyderabad", "Indore", "Kanpur", "Thane", "Pimpri Chinchwad"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Appliance Repair Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Refrigerator Repair Service",
                      "description": "Professional refrigerator and fridge repair services"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Washing Machine Repair Service",
                      "description": "Expert washing machine repair and maintenance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Microwave Repair Service",
                      "description": "Professional microwave oven repair services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Air Conditioner Repair Service", 
                      "description": "AC repair, installation and maintenance services"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Satisfied Customer"
                  },
                  "reviewBody": "Excellent service for refrigerator repair. Quick response and professional work."
                }
              ]
            }),
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.gorakhpurservices.in.net/"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Services",
                  "item": "https://www.gorakhpurservices.in.net/#services"
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
