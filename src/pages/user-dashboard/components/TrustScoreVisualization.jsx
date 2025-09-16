import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustScoreVisualization = ({ trustData }) => {
  const { score, verificationStatus, communityRatings, securityIndicators } = trustData;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const verificationItems = [
    {
      key: 'email',
      label: 'Email Verified',
      status: verificationStatus?.emailVerified,
      icon: 'Mail'
    },
    {
      key: 'phone',
      label: 'Phone Verified',
      status: verificationStatus?.phoneVerified,
      icon: 'Phone'
    },
    {
      key: 'identity',
      label: 'Identity Verified',
      status: verificationStatus?.identityVerified,
      icon: 'User'
    },
    {
      key: 'address',
      label: 'Address Verified',
      status: verificationStatus?.addressVerified,
      icon: 'MapPin'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Trust Score & Verification
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className={getScoreColor(score)} />
          <span className={`font-medium ${getScoreColor(score)}`}>
            Trusted User
          </span>
        </div>
      </div>
      {/* Trust Score Circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314} 314`}
              className="transition-smooth"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-heading font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-text-secondary">Trust Score</div>
            </div>
          </div>
        </div>
      </div>
      {/* Verification Status */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Verification Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationItems?.map((item) => (
            <div key={item?.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item?.status ? 'bg-success/10' : 'bg-error/10'}`}>
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className={item?.status ? 'text-success' : 'text-error'} 
                  />
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  {item?.label}
                </span>
              </div>
              <Icon 
                name={item?.status ? 'CheckCircle' : 'XCircle'} 
                size={16} 
                className={item?.status ? 'text-success' : 'text-error'} 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Community Ratings */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Community Ratings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Overall Rating</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={star <= communityRatings?.overall ? 'text-warning fill-current' : 'text-muted'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-card-foreground">
                {communityRatings?.overall}/5
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Reviews</span>
            <span className="text-sm font-medium text-card-foreground">
              {communityRatings?.totalReviews}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Response Rate</span>
            <span className="text-sm font-medium text-success">
              {communityRatings?.responseRate}%
            </span>
          </div>
        </div>
      </div>
      {/* Security Indicators */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Security Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityIndicators?.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={`p-2 rounded-lg ${indicator?.bgColor}`}>
                <Icon name={indicator?.icon} size={16} className={indicator?.color} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-card-foreground">
                  {indicator?.title}
                </h4>
                <p className="text-xs text-text-secondary">
                  {indicator?.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustScoreVisualization;