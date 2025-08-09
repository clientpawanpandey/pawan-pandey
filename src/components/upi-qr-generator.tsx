'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { QrCode, Download, X, CheckCircle, Smartphone, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface UPIQRGeneratorProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  leadId: string
  leadName: string
  onPaymentComplete: (paymentData: PaymentData) => void
}

interface PaymentData {
  leadId: string
  paymentMethod: 'online'
  paymentStatus: 'completed'
  paymentAmount: number
  upiId: string
  paymentDate: string
}

export function UPIQRGenerator({ isOpen, onClose, amount, leadId, leadName, onPaymentComplete }: UPIQRGeneratorProps) {
  const [upiId, setUpiId] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const paymentApps = [
    { name: 'GPay', icon: '/assets/payments/gpay.svg', example: 'yourname@oksbi' },
    { name: 'PhonePe', icon: '/assets/payments/phonepe.svg', example: 'yourname@ybl' },
    { name: 'Paytm', icon: '/assets/payments/paytm.svg', example: 'yourname@paytm' },
    { name: 'Amazon Pay', icon: '/assets/payments/amazon.svg', example: 'yourname@apl' },
    { name: 'BHIM', icon: '/assets/payments/bhim.svg', example: 'yourname@upi' },
    { name: 'UPI', icon: '/assets/payments/upi.svg', example: 'yourname@bank' },
  ]

  const generateQRCode = async () => {
    if (!upiId || !amount) return

    setIsGenerating(true)
    try {
      const qrApiUrl = `https://upi-payment-qr.vercel.app/api/qrgen?upiid=${encodeURIComponent(upiId)}&name=${encodeURIComponent(leadName)}&amount=${amount}`
      setQrCodeUrl(qrApiUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const confirmPayment = () => {
    const paymentData: PaymentData = {
      leadId,
      paymentMethod: 'online',
      paymentStatus: 'completed',
      paymentAmount: amount,
      upiId,
      paymentDate: new Date().toISOString()
    }
    
    onPaymentComplete(paymentData)
    setPaymentConfirmed(true)
    
    setTimeout(() => {
      onClose()
      setPaymentConfirmed(false)
      setQrCodeUrl('')
      setUpiId('')
    }, 2000)
  }

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.href = qrCodeUrl
      link.download = `payment-qr-${leadName}-${amount}.png`
      link.click()
    }
  }

  const handleBack = () => {
    setQrCodeUrl('')
  }

  const handleClose = () => {
    setQrCodeUrl('')
    setUpiId('')
    setPaymentConfirmed(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <Card className="shadow-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
          {/* Header - Always visible */}
          <CardHeader className="relative pb-3 px-3 sm:px-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="absolute right-1 top-1 h-6 w-6 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </Button>
            
            {/* Back button - Only visible when QR is generated */}
            {qrCodeUrl && !paymentConfirmed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="absolute left-1 top-1 h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-3 w-3" />
              </Button>
            )}
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {qrCodeUrl ? 'Scan & Pay' : 'UPI Payment'}
              </CardTitle>
              <Badge variant="outline" className="px-2 py-1 text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                {leadName}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 px-3 sm:px-4 pb-3 sm:pb-4">
            {paymentConfirmed ? (
              // Payment Confirmed State
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">Payment Confirmed!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Online payment has been marked as completed</p>
              </motion.div>
            ) : qrCodeUrl ? (
              // QR Code Display Only - When QR is generated
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Amount Display */}
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Payment Amount</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹{amount.toLocaleString()}</p>
                </div>

                {/* QR Code */}
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-inner">
                  <img
                    src={qrCodeUrl}
                    alt="UPI Payment QR Code"
                    className="mx-auto max-w-[180px] w-full h-auto shadow-lg rounded-lg"
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scan with any UPI app</p>
                    
                    {/* UPI ID Display */}
                    <div className="flex items-center justify-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{upiId}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={downloadQR}
                    className="h-10 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button
                    onClick={confirmPayment}
                    className="h-10 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Payment Done
                  </Button>
                </div>
                
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 leading-relaxed">
                  Share this QR code with customer or click "Payment Done" after customer completes the payment
                </p>
              </motion.div>
            ) : (
              // UPI ID Input Form - Only when no QR is generated
              <>
                {/* UPI ID Input with App Icons */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 block">Your UPI ID *</label>
                    <Input
                      placeholder="yourname@paytm / yourname@gpay"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="h-10 text-center border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Payment App Icons */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Supported Payment Apps</p>
                    <div className="grid grid-cols-6 gap-2">
                      {paymentApps.map((app, index) => (
                        <motion.div
                          key={app.name}
                          className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setUpiId(app.example)}
                        >
                          <div className="w-8 h-8 relative bg-white dark:bg-gray-700 rounded-lg shadow-sm group-hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-600">
                            <Image
                              src={app.icon}
                              alt={app.name}
                              fill
                              className="object-contain p-0.5"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                            {app.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-xs text-blue-600 dark:text-blue-400">Payment Amount</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">₹{amount.toLocaleString()}</p>
                </div>

                {/* Generate QR Button */}
                <Button
                  onClick={generateQRCode}
                  disabled={!upiId || !amount || isGenerating}
                  className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 disabled:opacity-50 font-semibold text-white"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
