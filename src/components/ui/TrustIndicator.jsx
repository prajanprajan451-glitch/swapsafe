import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import { useAuth } from './AuthenticationGuard';

const TrustIndicator = ({ 
  showSSL = true, 
  showVerification = true, 
  showScamDetection = true,
  compact = false,
  className = '' 
}) => {
  const { user, isAuthenticated } = useAuth();
  const [sslStatus, setSslStatus] = useState('secure');
  const [verificationStatus, setVerificationStatus] = useState('verified');
  const [scamDetectionStatus, setScamDetectionStatus] = useState('safe');
  const [isExpanded, setIsExpanded] = useState(false);

  const checkSecurityStatus = () => {
    // SSL Status Check
    if (window.location?.protocol === 'https:') {
      setSslStatus('secure');
    } else {
      setSslStatus('insecure');
    }

    // User Verification Status
    if (isAuthenticated && user) {
      if (user?.emailVerified && user?.phoneVerified && user?.identityVerified) {
        setVerificationStatus('verified');
      } else if (user?.emailVerified) {
        setVerificationStatus('partial');
      } else {
        setVerificationStatus('unverified');
      }
    }

    // AI Scam Detection Status (simulated)
    const riskScore = Math.random();
    if (riskScore < 0.1) {
      setScamDetectionStatus('warning');
    } else if (riskScore < 0.05) {
      setScamDetectionStatus('danger');
    } else {
      setScamDetectionStatus('safe');
    }
  };

  useEffect(() => {
    // Simulate real-time security status checks
    checkSecurityStatus();
    
    const interval = setInterval(checkSecurityStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (type, status) => {
    const configs = {
      ssl: {
        secure: {
          icon: 'Shield',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'SSL Secured',
          description: 'Your connection is encrypted and secure'
        },
        insecure: {
          icon: 'ShieldAlert',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Not Secure',
          description: 'Your connection is not encrypted'
        }
      },
      verification: {
        verified: {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Verified',
          description: 'Account fully verified with ID, email, and phone'
        },
        partial: {
          icon: 'AlertCircle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Partially Verified',
          description: 'Complete verification for full access'
        },
        unverified: {
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Unverified',
          description: 'Verify your account to access all features'
        }
      },
      scamDetection: {
        safe: {
          icon: 'ShieldCheck',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'AI Protected',
          description: 'No suspicious activity detected'
        },
        warning: {
          icon: 'AlertTriangle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Caution',
          description: 'Unusual activity detected - proceed carefully'
        },
        danger: {
          icon: 'ShieldX',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'High Risk',
          description: 'Potential scam detected - transaction blocked'
        }
      }
    };

    return configs?.[type]?.[status];
  };

  const indicators = [];
  
  if (showSSL) {
    indicators?.push({ type: 'ssl', status: sslStatus });
  }
  
  if (showVerification && isAuthenticated) {
    indicators?.push({ type: 'verification', status: verificationStatus });
  }
  
  if (showScamDetection) {
    indicators?.push({ type: 'scamDetection', status: scamDetectionStatus });
  }

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {indicators?.map(({ type, status }, index) => {
          const config = getStatusConfig(type, status);
          return (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className={`p-1 rounded-full ${config?.bgColor} transition-smooth`}>
                <Icon name={config?.icon} size={14} className={config?.color} />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none z-300">
                <div className="bg-popover border border-border rounded-lg shadow-elevated px-3 py-2 text-xs whitespace-nowrap">
                  <div className="font-medium text-popover-foreground">{config?.label}</div>
                  <div className="text-text-secondary mt-1">{config?.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-card-foreground">Security Status</h3>
        <Icon name="Shield" size={20} className="text-primary" />
      </div>
      <div className="space-y-3">
        {indicators?.map(({ type, status }, index) => {
          const config = getStatusConfig(type, status);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${config?.bgColor}`}>
                  <Icon name={config?.icon} size={16} className={config?.color} />
                </div>
                <div>
                  <div className="font-medium text-sm text-card-foreground">
                    {config?.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {config?.description}
                  </div>
                </div>
              </div>
              {status === 'partial' || status === 'unverified' ? (
                <button className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth">
                  Complete
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <button 
            onClick={checkSecurityStatus}
            className="text-primary hover:text-primary/80 transition-smooth"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicator;