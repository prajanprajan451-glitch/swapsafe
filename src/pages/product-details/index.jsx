import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import SellerInfo from './components/SellerInfo';
import ScamDetectionPanel from './components/ScamDetectionPanel';
import TransactionActions from './components/TransactionActions';
import SustainabilityMetrics from './components/SustainabilityMetrics';
import RelatedItems from './components/RelatedItems';
import ReviewSection from './components/ReviewSection';
import Icon from '../../components/AppIcon';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  const productId = searchParams?.get('id') || 'prod-001';

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProductDetails = () => {
      setTimeout(() => {
        const mockProduct = {
          id: productId,
          title: 'iPhone 12 Pro - Pacific Blue (128GB)',
          price: 699,
          originalPrice: 999,
          condition: 'Like New',
          category: 'Smartphones',
          location: 'San Francisco, CA',
          description: `This iPhone 12 Pro in Pacific Blue is in excellent condition with minimal signs of use. The device has been well-maintained and comes with original packaging and accessories.\n\nThe phone features the powerful A14 Bionic chip, Pro camera system with LiDAR Scanner, and a stunning 6.1-inch Super Retina XDR display. Battery health is at 89% and all functions work perfectly.\n\nIncludes original box, Lightning cable, and documentation. No charger included as per Apple's environmental initiative.`,
          images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800','https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800','https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'
          ],
          specifications: [
            { label: 'Storage', value: '128GB' },
            { label: 'Color', value: 'Pacific Blue' },
            { label: 'Battery Health', value: '89%' },
            { label: 'Network', value: 'Unlocked' },
            { label: 'Screen Size', value: '6.1 inches' },
            { label: 'Camera', value: '12MP Triple System' }
          ],
          features: [
            'A14 Bionic chip with Neural Engine','Pro camera system with LiDAR Scanner','Super Retina XDR display with Ceramic Shield','5G capable for superfast downloads','Face ID for secure authentication','Water resistant to 6 meters for up to 30 minutes'
          ],
          seller: {
            id: 'seller-001',name: 'TechMaster Pro',avatar: 'https://randomuser.me/api/portraits/men/42.jpg',trustScore: 94,rating: 4.8,reviewCount: 156,memberSince: '2022',
            totalSales: 89,
            isVerified: true,
            isPowerSeller: true,
            responseTime: '2 hours',
            bio: `Professional electronics reseller with over 5 years of experience in the tech marketplace. I specialize in premium smartphones and tablets, ensuring all devices are thoroughly tested and accurately described. Customer satisfaction is my top priority, and I stand behind every product I sell with detailed condition reports and honest descriptions.`,
            verifications: [
              { type: 'Identity', verified: true },
              { type: 'Phone', verified: true },
              { type: 'Email', verified: true },
              { type: 'Address', verified: true }
            ]
          }
        };
        
        setProduct(mockProduct);
        setIsLoading(false);
      }, 1000);
    };

    fetchProductDetails();
  }, [productId]);

  const handleBackToMarketplace = () => {
    navigate('/marketplace-browse');
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'sustainability', label: 'Eco Impact', icon: 'Leaf' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse space-y-8">
              {/* Breadcrumb skeleton */}
              <div className="h-4 bg-muted rounded w-64"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image gallery skeleton */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-muted rounded-lg"></div>
                  <div className="flex space-x-2">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className="w-16 h-16 bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar skeleton */}
                <div className="space-y-6">
                  <div className="h-64 bg-muted rounded-lg"></div>
                  <div className="h-48 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                Product Not Found
              </h2>
              <p className="text-text-secondary mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={handleBackToMarketplace}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-8">
            <button
              onClick={handleBackToMarketplace}
              className="hover:text-foreground transition-smooth"
            >
              Marketplace
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>{product?.category}</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium truncate">
              {product?.title}
            </span>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Images and Product Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={product?.images} productName={product?.title} />
              
              {/* Mobile Transaction Actions */}
              <div className="lg:hidden">
                <TransactionActions product={product} seller={product?.seller} />
              </div>

              {/* Tabs */}
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'details' && (
                  <ProductInfo product={product} />
                )}
                
                {activeTab === 'reviews' && (
                  <ReviewSection productId={product?.id} sellerId={product?.seller?.id} />
                )}
                
                {activeTab === 'sustainability' && (
                  <SustainabilityMetrics product={product} />
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Desktop Transaction Actions */}
              <div className="hidden lg:block">
                <TransactionActions product={product} seller={product?.seller} />
              </div>
              
              {/* Seller Info */}
              <SellerInfo seller={product?.seller} />
              
              {/* Scam Detection Panel */}
              <ScamDetectionPanel productId={product?.id} sellerId={product?.seller?.id} />
            </div>
          </div>

          {/* Related Items */}
          <RelatedItems currentProductId={product?.id} category={product?.category} />
        </div>
      </div>
      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-100">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-sm text-text-secondary">Price</div>
            <div className="text-xl font-bold text-primary">
              ${product?.price?.toLocaleString()}
            </div>
          </div>
          <button className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} />
          </button>
          <button className="flex-shrink-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;