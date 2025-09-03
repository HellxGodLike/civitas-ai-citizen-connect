import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  History, 
  Settings, 
  LogOut,
  Search,
  Star,
  MapPin,
  Calendar,
  User,
  CheckCircle,
  X,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import civitasLogo from '@/assets/civitas-logo.png';
import civicBg from '@/assets/civic-city-bg.jpg';

const DepartmentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('reports');
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
      id: 1,
      citizen: 'Alice Chen',
      citizenRating: 4.8,
      issueType: 'pothole',
      title: 'Large pothole on Main Street',
      description: 'Deep pothole causing traffic issues, approximately 3 feet wide and 8 inches deep.',
      location: '123 Main St',
      status: 'pending',
      dateReported: new Date('2024-01-15'),
      priority: 'high'
    },
    {
      id: 2,
      citizen: 'Bob Wilson',
      citizenRating: 4.2,
      issueType: 'garbage',
      title: 'Overflowing trash bins',
      description: 'Multiple trash bins overflowing in downtown area.',
      location: 'Park Avenue',
      status: 'pending',
      dateReported: new Date('2024-01-14'),
      priority: 'medium'
    },
    {
      id: 3,
      citizen: 'Carol Davis',
      citizenRating: 4.9,
      issueType: 'streetlight',
      title: 'Broken streetlight',
      description: 'Streetlight has been out for over a week.',
      location: '456 Elm St',
      status: 'pending',
      dateReported: new Date('2024-01-12'),
      priority: 'low'
    }
  ];

  const handleStatusChange = (reportId, newStatus, rating = null) => {
    toast({
      title: "Report Updated",
      description: `Report has been marked as ${newStatus}`,
    });
    // Update logic would go here
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'destructive',
      medium: 'default', 
      low: 'secondary'
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${civicBg})` }}
    >
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        {/* Navigation */}
        <nav className="glass-card border-0 border-b border-white/20 rounded-none">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={civitasLogo} alt="Civitas AI" className="h-8" />
                <div className="hidden md:flex space-x-6">
                  <Button 
                    variant={activeTab === 'reports' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('reports')}
                    className="flex items-center space-x-2"
                  >
                    <FileText size={16} />
                    <span>Reports</span>
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('history')}
                    className="flex items-center space-x-2"
                  >
                    <History size={16} />
                    <span>History</span>
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
                  <p className="text-xs text-muted-foreground">Public Works Department</p>
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
          {activeTab === 'reports' && !selectedReport && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Active Reports</h1>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search reports..." className="w-64" />
                  <Button size="sm" variant="outline">
                    <Search size={16} />
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">{mockReports.length}</p>
                        <p className="text-xs text-muted-foreground">Pending Reports</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">25</p>
                        <p className="text-xs text-muted-foreground">Resolved This Week</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-8 h-8 text-accent" />
                      <div>
                        <p className="text-2xl font-bold">4.6</p>
                        <p className="text-xs text-muted-foreground">Avg Department Rating</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </div>

              {/* Reports List */}
              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle>Reports Requiring Action</GlassCardTitle>
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
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{report.title}</h3>
                              {getPriorityBadge(report.priority)}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{report.citizen}</span>
                                <div className="flex items-center ml-2">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="ml-1">{report.citizenRating}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{report.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{report.dateReported.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'reports' && selectedReport && (
            <div className="space-y-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedReport(null)}
                className="flex items-center space-x-2"
              >
                ← Back to Reports
              </Button>

              <GlassCard>
                <GlassCardHeader>
                  <div className="flex items-center justify-between">
                    <GlassCardTitle>Report Details - #{selectedReport.id}</GlassCardTitle>
                    {getPriorityBadge(selectedReport.priority)}
                  </div>
                </GlassCardHeader>
                <GlassCardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Issue Details</h3>
                        <p className="font-medium">{selectedReport.title}</p>
                        <p className="text-muted-foreground mt-2">{selectedReport.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Location</h3>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedReport.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Reported By</h3>
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5" />
                          <div>
                            <p className="font-medium">{selectedReport.citizen}</p>
                            <div className="flex items-center space-x-1 text-sm">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>Trust Rating: {selectedReport.citizenRating}/5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Date Reported</h3>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedReport.dateReported.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Take Action</h3>
                    <div className="flex space-x-3">
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => handleStatusChange(selectedReport.id, 'done')}
                      >
                        <CheckCircle size={16} />
                        <span>Mark as Done</span>
                      </Button>
                      <Button 
                        variant="destructive"
                        className="flex items-center space-x-2"
                        onClick={() => handleStatusChange(selectedReport.id, 'rejected')}
                      >
                        <X size={16} />
                        <span>Reject</span>
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Department Notes</label>
                      <Textarea placeholder="Add notes about resolution or rejection reason..." />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Report History</h1>
              <GlassCard>
                <GlassCardContent className="text-center py-12">
                  <History className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Report Archive</h3>
                  <p className="text-muted-foreground">View all completed and archived reports</p>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Department Settings</h1>
              <GlassCard>
                <GlassCardContent className="text-center py-12">
                  <Settings className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Department Configuration</h3>
                  <p className="text-muted-foreground">Manage department information and preferences</p>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;