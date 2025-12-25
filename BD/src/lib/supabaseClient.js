// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ucvjrnrjeskhnjntdmrv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdmpybnJqZXNraG5qbnRkbXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2MTkyMjcsImV4cCI6MjA4MjE5NTIyN30.w7AEpRbmZzZ-wO3ogqwCsp84iu98CrFqoElEu8MHsoo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
