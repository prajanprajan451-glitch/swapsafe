import React from 'react';
import Icon from '../../../components/AppIcon';

const GamificationSection = ({ gamificationData }) => {
  const { badges, leaderboardPosition, progressToNextTier, currentTier } = gamificationData;

  const tierColors = {
    Bronze: 'text-amber-600',
    Silver: 'text-gray-500',
    Gold: 'text-yellow-500',
    Platinum: 'text-purple-500'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Achievements & Progress
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className={tierColors?.[currentTier]} />
          <span className={`font-medium ${tierColors?.[currentTier]}`}>
            {currentTier} Tier
          </span>
        </div>
      </div>
      {/* Progress to Next Tier */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">
            Progress to Next Tier
          </span>
          <span className="text-sm text-text-secondary">
            {progressToNextTier?.current}/{progressToNextTier?.target} points
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-smooth"
            style={{ width: `${(progressToNextTier?.current / progressToNextTier?.target) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {progressToNextTier?.target - progressToNextTier?.current} points to {progressToNextTier?.nextTier}
        </p>
      </div>
      {/* Achievement Badges */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges?.map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${badge?.bgColor}`}>
                <Icon name={badge?.icon} size={24} className={badge?.color} />
              </div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">
                {badge?.name}
              </h4>
              <p className="text-xs text-text-secondary">
                {badge?.description}
              </p>
              {badge?.isNew && (
                <span className="inline-block mt-1 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                  New!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard Position */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">
                #{leaderboardPosition}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-card-foreground">
                Community Ranking
              </h4>
              <p className="text-sm text-text-secondary">
                Top {Math.round((leaderboardPosition / 1000) * 100)}% in your area
              </p>
            </div>
          </div>
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>
      </div>
    </div>
  );
};

export default GamificationSection;