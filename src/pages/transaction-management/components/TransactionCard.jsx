import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const TransactionCard = ({ transaction, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'text-warning bg-warning/10',
      'processing': 'text-secondary bg-secondary/10',
      'shipped': 'text-primary bg-primary/10',
      'delivered': 'text-success bg-success/10',
      'completed': 'text-success bg-success/10',
      'disputed': 'text-error bg-error/10',
      'cancelled': 'text-text-secondary bg-muted',
      'refunded': 'text-warning bg-warning/10'
    };
    return colors?.[status] || 'text-text-secondary bg-muted';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': 'Clock',
      'processing': 'Package',
      'shipped': 'Truck',
      'delivered': 'CheckCircle',
      'completed': 'CheckCircle2',
      'disputed': 'AlertTriangle',
      'cancelled': 'XCircle',
      'refunded': 'RotateCcw'
    };
    return icons?.[status] || 'Circle';
  };

  const getScamRiskColor = (risk) => {
    const colors = {
      'low': 'text-success',
      'medium': 'text-warning',
      'high': 'text-error'
    };
    return colors?.[risk] || 'text-text-secondary';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatCurrencyINR = (amount) => {
    return formatCurrency(amount, {
      locale: 'en-IN',
      currency: 'INR'
    });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvailableActions = () => {
    const actions = [];
    
    switch (transaction?.status) {
      case 'pending':
        if (transaction?.userRole === 'seller') {
          actions?.push({ label: 'Confirm Order', action: 'confirm', variant: 'default' });
          actions?.push({ label: 'Cancel', action: 'cancel', variant: 'outline' });
        }
        break;
      case 'processing':
        if (transaction?.userRole === 'seller') {
          actions?.push({ label: 'Mark as Shipped', action: 'ship', variant: 'default' });
        }
        break;
      case 'shipped':
        if (transaction?.userRole === 'buyer') {
          actions?.push({ label: 'Confirm Receipt', action: 'confirm_receipt', variant: 'default' });
          actions?.push({ label: 'Report Issue', action: 'dispute', variant: 'outline' });
        }
        break;
      case 'delivered':
        actions?.push({ label: 'Leave Review', action: 'review', variant: 'default' });
        actions?.push({ label: 'Report Issue', action: 'dispute', variant: 'outline' });
        break;
      case 'disputed':
        actions?.push({ label: 'View Dispute', action: 'view_dispute', variant: 'default' });
        break;
      default:
        break;
    }
    
    return actions;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <Image
              src={transaction?.product?.image}
              alt={transaction?.product?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-card-foreground mb-1">
              {transaction?.product?.name}
            </h3>
            <p className="text-sm text-text-secondary">
              Order #{transaction?.id}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                <Icon name={getStatusIcon(transaction?.status)} size={12} className="mr-1" />
                {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
              </span>
              {transaction?.aiScamRisk && (
                <span className={`text-xs font-medium ${getScamRiskColor(transaction?.aiScamRisk)}`}>
                  <Icon name="Shield" size={12} className="inline mr-1" />
                  {transaction?.aiScamRisk?.toUpperCase()} RISK
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold text-card-foreground">
            {formatCurrencyINR(transaction?.amount)}
          </div>
          <div className="text-sm text-text-secondary">
            {formatDate(transaction?.createdAt)}
          </div>
        </div>
      </div>
      {/* Transaction Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-text-secondary mb-1">
            {transaction?.userRole === 'buyer' ? 'Seller' : 'Buyer'}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
              <Image
                src={transaction?.otherParty?.avatar}
                alt={transaction?.otherParty?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-sm text-card-foreground">
                {transaction?.otherParty?.name}
              </div>
              <div className="flex items-center text-xs text-text-secondary">
                <Icon name="Star" size={12} className="text-warning mr-1" />
                {transaction?.otherParty?.rating} ({transaction?.otherParty?.reviewCount})
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-text-secondary mb-1">Escrow Status</div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={transaction?.escrowStatus === 'secured' ? 'Shield' : 'Clock'} 
              size={16} 
              className={transaction?.escrowStatus === 'secured' ? 'text-success' : 'text-warning'} 
            />
            <span className="text-sm font-medium text-card-foreground">
              {transaction?.escrowStatus === 'secured' ? 'Funds Secured' : 'Processing'}
            </span>
          </div>
        </div>
      </div>
      {/* Progress Timeline */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>Order Progress</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 transition-smooth"
          >
            {isExpanded ? 'Less Details' : 'More Details'}
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {transaction?.timeline?.map((step, index) => (
            <React.Fragment key={step?.status}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step?.completed 
                  ? 'bg-success text-success-foreground' 
                  : step?.current 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-text-secondary'
              }`}>
                <Icon name={getStatusIcon(step?.status)} size={14} />
              </div>
              {index < transaction?.timeline?.length - 1 && (
                <div className={`flex-1 h-1 rounded ${
                  step?.completed ? 'bg-success' : 'bg-muted'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-text-secondary mb-1">Payment Method</div>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={16} className="text-text-secondary" />
                <span className="text-sm text-card-foreground">{transaction?.paymentMethod}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-text-secondary mb-1">Transaction Fee</div>
              <div className="text-sm text-card-foreground">
                {formatCurrencyINR(transaction?.fee)}
              </div>
            </div>
          </div>
          
          {transaction?.trackingNumber && (
            <div>
              <div className="text-sm text-text-secondary mb-1">Tracking Number</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-card-foreground">
                  {transaction?.trackingNumber}
                </span>
                <Button variant="ghost" size="xs" iconName="ExternalLink">
                  Track
                </Button>
              </div>
            </div>
          )}
          
          {transaction?.notes && (
            <div>
              <div className="text-sm text-text-secondary mb-1">Notes</div>
              <div className="text-sm text-card-foreground bg-muted p-3 rounded-lg">
                {transaction?.notes}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {transaction?.hasMessages && (
            <Button variant="ghost" size="sm" iconName="MessageCircle">
              Messages
            </Button>
          )}
          <Button variant="ghost" size="sm" iconName="Download">
            Receipt
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {getAvailableActions()?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="sm"
              onClick={() => onAction(transaction?.id, action?.action)}
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;