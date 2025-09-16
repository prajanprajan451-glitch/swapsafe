import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      transaction: 'ArrowLeftRight',
      message: 'MessageCircle',
      listing: 'Package',
      achievement: 'Trophy',
      security: 'Shield',
      escrow: 'Lock'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type, status) => {
    if (status === 'completed') return 'text-success';
    if (status === 'pending') return 'text-warning';
    if (status === 'failed' || status === 'disputed') return 'text-error';
    
    const colors = {
      transaction: 'text-primary',
      message: 'text-secondary',
      listing: 'text-accent',
      achievement: 'text-warning',
      security: 'text-error',
      escrow: 'text-primary'
    };
    return colors?.[type] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Recent Activity
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-smooth">
            <div className={`p-2 rounded-lg bg-muted ${getActivityColor(activity?.type, activity?.status)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">
                    {activity?.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {activity?.description}
                  </p>
                  {activity?.amount && (
                    <p className="text-sm font-medium text-success mt-1">
                      ${activity?.amount}
                    </p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <span className="text-xs text-text-secondary font-caption">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                  {activity?.status && (
                    <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      activity?.status === 'completed' ? 'bg-success/10 text-success' :
                      activity?.status === 'pending' ? 'bg-warning/10 text-warning' :
                      activity?.status === 'failed'? 'bg-error/10 text-error' : 'bg-muted text-text-secondary'
                    }`}>
                      {activity?.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;