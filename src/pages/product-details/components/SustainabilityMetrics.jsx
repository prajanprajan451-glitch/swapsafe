import React from 'react';
import Icon from '../../../components/AppIcon';

const SustainabilityMetrics = ({ product }) => {
  const sustainabilityData = {
    ecoScore: 85,
    carbonFootprint: {
      saved: 12.5, // kg CO2
      comparison: 'vs buying new'
    },
    environmentalBenefits: [
      {
        icon: 'Recycle',
        label: 'Waste Reduction',
        value: '2.3 kg',
        description: 'Electronic waste prevented'
      },
      {
        icon: 'Leaf',
        label: 'Carbon Saved',
        value: '12.5 kg CO₂',
        description: 'Compared to new production'
      },
      {
        icon: 'Droplets',
        label: 'Water Saved',
        value: '450 L',
        description: 'Manufacturing water saved'
      }
    ],
    certifications: [
      {
        name: 'Eco-Friendly',
        verified: true,
        description: 'Meets environmental standards'
      },
      {
        name: 'Sustainable Choice',
        verified: true,
        description: 'Promotes circular economy'
      }
    ],
    impactLevel: 'high' // low, medium, high
  };

  const getEcoScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getEcoScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const getImpactLevelConfig = (level) => {
    const configs = {
      high: {
        color: 'text-success',
        bgColor: 'bg-success/10',
        label: 'High Impact',
        description: 'Significant environmental benefit'
      },
      medium: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        label: 'Medium Impact',
        description: 'Moderate environmental benefit'
      },
      low: {
        color: 'text-text-secondary',
        bgColor: 'bg-muted',
        label: 'Low Impact',
        description: 'Some environmental benefit'
      }
    };
    return configs?.[level];
  };

  const impactConfig = getImpactLevelConfig(sustainabilityData?.impactLevel);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Leaf" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-card-foreground">Eco-Impact Tracker</h3>
          <p className="text-sm text-text-secondary">Environmental benefits of this purchase</p>
        </div>
      </div>
      {/* Eco Score */}
      <div className={`rounded-lg p-4 ${impactConfig?.bgColor}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-medium text-card-foreground">Eco Score</span>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${getEcoScoreColor(sustainabilityData?.ecoScore)}`}>
              {sustainabilityData?.ecoScore}
            </span>
            <span className="text-sm text-text-secondary">/ 100</span>
          </div>
        </div>
        
        <div className="w-full bg-background/50 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full bg-success"
            style={{ width: `${sustainabilityData?.ecoScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${getEcoScoreColor(sustainabilityData?.ecoScore)}`}>
            {getEcoScoreLabel(sustainabilityData?.ecoScore)}
          </span>
          <span className={`text-xs ${impactConfig?.color}`}>
            {impactConfig?.label}
          </span>
        </div>
      </div>
      {/* Environmental Benefits */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-card-foreground">Environmental Benefits</h4>
        <div className="grid grid-cols-1 gap-3">
          {sustainabilityData?.environmentalBenefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={benefit?.icon} size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-card-foreground">
                    {benefit?.label}
                  </span>
                  <span className="font-bold text-success">{benefit?.value}</span>
                </div>
                <p className="text-xs text-text-secondary">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Carbon Footprint Comparison */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TreePine" size={16} className="text-success" />
          <span className="font-heading font-medium text-success">Carbon Impact</span>
        </div>
        <div className="text-2xl font-bold text-success mb-1">
          -{sustainabilityData?.carbonFootprint?.saved} kg CO₂
        </div>
        <p className="text-sm text-text-secondary">
          {sustainabilityData?.carbonFootprint?.comparison}
        </p>
      </div>
      {/* Certifications */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-card-foreground">Sustainability Certifications</h4>
        <div className="space-y-2">
          {sustainabilityData?.certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon
                name={cert?.verified ? 'CheckCircle' : 'XCircle'}
                size={16}
                className={cert?.verified ? 'text-success' : 'text-text-secondary'}
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-card-foreground">
                  {cert?.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {cert?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Gamification Elements */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Award" size={16} className="text-primary" />
          <span className="font-heading font-medium text-primary">Eco Rewards</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">Eco Points Earned</span>
            <span className="font-bold text-primary">+{Math.floor(sustainabilityData?.ecoScore / 10)} points</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">Green Badge Progress</span>
            <span className="text-sm text-text-secondary">2/5 purchases</span>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center pt-2 border-t border-border">
        <p className="text-xs text-text-secondary mb-2">
          Join the sustainable marketplace movement
        </p>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
          Learn more about our eco-impact program
        </button>
      </div>
    </div>
  );
};

export default SustainabilityMetrics;