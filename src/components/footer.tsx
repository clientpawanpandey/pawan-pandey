'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Star, Clock, Shield, Wrench, Mail, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export function Footer() {
  const services = [
    'Refrigerator Repair & Installation',
    'Washing Machine Service & Maintenance',
    'Microwave Oven Repair',
    'Air Conditioner Service & Gas Filling',
  ]

  const features = [
    { icon: Star, text: '5+ Years Experience', color: 'text-yellow-500' },
    { icon: Clock, text: '24/7 Emergency Service', color: 'text-blue-500' },
    { icon: Shield, text: '100% Warranty', color: 'text-green-500' },
    { icon: Wrench, text: 'Expert Technicians', color: 'text-purple-500' },
  ]

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Our Services' },
    { href: '#contact', label: 'Contact Us' },
  ]

  return (
    <footer className="bg-gradient-to-br from-muted via-muted/90 to-muted/80 border-t border-primary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Wrench className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground">Gorakhpur Services</h3>
                  <Badge variant="secondary" className="text-xs font-medium">Machine Care Services</Badge>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Your trusted partner for all home appliance repairs, installation, and maintenance services. 
                Professional quality service since 2019 with guaranteed customer satisfaction.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-foreground font-semibold">7068178070</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-muted-foreground">WhatsApp Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Our Services */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-foreground mb-4 flex items-center">
                <Wrench className="h-5 w-5 text-primary mr-2" />
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm group">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span>{service}</span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-primary/30 hover:bg-primary/10 text-xs"
                  onClick={() => {
                    const servicesSection = document.getElementById('services')
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                >
                  View All Services
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-foreground mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Why Choose Us
              </h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-pointer">
                    <div className="w-8 h-8 bg-muted-foreground/10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Quick Links */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm flex items-center group"
                      >
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mr-3 group-hover:bg-primary group-hover:scale-150 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                <h5 className="font-semibold text-foreground">Get In Touch</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span>Local & Surrounding Areas</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>24/7 Emergency Available</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-lg text-xs font-semibold"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/917068178070?text=Hi, I need appliance service`, '_blank')}
                >
                  <MessageCircle className="mr-2 h-3 w-3" />
                  WhatsApp Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Emergency Contact */}
        <div className="py-6 border-t border-b border-primary/10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="destructive" className="bg-red-600 animate-pulse">
                  Emergency 24/7
                </Badge>
                <span className="font-semibold text-foreground">7068178070</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="secondary">Licensed & Insured</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="outline">Same Day Service</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                &copy; 2025 Gorakhpur - Machine Care Services. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Professional appliance repair services with guaranteed satisfaction
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Quality Service</span>
                <span>•</span>
                <span>Expert Technicians</span>
                <span>•</span>
                <span>100% Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-foreground">4.9/5 Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
