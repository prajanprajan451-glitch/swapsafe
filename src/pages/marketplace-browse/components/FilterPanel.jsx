import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  resultCount = 0 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'books', label: 'Books & Media' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'beauty', label: 'Beauty & Health' }
  ];

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const locationOptions = [
    { value: '1', label: 'Within 1 mile' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: 'all', label: 'All locations' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceChange = (type, value) => {
    const priceRange = { ...localFilters?.priceRange };
    priceRange[type] = value;
    handleFilterChange('priceRange', priceRange);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      keyword: '',
      category: '',
      location: '10',
      priceRange: { min: '', max: '' },
      condition: [],
      trustScore: 0,
      ecoFriendly: false,
      verifiedSellers: false,
      scamShield: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search Keywords */}
      <div>
        <Input
          label="Search Keywords"
          type="search"
          placeholder="Search products..."
          value={localFilters?.keyword}
          onChange={(e) => handleFilterChange('keyword', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Location */}
      <div>
        <Select
          label="Location Range"
          options={locationOptions}
          value={localFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Select range"
        />
      </div>

      {/* Category */}
      <div>
        <Select
          label="Category"
          options={[{ value: '', label: 'All Categories' }, ...categories]}
          value={localFilters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          searchable
          placeholder="Select category"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min $"
            value={localFilters?.priceRange?.min}
            onChange={(e) => handlePriceChange('min', e?.target?.value)}
          />
          <Input
            type="number"
            placeholder="Max $"
            value={localFilters?.priceRange?.max}
            onChange={(e) => handlePriceChange('max', e?.target?.value)}
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Condition
        </label>
        <div className="space-y-2">
          {conditions?.map((condition) => (
            <Checkbox
              key={condition?.value}
              label={condition?.label}
              checked={localFilters?.condition?.includes(condition?.value)}
              onChange={(e) => {
                const updatedConditions = e?.target?.checked
                  ? [...localFilters?.condition, condition?.value]
                  : localFilters?.condition?.filter(c => c !== condition?.value);
                handleFilterChange('condition', updatedConditions);
              }}
            />
          ))}
        </div>
      </div>

      {/* Trust & Safety */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Trust & Safety
        </label>
        <div className="space-y-3">
          <Checkbox
            label="Verified Sellers Only"
            checked={localFilters?.verifiedSellers}
            onChange={(e) => handleFilterChange('verifiedSellers', e?.target?.checked)}
          />
          <Checkbox
            label="AI Scam Shield Protected"
            checked={localFilters?.scamShield}
            onChange={(e) => handleFilterChange('scamShield', e?.target?.checked)}
          />
          <div>
            <label className="block text-xs text-text-secondary mb-2">
              Minimum Trust Score: {localFilters?.trustScore}/5
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={localFilters?.trustScore}
              onChange={(e) => handleFilterChange('trustScore', parseFloat(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Sustainability */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Sustainability
        </label>
        <Checkbox
          label="Eco-Friendly Products Only"
          description="Products with positive environmental impact"
          checked={localFilters?.ecoFriendly}
          onChange={(e) => handleFilterChange('ecoFriendly', e?.target?.checked)}
        />
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          fullWidth
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  // Mobile Filter Panel
  if (window.innerWidth < 1024) {
    return (
      <>
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between p-4 bg-card border-b border-border lg:hidden">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onToggle}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
            <span className="text-sm text-text-secondary">
              {resultCount?.toLocaleString()} results
            </span>
          </div>
        </div>
        {/* Mobile Filter Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-300 lg:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onToggle} />
            <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border shadow-elevated overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-card-foreground">Filters</h3>
                <Button variant="ghost" size="icon" onClick={onToggle}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="p-4">
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Filter Panel
  return (
    <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-card-foreground">Filters</h3>
        <span className="text-sm text-text-secondary">
          {resultCount?.toLocaleString()} results
        </span>
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;