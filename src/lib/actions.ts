'use server'

import { supabase } from './supabase'

export type LeadStatus = 'pending' | 'contacted' | 'qualified' | 'converted' | 'rejected' | 'done'
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent'
export type PaymentMethod = 'cash' | 'online' | 'pending'
export type PaymentStatus = 'pending' | 'completed' | 'failed'



export interface Lead {
  id?: string
  name: string
  phone: string
  email?: string
  service: string
  message: string
  pincode: number
  address: string
  amount?: number
  status: LeadStatus
  priority: LeadPriority
  notes?: string
  source?: string
  created_at?: string
  updated_at?: string
  marked_done_at?: string
  payment_method?: PaymentMethod
  payment_status: PaymentStatus
  payment_amount?: number
  upi_id?: string
  payment_date?: string
}

export interface LeadStats {
  total_leads: number
  today_leads: number
  this_week_leads: number
  completed_leads: number
  pending_leads: number
  paid_leads: number
  avg_payment_amount: number
  total_revenue: number
  pending_revenue: number
}


export interface PaymentData {
  leadId: string
  paymentMethod: 'cash' | 'online'
  paymentStatus: 'completed'
  paymentAmount: number
  upiId?: string
  paymentDate: string
}


export async function getLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch leads')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Get leads error:', error)
    return { success: false, error: 'Failed to fetch leads' }
  }
}

export async function getTodaysLeads() {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lte('created_at', `${today}T23:59:59.999Z`)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch today\'s leads')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Get today\'s leads error:', error)
    return { success: false, error: 'Failed to fetch today\'s leads' }
  }
}

export async function getPreviousLeads() {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .lt('created_at', `${today}T00:00:00.000Z`)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch previous leads')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Get previous leads error:', error)
    return { success: false, error: 'Failed to fetch previous leads' }
  }
}

export async function getLeadStats(): Promise<{ success: boolean; data?: LeadStats; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('lead_stats')
      .select('*')
      .single()

    if (error) {
      throw new Error('Failed to fetch lead stats')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Get lead stats error:', error)
    return { success: false, error: 'Failed to fetch lead stats' }
  }
}

export async function updateLeadStatus(leadId: string, status: LeadStatus, amount?: number, notes?: string) {
  try {
    const updateData: any = { 
      status,
      notes: notes || null
    }

    if (amount !== undefined) {
      updateData.amount = amount
    }

    if (status === 'done') {
      updateData.marked_done_at = new Date().toISOString()
      // When marking as done, set payment as pending if amount is provided
      if (amount && amount > 0) {
        updateData.payment_status = 'pending'
        updateData.payment_method = 'pending'
      }
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update lead status')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Update lead status error:', error)
    return { success: false, error: 'Failed to update lead status' }
  }
}

export async function updatePaymentStatus(paymentData: PaymentData) {
  try {
    const updateData = {
      payment_method: paymentData.paymentMethod,
      payment_status: paymentData.paymentStatus,
      payment_amount: paymentData.paymentAmount,
      payment_date: paymentData.paymentDate,
      upi_id: paymentData.upiId || null,
      // Also update the lead status to done if not already
      status: 'done' as LeadStatus,
      marked_done_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', paymentData.leadId)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update payment status')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Update payment status error:', error)
    return { success: false, error: 'Failed to update payment status' }
  }
}



export async function updateLeadPriority(leadId: string, priority: LeadPriority) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ priority })
      .eq('id', leadId)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update lead priority')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Update lead priority error:', error)
    return { success: false, error: 'Failed to update lead priority' }
  }
}

// Keep the existing submitContactForm function but update it to use leads table
export async function submitContactForm(data: {
  name: string;
  phone: string;
  email: string; // Now expects string (can be empty)
  service: string;
  message: string;
  pincode: number;
  address: string;
}) {
  try {
    const { data: result, error } = await supabase
      .from('leads')
      .insert([{
        ...data,
        email: data.email || null, // Convert empty string to null for database
        status: 'pending' as LeadStatus,
        priority: 'medium' as LeadPriority,
        source: 'website'
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to submit contact form')
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Submit contact form error:', error)
    return { success: false, error: 'Failed to submit contact form' }
  }
}


export async function deleteLead(leadId: string) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId)

    if (error) {
      throw new Error('Failed to delete lead')
    }

    return { success: true }
  } catch (error) {
    console.error('Delete lead error:', error)
    return { success: false, error: 'Failed to delete lead' }
  }
}

export async function updateLeadAmount(leadId: string, amount: number) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ amount })
      .eq('id', leadId)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update lead amount')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Update lead amount error:', error)
    return { success: false, error: 'Failed to update lead amount' }
  }
}
