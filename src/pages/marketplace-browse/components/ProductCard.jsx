import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatINR } from '../../../utils/currency';

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(product?.isFavorited || false);
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e?.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleCardClick = () => {
    navigate('/product-details', { state: { productId: product?.id } });
  };

  const handleMessageSeller = (e) => {
    e?.stopPropagation();
    // Navigate to messaging or open chat
    console.log('Message seller:', product?.seller?.name);
  };

  const getScamShieldColor = (status) => {
    const colors = {
      safe: 'text-success',
      warning: 'text-warning',
      danger: 'text-error'
    };
    return colors?.[status] || 'text-text-secondary';
  };

  const getScamShieldIcon = (status) => {
    const icons = {
      safe: 'ShieldCheck',
      warning: 'AlertTriangle',
      danger: 'ShieldX'
    };
    return icons?.[status] || 'Shield';
  };

  const getTrustScoreColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 3.5) return 'text-warning';
    return 'text-error';
  };

  const formatDistance = (distance) => {
    if (distance < 1) return `${(distance * 1000)?.toFixed(0)}m away`;
    return `${distance?.toFixed(1)} mi away`;
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-smooth"
        >
          <Icon 
            name={isFavorited ? 'Heart' : 'Heart'} 
            size={16} 
            className={isFavorited ? 'text-error fill-current' : 'text-text-secondary'} 
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product?.isEcoFriendly && (
            <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="Leaf" size={12} className="inline mr-1" />
              Eco-Friendly
            </div>
          )}
          {product?.condition === 'new' && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              New
            </div>
          )}
        </div>

        {/* Scam Shield Status */}
        <div className="absolute bottom-3 left-3">
          <div className={`flex items-center space-x-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium ${getScamShieldColor(product?.scamShield?.status)}`}>
            <Icon name={getScamShieldIcon(product?.scamShield?.status)} size={12} />
            <span>{product?.scamShield?.label}</span>
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-3">
          <h3 className="font-medium text-card-foreground line-clamp-2 mb-1">
            {product?.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatINR(product?.price)}
            </span>
            {product?.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                {formatINR(product?.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <Image
              src={product?.seller?.avatar}
              alt={product?.seller?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            {product?.seller?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={10} className="text-success-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-card-foreground truncate">
                {product?.seller?.name}
              </span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className={getTrustScoreColor(product?.seller?.trustScore)} />
                <span className={`text-xs font-medium ${getTrustScoreColor(product?.seller?.trustScore)}`}>
                  {product?.seller?.trustScore?.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="MapPin" size={10} />
              <span>{formatDistance(product?.distance)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={handleCardClick}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMessageSeller}
            iconName="MessageCircle"
          />
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-text-secondary">
          <span>Listed {product?.listedDate}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{product?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{product?.favorites}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;