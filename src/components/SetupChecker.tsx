import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../utils/supabase/client';

export function SetupChecker() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    // Check if user has previously dismissed the warning
    const wasDismissed = localStorage.getItem('supabase-setup-dismissed') === 'true';
    
    if (!configured && !wasDismissed) {
      // Show warning after 3 seconds
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [configured]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('supabase-setup-dismissed', 'true');
  };

  if (configured || !show || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#0367A6] rounded-2xl p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🔧</div>
          <div className="flex-1">
            <h3 className="font-bold text-[#012840] mb-2 text-lg">
              Supabase Database Kurulumu
            </h3>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              Uygulamanın tüm özelliklerini kullanabilmek için Supabase database schema'sını kurmanız gerekiyor.
            </p>
            <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Hızlı Kurulum (5 dakika):</strong>
              </p>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                <li>Supabase projesini açın</li>
                <li>SQL Editor'e gidin</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">001_initial_schema.sql</code> dosyasını çalıştırın</li>
                <li>Test kullanıcılarını oluşturun</li>
              </ol>
            </div>
            <div className="flex gap-2">
              <a
                href="SUPABASE_ADIM_ADIM_REHBER.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0367A6] hover:bg-[#012840] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                📖 Detaylı Rehber
              </a>
              <button
                onClick={handleDismiss}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium"
              >
                Sonra Kur
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
