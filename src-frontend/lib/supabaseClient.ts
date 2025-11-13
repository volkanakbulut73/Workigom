// src-frontend/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Vite ortam değişkenlerini al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Güvenlik: frontend için sadece anon key kullanılmalı
// (Service role kesinlikle burada olmamalı)

// Tarayıcı ortam kontrolü
const isBrowser = typeof window !== "undefined";

if (!supabaseUrl || !supabaseAnonKey) {
  // Deployment pipeline'ınızda fail-fast istiyorsanız throw tercih edilebilir;
  // geliştirme sürecinde build hatalarını önlemek için uyarı yazıyoruz.
  console.warn(
    "VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY bulunamadı. Supabase bağlantısı yapılandırılmamış olabilir."
  );
}

// Güvenli storage: yalnızca tarayıcıdaysak localStorage kullan
const storage = isBrowser ? window.localStorage : undefined;

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
  {
    auth: {
      persistSession: Boolean(isBrowser),
      storage, // undefined ise in-memory davranışı olur
      autoRefreshToken: true,
      detectSessionInUrl: Boolean(isBrowser),
    },
  }
);

// Geliştirme sırasında global erişim (yalnızca DEV)
if (isBrowser && import.meta.env.DEV) {
  // @ts-ignore - debug amaçlı
  window.supabase = supabase;
}
