import React from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Coffee, Bus, Ticket, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const RewardsStore = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const rewards = [
    {
      id: 1,
      name: 'Coffee Voucher',
      description: 'Free coffee at participating local cafes',
      points: 50,
      icon: Coffee,
      category: 'Food & Drink'
    },
    {
      id: 2,
      name: 'Public Transport Pass',
      description: '1 week free public transportation',
      points: 150,
      icon: Bus,
      category: 'Transportation'
    },
    {
      id: 3,
      name: 'Movie Theater Ticket',
      description: 'Free movie ticket at local theaters',
      points: 100,
      icon: Ticket,
      category: 'Entertainment'
    },
    {
      id: 4,
      name: 'Local Store Discount',
      description: '20% discount at participating retailers',
      points: 75,
      icon: ShoppingBag,
      category: 'Shopping'
    },
    {
      id: 5,
      name: 'Premium Citizen Badge',
      description: 'Special recognition on your profile',
      points: 200,
      icon: Star,
      category: 'Recognition'
    }
  ];

  const handleRedeem = (reward: any) => {
    if (user?.points && user.points >= reward.points) {
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed a ${reward.name}. Check your email for details.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - (user?.points || 0)} more points to redeem this reward.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Rewards & Store</h2>
        <GlassCard variant="elevated">
          <GlassCardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Gift className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Available Points</p>
                <p className="text-2xl font-bold text-accent">{user?.points || 0}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Trust Rating</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">{user?.trustRating}/5.0</span>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const IconComponent = reward.icon;
          const canAfford = (user?.points || 0) >= reward.points;
          
          return (
            <GlassCard key={reward.id} variant="elevated">
              <GlassCardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <GlassCardTitle className="text-lg">{reward.name}</GlassCardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {reward.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {reward.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Gift className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-accent">{reward.points} pts</span>
                  </div>
                  
                  <Button
                    variant={canAfford ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                  >
                    {canAfford ? "Redeem" : "Need More Points"}
                  </Button>
                </div>
              </GlassCardContent>
            </GlassCard>
          );
        })}
      </div>

      {/* Earning Points Info */}
      <GlassCard className="mt-8">
        <GlassCardHeader>
          <GlassCardTitle>How to Earn More Points</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Report Issues</h4>
              <p className="text-sm text-muted-foreground">Earn 25-50 points per verified report</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-1">Community Engagement</h4>
              <p className="text-sm text-muted-foreground">Participate in local events and surveys</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Badge className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold mb-1">High Trust Rating</h4>
              <p className="text-sm text-muted-foreground">Maintain accuracy for bonus rewards</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default RewardsStore;