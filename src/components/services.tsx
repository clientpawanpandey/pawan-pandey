'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { CheckCircle, Clock, Shield, Wrench, Star, Award, MessageCircle, ArrowRight } from 'lucide-react'

export function Services() {
  const services = [
    {
      title: 'Refrigerator',
      subtitle: 'Cooling Solutions',
      description: 'MCS is one stop solutions related to refrigerator such as refrigerator repair services, installation and maintenance. We are refrigerator expert offering local refrigerator services.',
      mobileImage: '/assets/refrigeratormobile.jpg',
      landscapeImage: '/assets/refrigeratorlanscape.jpg',
      features: ['Cooling Issues', 'Ice Maker Problems', 'Water Leakage', 'Temperature Control'],
      price: 'Book Fast',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      // Fixed dimensions - refrigerator landscape is actually 816x1224 (portrait)
      dimensions: { 
        mobile: { width: 816, height: 1224, aspectRatio: '2/3' }, 
        landscape: { width: 816, height: 1224, aspectRatio: '2/3' } 
      }
    },
    {
      title: 'Washing Machine',
      subtitle: 'Laundry Care',
      description: 'MCS is one stop solutions related to washing machines such as washing machine repair services, installation and maintenance. We are washing machine expert offering local washing machine services.',
      mobileImage: '/assets/washingmachinemobile.jpg',
      landscapeImage: '/assets/washingmachinemobile.jpg',
      features: ['Drain Problems', 'Spin Cycle Issues', 'Water Fill Problems', 'Door Lock Repair'],
      price: 'Book Fast',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      dimensions: { 
        mobile: { width: 816, height: 1224, aspectRatio: '2/3' }, 
        landscape: { width: 816, height: 1224, aspectRatio: '2/3' } 
      }
    },
    {
      title: 'Microwave Oven',
      subtitle: 'Kitchen Appliance',
      description: 'MCS is one stop solutions related to microoven such as microwave oven repair services, installation and maintenance etc. We are microwave oven expert providing local microwave oven services.',
      mobileImage: '/assets/microwavemobile.jpg',
      landscapeImage: '/assets/microwavelandscape.jpg',
      features: ['Heating Issues', 'Turntable Problems', 'Door Mechanism', 'Control Panel Repair'],
      price: 'Book Fast',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      dimensions: { 
        mobile: { width: 816, height: 1224, aspectRatio: '2/3' }, 
        landscape: { width: 1224, height: 816, aspectRatio: '3/2' } 
      }
    },
    {
      title: 'Air Conditioner',
      subtitle: 'Climate Control',
      description: 'MCS is one stop solutions related to air conditioners such as air conditioner repair services, installation and maintenance etc. We are air conditioners expert providing local air conditioner services.',
      mobileImage: '/assets/acmobile.jpg',
      landscapeImage: '/assets/aclandscape2.jpg',
      features: ['Cooling Problems', 'Gas Refilling', 'Filter Cleaning', 'Installation Service'],
      price: 'Book Fast',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      dimensions: { 
        mobile: { width: 1224, height: 816, aspectRatio: '3/2' }, 
        landscape: { width: 1224, height: 816, aspectRatio: '3/2' } 
      }
    },
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Warranty Protection',
      description: 'All repairs come with comprehensive warranty coverage for complete peace of mind and quality assurance.',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Same-day service available with emergency repair options. We value your time and convenience above all.',
      gradient: 'from-blue-400 to-cyan-600',
    },
    {
      icon: Award,
      title: 'Expert Technicians',
      description: 'Certified professionals with 5+ years of experience in appliance repair across all major brands.',
      gradient: 'from-purple-400 to-pink-600',
    },
    {
      icon: Star,
      title: '100% Satisfaction',
      description: 'We guarantee customer satisfaction with every service we provide, backed by hundreds of positive reviews.',
      gradient: 'from-yellow-400 to-orange-600',
    },
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
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zm0 60v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-6 py-2 text-base font-semibold border-primary/30">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            Professional Appliance
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Services & Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We specialize in repair, installation, and maintenance of all major home appliances. 
            Our expert technicians ensure your appliances run efficiently and last longer with premium service quality.
          </p>
        </motion.div>

        {/* Services Grid with Improved Image Proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                {/* Image Section with Proper Aspect Ratios */}
                <div className="relative overflow-hidden">
                  {/* Container with dynamic aspect ratio based on image orientation */}
                  <div 
                    className={`relative w-full ${
                      service.dimensions.landscape.aspectRatio === '3/2' 
                        ? 'aspect-[3/2]' 
                        : 'aspect-[4/3]'
                    } md:aspect-[3/2]`}
                  >
                    {/* Desktop Image */}
                    <div className="hidden md:block relative w-full h-full">
                      <Image
                        src={service.landscapeImage}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index < 2}
                      />
                    </div>
                    
                    {/* Mobile Image */}
                    <div className="md:hidden relative w-full h-full">
                      <Image
                        src={service.mobileImage}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="100vw"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-15 group-hover:opacity-25 transition-opacity duration-500`} />
                  
                  {/* Top Badges with Better Positioning */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <Badge className={`${service.bgColor} text-foreground border-0 font-semibold shadow-lg backdrop-blur-sm`}>
                      {service.subtitle}
                    </Badge>
                    <Badge className={`bg-gradient-to-r ${service.color} text-white border-0 font-bold shadow-lg`}>
                      {service.price}
                    </Badge>
                  </div>

                  {/* Enhanced Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {service.title} Service
                      </h3>
                      <div className="flex items-center text-white/90">
                        <Wrench className="h-5 w-5 mr-2 drop-shadow" />
                        <span className="text-sm font-medium drop-shadow">Professional Repair & Maintenance</span>
                      </div>
                    </div>
                    
                    {/* Service Features Preview */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 2 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm"
                        >
                          +{service.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Content Section */}
                <CardContent className="p-6 space-y-6 bg-gradient-to-b from-card to-card/50">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                  
                  {/* Comprehensive Features Grid */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      Common Issues We Fix:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3 flex-shrink-0`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className={`flex-1 bg-gradient-to-r ${service.color} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}
                      size="sm"
                      onClick={scrollToContact}
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                      onClick={() => window.open(`https://wa.me/917068178070?text=Hi, I need ${service.title} service`, '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600"> MCS</span>?
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We're committed to providing the best appliance repair services with unmatched quality, 
            reliability, and customer satisfaction that exceeds expectations.
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 group bg-gradient-to-b from-card to-card/50 backdrop-blur-sm">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8 text-white drop-shadow" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 backdrop-blur-sm"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Emergency Appliance Repair?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Don't let broken appliances disrupt your daily routine. Our expert technicians are ready to help you 24/7 
            with professional solutions and guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={scrollToContact}
              >
                <Wrench className="mr-2 h-5 w-5" />
                Book Service Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/10 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open(`https://wa.me/917068178070?text=Hi, I need emergency appliance repair`, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Emergency WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
