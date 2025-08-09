'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { X, DollarSign, Calculator, CheckCircle, Edit } from 'lucide-react'

interface AmountInputModalProps {
  isOpen: boolean
  onClose: () => void
  leadId: string
  leadName: string
  onAmountSubmit: (amount: number) => void
  existingAmount?: number
  isUpdate?: boolean
}

export function AmountInputModal({ 
  isOpen, 
  onClose, 
  leadId, 
  leadName, 
  onAmountSubmit, 
  existingAmount,
  isUpdate = false 
}: AmountInputModalProps) {
  const [amount, setAmount] = useState<string>('')
  const [isValid, setIsValid] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    if (isOpen && existingAmount && isUpdate) {
      setAmount(existingAmount.toString())
      setIsValid(true)
      setHasChanged(false)
    } else if (isOpen && !isUpdate) {
      setAmount('')
      setIsValid(false)
      setHasChanged(false)
    }
  }, [isOpen, existingAmount, isUpdate])

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const parts = numericValue.split('.')
    if (parts.length > 2) return
    
    setAmount(numericValue)
    const parsedAmount = parseFloat(numericValue)
    const isValidAmount = parsedAmount > 0 && !isNaN(parsedAmount)
    setIsValid(isValidAmount)
    
    if (isUpdate && existingAmount) {
      setHasChanged(parsedAmount !== existingAmount)
    } else {
      setHasChanged(true)
    }
  }

  const handleSubmit = () => {
    if (isValid) {
      const parsedAmount = parseFloat(amount)
      onAmountSubmit(parsedAmount)
      if (!isUpdate) {
        setAmount('')
        setIsValid(false)
        setHasChanged(false)
      }
    }
  }

  const handleClose = () => {
    if (!isUpdate) {
      setAmount('')
      setIsValid(false)
    }
    setHasChanged(false)
    onClose()
  }

  const quickAmounts = [100, 500, 1000, 2000, 5000]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 pb-safe">
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
                {isUpdate ? (
                  <Edit className="h-4 w-4 text-white" />
                ) : (
                  <Calculator className="h-4 w-4 text-white" />
                )}
              </div>
              <CardTitle className="text-base font-bold">
                {isUpdate ? 'Update Amount' : 'Enter Amount'}
              </CardTitle>
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                {leadName}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 px-3 pb-3">
            {/* Current Amount (for updates) */}
            {isUpdate && existingAmount && (
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
                <p className="text-xs text-gray-600 dark:text-gray-300">Current: ₹{existingAmount.toLocaleString()}</p>
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="relative">
                
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-white dark:text-gray-500">₹</span>
                <Input
                  type="text"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="h-10 pl-8 text-center text-base font-bold"
                  autoFocus
                />
                {isValid && (
                  <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-green-500" />
                )}
              </div>
              
              {amount && !isValid && (
                <p className="text-xs text-red-600 text-center">Please enter a valid amount</p>
              )}

              {/* Change indicator for updates */}
              {isUpdate && isValid && hasChanged && (
                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                  <span className="text-xs text-blue-700 dark:text-blue-300">
                    Change: ₹{existingAmount?.toLocaleString()} → ₹{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Quick Select</label>
              <div className="grid grid-cols-3 gap-1">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAmountChange(quickAmount.toString())}
                    className="h-7 text-xs px-1"
                  >
                    ₹{quickAmount >= 1000 ? `${quickAmount/1000}k` : quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Amount Display */}
            {isValid && (
              <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 text-center">
                <p className="text-xs text-green-700 dark:text-green-300">Total Amount</p>
                <p className="text-lg font-bold text-green-800 dark:text-green-200">
                  ₹{parseFloat(amount).toLocaleString()}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-8 text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isValid || (isUpdate && !hasChanged)}
                className="flex-1 h-8 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {isUpdate ? (hasChanged ? 'Update' : 'No Change') : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
