import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider?.id);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would redirect to OAuth provider
      console.log(`Initiating ${provider?.name} OAuth flow...`);
      
      // For demo purposes, show that social login is not implemented
      alert(`${provider?.name} login integration coming soon! Please use email login for now.`);
      
    } catch (error) {
      console.error(`${provider?.name} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-sm text-text-secondary font-caption mb-4">
            Or continue with
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {socialProviders?.map((provider) => (
            <Button
              key={provider?.id}
              variant="outline"
              size="default"
              onClick={() => handleSocialLogin(provider)}
              loading={loadingProvider === provider?.id}
              disabled={loadingProvider !== null}
              fullWidth
              className={`justify-center ${provider?.bgColor} border-border`}
            >
              <div className="flex items-center justify-center space-x-3">
                <Icon 
                  name={provider?.icon} 
                  size={20} 
                  className={provider?.color}
                />
                <span className="font-medium">
                  Continue with {provider?.name}
                </span>
              </div>
            </Button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-text-secondary font-caption">
              Or sign in with email
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;