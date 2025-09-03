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

const CitizenSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      await signup(formData);
      toast({
        title: "Welcome to Civitas AI!",
        description: "Your account has been created successfully.",
      });
      navigate('/citizen-dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different credentials.",
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
              Join Civitas AI
            </GlassCardTitle>
            <GlassCardDescription className="text-lg mt-2">
              Create your account to start reporting civic issues
            </GlassCardDescription>
          </div>
        </GlassCardHeader>

        <GlassCardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="glass-panel"
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="glass-panel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default CitizenSignup;