import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionActions = ({ product, seller }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSecurePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/transaction-management', { 
        state: { 
          productId: product?.id,
          sellerId: seller?.id,
          action: 'purchase'
        }
      });
    }, 2000);
  };

  const handleAddToFavorites = () => {
    setIsFavorited(!isFavorited);
    // Here you would typically make an API call to save/remove favorite
  };

  const handleFlag = () => {
    setShowFlagModal(true);
  };

  const submitFlag = (reason) => {
    // Here you would submit the flag report
    console.log('Flagging product:', product?.id, 'Reason:', reason);
    setShowFlagModal(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24">
        {/* Price Summary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Price</span>
            <span className="text-2xl font-heading font-bold text-primary">
              {formatPrice(product?.price)}
            </span>
          </div>
          
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Original Price</span>
              <span className="text-text-secondary line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Escrow Fee</span>
            <span className="text-success">Free</span>
          </div>
          
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between font-heading font-semibold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(product?.price)}</span>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isProcessing}
            iconName="Shield"
            iconPosition="left"
            onClick={handleSecurePayment}
          >
            {isProcessing ? 'Processing...' : 'Buy with Escrow Protection'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName={isFavorited ? 'Heart' : 'Heart'}
              iconPosition="left"
              onClick={handleAddToFavorites}
              className={isFavorited ? 'text-error border-error' : ''}
            >
              {isFavorited ? 'Saved' : 'Save'}
            </Button>
            
            <Button
              variant="ghost"
              iconName="Flag"
              iconPosition="left"
              onClick={handleFlag}
            >
              Report
            </Button>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Shield" size={16} />
            <span className="font-heading font-medium text-sm">Protected Transaction</span>
          </div>
          
          <ul className="space-y-1 text-xs text-text-secondary">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} className="text-success" />
              <span>Money held in secure escrow</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} className="text-success" />
              <span>AI fraud detection active</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} className="text-success" />
              <span>Full refund if item not as described</span>
            </li>
          </ul>
        </div>

        {/* Contact Options */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
          >
            Ask a Question
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Phone"
            iconPosition="left"
          >
            Request Call Back
          </Button>
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-text-secondary space-y-1 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={12} />
            <span>Local pickup available in {product?.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={12} />
            <span>Shipping available (calculated at checkout)</span>
          </div>
        </div>
      </div>
      {/* Flag Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-card-foreground">Report This Item</h3>
              <button
                onClick={() => setShowFlagModal(false)}
                className="text-text-secondary hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {[
                'Suspected scam or fraud',
                'Inappropriate content',
                'Counterfeit item',
                'Misleading description',
                'Prohibited item',
                'Other'
              ]?.map((reason) => (
                <button
                  key={reason}
                  onClick={() => submitFlag(reason)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-smooth"
                >
                  {reason}
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setShowFlagModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionActions;