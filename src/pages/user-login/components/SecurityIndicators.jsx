import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption',
      status: 'active'
    },
    {
      icon: 'Lock',
      label: 'Secure Login',
      description: 'Multi-factor authentication available',
      status: 'active'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified Platform',
      description: 'Trusted by 50,000+ users worldwide',
      status: 'active'
    }
  ];

  const trustBadges = [
    {
      name: 'Norton Secured',
      icon: 'ShieldCheck',
      color: 'text-green-600'
    },
    {
      name: 'GDPR Compliant',
      icon: 'FileCheck',
      color: 'text-blue-600'
    },
    {
      name: '99.9% Uptime',
      icon: 'Zap',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="font-heading font-semibold text-card-foreground">
            Your Security Matters
          </h3>
        </div>
        
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-1.5 bg-success/10 rounded-lg">
                <Icon 
                  name={feature?.icon} 
                  size={16} 
                  className="text-success"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">
                  {feature?.label}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div className="p-2 bg-muted rounded-lg">
              <Icon 
                name={badge?.icon} 
                size={20} 
                className={badge?.color}
              />
            </div>
            <span className="text-xs text-text-secondary font-caption text-center">
              {badge?.name}
            </span>
          </div>
        ))}
      </div>
      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-text-secondary font-caption leading-relaxed">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </button>
          . We protect your data with industry-standard security measures.
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;