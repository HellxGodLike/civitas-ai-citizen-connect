import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Gift, 
  Settings, 
  LogOut,
  Star,
  MapPin,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import civitasLogo from '@/assets/civitas-logo.png';
import civicBg from '@/assets/civic-city-bg.jpg';
import ReportIssueForm from '@/components/ReportIssueForm';
import RewardsStore from '@/components/RewardsStore';
import UserSettings from '@/components/UserSettings';

const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState(null);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const mockReports = [
    {
      id: '1',
      issueType: 'pothole',
      title: 'Large pothole on Main Street',
      status: 'pending',
      location: '123 Main St',
      dateReported: new Date('2024-01-15'),
      description: 'Deep pothole causing traffic issues, approximately 3 feet wide and 8 inches deep. Located near the intersection with Oak Street.'
    },
    {
      id: '2', 
      issueType: 'garbage',
      title: 'Overflowing trash bins',
      status: 'done',
      location: 'Park Avenue',
      dateReported: new Date('2024-01-10'),
      description: 'Multiple trash bins overflowing in the downtown area. Attracting pests and creating unsanitary conditions.'
    },
    {
      id: '3',
      issueType: 'streetlight',
      title: 'Broken streetlight on Elm Street',
      status: 'pending',
      location: '456 Elm St',
      dateReported: new Date('2024-01-12'),
      description: 'Streetlight has been out for over a week, creating safety hazard for pedestrians at night.'
    },
    {
      id: '4',
      issueType: 'traffic',
      title: 'Faulty traffic signal',
      status: 'rejected',
      location: 'Main St & 2nd Ave',
      dateReported: new Date('2024-01-08'),
      description: 'Traffic light stuck on red for northbound traffic during peak hours.'
    },
    {
      id: '5',
      issueType: 'water',
      title: 'Water main leak',
      status: 'done',
      location: 'Riverside Drive',
      dateReported: new Date('2024-01-05'),
      description: 'Water pooling on street surface from apparent underground leak.'
    },
    {
      id: '6',
      issueType: 'pothole',
      title: 'Multiple potholes on Highway 101',
      status: 'pending',
      location: 'Highway 101, Mile Marker 15',
      dateReported: new Date('2024-01-18'),
      description: 'Several potholes developed after recent storms, causing vehicle damage.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="badge-pending">Pending</Badge>;
      case 'done':
        return <Badge className="badge-done">Done</Badge>;
      case 'rejected':
        return <Badge className="badge-rejected">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getIssueIcon = (type: string) => {
    const iconClass = `issue-icon issue-${type}`;
    return <div className={iconClass}><AlertTriangle size={16} /></div>;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${civicBg})` }}
    >
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
      {/* Navigation Bar */}
      <nav className="glass-card border-0 border-b border-white/20 rounded-none">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={civitasLogo} alt="Civitas AI" className="h-8" />
              <div className="hidden md:flex space-x-6">
                <Button 
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center space-x-2"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Button>
                <Button 
                  variant={activeTab === 'report' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('report')}
                  className="flex items-center space-x-2"
                >
                  <AlertTriangle size={16} />
                  <span>Report Issue</span>
                </Button>
                <Button 
                  variant={activeTab === 'rewards' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('rewards')}
                  className="flex items-center space-x-2"
                >
                  <Gift size={16} />
                  <span>Rewards</span>
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('settings')}
                  className="flex items-center space-x-2"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{user?.trustRating}/5.0</span>
                  <span>•</span>
                  <span>{user?.points} pts</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && !selectedReport && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard variant="elevated">
                <GlassCardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <GlassCardTitle className="text-lg">Trust Rating</GlassCardTitle>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="text-2xl font-bold text-primary">{user?.trustRating}/5.0</div>
                  <p className="text-xs text-muted-foreground">Excellent citizen</p>
                </GlassCardContent>
              </GlassCard>

              <GlassCard variant="elevated">
                <GlassCardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <GlassCardTitle className="text-lg">Reward Points</GlassCardTitle>
                    <Gift className="w-5 h-5 text-accent" />
                  </div>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="text-2xl font-bold text-accent">{user?.points}</div>
                  <p className="text-xs text-muted-foreground">Available to spend</p>
                </GlassCardContent>
              </GlassCard>

              <GlassCard variant="elevated">
                <GlassCardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <GlassCardTitle className="text-lg">Reports Filed</GlassCardTitle>
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="text-2xl font-bold text-primary">{mockReports.length}</div>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </GlassCardContent>
              </GlassCard>
            </div>

            {/* Recent Reports */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle className="flex items-center justify-between">
                  Your Reports
                  <Button 
                    variant="yellow"
                    onClick={() => setActiveTab('report')}
                  >
                    Report New Issue
                  </Button>
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="space-y-4">
                   {mockReports.map((report) => (
                     <div 
                       key={report.id} 
                       className="glass-panel p-4 rounded-lg hover-lift cursor-pointer"
                       onClick={() => setSelectedReport(report)}
                     >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getIssueIcon(report.issueType)}
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{report.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {report.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{report.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{report.dateReported.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(report.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        )}

        {activeTab === 'dashboard' && selectedReport && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedReport(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
              </Button>
            </div>

            <GlassCard>
              <GlassCardHeader>
                <div className="flex items-center justify-between">
                  <GlassCardTitle className="text-xl">Report Details</GlassCardTitle>
                  {getStatusBadge(selectedReport.status)}
                </div>
              </GlassCardHeader>
              <GlassCardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Issue Type</h3>
                      <div className="flex items-center space-x-2">
                        {getIssueIcon(selectedReport.issueType)}
                        <span className="capitalize">{selectedReport.issueType}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Title</h3>
                      <p>{selectedReport.title}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{selectedReport.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedReport.location}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Date Reported</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedReport.dateReported.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Status</h3>
                      <div className="space-y-2">
                        {getStatusBadge(selectedReport.status)}
                        {selectedReport.status === 'done' && (
                          <p className="text-sm text-green-600">✓ Issue has been resolved by the department</p>
                        )}
                        {selectedReport.status === 'pending' && (
                          <p className="text-sm text-yellow-600">⏳ Report is being reviewed by the department</p>
                        )}
                        {selectedReport.status === 'rejected' && (
                          <p className="text-sm text-red-600">✗ Report was rejected. Reason: Outside department jurisdiction.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/20">
                  <h3 className="font-semibold mb-2">Report ID</h3>
                  <p className="font-mono text-sm">CR-{selectedReport.id.padStart(6, '0')}</p>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        )}

        {activeTab === 'report' && (
          <ReportIssueForm />
        )}

        {activeTab === 'rewards' && (
          <RewardsStore />
        )}

        {activeTab === 'settings' && (
          <UserSettings />
        )}
      </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;