import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultCount = 0 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Distance: Nearest First' },
    { value: 'trust-score', label: 'Trust Score: Highest First' },
    { value: 'eco-impact', label: 'Environmental Impact' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  const handleSortChange = (value) => {
    let newSortBy = value;
    let newSortOrder = 'desc';

    // Handle special sort cases
    if (value === 'price-low') {
      newSortBy = 'price';
      newSortOrder = 'asc';
    } else if (value === 'price-high') {
      newSortBy = 'price';
      newSortOrder = 'desc';
    } else if (value === 'distance') {
      newSortBy = 'distance';
      newSortOrder = 'asc';
    } else if (value === 'trust-score') {
      newSortBy = 'trustScore';
      newSortOrder = 'desc';
    } else if (value === 'eco-impact') {
      newSortBy = 'ecoScore';
      newSortOrder = 'desc';
    } else if (value === 'newest') {
      newSortBy = 'createdAt';
      newSortOrder = 'desc';
    } else if (value === 'oldest') {
      newSortBy = 'createdAt';
      newSortOrder = 'asc';
    }

    onSortChange(newSortBy, newSortOrder);
  };

  const getCurrentSortValue = () => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? 'price-low' : 'price-high';
    } else if (sortBy === 'distance') {
      return 'distance';
    } else if (sortBy === 'trustScore') {
      return 'trust-score';
    } else if (sortBy === 'ecoScore') {
      return 'eco-impact';
    } else if (sortBy === 'createdAt') {
      return sortOrder === 'desc' ? 'newest' : 'oldest';
    }
    return sortBy;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Results Count */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            <span className="font-medium text-foreground">{resultCount?.toLocaleString()}</span> products found
          </span>
          
          {/* Quick Filters */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant={sortBy === 'distance' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleSortChange('distance')}
              iconName="MapPin"
              iconPosition="left"
            >
              Nearby
            </Button>
            <Button
              variant={sortBy === 'trustScore' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleSortChange('trust-score')}
              iconName="Shield"
              iconPosition="left"
            >
              Trusted
            </Button>
            <Button
              variant={sortBy === 'ecoScore' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleSortChange('eco-impact')}
              iconName="Leaf"
              iconPosition="left"
            >
              Eco-Friendly
            </Button>
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
            <Select
              options={sortOptions}
              value={getCurrentSortValue()}
              onChange={handleSortChange}
              placeholder="Sort by"
              className="min-w-[180px]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Quick Actions */}
      <div className="flex lg:hidden items-center space-x-2 mt-4 pt-4 border-t border-border">
        <Button
          variant={sortBy === 'distance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('distance')}
          iconName="MapPin"
          iconPosition="left"
        >
          Nearby
        </Button>
        <Button
          variant={sortBy === 'trustScore' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('trust-score')}
          iconName="Shield"
          iconPosition="left"
        >
          Trusted
        </Button>
        <Button
          variant={sortBy === 'ecoScore' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('eco-impact')}
          iconName="Leaf"
          iconPosition="left"
        >
          Eco
        </Button>
      </div>
    </div>
  );
};

export default SortControls;