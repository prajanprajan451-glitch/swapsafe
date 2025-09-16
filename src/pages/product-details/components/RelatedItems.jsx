import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedItems = ({ currentProductId, category }) => {
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 'prod-002',
      title: 'iPhone 13 Pro Max - Space Gray',
      price: 899,
      originalPrice: 1099,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
      seller: {
        name: 'TechDeals Pro',
        trustScore: 92,
        rating: 4.8,
        isVerified: true
      },
      location: 'San Francisco, CA',
      ecoScore: 88
    },
    {
      id: 'prod-003',
      title: 'Samsung Galaxy S23 Ultra',
      price: 750,
      originalPrice: 1200,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'],
      seller: {
        name: 'MobileHub',
        trustScore: 87,
        rating: 4.6,
        isVerified: true
      },
      location: 'Los Angeles, CA',
      ecoScore: 82
    },
    {
      id: 'prod-004',
      title: 'Google Pixel 7 Pro - Obsidian',
      price: 650,
      originalPrice: 899,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
      seller: {
        name: 'PixelPerfect',
        trustScore: 95,
        rating: 4.9,
        isVerified: true
      },
      location: 'Seattle, WA',
      ecoScore: 90
    },
    {
      id: 'prod-005',
      title: 'OnePlus 11 - Titan Black',
      price: 580,
      originalPrice: 799,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400'],
      seller: {
        name: 'OnePlusDeals',
        trustScore: 89,
        rating: 4.7,
        isVerified: false
      },
      location: 'Austin, TX',
      ecoScore: 85
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
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

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details?id=${productId}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-foreground">Similar Items</h2>
        <button
          onClick={() => navigate('/marketplace-browse', { state: { category } })}
          className="text-primary hover:text-primary/80 font-medium text-sm transition-smooth"
        >
          View all in {category}
        </button>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div
            key={product?.id}
            onClick={() => handleProductClick(product?.id)}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth cursor-pointer group"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Condition Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${getConditionColor(product?.condition)}`}>
                {product?.condition}
              </div>
              
              {/* Eco Score */}
              <div className="absolute top-3 right-3 bg-success/90 text-white px-2 py-1 rounded text-xs font-medium">
                <Icon name="Leaf" size={10} className="inline mr-1" />
                {product?.ecoScore}
              </div>
              
              {/* Favorite Button */}
              <button className="absolute bottom-3 right-3 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <Icon name="Heart" size={16} />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-medium text-card-foreground line-clamp-2 text-sm">
                {product?.title}
              </h3>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product?.price)}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-sm text-text-secondary line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Seller Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary font-caption">
                    {product?.seller?.name}
                  </span>
                  {product?.seller?.isVerified && (
                    <Icon name="CheckCircle" size={12} className="text-success" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.seller?.rating)}
                    <span className="text-xs text-text-secondary ml-1">
                      {product?.seller?.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} className={getTrustScoreColor(product?.seller?.trustScore)} />
                    <span className={`text-xs font-medium ${getTrustScoreColor(product?.seller?.trustScore)}`}>
                      {product?.seller?.trustScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-xs text-text-secondary">
                <Icon name="MapPin" size={12} className="mr-1" />
                <span className="font-caption">{product?.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/marketplace-browse', { state: { category } })}
          className="px-6 py-2 border border-border rounded-lg text-text-secondary hover:text-foreground hover:border-primary transition-smooth"
        >
          View More Similar Items
        </button>
      </div>
    </div>
  );
};

export default RelatedItems;