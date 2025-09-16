import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/user-dashboard', label: 'Dashboard', icon: 'Home' },
    { path: '/marketplace-browse', label: 'Marketplace', icon: 'Search' },
    { path: '/product-details', label: 'Products', icon: 'Package' },
    { path: '/transaction-management', label: 'Transactions', icon: 'ArrowLeftRight' },
  ];

  const secondaryItems = [
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
    { path: '/profile', label: 'Profile', icon: 'User' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/user-login');
  };

  const handleRegister = () => {
    navigate('/user-registration');
  };

  const isAuthPage = location?.pathname === '/user-login' || location?.pathname === '/user-registration';

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/user-dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                SwapSafe
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} className="mr-2" />
                  {item?.label}
                </button>
              ))}
              
              {/* More Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="MoreHorizontal" size={16} className="mr-2" />
                  More
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-200">
                    <div className="py-2">
                      {secondaryItems?.map((item) => (
                        <button
                          key={item?.path}
                          onClick={() => handleNavigation(item?.path)}
                          className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                        >
                          <Icon name={item?.icon} size={16} className="mr-3" />
                          {item?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Auth Buttons */}
          {isAuthPage && (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogin}
                className={location?.pathname === '/user-login' ? 'text-primary' : ''}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleRegister}
                className={location?.pathname === '/user-registration' ? 'bg-secondary' : ''}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Trust Indicators */}
          {!isAuthPage && (
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="mr-1 text-success" />
                <span className="font-caption">SSL Secured</span>
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="CheckCircle" size={16} className="mr-1 text-success" />
                <span className="font-caption">Verified</span>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isAuthPage && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {!isAuthPage && isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name={item?.icon} size={16} className="mr-3" />
                    {item?.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;