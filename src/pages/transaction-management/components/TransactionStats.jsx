import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Transactions',
      value: stats?.total,
      change: stats?.totalChange,
      icon: 'ArrowLeftRight',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Orders',
      value: stats?.active,
      change: stats?.activeChange,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Completed',
      value: stats?.completed,
      change: stats?.completedChange,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Value',
      value: `$${stats?.totalValue?.toLocaleString()}`,
      change: stats?.valueChange,
      icon: 'DollarSign',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const formatChange = (change) => {
    const isPositive = change >= 0;
    return {
      value: Math.abs(change),
      isPositive,
      color: isPositive ? 'text-success' : 'text-error',
      icon: isPositive ? 'TrendingUp' : 'TrendingDown'
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => {
        const change = formatChange(stat?.change);
        
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${change?.color}`}>
                <Icon name={change?.icon} size={16} />
                <span className="font-medium">{change?.value}%</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-card-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat?.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionStats;