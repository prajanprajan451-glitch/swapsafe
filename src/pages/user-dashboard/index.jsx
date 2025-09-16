import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import { useNotifications } from '../../components/ui/NotificationBadge';
import Header from '../../components/ui/Header';
import TrustIndicator from '../../components/ui/TrustIndicator';
import MetricsOverview from './components/MetricsOverview';
import GamificationSection from './components/GamificationSection';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import EcoImpactTracker from './components/EcoImpactTracker';
import TrustScoreVisualization from './components/TrustScoreVisualization';
import TransactionSummary from './components/TransactionSummary';

const UserDashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        simulateRealTimeUpdate();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        metrics: {
          activeListings: 12,
          recentTransactions: 8,
          trustScore: 87,
          ecoPoints: 1250
        },
        gamificationData: {
          badges: [
            {
              name: "Eco Warrior",
              description: "Saved 100kg CO₂",
              icon: "Leaf",
              color: "text-success",
              bgColor: "bg-success/10",
              isNew: true
            },
            {
              name: "Trusted Seller",
              description: "100+ successful sales",
              icon: "Shield",
              color: "text-primary",
              bgColor: "bg-primary/10",
              isNew: false
            },
            {
              name: "Community Helper",
              description: "50+ helpful reviews",
              icon: "Heart",
              color: "text-secondary",
              bgColor: "bg-secondary/10",
              isNew: false
            },
            {
              name: "Quick Responder",
              description: "95% response rate",
              icon: "Zap",
              color: "text-warning",
              bgColor: "bg-warning/10",
              isNew: true
            }
          ],
          leaderboardPosition: 23,
          progressToNextTier: {
            current: 1250,
            target: 2000,
            nextTier: "Gold"
          },
          currentTier: "Silver"
        },
        activities: [
          {
            type: "transaction",
            title: "Payment Received",
            description: "You received $125.00 for iPhone 12 Pro from Sarah Johnson",
            amount: 125.00,
            status: "completed",
            timestamp: new Date(Date.now() - 300000)
          },
          {
            type: "escrow",
            title: "Escrow Released",
            description: "Funds released for MacBook Air sale to Mike Chen",
            amount: 850.00,
            status: "completed",
            timestamp: new Date(Date.now() - 1800000)
          },
          {
            type: "achievement",
            title: "New Achievement Unlocked",
            description: "You\'ve earned the \'Eco Warrior\' badge for saving 100kg CO₂",
            status: "completed",
            timestamp: new Date(Date.now() - 3600000)
          },
          {
            type: "message",
            title: "New Message",
            description: "Alex Thompson sent you a message about the vintage camera",
            status: "pending",
            timestamp: new Date(Date.now() - 7200000)
          },
          {
            type: "listing",
            title: "Listing Views Update",
            description: "Your iPad Pro listing has received 15 new views today",
            status: "completed",
            timestamp: new Date(Date.now() - 10800000)
          }
        ],
        ecoData: {
          carbonSavings: {
            total: 156,
            thisMonth: 23
          },
          sustainableTransactions: {
            total: 45,
            thisMonth: 8
          },
          globalRanking: 1247,
          monthlyData: [
            { month: "Jan", savings: 12 },
            { month: "Feb", savings: 18 },
            { month: "Mar", savings: 15 },
            { month: "Apr", savings: 22 },
            { month: "May", savings: 28 },
            { month: "Jun", savings: 23 }
          ],
          categoryBreakdown: [
            { name: "Electronics", value: 45 },
            { name: "Clothing", value: 32 },
            { name: "Books", value: 18 },
            { name: "Home & Garden", value: 25 }
          ],
          achievements: [
            {
              title: "Carbon Neutral",
              description: "Offset 100kg CO₂",
              icon: "Leaf",
              color: "text-success",
              bgColor: "bg-success/10"
            },
            {
              title: "Waste Reducer",
              description: "Diverted 50 items from landfill",
              icon: "Recycle",
              color: "text-primary",
              bgColor: "bg-primary/10"
            },
            {
              title: "Local Hero",
              description: "90% local transactions",
              icon: "MapPin",
              color: "text-secondary",
              bgColor: "bg-secondary/10"
            }
          ]
        },
        trustData: {
          score: 87,
          verificationStatus: {
            emailVerified: true,
            phoneVerified: true,
            identityVerified: true,
            addressVerified: false
          },
          communityRatings: {
            overall: 4.8,
            totalReviews: 156,
            responseRate: 95
          },
          securityIndicators: [
            {
              title: "AI Protected",
              status: "Active",
              icon: "Shield",
              color: "text-success",
              bgColor: "bg-success/10"
            },
            {
              title: "2FA Enabled",
              status: "Secure",
              icon: "Lock",
              color: "text-primary",
              bgColor: "bg-primary/10"
            },
            {
              title: "Recent Activity",
              status: "Normal",
              icon: "Activity",
              color: "text-secondary",
              bgColor: "bg-secondary/10"
            }
          ]
        },
        transactions: {
          pending: [
            {
              item: "MacBook Pro 16\"",
              counterparty: "Jennifer Wilson",
              amount: 1200.00,
              type: "sell",
              status: "pending",
              date: "2024-01-15"
            },
            {
              item: "Canon EOS R5",
              counterparty: "David Kim",
              amount: 2800.00,
              type: "buy",
              status: "processing",
              date: "2024-01-14"
            }
          ],
          completed: [
            {
              item: "iPhone 12 Pro",
              counterparty: "Sarah Johnson",
              amount: 125.00,
              type: "sell",
              status: "completed",
              date: "2024-01-13"
            },
            {
              item: "iPad Air",
              counterparty: "Michael Brown",
              amount: 450.00,
              type: "sell",
              status: "completed",
              date: "2024-01-12"
            },
            {
              item: "AirPods Pro",
              counterparty: "Lisa Chen",
              amount: 180.00,
              type: "buy",
              status: "completed",
              date: "2024-01-11"
            }
          ],
          disputed: [
            {
              item: "Gaming Laptop",
              counterparty: "Robert Taylor",
              amount: 950.00,
              type: "sell",
              status: "disputed",
              date: "2024-01-10"
            }
          ]
        }
      };

      setDashboardData(mockData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRealTimeUpdate = () => {
    const updates = [
      "New message received",
      "Transaction completed",
      "Achievement unlocked",
      "Listing viewed",
      "Payment received"
    ];
    
    const randomUpdate = updates?.[Math.floor(Math.random() * updates?.length)];
    addNotification({
      type: 'transaction',
      title: 'Real-time Update',
      message: randomUpdate,
      priority: 'normal'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4]?.map((i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-muted rounded-lg"></div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Welcome back, {user?.firstName || 'User'}!
                </h1>
                <p className="text-text-secondary">
                  Here's what's happening with your SwapSafe account today.
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <TrustIndicator compact showSSL showVerification showScamDetection />
              </div>
            </div>
          </div>

          {/* Metrics Overview */}
          <MetricsOverview metrics={dashboardData?.metrics} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <GamificationSection gamificationData={dashboardData?.gamificationData} />
              <EcoImpactTracker ecoData={dashboardData?.ecoData} />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <ActivityFeed activities={dashboardData?.activities} />
              <TrustScoreVisualization trustData={dashboardData?.trustData} />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Transaction Summary */}
          <TransactionSummary transactions={dashboardData?.transactions} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;