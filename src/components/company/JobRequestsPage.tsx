import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, Users, Clock, DollarSign, MapPin, Eye } from "lucide-react";
import { mockJobs } from "../../lib/mockData";

interface JobRequestsPageProps {
  onNavigate: (page: string) => void;
}

export function JobRequestsPage({ onNavigate }: JobRequestsPageProps) {
  const companyJobs = mockJobs.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('company-home')}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="flex-1">İş İlanlarım</h2>
          <Badge>{companyJobs.length}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {companyJobs.map((job) => (
          <Card key={job.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="mb-1">{job.title}</h3>
                <p className="text-muted-foreground">{job.category}</p>
              </div>
              <Badge variant={job.urgency === 'high' ? 'destructive' : 'secondary'}>
                {job.urgency === 'high' ? 'Urgent' : 'Active'}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{job.startTime} • {job.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <DollarSign className="w-4 h-4" />
                <span>${job.hourlyRate}/hour</span>
              </div>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div>{job.applicants} Applicants</div>
                    <p className="text-muted-foreground">Received applications</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => onNavigate('view-applications')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-muted-foreground">Posted {job.postedAt}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Close Posting</Button>
            </div>
          </Card>
        ))}

        {companyJobs.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No active job requests</p>
            <Button onClick={() => onNavigate('post-job')}>
              Post Your First Job
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
