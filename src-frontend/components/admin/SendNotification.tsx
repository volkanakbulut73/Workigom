
import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Bell, Users, Building2, UserCheck, Send, AlertTriangle, Loader2 } from "lucide-react";
import { adminAPI } from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";

export function SendNotification() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [targetType, setTargetType] = useState<string>('ALL');
  const [targetId, setTargetId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Check if user has admin access
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('❌ Please login to access this feature');
      return;
    }
    if (!isAdmin) {
      toast.error('❌ Admin access required');
      return;
    }
  }, [isAuthenticated, isAdmin]);

  // Fetch users for the dropdown when targetType changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') {
        try {
          const response = await adminAPI.getUsers();
          
          if (response.success) {
            const filteredUsers = response.data.filter((u: any) => 
              targetType === 'SINGLE_INDIVIDUAL' 
                ? u.role === 'INDIVIDUAL' 
                : u.role === 'CORPORATE'
            );
            setUsers(filteredUsers);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('❌ Failed to load users');
        }
      }
    };

    fetchUsers();
  }, [targetType]);

  const handleSend = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('❌ Please enter notification title');
      return;
    }
    if (!message.trim()) {
      toast.error('❌ Please enter notification message');
      return;
    }
    if ((targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') && !targetId) {
      toast.error('❌ Please select target user/company');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        targetType,
        targetId: targetId || undefined,
        title,
        message,
        link: link || undefined
      };

      const response = await adminAPI.sendNotification(payload);

      if (response.success) {
        const targetCount = response.data.count;
        const targetLabel = 
          targetType === 'ALL' ? 'All users' :
          targetType === 'ALL_INDIVIDUALS' ? 'All individual users' :
          targetType === 'ALL_COMPANIES' ? 'All corporate users' :
          targetType === 'SINGLE_INDIVIDUAL' ? 'Selected individual user' :
          'Selected corporate user';

        toast.success(`✅ Notification sent!`, {
          description: `${targetLabel} (${targetCount} users)`
        });

        // Clear form
        setTitle('');
        setMessage('');
        setLink('');
        setTargetType('ALL');
        setTargetId('');
      }
    } catch (error: any) {
      console.error('Send notification error:', error);
      // Error is already handled by API interceptor
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

  // Don't render if not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <Card className="p-12 bg-white border-0 shadow-sm text-center">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">Admin access required to send notifications</p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Bell className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Send Notification</h1>
          <p className="text-gray-600">Send bulk or individual notifications to users</p>
        </div>
      </div>

      <Card className="p-6 bg-white border-0 shadow-sm">
        <div className="space-y-6">
          {/* Target Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <Select value={targetType} onValueChange={setTargetType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>All Users</span>
                  </div>
                </SelectItem>
                <SelectItem value="ALL_INDIVIDUALS">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>All Individual Users</span>
                  </div>
                </SelectItem>
                <SelectItem value="ALL_COMPANIES">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>All Corporate Users</span>
                  </div>
                </SelectItem>
                <SelectItem value="SINGLE_INDIVIDUAL">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Specific Individual User</span>
                  </div>
                </SelectItem>
                <SelectItem value="SINGLE_COMPANY">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Specific Corporate User</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User/Company Selection */}
          {(targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {targetType === 'SINGLE_INDIVIDUAL' ? 'Select User' : 'Select Company'} <span className="text-red-500">*</span>
              </label>
              <Select value={targetId} onValueChange={setTargetId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={targetType === 'SINGLE_INDIVIDUAL' ? 'Select user' : 'Select company'} />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-users" disabled>
                      No users found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Notification Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g: Important Announcement"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
          </div>

          {/* Notification Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification content here..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{message.length}/500 characters</p>
          </div>

          {/* Link (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link (Optional)
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g: /settings or https://blog.workigom.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Page where users will be redirected (optional)</p>
          </div>

          {/* Preview */}
          {(title || message) && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notification Preview
              </h4>
              <Card className="p-4 bg-white border-0 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {title || 'Notification Title'}
                      </h4>
                      <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {message || 'Your notification message...'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600 text-white border-0 text-xs">
                        Admin
                      </Badge>
                      <span className="text-xs text-gray-500">Now</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Send Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSend}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Notification
                </>
              )}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 h-12"
              disabled={loading}
            >
              Clear
            </Button>
          </div>

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Notifications will appear in users' notifications page</li>
                  <li>If you add a link, users will be redirected there when clicking the notification</li>
                  <li>All notifications are shown with an "Admin" label</li>
                  <li>Sent notifications cannot be recalled</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
