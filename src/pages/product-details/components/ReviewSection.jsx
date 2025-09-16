import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSection = ({ productId, sellerId }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const reviewStats = {
    averageRating: 4.6,
    totalReviews: 127,
    distribution: {
      5: 78,
      4: 32,
      3: 12,
      2: 3,
      1: 2
    }
  };

  const reviews = [
    {
      id: 'rev-001',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        verified: true
      },
      rating: 5,
      date: new Date('2024-01-10'),
      title: 'Excellent condition, exactly as described',
      content: `The iPhone was in perfect condition, exactly as described by the seller. The battery health was 89% which was better than expected. Packaging was secure and delivery was prompt. The seller was very responsive to my questions before purchase. Highly recommend this seller for anyone looking for quality pre-owned devices.`,
      helpful: 24,
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200'
      ],
      verified_purchase: true
    },
    {
      id: 'rev-002',
      user: {
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        verified: true
      },
      rating: 4,
      date: new Date('2024-01-08'),
      title: 'Good phone, minor cosmetic issues',
      content: `Overall satisfied with the purchase. The phone works perfectly and all functions are intact. There are some minor scratches on the back that weren't clearly visible in the photos, but nothing major. The seller was honest about the condition and the price was fair. Would buy from them again.`,
      helpful: 18,
      images: [],
      verified_purchase: true
    },
    {
      id: 'rev-003',
      user: {
        name: 'Emily Rodriguez',avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        verified: false
      },
      rating: 5,
      date: new Date('2024-01-05'),title: 'Fast shipping and great communication',
      content: `Excellent experience from start to finish. The seller responded to my messages within minutes and was very accommodating with the pickup time. The phone was exactly as described and works flawlessly. The escrow system made me feel secure about the transaction. Will definitely use SwapSafe again.`,
      helpful: 31,
      images: [],
      verified_purchase: true
    }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const getFilteredReviews = () => {
    if (selectedRating === 'all') return reviews;
    return reviews?.filter(review => review?.rating === parseInt(selectedRating));
  };

  const getRatingPercentage = (rating) => {
    return Math.round((reviewStats?.distribution?.[rating] / reviewStats?.totalReviews) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-foreground">Customer Reviews</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={() => setShowWriteReview(true)}
        >
          Write Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">
                {reviewStats?.averageRating}
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(reviewStats?.averageRating), 20)}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {reviewStats?.totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary w-8">
                  {rating} star
                </span>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-text-secondary w-12">
                  {reviewStats?.distribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['all', '5', '4', '3', '2', '1']?.map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
              selectedRating === rating
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:text-foreground'
            }`}
          >
            {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
            {rating !== 'all' && (
              <span className="ml-1">({reviewStats?.distribution?.[rating]})</span>
            )}
          </button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {getFilteredReviews()?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={review?.user?.avatar}
                alt={review?.user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-card-foreground">{review?.user?.name}</h4>
                  {review?.user?.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                  {review?.verified_purchase && (
                    <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review?.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {formatDate(review?.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              {review?.title && (
                <h5 className="font-medium text-card-foreground">{review?.title}</h5>
              )}
              
              <p className="text-text-secondary leading-relaxed">
                {review?.content}
              </p>

              {/* Review Images */}
              {review?.images && review?.images?.length > 0 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {review?.images?.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <button className="flex items-center space-x-2 text-text-secondary hover:text-foreground transition-smooth">
                <Icon name="ThumbsUp" size={16} />
                <span className="text-sm">Helpful ({review?.helpful})</span>
              </button>
              
              <button className="text-text-secondary hover:text-foreground transition-smooth">
                <Icon name="Flag" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {getFilteredReviews()?.length < reviewStats?.totalReviews && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-bold text-card-foreground">
                Write a Review
              </h3>
              <button
                onClick={() => setShowWriteReview(false)}
                className="text-text-secondary hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((rating) => (
                    <button key={rating} className="text-border hover:text-warning transition-smooth">
                      <Icon name="Star" size={24} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Summarize your experience"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Your Review
                </label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Share your experience with this product and seller..."
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button variant="default" fullWidth>
                  Submit Review
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;