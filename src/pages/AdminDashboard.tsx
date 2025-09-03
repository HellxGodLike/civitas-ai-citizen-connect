import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  FileText, 
  Store, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Filter,
  Map,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import civitasLogo from '@/assets/civitas-logo.png';
import civicBg from '@/assets/civic-city-bg.jpg';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('departments');

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const mockDepartments = [
    {
      id: 1,
      name: 'Public Works',
      city: 'Downtown',
      head: 'John Smith',
      email: 'john.smith@city.gov',
      regTime: '2024-01-15',
      activeReports: 15
    },
    {
      id: 2,
      name: 'Transportation',
      city: 'Downtown',
      head: 'Sarah Johnson',
      email: 'sarah.j@city.gov',
      regTime: '2024-01-10',
      activeReports: 8
    },
    {
      id: 3,
      name: 'Water & Sewage',
      city: 'Downtown',
      head: 'Mike Brown',
      email: 'mike.brown@city.gov',
      regTime: '2024-01-05',
      activeReports: 22
    }
  ];

  const mockAllReports = [
    { id: 1, citizen: 'Alice Chen', type: 'pothole', location: 'Main St', status: 'pending', department: 'Public Works' },
    { id: 2, citizen: 'Bob Wilson', type: 'garbage', location: 'Park Ave', status: 'done', department: 'Public Works' },
    { id: 3, citizen: 'Carol Davis', type: 'traffic', location: '1st & Oak', status: 'pending', department: 'Transportation' },
    { id: 4, citizen: 'David Kim', type: 'water', location: 'River Rd', status: 'done', department: 'Water & Sewage' }
  ];

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
                    variant={activeTab === 'departments' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('departments')}
                    className="flex items-center space-x-2"
                  >
                    <Users size={16} />
                    <span>Departments</span>
                  </Button>
                  <Button 
                    variant={activeTab === 'reports' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('reports')}
                    className="flex items-center space-x-2"
                  >
                    <FileText size={16} />
                    <span>Reports</span>
                  </Button>
                  <Button 
                    variant={activeTab === 'store' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('store')}
                    className="flex items-center space-x-2"
                  >
                    <Store size={16} />
                    <span>Store</span>
                  </Button>
                  <Button 
                    variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('analytics')}
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 size={16} />
                    <span>Analytics</span>
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
                  <p className="text-xs text-muted-foreground">Administrator</p>
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
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Department Management</h1>
                <Button className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Department</span>
                </Button>
              </div>

              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle>Registered Departments</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-muted">
                          <th className="text-left py-3 px-4">Department</th>
                          <th className="text-left py-3 px-4">City</th>
                          <th className="text-left py-3 px-4">Head</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Active Reports</th>
                          <th className="text-left py-3 px-4">Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockDepartments.map((dept) => (
                          <tr key={dept.id} className="border-b border-muted/50">
                            <td className="py-3 px-4 font-medium">{dept.name}</td>
                            <td className="py-3 px-4">{dept.city}</td>
                            <td className="py-3 px-4">{dept.head}</td>
                            <td className="py-3 px-4 text-muted-foreground">{dept.email}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{dept.activeReports} reports</Badge>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{dept.regTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Reports</h1>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Map size={16} className="mr-2" />
                    Map View
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">{mockAllReports.filter(r => r.status === 'pending').length}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">{mockAllReports.filter(r => r.status === 'done').length}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </div>

              <GlassCard>
                <GlassCardHeader>
                  <div className="flex items-center justify-between">
                    <GlassCardTitle>Recent Reports</GlassCardTitle>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search reports..." className="w-64" />
                      <Button size="sm" variant="outline">
                        <Search size={16} />
                      </Button>
                    </div>
                  </div>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-muted">
                          <th className="text-left py-3 px-4">Citizen</th>
                          <th className="text-left py-3 px-4">Issue Type</th>
                          <th className="text-left py-3 px-4">Location</th>
                          <th className="text-left py-3 px-4">Department</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAllReports.map((report) => (
                          <tr key={report.id} className="border-b border-muted/50 hover:bg-muted/10">
                            <td className="py-3 px-4 font-medium">{report.citizen}</td>
                            <td className="py-3 px-4 capitalize">{report.type}</td>
                            <td className="py-3 px-4">{report.location}</td>
                            <td className="py-3 px-4 text-muted-foreground">{report.department}</td>
                            <td className="py-3 px-4">
                              <Badge className={report.status === 'done' ? 'badge-done' : 'badge-pending'}>
                                {report.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Store Management</h1>
                <Button className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Item</span>
                </Button>
              </div>
              <GlassCard>
                <GlassCardContent className="text-center py-12">
                  <Store className="w-16 h-16 mx-auto text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Store Management</h3>
                  <p className="text-muted-foreground">Add, edit, and manage reward store items</p>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-6 text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Reports by Type</h3>
                    <p className="text-muted-foreground text-sm">Visual breakdown of issue categories</p>
                  </GlassCardContent>
                </GlassCard>
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-green-500 mb-4" />
                    <h3 className="font-semibold mb-2">Resolution Time</h3>
                    <p className="text-muted-foreground text-sm">Average time to resolve issues</p>
                  </GlassCardContent>
                </GlassCard>
                <GlassCard variant="elevated">
                  <GlassCardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto text-accent mb-4" />
                    <h3 className="font-semibold mb-2">Citizen Engagement</h3>
                    <p className="text-muted-foreground text-sm">User participation metrics</p>
                  </GlassCardContent>
                </GlassCard>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Admin Settings</h1>
              <GlassCard>
                <GlassCardContent className="text-center py-12">
                  <Settings className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Admin Configuration</h3>
                  <p className="text-muted-foreground">System settings and security configuration</p>
                </GlassCardContent>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;