import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EcoImpactTracker = ({ ecoData }) => {
  const { carbonSavings, sustainableTransactions, monthlyData, categoryBreakdown } = ecoData;

  const COLORS = ['#2D5A27', '#4A90A4', '#F4A261', '#28A745'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-popover-foreground">{`${label}: ${payload?.[0]?.value} kg CO₂`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Eco-Impact Tracker
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Leaf" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">
            Carbon Neutral+
          </span>
        </div>
      </div>
      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-success/10 rounded-lg">
          <div className="text-3xl font-heading font-bold text-success mb-2">
            {carbonSavings?.total}kg
          </div>
          <p className="text-sm text-text-secondary">CO₂ Saved</p>
          <p className="text-xs text-success mt-1">
            +{carbonSavings?.thisMonth}kg this month
          </p>
        </div>
        
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <div className="text-3xl font-heading font-bold text-primary mb-2">
            {sustainableTransactions?.total}
          </div>
          <p className="text-sm text-text-secondary">Sustainable Trades</p>
          <p className="text-xs text-primary mt-1">
            +{sustainableTransactions?.thisMonth} this month
          </p>
        </div>
        
        <div className="text-center p-4 bg-accent/10 rounded-lg">
          <div className="text-3xl font-heading font-bold text-accent mb-2">
            #{ecoData?.globalRanking}
          </div>
          <p className="text-sm text-text-secondary">Global Ranking</p>
          <p className="text-xs text-accent mt-1">
            Top 5% worldwide
          </p>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Carbon Savings Chart */}
        <div>
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
            Monthly Carbon Savings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="savings" 
                  fill="var(--color-success)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
            Impact by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryBreakdown?.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                ></div>
                <span className="text-sm text-text-secondary">
                  {category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Environmental Achievements */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
          Environmental Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ecoData?.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={`p-2 rounded-lg ${achievement?.bgColor}`}>
                <Icon name={achievement?.icon} size={16} className={achievement?.color} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-card-foreground">
                  {achievement?.title}
                </h4>
                <p className="text-xs text-text-secondary">
                  {achievement?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoImpactTracker;