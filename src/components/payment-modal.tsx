'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Banknote, CreditCard, X, CheckCircle } from 'lucide-react'
import { UPIQRGenerator } from './upi-qr-generator'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  leadId: string
  leadName: string
  amount: number
  onPaymentComplete: (paymentData: PaymentData) => void
}

interface PaymentData {
  leadId: string
  paymentMethod: 'cash' | 'online'
  paymentStatus: 'completed'
  paymentAmount: number
  upiId?: string
  paymentDate: string
}

export function PaymentModal({ isOpen, onClose, leadId, leadName, amount, onPaymentComplete }: PaymentModalProps) {
  const [showUPIGenerator, setShowUPIGenerator] = useState(false)
  const [cashConfirmed, setCashConfirmed] = useState(false)

  const handleCashPayment = () => {
    setCashConfirmed(true)
    
    setTimeout(() => {
      const paymentData: PaymentData = {
        leadId,
        paymentMethod: 'cash',
        paymentStatus: 'completed',
        paymentAmount: amount,
        paymentDate: new Date().toISOString()
      }
      onPaymentComplete(paymentData)
      setCashConfirmed(false)
      onClose()
    }, 1500)
  }

  const handleOnlinePayment = () => {
    setShowUPIGenerator(true)
  }

  const handleUPIPaymentComplete = (paymentData: PaymentData) => {
    onPaymentComplete(paymentData)
    setShowUPIGenerator(false)
    onClose()
  }

  const handleClose = () => {
    setCashConfirmed(false)
    setShowUPIGenerator(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4 pb-safe">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xs mx-auto"
        >
          <Card className="shadow-xl border bg-white dark:bg-gray-700">
            <CardHeader className="relative pb-2 px-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                className="absolute right-1 top-1 h-6 w-6 p-0 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <X className="h-3 w-3" />
              </Button>
              
              <div className="text-center space-y-2 mt-2">
                <div className="w-8 h-8 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-base font-bold">Collect Payment</CardTitle>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {leadName}
                </Badge>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-xs text-green-600 dark:text-green-400">Amount</p>
                  <p className="text-lg font-bold text-green-700 dark:text-green-300">₹{amount.toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 px-3 pb-3">
              {cashConfirmed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-green-600 mb-1">Payment Confirmed!</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Cash payment marked as received</p>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                    Select Payment Method:
                  </p>
                  
                  {/* Cash Payment Button */}
                  <Button
                    onClick={handleCashPayment}
                    variant="outline"
                    className="w-full h-12 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded flex items-center justify-center">
                          <Banknote className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold">Cash</div>
                          <div className="text-xs text-gray-500">Immediate</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">₹{amount.toLocaleString()}</div>
                      </div>
                    </div>
                  </Button>

                  {/* Online Payment Button */}
                  <Button
                    onClick={handleOnlinePayment}
                    variant="outline"
                    className="w-full h-12 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded flex items-center justify-center">
                          <CreditCard className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold">Online</div>
                          <div className="text-xs text-gray-500">QR Code</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-600">₹{amount.toLocaleString()}</div>
                      </div>
                    </div>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <UPIQRGenerator
        isOpen={showUPIGenerator}
        onClose={() => setShowUPIGenerator(false)}
        amount={amount}
        leadId={leadId}
        leadName={leadName}
        onPaymentComplete={handleUPIPaymentComplete}
      />
    </>
  )
}
