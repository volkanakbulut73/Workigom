import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Bell, Users, Building2, UserCheck, Send, AlertTriangle, Loader2 } from "lucide-react";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export function SendNotificationForm() {
  const [targetType, setTargetType] = useState<string>('ALL');
  const [targetId, setTargetId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Fetch users for the dropdown when targetType changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          const filteredUsers = response.data.data.filter((u: any) => 
            targetType === 'SINGLE_INDIVIDUAL' 
              ? u.role === 'INDIVIDUAL' 
              : u.role === 'CORPORATE'
          );
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('Kullanıcılar yüklenirken hata oluştu');
        }
      }
    };

    fetchUsers();
  }, [targetType]);

  const handleSend = async () => {
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

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        targetType,
        targetId: targetId || undefined,
        title,
        message,
        link: link || undefined
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/admin/send-notification`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const targetCount = response.data.data.count;
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
      }
    } catch (error: any) {
      console.error('Send notification error:', error);
      const errorMessage = error.response?.data?.error || 'Bildirim gönderilirken hata oluştu';
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
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
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Bell className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Bildirim Gönder</h1>
          <p className="text-gray-600">Kullanıcılara toplu veya bireysel bildirim gönderin</p>
        </div>
      </div>

      <Card className="p-6 bg-white border-0 shadow-sm">
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
              <Select value={targetId} onValueChange={setTargetId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={targetType === 'SINGLE_INDIVIDUAL' ? 'Kullanıcı seçin' : 'Şirket seçin'} />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-users" disabled>
                      Kullanıcı bulunamadı
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
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
          <div className="flex gap-3">
            <Button
              onClick={handleSend}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Bildirimi Gönder
                </>
              )}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 h-12"
              disabled={loading}
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
