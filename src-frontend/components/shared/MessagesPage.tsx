import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { MessageSquare, Search, Send, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Avatar } from "../ui/avatar";

interface MessagesPageProps {
  role: 'individual' | 'corporate';
  onNavigate: (page: string, jobId?: string) => void;
}

export function MessagesPage({ role, onNavigate }: MessagesPageProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');

  const conversations = role === 'individual' ? [
    {
      id: '1',
      name: 'Gurme Mutfak',
      role: 'İşveren',
      lastMessage: 'Yarın saat 14:00\'da görüşürüz',
      time: '10:30',
      isNew: true,
      unreadCount: 2,
      avatar: 'GM',
    },
    {
      id: '2',
      name: 'Cafe İstanbul',
      role: 'İşveren',
      lastMessage: 'Başvurunuz değerlendirildi',
      time: 'Dün',
      isNew: true,
      unreadCount: 1,
      avatar: 'Cİ',
    },
    {
      id: '3',
      name: 'Temizlik A.Ş.',
      role: 'İşveren',
      lastMessage: 'Teşekkürler, görüşmek üzere',
      time: '2 gün önce',
      isNew: false,
      unreadCount: 0,
      avatar: 'TA',
    },
  ] : [
    {
      id: '1',
      name: 'Mehmet Yılmaz',
      role: 'Çalışan',
      lastMessage: 'Tamam, yarın orada olacağım',
      time: '10:30',
      isNew: true,
      unreadCount: 1,
      avatar: 'MY',
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      role: 'Çalışan',
      lastMessage: 'İş başvurusu hakkında konuşabilir miyiz?',
      time: 'Dün',
      isNew: true,
      unreadCount: 3,
      avatar: 'AD',
    },
    {
      id: '3',
      name: 'Can Öztürk',
      role: 'Çalışan',
      lastMessage: 'Çok teşekkür ederim',
      time: '2 gün önce',
      isNew: false,
      unreadCount: 0,
      avatar: 'CÖ',
    },
  ];

  const currentChat = conversations.find(c => c.id === selectedChat);

  const messages = selectedChat === '1' ? [
    {
      id: '1',
      sender: role === 'individual' ? 'Gurme Mutfak' : 'Mehmet Yılmaz',
      text: 'Merhaba, başvurunuzu inceledik',
      time: '09:15',
      isMine: false,
    },
    {
      id: '2',
      sender: 'Ben',
      text: 'Teşekkür ederim',
      time: '09:20',
      isMine: true,
    },
    {
      id: '3',
      sender: role === 'individual' ? 'Gurme Mutfak' : 'Mehmet Yılmaz',
      text: role === 'individual' 
        ? 'Yarın saat 14:00\'da görüşürüz' 
        : 'Tamam, yarın orada olacağım',
      time: '10:30',
      isMine: false,
    },
  ] : [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6" />
            <h1 className="text-white">Mesajlar</h1>
          </div>
          <p className="text-white/80 text-sm">Sohbetlerinizi yönetin</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 mt-4">
        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 border-0 shadow-md overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-[#C9E2F2]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3F9BBF]" />
                <Input
                  placeholder="Ara..."
                  className="pl-10 border-[#C9E2F2] focus:border-[#0367A6]"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`p-4 border-b border-[#C9E2F2] cursor-pointer transition-colors ${
                    selectedChat === conv.id 
                      ? 'bg-[#C9E2F2]/30' 
                      : 'hover:bg-[#C9E2F2]/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center text-white flex-shrink-0">
                      <span>{conv.avatar}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#012840] truncate">{conv.name}</h4>
                          <p className="text-xs text-[#3F9BBF]">{conv.role}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-xs text-[#3F9BBF]">{conv.time}</span>
                          {conv.unreadCount > 0 && (
                            <Badge className="bg-[#0367A6] text-white border-0 text-xs h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-[#0367A6] truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="hidden lg:flex lg:col-span-2 border-0 shadow-md flex-col overflow-hidden">
            {selectedChat && currentChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-[#C9E2F2] bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center text-white">
                        <span className="text-sm">{currentChat.avatar}</span>
                      </div>
                      <div>
                        <h4 className="text-[#012840]">{currentChat.name}</h4>
                        <p className="text-xs text-[#3F9BBF]">{currentChat.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-[#0367A6]">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[#0367A6]">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[#0367A6]">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FBFD]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.isMine
                            ? 'bg-gradient-to-br from-[#0367A6] to-[#012840] text-white rounded-br-sm'
                            : 'bg-white text-[#012840] rounded-bl-sm shadow-sm'
                        }`}
                      >
                        <p className="text-sm mb-1">{message.text}</p>
                        <span className={`text-xs ${message.isMine ? 'text-white/70' : 'text-[#3F9BBF]'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-[#C9E2F2] bg-white">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Mesajınızı yazın..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-[#C9E2F2] focus:border-[#0367A6]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-[#C9E2F2]" />
                  <h3 className="text-[#012840] mb-2">Sohbet Seçin</h3>
                  <p className="text-[#0367A6]">Mesajlaşmaya başlamak için bir sohbet seçin</p>
                </div>
              </div>
            )}
          </Card>

          {/* Mobile Chat View - Full Screen */}
          {selectedChat && (
            <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col">
              {/* Mobile Chat Header */}
              <div className="p-4 border-b border-[#C9E2F2] bg-gradient-to-br from-[#012840] to-[#0367A6]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedChat(null)}
                      className="text-white hover:bg-white/10"
                    >
                      ←
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <span className="text-sm">{currentChat?.avatar}</span>
                    </div>
                    <div>
                      <h4 className="text-white">{currentChat?.name}</h4>
                      <p className="text-xs text-white/70">{currentChat?.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FBFD]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.isMine
                          ? 'bg-gradient-to-br from-[#0367A6] to-[#012840] text-white rounded-br-sm'
                          : 'bg-white text-[#012840] rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <p className="text-sm mb-1">{message.text}</p>
                      <span className={`text-xs ${message.isMine ? 'text-white/70' : 'text-[#3F9BBF]'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Message Input */}
              <div className="p-4 border-t border-[#C9E2F2] bg-white">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Mesajınızı yazın..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-[#C9E2F2] focus:border-[#0367A6]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
