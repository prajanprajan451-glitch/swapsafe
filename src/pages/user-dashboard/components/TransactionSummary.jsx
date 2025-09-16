import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const TransactionSummary = ({ transactions }) => {
  const navigate = useNavigate();
  
  const { pending, completed, disputed } = transactions;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'disputed':
        return 'text-error';
      case 'processing':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10';
      case 'pending':
        return 'bg-warning/10';
      case 'disputed':
        return 'bg-error/10';
      case 'processing':
        return 'bg-primary/10';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'disputed':
        return 'AlertTriangle';
      case 'processing':
        return 'Loader';
      default:
        return 'Circle';
    }
  };

  const allTransactions = [...pending, ...completed, ...disputed]?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return formatCurrency(amount, {
      locale: 'en-IN',
      currency: 'INR'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Transaction Summary
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/transaction-management')}
        >
          View All
        </Button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-warning/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-heading font-bold text-warning">
                {pending?.length}
              </div>
              <p className="text-sm text-text-secondary">Pending</p>
            </div>
            <Icon name="Clock" size={24} className="text-warning" />
          </div>
        </div>
        
        <div className="p-4 bg-success/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-heading font-bold text-success">
                {completed?.length}
              </div>
              <p className="text-sm text-text-secondary">Completed</p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="p-4 bg-error/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-heading font-bold text-error">
                {disputed?.length}
              </div>
              <p className="text-sm text-text-secondary">Disputed</p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-error" />
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {allTransactions?.slice(0, 8)?.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-smooth cursor-pointer"
              onClick={() => navigate('/transaction-management')}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getStatusBgColor(transaction?.status)}`}>
                  <Icon 
                    name={getStatusIcon(transaction?.status)} 
                    size={16} 
                    className={getStatusColor(transaction?.status)} 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">
                    {transaction?.item}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <span>{transaction?.type === 'buy' ? 'Bought from' : 'Sold to'}</span>
                    <span className="font-medium">{transaction?.counterparty}</span>
                  </div>
                  <p className="text-xs text-text-secondary font-caption">
                    {formatDate(transaction?.date)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-medium ${transaction?.type === 'buy' ? 'text-error' : 'text-success'}`}>
                  {transaction?.type === 'buy' ? '-' : '+'}{formatAmount(transaction?.amount)}
                </div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(transaction?.status)} ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {allTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="ArrowLeftRight" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-2">
            No Transactions Yet
          </h3>
          <p className="text-text-secondary mb-4">
            Start buying or selling to see your transaction history here.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/marketplace-browse')}
          >
            Browse Marketplace
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionSummary;