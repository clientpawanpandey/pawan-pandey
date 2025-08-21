'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Phone, MapPin, MessageCircle, Clock, CheckCircle, Star, Send } from 'lucide-react'
import { submitContactForm } from '@/lib/actions'
import Image from 'next/image'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const services = [
    'Refrigerator',
    'Washing Machine',
    'Microwave Oven',
    'Air Conditioner',
    'Other',
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '7068178070',
      description: 'Call us 24/7 for emergency repairs',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      action: () => window.open('tel:7068178070')
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Available 24/7',
      description: 'Quick response for urgent repairs',
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      action: () => window.open('https://wa.me/917068178070?text=Hi, I need help with my appliance')
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 2 hours',
      description: 'Same day service available',
      color: 'from-orange-400 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      content: 'Local Coverage',
      description: 'Serving your neighborhood',
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
  ]

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formattedData = {
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        service: data.service,
        message: data.message,
        pincode: parseFloat(data.pincode),
        address: data.address,
      }
      
      const result = await submitContactForm(formattedData)
      
      if (result.success) {
        setSubmitStatus('success')
        reset()
        
        // Track conversion for analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit', {
            event_category: 'engagement',
            event_label: data.service
          })
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const makeCall = () => {
    window.open('tel:7068178070')
    
    // Track call button click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_call', {
        event_category: 'engagement',
        event_label: 'contact_section'
      })
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi, I need help with my appliance. Please provide information about your services.')
    window.open(`https://wa.me/917068178070?text=${message}`, '_blank')
    
    // Track WhatsApp click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'contact_section'
      })
    }
  }

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Gorakhpur Machine Care Services",
              "description": "Professional appliance repair and maintenance services in Gorakhpur",
              "telephone": "+91-7068178070",
              "url": typeof window !== 'undefined' ? window.location.href : '',
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gorakhpur",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.7606",
                "longitude": "83.3732"
              },
              "openingHours": [
                "Mo-Su 00:00-23:59"
              ],
              "priceRange": "₹₹",
              "serviceArea": {
                "@type": "City",
                "name": "Gorakhpur"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-7068178070",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["Hindi", "English"]
                }
              ]
            }
          })
        }}
      />

      <section 
        id="contact" 
        className="py-20 relative overflow-hidden"
        itemScope 
        itemType="https://schema.org/ContactPage"
      >
        {/* Background with Images */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Background */}
          <div className="hidden lg:block absolute inset-0 opacity-10">
            <div className="grid grid-cols-3 h-full">
              <div className="relative">
                <Image
                  src="/assets/washingmachinemobile.jpg"
                  alt="Professional washing machine repair services in Gorakhpur"
                  width={816}
                  height={1224}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  sizes="(max-width: 1024px) 0vw, 33vw"
                />
              </div>
              <div className="relative bg-gradient-to-b from-primary/20 to-secondary/20" />
              <div className="relative">
                <Image
                  src="/assets/microwavelandscape.jpg"
                  alt="Expert microwave oven repair services in Gorakhpur"
                  width={1224}
                  height={816}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  sizes="(max-width: 1024px) 0vw, 33vw"
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Background */}
          <div className="lg:hidden absolute inset-0 opacity-5">
            <Image
              src="/assets/acmobile.jpg"
              alt="Air conditioner repair services contact"
              width={1224}
              height={816}
              className="object-cover w-full h-full"
              loading="lazy"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-background/95" />
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
              Contact Us
            </Badge>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6"
              itemProp="name"
            >
              Get In Touch With
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Our Expert Team
              </span>
            </h1>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              itemProp="description"
            >
              Need appliance repair or maintenance? Contact us today for fast, reliable service. 
              Our certified technicians are ready to help you 24/7 with professional solutions.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={info.action}
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <Card className={`h-full text-center hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 ${info.bgColor}`}>
                  <CardContent className="pt-6 pb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${info.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-1" itemProp="contactType">
                      {info.title}
                    </h3>
                    <p className="font-semibold text-primary mb-2" itemProp="telephone">
                      {info.content}
                    </p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-2xl border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                      <Send className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">Send us a message</CardTitle>
                      <CardDescription className="text-base">
                        Fill out the form and we'll respond within 2 hours
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="space-y-6"
                    itemScope
                    itemType="https://schema.org/ContactPage"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Your Name *"
                          {...register('name')}
                          className={`h-12 ${errors.name ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                          autoComplete="name"
                          aria-label="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                            <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Input
                          placeholder="Phone Number *"
                          {...register('phone')}
                          className={`h-12 ${errors.phone ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                          autoComplete="tel"
                          aria-label="Your phone number"
                          type="tel"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                            <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Input
                        placeholder="Email (Optional)"
                        type="email"
                        {...register('email')}
                        className={`h-12 ${errors.email ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                        autoComplete="email"
                        aria-label="Your email address (optional)"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                          <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <select
                        {...register('service')}
                        className={`w-full h-12 px-4 py-2 text-sm rounded-md border bg-white/20 dark:bg-black/20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors ${
                          errors.service ? 'border-red-500' : 'border-primary/20 focus:border-primary'
                        }`}
                        aria-label="Select appliance service type"
                      >
                        <option value="">Select Service *</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                          <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Describe your issue or requirement *"
                        {...register('message')}
                        className={`min-h-[100px] resize-none ${errors.message ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                        rows={4}
                        aria-label="Describe your appliance issue or service requirements"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                          <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Required Fields: Pincode and Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Pincode *"
                          {...register('pincode')}
                          className={`h-12 ${errors.pincode ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                          maxLength={6}
                          autoComplete="postal-code"
                          aria-label="Your area pincode"
                          pattern="[0-9]{6}"
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                            <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {errors.pincode.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <Textarea
                          placeholder="Service Address *"
                          {...register('address')}
                          className={`min-h-[48px] resize-none ${errors.address ? 'border-red-500' : 'border-primary/20'} focus:border-primary transition-colors`}
                          rows={2}
                          autoComplete="street-address"
                          aria-label="Your complete service address"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                            <span className="w-4 h-4 rounded-full bg-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-green-600 bg-green-50 dark:bg-green-950/20 p-4 rounded-lg"
                        role="status"
                        aria-live="polite"
                      >
                        <CheckCircle className="h-5 w-5 mr-3" aria-hidden="true" />
                        <span className="font-medium">Thank you! Your message has been sent successfully.</span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-red-600 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg"
                        role="alert"
                        aria-live="assertive"
                      >
                        <span className="w-5 h-5 rounded-full bg-red-500 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">Sorry, there was an error. Please try again or call us directly.</span>
                      </motion.div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300" 
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? 'Sending message...' : 'Send message to Gorakhpur Machine Care Services'}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-5 w-5" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-4">Need Immediate Help?</h2>
                <p className="text-muted-foreground mb-6">
                  Don't wait for a callback. Get instant support through our direct communication channels.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-lg text-lg font-semibold" 
                    size="lg"
                    onClick={makeCall}
                    aria-label="Call Gorakhpur Machine Care Services at 7068178070"
                  >
                    <Phone className="mr-3 h-5 w-5" aria-hidden="true" />
                    Call Now: 7068178070
                  </Button>
                  
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90 shadow-lg text-lg font-semibold" 
                    size="lg"
                    onClick={openWhatsApp}
                    aria-label="Contact us via WhatsApp for immediate assistance"
                  >
                    <MessageCircle className="mr-3 h-5 w-5" aria-hidden="true" />
                    WhatsApp Us Now
                  </Button>
                </div>
              </Card>

              {/* Service Highlights */}
              <Card className="p-6 border-primary/20">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" aria-hidden="true" />
                  Why Choose Our Service?
                </h3>
                <div className="space-y-3">
                  {[
                    'Same-day service available',
                    'Certified & experienced technicians',
                    'Warranty on all repairs',
                    '24/7 emergency support',
                    'Upfront pricing with no hidden costs'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Service Areas Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src="/assets/refrigeratormobile.jpg"
                    alt="Professional refrigerator repair service in Gorakhpur by certified technicians"
                    width={816}
                    height={1224}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <Badge className="bg-primary/80 text-xs">Refrigerator</Badge>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src="/assets/acmobile.jpg"
                    alt="Expert air conditioner repair and maintenance service in Gorakhpur"
                    width={1224}
                    height={816}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <Badge className="bg-blue-600/80 text-xs">Air Conditioner</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
