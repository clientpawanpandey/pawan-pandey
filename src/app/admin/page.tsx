'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AmountInputModal } from '@/components/amount-input-modal'
import { PaymentModal } from '@/components/payment-modal'
import { 
  getLeads, 
  getTodaysLeads, 
  getPreviousLeads, 
  getLeadStats, 
  updateLeadStatus, 
  updateLeadPriority,
  updatePaymentStatus,
  updateLeadAmount,
  deleteLead,
  type Lead, 
  type LeadStats,
  type LeadStatus,
  type LeadPriority,
  type PaymentData
} from '@/lib/actions'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle,
  Search,
  DollarSign,
  Target,
  Activity,
  CreditCard,
  Banknote,
  QrCode,
  Edit,
  ChevronDown,
  ChevronUp,
  Trash2,
  Sun,
  Moon,
  Monitor,
  MoreVertical
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [todaysLeads, setTodaysLeads] = useState<Lead[]>([])
  const [previousLeads, setPreviousLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'today' | 'previous' | 'all'>('today')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all')
  const [updatingLead, setUpdatingLead] = useState<string | null>(null)
  const [deletingLead, setDeletingLead] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  
  // Amount Input Modal State with update support
  const [amountModal, setAmountModal] = useState<{
    isOpen: boolean
    leadId: string
    leadName: string
    existingAmount?: number
    isUpdate?: boolean
  }>({
    isOpen: false,
    leadId: '',
    leadName: '',
    existingAmount: undefined,
    isUpdate: false
  })

  // Payment Modal State  
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    leadId: string
    leadName: string
    amount: number
  }>({
    isOpen: false,
    leadId: '',
    leadName: '',
    amount: 0
  })

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [allLeadsResult, todaysResult, previousResult, statsResult] = await Promise.all([
        getLeads(),
        getTodaysLeads(),
        getPreviousLeads(),
        getLeadStats()
      ])

      if (allLeadsResult.success) setLeads(allLeadsResult.data || [])
      if (todaysResult.success) setTodaysLeads(todaysResult.data || [])
      if (previousResult.success) setPreviousLeads(previousResult.data || [])
      if (statsResult.success) setStats(statsResult.data || null)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete lead function
  const handleDeleteLead = async (leadId: string) => {
    setDeletingLead(leadId)
    try {
      const result = await deleteLead(leadId)
      if (result.success) {
        await fetchData()
        setExpandedCard(null)
      }
    } catch (error) {
      console.error('Error deleting lead:', error)
    } finally {
      setDeletingLead(null)
    }
  }

  const handleAmountUpdate = (leadId: string, leadName: string, currentAmount?: number) => {
    setAmountModal({
      isOpen: true,
      leadId,
      leadName,
      existingAmount: currentAmount,
      isUpdate: true
    })
  }

  const handleStatusUpdate = async (leadId: string, status: LeadStatus, amount?: number, notes?: string) => {
    setUpdatingLead(leadId)
    try {
      const result = await updateLeadStatus(leadId, status, amount, notes)
      if (result.success) {
        await fetchData()
        
        if (status === 'done') {
          const lead = [...leads, ...todaysLeads, ...previousLeads].find(l => l.id === leadId)
          if (lead) {
            setAmountModal({
              isOpen: true,
              leadId,
              leadName: lead.name,
              isUpdate: false
            })
          }
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdatingLead(null)
    }
  }

  const handleAmountOnlyUpdate = async (leadId: string, newAmount: number) => {
    try {
      const result = await updateLeadAmount(leadId, newAmount)
      if (result.success) {
        await fetchData()
        setAmountModal({ isOpen: false, leadId: '', leadName: '', existingAmount: undefined, isUpdate: false })
      }
    } catch (error) {
      console.error('Error updating amount:', error)
    }
  }

  const handleAmountSubmit = (amount: number) => {
    setAmountModal({ isOpen: false, leadId: '', leadName: '', existingAmount: undefined, isUpdate: false })
    setPaymentModal({
      isOpen: true,
      leadId: amountModal.leadId,
      leadName: amountModal.leadName,
      amount
    })
  }

  const handlePaymentCollection = (leadId: string, leadName: string, amount?: number) => {
    setPaymentModal({
      isOpen: true,
      leadId,
      leadName,
      amount: amount || 0
    })
  }

  const handlePaymentComplete = async (paymentData: PaymentData) => {
    try {
      const result = await updatePaymentStatus(paymentData)
      if (result.success) {
        await fetchData()
        setPaymentModal({ isOpen: false, leadId: '', leadName: '', amount: 0 })
      }
    } catch (error) {
      console.error('Error updating payment:', error)
    }
  }

  const handlePriorityUpdate = async (leadId: string, priority: LeadPriority) => {
    try {
      const result = await updateLeadPriority(leadId, priority)
      if (result.success) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'contacted': return 'bg-blue-500'
      case 'qualified': return 'bg-purple-500'
      case 'converted': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'done': return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: LeadPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCurrentLeads = () => {
    let currentLeads: Lead[] = []
    
    switch (activeTab) {
      case 'today':
        currentLeads = todaysLeads
        break
      case 'previous':
        currentLeads = previousLeads
        break
      case 'all':
        currentLeads = leads
        break
    }

    return currentLeads.filter(lead => {
      const matchesSearch = !searchTerm || 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }

  const QuickActionButtons = ({ lead }: { lead: Lead }) => (
    <div className="grid grid-cols-3 gap-2 mt-3">
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`tel:${lead.phone}`)}
        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-xs px-2 py-1"
      >
        <Phone className="h-3 w-3 mr-1" />
        Call
      </Button>
      {lead.email ? (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(`mailto:${lead.email}`)}
          className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-xs px-2 py-1"
        >
          <Mail className="h-3 w-3 mr-1" />
          Email
        </Button>
      ) : (
        <div></div>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://wa.me/91${lead.phone}?text=Hi ${lead.name}, regarding your ${lead.service} service request...`, '_blank')}
        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-xs px-2 py-1"
      >
        <MessageCircle className="h-3 w-3 mr-1" />
        WhatsApp
      </Button>
    </div>
  )

  const ThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {darkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDarkMode(false)}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDarkMode(true)}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          setDarkMode(prefersDark)
        }}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const LeadActionsMenu = ({ lead }: { lead: Lead }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAmountUpdate(lead.id!, lead.name, lead.amount)}>
          <Edit className="mr-2 h-4 w-4" />
          {lead.amount ? 'Update Amount' : 'Set Amount'}
        </DropdownMenuItem>

        {lead.status !== 'done' && (
          <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id!, 'done')}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark as Done
          </DropdownMenuItem>
        )}

        {lead.status === 'done' && lead.payment_status !== 'completed' && lead.amount && (
          <DropdownMenuItem onClick={() => handlePaymentCollection(lead.id!, lead.name, lead.amount)}>
            <CreditCard className="mr-2 h-4 w-4" />
            Collect Payment
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Lead
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[85vw] max-w-sm mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                This will permanently delete "{lead.name}" and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteLead(lead.id!)}
                className="bg-red-600 hover:bg-red-700 flex-1"
                disabled={deletingLead === lead.id}
              >
                {deletingLead === lead.id ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading lead dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground">Lead Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-lg">Manage leads and collect payments</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={fetchData} variant="outline" size="sm" className="sm:size-default">
            <Activity className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-2 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-400">Total Leads</CardTitle>
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="text-xl sm:text-3xl font-bold text-blue-800 dark:text-blue-400">{stats.total_leads}</div>
                <p className="text-xs text-blue-800 dark:text-blue-400 mt-1">All time</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-600">Today's</CardTitle>
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-800 dark:text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="text-xl sm:text-3xl font-bold text-green-800 dark:text-green-600">{stats.today_leads}</div>
                <p className="text-xs text-green-800 dark:text-green-600 mt-1">New today</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:block"
          >
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-2 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-purple-800 dark:text-purple-600">Paid</CardTitle>
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-800 dark:text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="text-xl sm:text-3xl font-bold text-purple-800 dark:text-purple-600">{stats.paid_leads}</div>
                <p className="text-xs text-purple-800 dark:text-purple-600 mt-1">Completed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2 sm:col-span-1"
          >
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-2 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-orange-800 dark:text-orange-600">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-orange-800 dark:text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="text-lg sm:text-3xl font-bold text-orange-800 dark:text-orange-600">₹{stats.total_revenue?.toLocaleString() || 0}</div>
                <p className="text-xs text-orange-800 dark:text-orange-600 mt-1">From payments</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-red-800 dark:text-red-600">Pending</CardTitle>
                  <AlertCircle className="h-5 w-5 text-red-800 dark:text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-800 dark:text-red-600">₹{stats.pending_revenue?.toLocaleString() || 0}</div>
                <p className="text-xs text-red-800 dark:text-red-600 mt-1">Awaiting</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Always Visible Filters */}
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
          {[
            { key: 'today', label: `Today (${todaysLeads.length})` },
            { key: 'previous', label: `Previous (${previousLeads.length})` },
            { key: 'all', label: `All (${leads.length})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm min-w-[120px] bg-black/20"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      <AnimatePresence mode="wait">
        <div className="space-y-4">
          {getCurrentLeads().map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardHeader className="pb-3 px-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold pr-2 flex-1">{lead.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 flex-wrap">
                          <Badge className={`${getStatusColor(lead.status)} text-white text-xs`}>
                            {lead.status}
                          </Badge>
                          {lead.payment_status && (
                            <Badge className={`${getPaymentStatusColor(lead.payment_status)} text-white text-xs`}>
                              {lead.payment_status === 'completed' ? 'Paid' : 'Pending'}
                            </Badge>
                          )}
                        </div>
                        <LeadActionsMenu lead={lead} />
                      </div>
                    </div>

                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="font-medium">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.created_at!).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{lead.service}</Badge>
                          <Badge className={`${getPriorityColor(lead.priority)} text-white text-xs`}>
                            {lead.priority}
                          </Badge>
                          {lead.amount && lead.amount > 0 && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                              ₹{lead.amount.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setExpandedCard(expandedCard === lead.id ? null : lead.id!)}
                          className="p-1"
                        >
                          {expandedCard === lead.id ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </CardDescription>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedCard === lead.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="pt-0 px-4 space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Message:</h4>
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">{lead.message}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <h4 className="font-semibold mb-1 text-sm">Service Address:</h4>
                            <p className="text-sm text-muted-foreground">{lead.address}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              Pincode: {lead.pincode}
                            </p>
                          </div>
                          
                          {(lead.amount || lead.payment_amount) && (
                            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                              {lead.amount && lead.amount > 0 && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-green-800 dark:text-green-300">Service Amount:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{lead.amount.toLocaleString()}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAmountUpdate(lead.id!, lead.name, lead.amount)}
                                      className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 p-1 h-6"
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {lead.payment_amount && lead.payment_amount > 0 && (
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-green-300 dark:border-green-700">
                                  <span className="text-sm font-medium text-green-800 dark:text-green-300">Payment Received:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{lead.payment_amount.toLocaleString()}</span>
                                    {lead.payment_method === 'cash' && <Banknote className="h-3 w-3 text-green-600 dark:text-green-400" />}
                                    {lead.payment_method === 'online' && <QrCode className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {lead.notes && (
                          <div>
                            <h4 className="font-semibold mb-1 text-sm">Notes:</h4>
                            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">{lead.notes}</p>
                          </div>
                        )}

                        <QuickActionButtons lead={lead} />

                        <div className="space-y-3 pt-3 border-t">
                          <div className="flex flex-wrap gap-2">
                            {lead.status !== 'done' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(lead.id!, 'done')}
                                disabled={updatingLead === lead.id}
                                className="bg-green-600 hover:bg-green-700 flex-1 min-w-[120px]"
                              >
                                {updatingLead === lead.id ? 'Updating...' : 'Mark as Done'}
                              </Button>
                            )}
                            
                            {lead.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(lead.id!, 'contacted')}
                                disabled={updatingLead === lead.id}
                                className="flex-1 min-w-[120px]"
                              >
                                Mark Contacted
                              </Button>
                            )}

                            {lead.status === 'done' && lead.payment_status !== 'completed' && lead.amount && (
                              <Button
                                size="sm"
                                onClick={() => handlePaymentCollection(lead.id!, lead.name, lead.amount)}
                                className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[120px]"
                              >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Collect Payment
                              </Button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Priority:</span>
                            <select
                              value={lead.priority}
                              onChange={(e) => handlePriorityUpdate(lead.id!, e.target.value as LeadPriority)}
                              className="px-3 py-1 text-sm rounded border border-input bg-background flex-1"
                            >
                              <option value="low">Low Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="high">High Priority</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground pt-3 border-t space-y-1">
                          <div>Submitted: {new Date(lead.created_at!).toLocaleString('en-IN')}</div>
                          {lead.marked_done_at && (
                            <div className="text-green-600 dark:text-green-400">
                              Completed: {new Date(lead.marked_done_at).toLocaleString('en-IN')}
                            </div>
                          )}
                          {lead.payment_date && (
                            <div className="text-blue-600 dark:text-blue-400">
                              Paid: {new Date(lead.payment_date).toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}

          {getCurrentLeads().length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No leads found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your filters or search terms.' 
                    : 'No leads available for the selected time period.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </AnimatePresence>

      {/* Modals */}
      <AmountInputModal
        isOpen={amountModal.isOpen}
        onClose={() => setAmountModal({ isOpen: false, leadId: '', leadName: '', existingAmount: undefined, isUpdate: false })}
        leadId={amountModal.leadId}
        leadName={amountModal.leadName}
        onAmountSubmit={amountModal.isUpdate ? handleAmountOnlyUpdate.bind(null, amountModal.leadId) : handleAmountSubmit}
        existingAmount={amountModal.existingAmount}
        isUpdate={amountModal.isUpdate}
      />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, leadId: '', leadName: '', amount: 0 })}
        leadId={paymentModal.leadId}
        leadName={paymentModal.leadName}
        amount={paymentModal.amount}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  )
}
