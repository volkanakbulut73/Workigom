import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Users, Calendar, Phone, Mail, MapPin, ArrowLeft, Briefcase } from "lucide-react";
import { AssignedPersonnel } from "../../lib/mockData";

interface GelenPersonellerPageProps {
  onNavigate: (page: string) => void;
}

export function GelenPersonellerPage({ onNavigate }: GelenPersonellerPageProps) {
  const [assignedPersonnel, setAssignedPersonnel] = useState<AssignedPersonnel[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [filteredPersonnel, setFilteredPersonnel] = useState<AssignedPersonnel[]>([]);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    // Şirket bilgisini al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const companyId = currentUser.id || 'COMP001';
    setCompanyName(currentUser.name || 'Test Şirketi');
    
    // Atanan personelleri yükle
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const companyAssigned = assigned.filter((p: AssignedPersonnel) => 
      p.companyId === companyId || (!p.companyId && companyId === 'COMP001')
    );
    
    // En son atananlar en başta
    const sortedAssigned = companyAssigned.sort((a: AssignedPersonnel, b: AssignedPersonnel) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );
    
    setAssignedPersonnel(sortedAssigned);
    
    // Varsayılan olarak bu ay
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
  }, []);

  useEffect(() => {
    if (!selectedMonth) {
      setFilteredPersonnel(assignedPersonnel);
      return;
    }

    const filtered = assignedPersonnel.filter(p => {
      const assignedDate = new Date(p.assignedAt);
      const assignedMonthKey = `${assignedDate.getFullYear()}-${String(assignedDate.getMonth() + 1).padStart(2, '0')}`;
      return assignedMonthKey === selectedMonth;
    });
    
    setFilteredPersonnel(filtered);
  }, [selectedMonth, assignedPersonnel]);

  // Ay listesi oluştur (son 12 ay)
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
      options.push({ value: monthKey, label: monthName });
    }
    
    return options;
  };

  const getMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 lg:p-6 flex items-center gap-3 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('company-home')}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-[#012840]">Gelen Personeller</h2>
            <p className="text-sm text-[#0367A6]">{companyName}</p>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-4">
        {/* Ay Seçici ve İstatistikler */}
        <Card className="p-5 border-0 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0367A6]" />
                <h3 className="text-[#012840]">Ay Seçin</h3>
              </div>
              <Badge className="bg-[#3F9BBF] text-white border-0">
                {filteredPersonnel.length} Personel
              </Badge>
            </div>
            
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ay seçin" />
              </SelectTrigger>
              <SelectContent>
                {getMonthOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* İstatistik Özeti */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#C9E2F2]/30 rounded-lg p-3">
                  <div className="text-sm text-[#0367A6] mb-1">Bu Ay</div>
                  <div className="text-2xl font-semibold text-[#012840]">{filteredPersonnel.length}</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3">
                  <div className="text-sm text-emerald-600 mb-1">Toplam</div>
                  <div className="text-2xl font-semibold text-emerald-700">{assignedPersonnel.length}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Personel Listesi */}
        {filteredPersonnel.length === 0 ? (
          <Card className="p-12 border-0 shadow-md text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Personel Bulunamadı</h3>
            <p className="text-gray-600">{selectedMonth ? getMonthLabel(selectedMonth) : 'Bu dönem'} için atanan personel yok</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredPersonnel.map((personnel, index) => (
              <Card 
                key={personnel.id}
                className="border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {personnel.personnelName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#012840] mb-1">{personnel.personnelName}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-[#0367A6]" />
                          <p className="text-sm text-[#0367A6]">{personnel.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      personnel.status === 'completed' 
                        ? 'bg-green-100 text-green-700 border-0' 
                        : 'bg-blue-100 text-blue-700 border-0'
                    }>
                      {personnel.status === 'completed' ? 'Tamamlandı' : 'Atandı'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{personnel.personnelPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{personnel.personnelEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Başlangıç: {personnel.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Atandı: {new Date(personnel.assignedAt).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
