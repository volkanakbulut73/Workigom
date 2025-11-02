import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ArrowLeft, Star, Briefcase, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface ViewApplicationsPageProps {
  onNavigate: (page: string) => void;
}

const mockApplicants = [
  {
    id: '1',
    name: 'John Smith',
    rating: 4.8,
    completedJobs: 15,
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    experience: '3 years in hospitality',
    availability: 'Available tonight'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    rating: 4.9,
    completedJobs: 23,
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    experience: '5 years server experience',
    availability: 'Available tonight'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    rating: 4.7,
    completedJobs: 12,
    email: 'mike.w@email.com',
    phone: '+1 (555) 345-6789',
    experience: '2 years restaurant work',
    availability: 'Available tonight'
  },
  {
    id: '4',
    name: 'Emily Davis',
    rating: 5.0,
    completedJobs: 28,
    email: 'emily.d@email.com',
    phone: '+1 (555) 456-7890',
    experience: '6 years in fine dining',
    availability: 'Available tonight'
  },
  {
    id: '5',
    name: 'Alex Martinez',
    rating: 4.8,
    completedJobs: 19,
    email: 'alex.m@email.com',
    phone: '+1 (555) 567-8901',
    experience: '4 years hospitality',
    availability: 'Available tonight'
  }
];

export function ViewApplicationsPage({ onNavigate }: ViewApplicationsPageProps) {
  const handleAccept = (name: string) => {
    toast.success(`${name}'s application accepted!`);
  };

  const handleReject = (name: string) => {
    toast.info(`${name}'s application declined`);
  };

  const handleSendNotification = (name: string) => {
    toast.success(`Notification sent to ${name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('job-requests')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2>Applications</h2>
            <p className="text-muted-foreground">Server - Dinner Shift</p>
          </div>
          <Badge>{mockApplicants.length}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {mockApplicants.map((applicant) => (
          <Card key={applicant.id} className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-14 h-14">
                <AvatarFallback>
                  {applicant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="mb-1">{applicant.name}</h3>
                <div className="flex items-center gap-3 text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{applicant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{applicant.completedJobs} jobs</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{applicant.experience}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{applicant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{applicant.phone}</span>
              </div>
            </div>

            <div className="mb-3">
              <Badge variant="secondary">{applicant.availability}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button 
                size="sm"
                onClick={() => handleAccept(applicant.name)}
              >
                Accept
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => handleReject(applicant.name)}
              >
                Decline
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => handleSendNotification(applicant.name)}
              >
                Message
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
