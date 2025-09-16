import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ProductGrid from './components/ProductGrid';
import LocationSelector from './components/LocationSelector';

import Button from '../../components/ui/Button';

const MarketplaceBrowse = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [userLocation, setUserLocation] = useState(null);

  // Filter and sort state
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    location: '10',
    priceRange: { min: '', max: '' },
    condition: [],
    trustScore: 0,
    ecoFriendly: false,
    verifiedSellers: false,
    scamShield: false
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      title: 'iPhone 14 Pro Max - 256GB Space Black',
      price: 899,
      originalPrice: 1099,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      condition: 'like-new',
      isEcoFriendly: true,
      distance: 2.3,
      views: 156,
      favorites: 23,
      listedDate: '2 days ago',
      isFavorited: false,
      seller: {
        id: 'seller1',
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        trustScore: 4.8,
        isVerified: true
      },
      scamShield: {
        status: 'safe',
        label: 'AI Protected',
        confidence: 0.95
      }
    },
    {
      id: '2',
      title: 'MacBook Air M2 - 13 inch, 8GB RAM, 256GB SSD',
      price: 1099,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      condition: 'new',
      isEcoFriendly: false,
      distance: 0.8,
      views: 89,
      favorites: 12,
      listedDate: '1 day ago',
      isFavorited: true,
      seller: {
        id: 'seller2',
        name: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        trustScore: 4.6,
        isVerified: true
      },
      scamShield: {
        status: 'safe',
        label: 'Verified Safe',
        confidence: 0.98
      }
    },
    {
      id: '3',
      title: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
      price: 199,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      condition: 'good',
      isEcoFriendly: true,
      distance: 5.2,
      views: 234,
      favorites: 45,
      listedDate: '3 days ago',
      isFavorited: false,
      seller: {
        id: 'seller3',
        name: 'Emma Davis',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        trustScore: 4.9,
        isVerified: true
      },
      scamShield: {
        status: 'safe',
        label: 'AI Protected',
        confidence: 0.92
      }
    },
    {
      id: '4',
      title: 'Nintendo Switch OLED Console - White',
      price: 299,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
      condition: 'like-new',
      isEcoFriendly: false,
      distance: 1.5,
      views: 178,
      favorites: 34,
      listedDate: '4 days ago',
      isFavorited: false,
      seller: {
        id: 'seller4',
        name: 'Alex Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        trustScore: 4.4,
        isVerified: false
      },
      scamShield: {
        status: 'warning',
        label: 'Review Required',
        confidence: 0.75
      }
    },
    {
      id: '5',
      title: 'Canon EOS R5 Mirrorless Camera Body',
      price: 2899,
      originalPrice: 3899,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
      condition: 'good',
      isEcoFriendly: true,
      distance: 12.8,
      views: 67,
      favorites: 8,
      listedDate: '1 week ago',
      isFavorited: false,
      seller: {
        id: 'seller5',
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
        trustScore: 4.7,
        isVerified: true
      },
      scamShield: {
        status: 'safe',
        label: 'AI Protected',
        confidence: 0.89
      }
    },
    {
      id: '6',
      title: 'Tesla Model 3 Performance Wheels (Set of 4)',
      price: 1200,
      originalPrice: 2500,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      condition: 'fair',
      isEcoFriendly: true,
      distance: 8.3,
      views: 145,
      favorites: 19,
      listedDate: '5 days ago',
      isFavorited: false,
      seller: {
        id: 'seller6',
        name: 'Jennifer Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
        trustScore: 4.5,
        isVerified: true
      },
      scamShield: {
        status: 'safe',
        label: 'Verified Safe',
        confidence: 0.94
      }
    }
  ];

  useEffect(() => {
    loadProducts();
  }, [filters, sortBy, sortOrder]);

  useEffect(() => {
    // Handle URL parameters for search
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams?.get('q');
    const category = urlParams?.get('category');
    
    if (searchQuery || category) {
      setFilters(prev => ({
        ...prev,
        keyword: searchQuery || prev?.keyword,
        category: category || prev?.category
      }));
    }
  }, [location?.search]);

  const loadProducts = async (page = 1) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredProducts = [...mockProducts];
      
      // Apply filters
      if (filters?.keyword) {
        filteredProducts = filteredProducts?.filter(product =>
          product?.title?.toLowerCase()?.includes(filters?.keyword?.toLowerCase())
        );
      }
      
      if (filters?.category) {
        filteredProducts = filteredProducts?.filter(product =>
          product?.category === filters?.category
        );
      }
      
      if (filters?.priceRange?.min) {
        filteredProducts = filteredProducts?.filter(product =>
          product?.price >= parseFloat(filters?.priceRange?.min)
        );
      }
      
      if (filters?.priceRange?.max) {
        filteredProducts = filteredProducts?.filter(product =>
          product?.price <= parseFloat(filters?.priceRange?.max)
        );
      }
      
      if (filters?.condition?.length > 0) {
        filteredProducts = filteredProducts?.filter(product =>
          filters?.condition?.includes(product?.condition)
        );
      }
      
      if (filters?.trustScore > 0) {
        filteredProducts = filteredProducts?.filter(product =>
          product?.seller?.trustScore >= filters?.trustScore
        );
      }
      
      if (filters?.ecoFriendly) {
        filteredProducts = filteredProducts?.filter(product => product?.isEcoFriendly);
      }
      
      if (filters?.verifiedSellers) {
        filteredProducts = filteredProducts?.filter(product => product?.seller?.isVerified);
      }
      
      if (filters?.scamShield) {
        filteredProducts = filteredProducts?.filter(product => 
          product?.scamShield?.status === 'safe'
        );
      }
      
      // Apply sorting
      filteredProducts?.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'price':
            aValue = a?.price;
            bValue = b?.price;
            break;
          case 'distance':
            aValue = a?.distance;
            bValue = b?.distance;
            break;
          case 'trustScore':
            aValue = a?.seller?.trustScore;
            bValue = b?.seller?.trustScore;
            break;
          case 'ecoScore':
            aValue = a?.isEcoFriendly ? 1 : 0;
            bValue = b?.isEcoFriendly ? 1 : 0;
            break;
          case 'createdAt':
            aValue = new Date(a.listedDate);
            bValue = new Date(b.listedDate);
            break;
          default:
            aValue = a?.views + a?.favorites;
            bValue = b?.views + b?.favorites;
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      if (page === 1) {
        setProducts(filteredProducts);
      } else {
        setProducts(prev => [...prev, ...filteredProducts]);
      }
      
      setHasMore(filteredProducts?.length >= 6 && page < 3);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    await loadProducts(currentPage + 1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
              Marketplace
            </h1>
            <p className="text-text-secondary">
              Discover trusted products with AI-powered scam protection and sustainability tracking
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filter Panel */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="space-y-6">
                <LocationSelector
                  currentLocation={userLocation}
                  onLocationChange={handleLocationChange}
                />
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                  resultCount={products?.length}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Panel */}
              <div className="lg:hidden">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                  resultCount={products?.length}
                />
              </div>

              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultCount={products?.length}
              />

              {/* Product Grid */}
              <ProductGrid
                products={products}
                viewMode={viewMode}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Floating Action Button for Mobile Filters */}
      <div className="lg:hidden fixed bottom-6 right-6 z-200">
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsFilterOpen(true)}
          iconName="Filter"
          className="rounded-full shadow-elevated"
        />
      </div>
    </div>
  );
};

export default MarketplaceBrowse;