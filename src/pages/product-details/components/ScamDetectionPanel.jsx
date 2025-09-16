import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ScamDetectionPanel = ({ productId, sellerId }) => {
  const [scamAnalysis, setScamAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI scam detection analysis
    const analyzeProduct = () => {
      setTimeout(() => {
        const mockAnalysis = {
          riskLevel: 'low', // low, medium, high
          riskScore: 15, // 0-100
          factors: [
            {
              category: 'Seller Verification',
              status: 'verified',
              description: 'Seller has completed identity verification'
            },
            {
              category: 'Price Analysis',
              status: 'normal',
              description: 'Price is within normal market range'
            },
            {
              category: 'Product Images',
              status: 'verified',
              description: 'Images appear to be original and authentic'
            },
            {
              category: 'Communication Pattern',
              status: 'normal',
              description: 'No suspicious communication detected'
            }
          ],
          recommendations: [
            'Use secure escrow payment for protection',
            'Meet in a public place for exchange',
            'Verify product condition before payment'
          ],
          lastUpdated: new Date()
        };
        
        setScamAnalysis(mockAnalysis);
        setIsAnalyzing(false);
      }, 2000);
    };

    analyzeProduct();
  }, [productId, sellerId]);

  const getRiskLevelConfig = (level) => {
    const configs = {
      low: {
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        icon: 'ShieldCheck',
        label: 'Low Risk',
        description: 'This transaction appears safe to proceed'
      },
      medium: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        icon: 'AlertTriangle',
        label: 'Medium Risk',
        description: 'Exercise caution and follow safety guidelines'
      },
      high: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        icon: 'ShieldX',
        label: 'High Risk',
        description: 'Potential scam detected - proceed with extreme caution'
      }
    };
    return configs?.[level];
  };

  const getFactorIcon = (status) => {
    const icons = {
      verified: 'CheckCircle',
      normal: 'Check',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return icons?.[status] || 'AlertCircle';
  };

  const getFactorColor = (status) => {
    const colors = {
      verified: 'text-success',
      normal: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors?.[status] || 'text-text-secondary';
  };

  if (isAnalyzing) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">AI Scam Shield</h3>
            <p className="text-sm text-text-secondary">Analyzing transaction safety...</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
              <div className="flex-1 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!scamAnalysis) return null;

  const riskConfig = getRiskLevelConfig(scamAnalysis?.riskLevel);

  return (
    <div className={`bg-card border rounded-lg p-6 ${riskConfig?.borderColor}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${riskConfig?.bgColor}`}>
          <Icon name={riskConfig?.icon} size={20} className={riskConfig?.color} />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-card-foreground">AI Scam Shield</h3>
          <p className="text-sm text-text-secondary">Real-time fraud protection</p>
        </div>
      </div>
      {/* Risk Assessment */}
      <div className={`rounded-lg p-4 mb-4 ${riskConfig?.bgColor}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`font-heading font-semibold ${riskConfig?.color}`}>
            {riskConfig?.label}
          </span>
          <span className={`text-sm font-mono ${riskConfig?.color}`}>
            {scamAnalysis?.riskScore}/100
          </span>
        </div>
        
        <div className="w-full bg-background/50 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${
              scamAnalysis?.riskLevel === 'low' ? 'bg-success' :
              scamAnalysis?.riskLevel === 'medium' ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${scamAnalysis?.riskScore}%` }}
          ></div>
        </div>
        
        <p className={`text-sm ${riskConfig?.color}`}>
          {riskConfig?.description}
        </p>
      </div>
      {/* Analysis Factors */}
      <div className="space-y-3 mb-4">
        <h4 className="font-heading font-medium text-card-foreground">Security Analysis</h4>
        {scamAnalysis?.factors?.map((factor, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon
              name={getFactorIcon(factor?.status)}
              size={16}
              className={`mt-0.5 flex-shrink-0 ${getFactorColor(factor?.status)}`}
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-card-foreground">
                {factor?.category}
              </div>
              <div className="text-xs text-text-secondary">
                {factor?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recommendations */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-card-foreground">Safety Recommendations</h4>
        <ul className="space-y-2">
          {scamAnalysis?.recommendations?.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-text-secondary">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Last Updated */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="font-caption">
            Last updated: {scamAnalysis?.lastUpdated?.toLocaleTimeString()}
          </span>
          <button className="text-primary hover:text-primary/80 font-medium transition-smooth">
            Re-analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScamDetectionPanel;