import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: 'All Statuses', count: 0 },
    { value: 'pending', label: 'Pending', count: 0 },
    { value: 'processing', label: 'Processing', count: 0 },
    { value: 'shipped', label: 'Shipped', count: 0 },
    { value: 'delivered', label: 'Delivered', count: 0 },
    { value: 'completed', label: 'Completed', count: 0 },
    { value: 'disputed', label: 'Disputed', count: 0 },
    { value: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'buying', label: 'Buying' },
    { value: 'selling', label: 'Selling' }
  ];

  const amountRanges = [
    { value: 'all', label: 'Any Amount' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-200', label: '$50 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: '500+', label: '$500+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters?.dateRange,
        [type]: value
      }
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters?.status !== 'all') count++;
    if (localFilters?.type !== 'all') count++;
    if (localFilters?.amountRange !== 'all') count++;
    if (localFilters?.search) count++;
    if (localFilters?.dateRange?.start || localFilters?.dateRange?.end) count++;
    return count;
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: 'all',
      type: 'all',
      amountRange: 'all',
      dateRange: { start: '', end: '' }
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="search"
              placeholder="Search transactions, products, or order IDs..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {statusOptions?.slice(1, 5)?.map((status) => (
              <button
                key={status?.value}
                onClick={() => handleFilterChange('status', status?.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                  localFilters?.status === status?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-muted/80'
                }`}
              >
                {status?.label}
              </button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Transaction Type
              </label>
              <select
                value={localFilters?.type}
                onChange={(e) => handleFilterChange('type', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {typeOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Amount Range
              </label>
              <select
                value={localFilters?.amountRange}
                onChange={(e) => handleFilterChange('amountRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {amountRanges?.map((range) => (
                  <option key={range?.value} value={range?.value}>
                    {range?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={localFilters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={localFilters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Advanced Options */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={localFilters?.showDisputed}
                  onChange={(e) => handleFilterChange('showDisputed', e?.target?.checked)}
                  className="rounded border-border text-primary focus:ring-ring"
                />
                <span className="text-card-foreground">Include disputed transactions</span>
              </label>
              
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={localFilters?.highRiskOnly}
                  onChange={(e) => handleFilterChange('highRiskOnly', e?.target?.checked)}
                  className="rounded border-border text-primary focus:ring-ring"
                />
                <span className="text-card-foreground">High-risk transactions only</span>
              </label>
            </div>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;