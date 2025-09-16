import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Transactions',
      icon: 'List',
      count: counts?.all
    },
    {
      id: 'active',
      label: 'Active',
      icon: 'Clock',
      count: counts?.active
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: counts?.completed
    },
    {
      id: 'disputed',
      label: 'Disputed',
      icon: 'AlertTriangle',
      count: counts?.disputed
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: 'XCircle',
      count: counts?.cancelled
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-1 mb-6">
      <div className="flex flex-wrap gap-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-card-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-text-secondary'
                }
              `}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionTabs;