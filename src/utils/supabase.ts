import { createClient } from '@supabase/supabase-js';

// استخدام القيم المباشرة لضمان عمل الموقع في الإنتاج
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://otonwcoxabgnmdnflfpj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90b253Y294YWJnbm1kbmZsZnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjI0NzQsImV4cCI6MjA2OTkzODQ3NH0.Dq_KJucjPcQybYiodiq-lV9NQCRc_5oMzUdx8UFoSEQ';

console.log('Supabase Configuration:');
console.log('URL:', supabaseUrl ? 'Configured' : 'Missing');
console.log('Key:', supabaseAnonKey ? 'Configured' : 'Missing');

// إنشاء العميل مع معالجة الأخطاء
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
});

// دالة للتحقق من الاتصال
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};