import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DigiLockerIntegration = () => {
  const [verificationStatus, setVerificationStatus] = useState('not_started'); // not_started, in_progress, completed, failed
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedDocuments, setVerifiedDocuments] = useState([]);

  const mockDocuments = [
    { id: 'aadhaar', name: 'Aadhaar Card', icon: 'CreditCard', verified: false },
    { id: 'pan', name: 'PAN Card', icon: 'FileText', verified: false },
    { id: 'driving_license', name: 'Driving License', icon: 'Car', verified: false }
  ];

  const handleDigiLockerConnect = async () => {
    setIsLoading(true);
    setVerificationStatus('in_progress');

    try {
      // Simulate DigiLocker API integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful verification
      const verifiedDocs = mockDocuments?.map(doc => ({
        ...doc,
        verified: Math.random() > 0.3 // 70% chance of verification
      }));
      
      setVerifiedDocuments(verifiedDocs);
      setVerificationStatus('completed');
    } catch (error) {
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'in_progress':
        return <Icon name="Loader2" size={20} className="text-primary animate-spin" />;
      default:
        return <Icon name="Shield" size={20} className="text-text-secondary" />;
    }
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'Identity Verified';
      case 'failed':
        return 'Verification Failed';
      case 'in_progress':
        return 'Verifying Identity...';
      default:
        return 'Identity Verification';
    }
  };

  const getStatusDescription = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'Your identity has been successfully verified using DigiLocker';
      case 'failed':
        return 'Unable to verify your identity. Please try again or contact support';
      case 'in_progress':
        return 'Please wait while we verify your documents through DigiLocker';
      default:
        return 'Verify your identity using DigiLocker for enhanced security and trust';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">
              {getStatusText()}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {getStatusDescription()}
            </p>
          </div>
        </div>
        
        {verificationStatus === 'not_started' && (
          <div className="bg-accent/10 px-2 py-1 rounded text-xs font-medium text-accent">
            Optional
          </div>
        )}
      </div>
      {/* Benefits */}
      {verificationStatus === 'not_started' && (
        <div className="mb-6">
          <h4 className="font-medium text-sm text-card-foreground mb-3">
            Benefits of Identity Verification:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Higher trust score</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Enhanced security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Higher transaction limits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Priority support</span>
            </div>
          </div>
        </div>
      )}
      {/* Verified Documents */}
      {verificationStatus === 'completed' && verifiedDocuments?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-card-foreground mb-3">
            Verified Documents:
          </h4>
          <div className="space-y-2">
            {verifiedDocuments?.map((doc) => (
              <div key={doc?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={doc?.icon} size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-card-foreground">{doc?.name}</span>
                </div>
                {doc?.verified ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : (
                  <Icon name="XCircle" size={16} className="text-error" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Button */}
      {verificationStatus === 'not_started' && (
        <Button
          variant="outline"
          onClick={handleDigiLockerConnect}
          loading={isLoading}
          disabled={isLoading}
          iconName="ExternalLink"
          iconPosition="right"
          fullWidth
        >
          Connect with DigiLocker
        </Button>
      )}
      {verificationStatus === 'failed' && (
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleDigiLockerConnect}
            loading={isLoading}
            disabled={isLoading}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Try Again
          </Button>
          <Button
            variant="ghost"
            onClick={() => setVerificationStatus('not_started')}
            className="flex-1"
          >
            Skip for Now
          </Button>
        </div>
      )}
      {verificationStatus === 'completed' && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={16} className="text-success mr-2" />
            <span className="text-sm text-success font-medium">
              Identity verification completed successfully!
            </span>
          </div>
        </div>
      )}
      {/* DigiLocker Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-text-secondary mt-0.5" />
          <div className="text-xs text-text-secondary">
            <p>
              DigiLocker is a government initiative to provide secure digital document storage.
              Your documents are fetched directly from government databases for verification.
            </p>
            <p className="mt-1">
              We do not store your documents. Only verification status is saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiLockerIntegration;