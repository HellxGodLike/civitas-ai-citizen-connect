import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import civitasLogo from '@/assets/civitas-logo.png';
import cityscapeBg from '@/assets/cityscape-bg.jpg';

const Landing = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ ...credentials, role: 'citizen' });
      toast({
        title: "Welcome to Civitas AI!",
        description: "Successfully logged in as citizen.",
      });
      navigate('/citizen-dashboard');
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
          <img src={civitasLogo} alt="Civitas AI" className="h-16 mx-auto animate-float" />
          <div>
            <GlassCardTitle className="text-3xl font-bold text-gradient">
              Civitas AI
            </GlassCardTitle>
            <GlassCardDescription className="text-lg mt-2">
              Report civic issues. Make your city better.
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
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
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
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                className="glass-panel"
              />
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

          <div className="space-y-3 text-center">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:underline block"
            >
              Forgot password?
            </Link>
            
            <Link 
              to="/signup" 
              className="text-sm text-primary hover:underline block"
            >
              Create an account
            </Link>
            
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-muted-foreground mb-2">
                Are you an Admin or Department?
              </p>
              <Link to="/admin-login">
                <Button variant="glass" className="w-full hover-lift">
                  Login here
                </Button>
              </Link>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default Landing;