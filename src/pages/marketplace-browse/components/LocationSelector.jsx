import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSelector = ({ 
  currentLocation, 
  onLocationChange, 
  className = '' 
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if location is already stored
    const savedLocation = localStorage.getItem('swapsafe_location');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserLocation(location);
        if (!currentLocation) {
          onLocationChange(location);
        }
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsDetecting(true);
    setLocationError(null);

    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position?.coords;
          
          // Mock reverse geocoding (in real app, use Google Maps API or similar)
          const mockLocation = {
            latitude,
            longitude,
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            address: '123 Market Street, San Francisco, CA 94102',
            displayName: 'San Francisco, CA'
          };

          setUserLocation(mockLocation);
          localStorage.setItem('swapsafe_location', JSON.stringify(mockLocation));
          onLocationChange(mockLocation);
        } catch (error) {
          setLocationError('Failed to get location details');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error?.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        setLocationError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const clearLocation = () => {
    setUserLocation(null);
    localStorage.removeItem('swapsafe_location');
    onLocationChange(null);
    setLocationError(null);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-medium text-card-foreground flex items-center">
          <Icon name="MapPin" size={16} className="mr-2 text-primary" />
          Your Location
        </h3>
        {userLocation && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearLocation}
            iconName="X"
          />
        )}
      </div>
      {userLocation ? (
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-card-foreground">
                {userLocation?.displayName}
              </p>
              <p className="text-sm text-text-secondary">
                {userLocation?.address}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            loading={isDetecting}
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
          >
            Update Location
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            Enable location services to find products near you and get accurate distance calculations.
          </p>
          
          <Button
            variant="default"
            onClick={detectLocation}
            loading={isDetecting}
            iconName="MapPin"
            iconPosition="left"
            fullWidth
          >
            {isDetecting ? 'Detecting Location...' : 'Use My Location'}
          </Button>
          
          {locationError && (
            <div className="flex items-start space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
              <p className="text-sm text-error">{locationError}</p>
            </div>
          )}
        </div>
      )}
      {/* Location Benefits */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-2">
          Benefits of sharing location:
        </h4>
        <ul className="space-y-1 text-xs text-text-secondary">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Find products near you</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Accurate distance calculations</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Reduced shipping costs</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Support local sellers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LocationSelector;