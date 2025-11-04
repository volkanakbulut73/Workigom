// src-frontend/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Vite ortam değişkenlerini al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Env değişkenleri yoksa hata fırlat
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ortam değişkenleri tanımlı değil!"
  );
}

// Supabase client oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // Kullanıcının oturumunu tarayıcıda sakla
    storage: localStorage,  // Token'ı localStorage'da tut
    autoRefreshToken: true, // Token süresi dolarsa otomatik yenile
    detectSessionInUrl: true, // OAuth yönlendirmelerinde session yakala
  },
});
