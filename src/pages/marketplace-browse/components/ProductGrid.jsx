import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ 
  products, 
  viewMode = 'grid', 
  loading = false, 
  hasMore = false, 
  onLoadMore 
}) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
      observer?.observe(sentinel);
    }

    return () => observer?.disconnect();
  }, [hasMore, loading, isLoadingMore]);

  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-6 bg-muted rounded w-1/2"></div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded flex-1"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name="Search" size={32} className="text-text-secondary" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        No products found
      </h3>
      <p className="text-text-secondary max-w-md">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
    </div>
  );

  if (loading && displayedProducts?.length === 0) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
      }`}>
        {Array.from({ length: 12 })?.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (displayedProducts?.length === 0 && !loading) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1 lg:grid-cols-2'
      }`}>
        {displayedProducts?.map((product) => (
          <ProductCard 
            key={product?.id} 
            product={product} 
            viewMode={viewMode}
          />
        ))}
      </div>
      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-3 text-text-secondary">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-caption">Loading more products...</span>
          </div>
        </div>
      )}
      {/* Load More Sentinel */}
      {hasMore && !isLoadingMore && (
        <div id="load-more-sentinel" className="h-4"></div>
      )}
      {/* End of Results */}
      {!hasMore && displayedProducts?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <p className="text-text-secondary font-caption">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;