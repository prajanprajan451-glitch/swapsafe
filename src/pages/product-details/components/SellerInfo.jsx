import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SellerInfo = ({ seller }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getTrustScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'Star'}
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Seller Header */}
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={seller?.avatar}
            alt={seller?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {seller?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-heading font-semibold text-card-foreground">{seller?.name}</h3>
            {seller?.isPowerSeller && (
              <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                Power Seller
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span className="font-caption">Member since {seller?.memberSince}</span>
            <span className="font-caption">{seller?.totalSales} sales</span>
          </div>
        </div>
      </div>
      {/* Trust Score */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-medium text-card-foreground">Trust Score</span>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${getTrustScoreColor(seller?.trustScore)}`}>
              {seller?.trustScore}
            </span>
            <span className="text-sm text-text-secondary">/ 100</span>
          </div>
        </div>
        
        <div className="w-full bg-border rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${
              seller?.trustScore >= 90 ? 'bg-success' :
              seller?.trustScore >= 70 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${seller?.trustScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary">
          <span>{getTrustScoreLabel(seller?.trustScore)}</span>
          <span>Based on {seller?.reviewCount} reviews</span>
        </div>
      </div>
      {/* Ratings */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(seller?.rating)}
          </div>
          <span className="font-medium text-card-foreground">{seller?.rating}</span>
          <span className="text-sm text-text-secondary">({seller?.reviewCount} reviews)</span>
        </div>
      </div>
      {/* Verification Badges */}
      <div className="space-y-2">
        <h4 className="font-heading font-medium text-card-foreground">Verifications</h4>
        <div className="grid grid-cols-2 gap-2">
          {seller?.verifications?.map((verification, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                verification?.verified ? 'bg-success/10 text-success' : 'bg-muted text-text-secondary'
              }`}
            >
              <Icon
                name={verification?.verified ? 'CheckCircle' : 'XCircle'}
                size={16}
                className="flex-shrink-0"
              />
              <span className="text-sm font-caption">{verification?.type}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bio */}
      {seller?.bio && (
        <div>
          <h4 className="font-heading font-medium text-card-foreground mb-2">About Seller</h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            {showFullBio ? seller?.bio : `${seller?.bio?.substring(0, 150)}...`}
          </p>
          {seller?.bio?.length > 150 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-primary text-sm font-medium mt-1 hover:text-primary/80 transition-smooth"
            >
              {showFullBio ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message Seller
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          iconName="User"
          iconPosition="left"
        >
          View Profile
        </Button>
      </div>
      {/* Response Time */}
      <div className="flex items-center justify-center text-xs text-text-secondary font-caption">
        <Icon name="Clock" size={14} className="mr-1" />
        Usually responds within {seller?.responseTime}
      </div>
    </div>
  );
};

export default SellerInfo;