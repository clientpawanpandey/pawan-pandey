'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, Users, Clock, Award, Wrench, Shield, Star, Zap } from 'lucide-react'
import Image from 'next/image'

export function About() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Quality Service',
      description: 'We provide top-notch repair and maintenance services for all major appliance brands with premium parts.',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: Users,
      title: 'Expert Technicians',
      description: 'Our certified technicians have 5+ years of experience in appliance repair and installation across all brands.',
      color: 'from-blue-400 to-cyan-600',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We offer same-day service and emergency repairs to get your appliances running fast, 24/7 availability.',
      color: 'from-orange-400 to-red-500',
    },
    {
      icon: Award,
      title: 'Satisfaction Guaranteed',
      description: 'We stand behind our work with comprehensive warranties and 100% customer satisfaction guarantee.',
      color: 'from-purple-400 to-pink-500',
    },
  ]

  const services = [
    { icon: Wrench, name: 'Repair Services', count: '500+' },
    { icon: Shield, name: 'Warranty Work', count: '100%' },
    { icon: Star, name: 'Customer Rating', count: '4.9/5' },
    { icon: Zap, name: 'Quick Response', count: '<2hrs' },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='70' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            About MCS
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            Your Trusted Appliance Care
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Partner Since 2019
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At Machine Care Services (MCS), we are your one-stop solution for all home appliance needs. 
            With years of experience and a team of certified technicians, we provide reliable repair, 
            installation, and maintenance services for all major appliance brands.
          </p>
        </motion.div>

        {/* Enhanced Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/40 to-muted/70 border border-primary/10 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-foreground mb-1">{service.count}</div>
              <div className="text-sm text-muted-foreground font-medium">{service.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content with Improved Image Proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Why Choose Pawan Pandey's MCS?
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand how important your home appliances are to your daily life. That's why we're 
              committed to providing fast, reliable, and affordable repair services that you can trust.
            </p>
            
            <div className="space-y-4">
              {['Certified & Insured Technicians', 'Same-Day Service Available', 'Warranty on All Repairs', 'Upfront Pricing'].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Images Grid with Proper Aspect Ratios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Washing Machine - Portrait Image (816x1224) */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl group">
                  <Image
                    src="/assets/washingmachinemobile.jpg"
                    alt="Washing Machine Repair"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <Badge className="bg-orange-600/90 backdrop-blur-sm shadow-lg border-0">
                      Washing Machine
                    </Badge>
                  </div>
                </div>
                
                {/* Microwave - Portrait Image (816x1224) */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl group">
                  <Image
                    src="/assets/microwavemobile.jpg"
                    alt="Microwave Repair"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <Badge className="bg-purple-600/90 backdrop-blur-sm shadow-lg border-0 text-xs">
                      Microwave
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Column - Offset with padding-top */}
              <div className="space-y-4 pt-6">
                {/* Refrigerator - Portrait Image (816x1224) */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl group">
                  <Image
                    src="/assets/refrigeratormobile.jpg"
                    alt="Refrigerator Repair"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <Badge className="bg-green-600/90 backdrop-blur-sm shadow-lg border-0 text-xs">
                      Refrigerator
                    </Badge>
                  </div>
                </div>
                
                {/* AC - Landscape Image (1224x816) */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl group">
                  <Image
                    src="/assets/acmobile.jpg"
                    alt="AC Repair"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <Badge className="bg-blue-600/90 backdrop-blur-sm shadow-lg border-0">
                      Air Conditioner
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-primary/10 hover:border-primary/30 hover:bg-muted/30 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white drop-shadow" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
