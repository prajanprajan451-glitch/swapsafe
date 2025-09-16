import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/user-registration');
  };

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      {/* Logo and Brand */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="Shield" size={32} color="white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-text-secondary font-caption">
            Sign in to your SwapSafe account to continue secure trading
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-primary">50K+</div>
          <div className="text-xs text-text-secondary font-caption">Trusted Users</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-success">99.9%</div>
          <div className="text-xs text-text-secondary font-caption">Safe Trades</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-secondary">24/7</div>
          <div className="text-xs text-text-secondary font-caption">Support</div>
        </div>
      </div>

      {/* New User CTA */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">
              New to SwapSafe?
            </p>
            <p className="text-xs text-text-secondary font-caption">
              Join thousands of secure traders
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignUp}
            iconName="UserPlus"
            iconPosition="left"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;