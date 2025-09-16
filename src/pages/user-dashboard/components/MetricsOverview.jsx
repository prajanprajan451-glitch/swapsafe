import React from 'react';
import Icon from '../../../components/AppIcon';
import { formatCurrency } from '../../../utils/currency';

const MetricsOverview = ({ metrics }) => {
  const formatCurrencyINR = (amount) => {
    return formatCurrency(amount || 0, {
      locale: 'en-IN',
      currency: 'INR'
    });
  };

  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? '+' : ''}${percentage?.toFixed(1)}%`;
  };

  const metricCards = [
    {
      title: 'Total Earnings',
      value: formatCurrencyINR(metrics?.totalEarnings),
      change: metrics?.earningsChange || 0,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Spent',
      value: formatCurrencyINR(metrics?.totalSpent),
      change: metrics?.spentChange || 0,
      icon: 'ShoppingCart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Items Sold',
      value: metrics?.itemsSold || 0,
      change: metrics?.soldChange || 0,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Items Purchased',
      value: metrics?.itemsPurchased || 0,
      change: metrics?.purchasedChange || 0,
      icon: 'Package',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Metrics Overview
        </h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>Last 30 Days</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards?.map((metric, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
                <Icon 
                  name={metric?.icon} 
                  size={20} 
                  className={metric?.color} 
                />
              </div>
              {metric?.change !== 0 && (
                <div className={`flex items-center space-x-1 text-xs font-medium ${
                  metric?.change > 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={metric?.change > 0 ? 'ArrowUp' : 'ArrowDown'} 
                    size={12} 
                  />
                  <span>{formatPercentage(metric?.change)}</span>
                </div>
              )}
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-card-foreground">
                {metric?.value}
              </div>
              <p className="text-sm text-text-secondary font-caption">
                {metric?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsOverview;