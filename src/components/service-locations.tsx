'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Zap, Phone, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

export function ServiceLocations() {
  const locations = [
    { city: 'Mumbai', state: 'Maharashtra', color: 'blue' },
    { city: 'Thane', state: 'Maharashtra', color: 'purple' },
    { city: 'Pune', state: 'Maharashtra', color: 'green' },
    { city: 'Pimpri Chinchwad', state: 'Maharashtra', color: 'orange' },
    { city: 'New Delhi NCR', state: 'Delhi', color: 'red' },
    { city: 'Bangalore', state: 'Karnataka', color: 'indigo' },
    { city: 'Varanasi', state: 'Uttar Pradesh', color: 'yellow' },
    { city: 'Lucknow', state: 'Uttar Pradesh', color: 'pink' },
    { city: 'Chennai', state: 'Tamil Nadu', color: 'cyan' },
    { city: 'Gorakhpur', state: 'Uttar Pradesh', color: 'emerald' },
    { city: 'Surat', state: 'Gujarat', color: 'violet' },
    { city: 'Ahmedabad', state: 'Gujarat', color: 'amber' },
    { city: 'Rajkot', state: 'Gujarat', color: 'rose' },
    { city: 'Kolkata', state: 'West Bengal', color: 'teal' },
    { city: 'Hyderabad', state: 'Telangana', color: 'lime' },
    { city: 'Indore', state: 'Madhya Pradesh', color: 'sky' },
    { city: 'Kanpur', state: 'Uttar Pradesh', color: 'fuchsia' }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400/70 dark:hover:border-blue-600/70',
      purple: 'from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400/70 dark:hover:border-purple-600/70',
      green: 'from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200/50 dark:border-green-800/50 hover:border-green-400/70 dark:hover:border-green-600/70',
      orange: 'from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200/50 dark:border-orange-800/50 hover:border-orange-400/70 dark:hover:border-orange-600/70',
      red: 'from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200/50 dark:border-red-800/50 hover:border-red-400/70 dark:hover:border-red-600/70',
      indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 border-indigo-200/50 dark:border-indigo-800/50 hover:border-indigo-400/70 dark:hover:border-indigo-600/70',
      yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-200/50 dark:border-yellow-800/50 hover:border-yellow-400/70 dark:hover:border-yellow-600/70',
      pink: 'from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 border-pink-200/50 dark:border-pink-800/50 hover:border-pink-400/70 dark:hover:border-pink-600/70',
      cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20 border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-400/70 dark:hover:border-cyan-600/70',
      emerald: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-400/70 dark:hover:border-emerald-600/70',
      violet: 'from-violet-50 to-violet-100 dark:from-violet-950/20 dark:to-violet-900/20 border-violet-200/50 dark:border-violet-800/50 hover:border-violet-400/70 dark:hover:border-violet-600/70',
      amber: 'from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200/50 dark:border-amber-800/50 hover:border-amber-400/70 dark:hover:border-amber-600/70',
      rose: 'from-rose-50 to-rose-100 dark:from-rose-950/20 dark:to-rose-900/20 border-rose-200/50 dark:border-rose-800/50 hover:border-rose-400/70 dark:hover:border-rose-600/70',
      teal: 'from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/20 border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400/70 dark:hover:border-teal-600/70',
      lime: 'from-lime-50 to-lime-100 dark:from-lime-950/20 dark:to-lime-900/20 border-lime-200/50 dark:border-lime-800/50 hover:border-lime-400/70 dark:hover:border-lime-600/70',
      sky: 'from-sky-50 to-sky-100 dark:from-sky-950/20 dark:to-sky-900/20 border-sky-200/50 dark:border-sky-800/50 hover:border-sky-400/70 dark:hover:border-sky-600/70',
      fuchsia: 'from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-950/20 dark:to-fuchsia-900/20 border-fuchsia-200/50 dark:border-fuchsia-800/50 hover:border-fuchsia-400/70 dark:hover:border-fuchsia-600/70'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const handleBookService = (city: string) => {
    const message = `Hi! I want to book appliance repair service in ${city}. Please help me schedule an appointment.`
    window.open(`https://wa.me/917068178070?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-3xl mb-6 shadow-2xl border border-primary/30"
          >
            <MapPin className="h-10 w-10 text-primary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute"
            >
              <Sparkles className="h-6 w-6 text-primary/50" />
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4"
          >
            Our Service Locations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Professional appliance repair services across <span className="font-bold text-primary">{locations.length}+ cities</span> in India
          </motion.p>
        </motion.div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {locations.map((location, index) => (
            <motion.div
              key={`${location.city}-${location.state}`}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${getColorClasses(location.color)} backdrop-blur-sm rounded-2xl border-2 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden`}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Floating sparkle effect */}
              <motion.div
                className="absolute top-2 right-2 w-4 h-4"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 text-primary/40 group-hover:text-primary/80 transition-colors" />
              </motion.div>

              {/* Location Info */}
              <div className="mb-6 relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="w-4 h-4 bg-gradient-to-r from-primary to-primary/70 rounded-full mr-4 shadow-lg"
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.h3 
                    className="font-bold text-foreground text-xl group-hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {location.city}
                  </motion.h3>
                </div>
                <motion.p 
                  className="text-sm text-muted-foreground pl-8 group-hover:text-foreground transition-colors duration-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {location.state}
                </motion.p>
              </div>

              {/* Enhanced Book Now Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10"
              >
                <Button
                  onClick={() => handleBookService(location.city)}
                  className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary shadow-lg hover:shadow-xl hover:from-primary/90 hover:via-primary hover:to-primary/90 transition-all duration-300 group-hover:scale-105 relative overflow-hidden"
                  size="sm"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <Calendar className="h-4 w-4 mr-2 relative z-10" />
                  <span className="relative z-10">Book Now</span>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '17+', label: 'Cities', icon: MapPin, color: 'from-blue-500 to-blue-600' },
            { number: '24/7', label: 'Support', icon: Phone, color: 'from-green-500 to-green-600' },
            { number: '30min', label: 'Response', icon: Zap, color: 'from-yellow-500 to-orange-500' },
            { number: '100%', label: 'Quality', icon: Calendar, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="text-center p-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div 
                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl relative z-10`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-7 w-7 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-primary mb-2 relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-10 border-2 border-primary/30 shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"
              animate={{ 
                background: [
                  "linear-gradient(45deg, rgba(var(--primary), 0.05), transparent)",
                  "linear-gradient(135deg, rgba(var(--primary), 0.1), transparent)",
                  "linear-gradient(225deg, rgba(var(--primary), 0.05), transparent)",
                  "linear-gradient(315deg, rgba(var(--primary), 0.1), transparent)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.h3 
              className="text-2xl font-bold text-foreground mb-4 relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              Don't see your city?
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              We're expanding rapidly! Contact us to check availability in your area.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                onClick={() => window.open('https://wa.me/917068178070?text=Hi, I want to check service availability in my city', '_blank')}
                className="bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden z-10"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <Phone className="h-5 w-5 mr-3 relative z-10" />
                <span className="relative z-10">Check Availability</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
