import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';
import civitasLogo from '@/assets/civitas-logo.png';
import cityscapeBg from '@/assets/cityscape-bg.jpg';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' as UserRole
  });
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      toast({
        title: "Access granted",
        description: `Successfully logged in as ${formData.role}.`,
      });
      
      const dashboardPath = formData.role === 'admin' ? '/admin-dashboard' : '/department-dashboard';
      navigate(dashboardPath);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1), rgba(251, 191, 36, 0.05)), url(${cityscapeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <GlassCard className="w-full max-w-md animate-slide-up">
        <GlassCardHeader className="text-center space-y-4">
          <img src={civitasLogo} alt="Civitas AI" className="h-16 mx-auto" />
          <div>
            <GlassCardTitle className="text-3xl font-bold text-gradient">
              Admin Portal
            </GlassCardTitle>
            <GlassCardDescription className="text-lg mt-2">
              Access administrative and department tools
            </GlassCardDescription>
          </div>
        </GlassCardHeader>

        <GlassCardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="glass-panel"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="glass-panel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => 
                  setFormData(prev => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="glass-panel">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              variant="yellow"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <div className="text-center">
            <Link 
              to="/" 
              className="text-sm text-primary hover:underline"
            >
              ← Back to Citizen Login
            </Link>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default AdminLogin;