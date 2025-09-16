import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Listing',
      description: 'List a new item for sale',
      icon: 'Plus',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/marketplace-browse')
    },
    {
      title: 'Browse Marketplace',
      description: 'Find items to buy',
      icon: 'Search',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => navigate('/marketplace-browse')
    },
    {
      title: 'Transaction History',
      description: 'View all transactions',
      icon: 'History',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/transaction-management')
    },
    {
      title: 'Account Settings',
      description: 'Manage your profile',
      icon: 'Settings',
      color: 'text-text-secondary',
      bgColor: 'bg-muted',
      action: () => navigate('/settings')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className="p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-subtle transition-smooth text-left group"
          >
            <div className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            <h3 className="font-medium text-card-foreground mb-2">
              {action?.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;