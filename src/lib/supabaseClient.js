import { createClient } from '@supabase/supabase-js';

// إذا كان عندك client موجود بالفعل في المشروع، استخدمه وغيّر مسار الـ import في services فقط
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
