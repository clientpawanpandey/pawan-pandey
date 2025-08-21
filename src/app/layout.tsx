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
  title: "Gorakhpur - Machine Care Services | Appliance, Fridge, AC, Washing Machine Repair",
  description: "Professional machine and appliance care. Services include fridge repair, AC service, washing machine and microwave maintenance. Fast, reliable service – Gorakhpur and major cities.",
  keywords: [
    "gorakhpur services",
    "appliance repair gorakhpur",
    "fridge repair near me",
    "fridge service gorakhpur",
    "refrigerator installation gorakhpur",
    "washing machine repair gorakhpur",
    "microwave repair gorakhpur",
    "AC repair gorakhpur",
    "home appliance service india",
    "machine care services",
    "service booking gorakhpur",
    "appliance technician gorakhpur",
    "service locations",
    "urgent appliance repair",
    "local appliance service",
    "fridge technician gorakhpur",
    "AC service near me",
    "microwave service gorakhpur",
    "refrigerator technician gorakhpur"
  ],
  openGraph: {
    title: "Gorakhpur - Machine Care Services",
    description: "Fast, professional appliance repair services in Gorakhpur. Book fridge, washing machine, microwave, and AC repair online.",
    url: "https://www.gorakhpurservices.in.net/",
    siteName: "Gorakhpur Machine Care Services",
    images: [
      { url: "https://www.gorakhpurservices.in.net/og-image.jpg", width: 1200, height: 630 }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorakhpur - Machine Care Services",
    description: "Book professional appliance repair in Gorakhpur. Fridge, AC, microwave, washing machine service near you.",
    images: ["https://www.gorakhpurservices.in.net/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Extra meta tags for SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.gorakhpurservices.in.net/" />
        <meta name="author" content="Gorakhpur Services" />
        {/* Schema.org for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gorakhpur Machine Care Services",
              "url": "https://www.gorakhpurservices.in.net/",
              "telephone": "7068178070",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gorakhpur",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "India"
              },
              "description": "Professional appliance repair and service booking in Gorakhpur.",
              "areaServed": ["Gorakhpur", "Lucknow", "Varanasi", "Pune", "Mumbai", "Delhi", "Bangalore", "Surat", "Ahmedabad", "Rajkot", "Kolkata", "Chennai", "Gorakhpur", "Hyderabad", "Indore", "Kanpur"]
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
