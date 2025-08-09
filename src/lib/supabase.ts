import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ContactRequest = {
  id?: string
  name: string
  phone: string
  email?: string
  service: string
  message: string
  pincode: number // Changed from optional to required number
  address: string // Changed from optional to required string
  createdat?: string
}
