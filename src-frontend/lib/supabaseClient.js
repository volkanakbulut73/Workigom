import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,       // Kullanıcının oturumu tarayıcıda saklansın
    storage: localStorage,      // Session bilgisi localStorage'da tutulsun
    autoRefreshToken: true,     // Token süresi dolarsa otomatik yenilensin
    detectSessionInUrl: true,   // OAuth yönlendirmelerinde session yakalansın
  },
});
