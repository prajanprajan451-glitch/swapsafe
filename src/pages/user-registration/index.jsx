import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import DigiLockerIntegration from './components/DigiLockerIntegration';
import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';
import TrustIndicator from '../../components/ui/TrustIndicator';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Mock social registration - would integrate with actual providers
    alert(`Social registration with ${provider} would be implemented here`);
  };

  const handleTermsModal = () => {
    setShowTermsModal(true);
  };

  const handlePrivacyModal = () => {
    setShowPrivacyModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - SwapSafe | Secure Marketplace Registration</title>
        <meta name="description" content="Join SwapSafe's secure peer-to-peer marketplace. Create your account with AI-powered scam protection, identity verification, and sustainable trading features." />
        <meta name="keywords" content="SwapSafe registration, secure marketplace, peer-to-peer trading, identity verification, DigiLocker" />
      </Helmet>

      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Registration Section */}
            <div className="lg:col-span-2">
              <div className="max-w-2xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                      <Icon name="UserPlus" size={32} color="white" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Join SwapSafe
                  </h1>
                  <p className="text-lg text-text-secondary">
                    Create your secure marketplace account with AI-powered protection
                  </p>
                </div>

                {/* Registration Form */}
                <div className="bg-card border border-border rounded-xl shadow-subtle p-6 sm:p-8 mb-8">
                  <RegistrationForm
                    onSocialRegister={handleSocialRegister}
                    onTermsModal={handleTermsModal}
                    onPrivacyModal={handlePrivacyModal}
                  />
                </div>

                {/* DigiLocker Integration */}
                <DigiLockerIntegration />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Trust Indicators */}
                <TrustIndicator 
                  showSSL={true}
                  showVerification={false}
                  showScamDetection={true}
                  className="w-full"
                />

                {/* Platform Benefits */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-card-foreground mb-4">
                    Why Choose SwapSafe?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Icon name="Shield" size={16} className="text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-card-foreground">
                          AI Scam Protection
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          Advanced AI detects and prevents fraudulent transactions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="Lock" size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-card-foreground">
                          Secure Escrow
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          Protected payments until transaction completion
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Icon name="Leaf" size={16} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-card-foreground">
                          Eco-Impact Tracking
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          Track and gamify your sustainable trading impact
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Icon name="Users" size={16} className="text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-card-foreground">
                          Community Trust
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          Build trust through verified reviews and ratings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-card-foreground mb-4">
                    Join Our Community
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-primary">50K+</div>
                      <div className="text-xs text-text-secondary">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-success">99.9%</div>
                      <div className="text-xs text-text-secondary">Safe Transactions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-accent">$2M+</div>
                      <div className="text-xs text-text-secondary">Traded Safely</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-heading font-bold text-secondary">24/7</div>
                      <div className="text-xs text-text-secondary">Support</div>
                    </div>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-muted border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="HelpCircle" size={20} className="text-text-secondary" />
                    <div>
                      <h4 className="font-medium text-sm text-foreground">
                        Need Help?
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Contact our support team for assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </div>
  );
};

export default UserRegistration;