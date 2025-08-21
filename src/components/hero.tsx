// src/components/hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { MessageCircle, Star, CheckCircle, Wrench, ArrowDown, Zap, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

export function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })))
    }

    const interval = setInterval(animateParticles, 100)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { icon: Star, value: '5+', label: 'Years Experience', color: 'from-yellow-400 to-orange-500' },
    { icon: CheckCircle, value: '1000+', label: 'Happy Customers', color: 'from-green-400 to-emerald-500' },
    { icon: Wrench, value: '24/7', label: 'Support Available', color: 'from-blue-400 to-cyan-500' },
  ]

  const features = [
    { icon: Zap, text: 'Same Day Service' },
    { icon: Shield, text: '100% Warranty' },
    { icon: CheckCircle, text: 'Expert Technicians' },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with Updated URLs */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background - Landscape images */}
        <div className="hidden md:block absolute inset-0">
          <div className="grid grid-cols-2 h-full">
            <div className="relative">
              <Image
                src="https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice.jpg"
                alt="Professional AC Repair and Installation Services in Gorakhpur MSC"
                width={1224}
                height={816}
                className="object-cover w-full h-full opacity-20"
                priority
                loading="eager"
              />
            </div>
            <div className="relative">
              <Image
                src="https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice2.jpg"
                alt="Expert AC Service and Maintenance by Gorakhpur MSC Technicians"
                width={1224}
                height={816}
                className="object-cover w-full h-full opacity-20"
                priority
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="https://zacotlplpeionoqfdhxm.supabase.co/storage/v1/object/public/default/acrepairservice3.jpg"
            alt="Gorakhpur MSC Mobile Appliance Services - Fridge, AC, Washing Machine Repair"
            width={816}
            height={1224}
            className="object-cover w-full h-full opacity-15"
            priority
            loading="eager"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse" />

        {/* Floating Particles */}
        <div className="particles">
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-primary/20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: particle.id * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading with Enhanced Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-4">
              <span className="block text-foreground mb-2">Gorakhpur</span>
              <span className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-pulse">
                  Machine Care
                </span>
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-semibold mt-2">
                Services
              </span>
            </h1>
          </motion.div>

          {/* Features Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted/80 px-4 py-2 rounded-full">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Subtitle with Local SEO */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Your trusted partner for all home appliance repairs, installation, and maintenance services.
            <br className="hidden md:block" />
            <span className="text-primary font-bold">
              Expert technicians • Quality service • Guaranteed satisfaction
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                onClick={scrollToContact}
              >
                <Wrench className="mr-3 h-6 w-6" />
                Book Now
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-xl border-2 border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                onClick={() =>
                  window.open(`https://wa.me/917068178070?text=Hi, I need help with my appliance repair in Gorakhpur`, '_blank')
                }
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp Us
              </Button>
            </motion.div>
          </motion.div>

          {/* SEO-focused introduction paragraph - Moved here for better flow */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-base md:text-lg font-medium text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              <strong>Gorakhpur MSC (Machine Care Services)</strong> - Your trusted local experts for 
              <strong> fridge repair</strong>, <strong>washing machine service</strong>, 
              <strong> microwave repair</strong>, and <strong>AC installation</strong> in Gorakhpur. 
              Fast, reliable appliance repair services with certified technicians and same-day service available.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-30"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/80 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToContact}
        >
          <motion.div className="flex flex-col items-center text-primary scroll-indicator hover:text-primary/80 transition-colors">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1">
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
