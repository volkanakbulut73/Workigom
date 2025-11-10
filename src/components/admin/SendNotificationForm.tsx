import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { Bell, Users, Building2, UserCheck, Send, AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../utils/supabase/client";
import { useAuth } from "../../contexts/AuthContext";

interface UserData {
  id: string;
  email: string;
  full_name: string;
  user_type: 'individual' | 'corporate' | 'admin';
}

export function SendNotificationForm() {
  const { user, profile } = useAuth();
  const [targetType, setTargetType] = useState<string>('ALL');
  const [targetId, setTargetId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using demo data');
        return;
      }

      // Check if user is authenticated
      if (!user) {
        console.error('User not authenticated');
        setAuthError(true);
        toast.error('❌ Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        return;
      }

      setLoadingUsers(true);
      setAuthError(false);
      
      try {
        // Check session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.error('Session error:', sessionError);
          setAuthError(true);
          toast.error('❌ Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          setLoadingUsers(false);
          return;
        }

        // Fetch users with service role or authenticated user
        const { data, error } = await supabase
          .from('users')
          .select('id, email, full_name, user_type')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching users:', error);
          
          // Check if it's an auth error
          if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
            setAuthError(true);
            toast.error('❌ Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          } else {
            toast.error('❌ Kullanıcılar yüklenirken hata oluştu: ' + error.message);
          }
          return;
        }

        if (data) {
          setUsers(data as UserData[]);
          console.log(`✅ ${data.length} kullanıcı yüklendi`);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleRefreshUsers = async () => {
    if (!isSupabaseConfigured()) return;
    
    setLoadingUsers(true);
    setAuthError(false);
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        setAuthError(true);
        toast.error('❌ Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        setLoadingUsers(false);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, user_type')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        if (error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) {
          setAuthError(true);
          toast.error('❌ Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        } else {
          toast.error('❌ Kullanıcılar yüklenirken hata oluştu: ' + error.message);
        }
        return;
      }

      if (data) {
        setUsers(data as UserData[]);
        toast.success(`✅ ${data.length} kullanıcı yenilendi`);
      }
    } catch (error) {
      console.error('Error refreshing users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSend = () => {
    // Validasyon
    if (!title.trim()) {
      toast.error('❌ Lütfen bildirim başlığı girin');
      return;
    }
    if (!message.trim()) {
      toast.error('❌ Lütfen bildirim mesajı girin');
      return;
    }
    if ((targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') && !targetId) {
      toast.error('❌ Lütfen hedef kullanıcı/şirket seçin');
      return;
    }

    // Bildirim oluştur
    const notification = {
      id: Date.now().toString(),
      type: 'admin_announcement',
      icon: 'Bell',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      title,
      message,
      link: link || null,
      time: 'Şimdi',
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
      isNew: true,
      badge: 'Admin',
      badgeColor: 'bg-purple-600',
      sentBy: 'Admin',
      targetType
    };

    // Hedef kullanıcıları belirle
    let targetUsers: UserData[] = [];

    switch (targetType) {
      case 'ALL':
        targetUsers = users;
        break;
      case 'ALL_INDIVIDUALS':
        targetUsers = users.filter((u: UserData) => u.user_type === 'individual');
        break;
      case 'ALL_COMPANIES':
        targetUsers = users.filter((u: UserData) => u.user_type === 'corporate');
        break;
      case 'SINGLE_INDIVIDUAL':
        targetUsers = users.filter((u: UserData) => u.id === targetId && u.user_type === 'individual');
        break;
      case 'SINGLE_COMPANY':
        targetUsers = users.filter((u: UserData) => u.id === targetId && u.user_type === 'corporate');
        break;
    }

    // Her hedef kullanıcı için bildirimi kaydet
    const allNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    targetUsers.forEach(user => {
      allNotifications.push({
        ...notification,
        userId: user.id,
        userRole: user.user_type
      });
    });
    localStorage.setItem('adminNotifications', JSON.stringify(allNotifications));

    // Başarı mesajı
    const targetCount = targetUsers.length;
    const targetLabel = 
      targetType === 'ALL' ? 'Tüm kullanıcılara' :
      targetType === 'ALL_INDIVIDUALS' ? 'Tüm bireysel kullanıcılara' :
      targetType === 'ALL_COMPANIES' ? 'Tüm kurumsal kullanıcılara' :
      targetType === 'SINGLE_INDIVIDUAL' ? 'Seçili bireysel kullanıcıya' :
      'Seçili kurumsal kullanıcıya';

    toast.success(`✅ Bildirim gönderildi!`, {
      description: `${targetLabel} (${targetCount} kullanıcı)`
    });

    // Formu temizle
    setTitle('');
    setMessage('');
    setLink('');
    setTargetType('ALL');
    setTargetId('');
  };

  const handleClear = () => {
    setTitle('');
    setMessage('');
    setLink('');
    setTargetType('ALL');
    setTargetId('');
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Bildirim Gönder</h1>
          <p className="text-sm lg:text-base text-gray-600">Kullanıcılara toplu veya bireysel bildirim gönderin</p>
        </div>
        {isSupabaseConfigured() && (
          <Button
            onClick={handleRefreshUsers}
            disabled={loadingUsers}
            variant="outline"
            size="sm"
            className="hidden sm:flex gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loadingUsers ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        )}
      </div>

      {/* Auth Error Alert */}
      {authError && (
        <div className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-900 mb-1">Oturum Süreniz Dolmuş</p>
                <p className="text-sm text-red-800 mb-3">
                  Kullanıcı listesini görüntülemek için lütfen tekrar giriş yapın.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Sayfayı Yenile ve Tekrar Giriş Yap
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card className="p-4 lg:p-6 bg-white border-0 shadow-sm">
        <div className="space-y-6">
          {/* Hedef Tip Seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hedef Kitle <span className="text-red-500">*</span>
            </label>
            <Select value={targetType} onValueChange={setTargetType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Hedef kitle seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Tüm Kullanıcılar</span>
                  </div>
                </SelectItem>
                <SelectItem value="ALL_INDIVIDUALS">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Tüm Bireysel Kullanıcılar</span>
                  </div>
                </SelectItem>
                <SelectItem value="ALL_COMPANIES">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Tüm Kurumsal Kullanıcılar</span>
                  </div>
                </SelectItem>
                <SelectItem value="SINGLE_INDIVIDUAL">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Belirli Bireysel Kullanıcı</span>
                  </div>
                </SelectItem>
                <SelectItem value="SINGLE_COMPANY">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Belirli Kurumsal Kullanıcı</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Kullanıcı/Şirket Seçimi */}
          {(targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {targetType === 'SINGLE_INDIVIDUAL' ? 'Kullanıcı Seçin' : 'Şirket Seçin'} <span className="text-red-500">*</span>
              </label>
              <Select value={targetId} onValueChange={setTargetId} disabled={loadingUsers || authError}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={
                    authError
                      ? 'Oturum süreniz dolmuş - Lütfen giriş yapın'
                      : loadingUsers 
                        ? 'Kullanıcılar yükleniyor...' 
                        : targetType === 'SINGLE_INDIVIDUAL' 
                          ? 'Kullanıcı seçin' 
                          : 'Şirket seçin'
                  } />
                </SelectTrigger>
                <SelectContent>
                  {authError ? (
                    <div className="p-4 text-sm text-center">
                      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-700 font-medium">Oturum Süreniz Dolmuş</p>
                      <p className="text-red-600 text-xs mt-1">Lütfen sayfayı yenileyip tekrar giriş yapın</p>
                    </div>
                  ) : loadingUsers ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">Yükleniyor...</span>
                    </div>
                  ) : (
                    (() => {
                      const filtered = users.filter((u: UserData) => 
                        targetType === 'SINGLE_INDIVIDUAL' 
                          ? u.user_type === 'individual' 
                          : u.user_type === 'corporate'
                      );
                      
                      if (filtered.length === 0) {
                        return (
                          <div className="p-4 text-sm text-gray-500 text-center">
                            {targetType === 'SINGLE_INDIVIDUAL' 
                              ? '❌ Henüz bireysel kullanıcı yok' 
                              : '❌ Henüz kurumsal kullanıcı yok'}
                          </div>
                        );
                      }
                      
                      return filtered.map((user: UserData) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.full_name} ({user.email})
                        </SelectItem>
                      ));
                    })()
                  )}
                </SelectContent>
              </Select>
              {authError ? (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-red-600">⚠️ Kullanıcı listesi yüklenemedi - Oturum süreniz dolmuş</p>
                  <Button
                    onClick={handleRefreshUsers}
                    size="sm"
                    variant="ghost"
                    className="text-xs h-6 px-2"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Tekrar Dene
                  </Button>
                </div>
              ) : !loadingUsers && users.length > 0 ? (
                <p className="text-xs text-gray-500 mt-1">
                  {users.filter((u: UserData) => 
                    targetType === 'SINGLE_INDIVIDUAL' 
                      ? u.user_type === 'individual' 
                      : u.user_type === 'corporate'
                  ).length} {targetType === 'SINGLE_INDIVIDUAL' ? 'bireysel' : 'kurumsal'} kullanıcı bulundu
                </p>
              ) : null}
            </div>
          )}

          {/* Bildirim Başlığı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bildirim Başlığı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Önemli Duyuru"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 karakter</p>
          </div>

          {/* Bildirim Mesajı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bildirim Mesajı <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Bildirim içeriğinizi buraya yazın..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{message.length}/500 karakter</p>
          </div>

          {/* Link (Opsiyonel) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link (Opsiyonel)
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Örn: /settings veya https://blog.workigom.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Kullanıcının tıklayıp gideceği sayfa (isteğe bağlı)</p>
          </div>

          {/* Önizleme */}
          {(title || message) && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Bildirim Önizlemesi
              </h4>
              <Card className="p-4 bg-white border-0 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {title || 'Bildirim Başlığı'}
                      </h4>
                      <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {message || 'Bildirim mesajınız...'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600 text-white border-0 text-xs">
                        Admin
                      </Badge>
                      <span className="text-xs text-gray-500">Şimdi</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Gönder Butonu */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSend}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12"
            >
              <Send className="w-5 h-5 mr-2" />
              Bildirimi Gönder
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 h-12 sm:w-auto"
            >
              Temizle
            </Button>
          </div>

          {/* Bilgilendirme */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Önemli Bilgiler:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Bildirimler kullanıcıların bildirimler sayfasında görünecektir</li>
                  <li>Link eklerseniz, kullanıcılar bildirimine tıklayarak o sayfaya yönlendirilir</li>
                  <li>Tüm bildirimler "Admin" etiketi ile gösterilir</li>
                  <li>Gönderilen bildirimler geri alınamaz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
