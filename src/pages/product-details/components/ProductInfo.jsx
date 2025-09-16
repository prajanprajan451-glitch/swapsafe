import React from 'react';
import Icon from '../../../components/AppIcon';
import { formatCurrency } from '../../../utils/currency';

const ProductInfo = ({ product }) => {
  const formatPrice = (price) => {
    return formatCurrency(price, {
      locale: 'en-IN',
      currency: 'INR'
    });
  };

  const getConditionColor = (condition) => {
    const colors = {
      'New': 'text-success bg-success/10',
      'Like New': 'text-success bg-success/10',
      'Good': 'text-warning bg-warning/10',
      'Fair': 'text-error bg-error/10'
    };
    return colors?.[condition] || 'text-text-secondary bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {product?.title}
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-heading font-bold text-primary">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-lg text-text-secondary line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>
      </div>
      {/* Condition and Category */}
      <div className="flex items-center space-x-4">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(product?.condition)}`}>
          {product?.condition}
        </div>
        <div className="flex items-center text-text-secondary">
          <Icon name="Tag" size={16} className="mr-1" />
          <span className="text-sm font-caption">{product?.category}</span>
        </div>
      </div>
      {/* Description */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3">Description</h3>
        <p className="text-text-secondary leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Specifications */}
      {product?.specifications && product?.specifications?.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-3">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product?.specifications?.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-border">
                <span className="text-text-secondary font-caption">{spec?.label}</span>
                <span className="text-foreground font-medium">{spec?.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Features */}
      {product?.features && product?.features?.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product?.features?.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Icon name="Check" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Location and Availability */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center text-text-secondary">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span className="text-sm font-caption">{product?.location}</span>
        </div>
        <div className="flex items-center text-success">
          <Icon name="CheckCircle" size={16} className="mr-1" />
          <span className="text-sm font-medium">Available</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;