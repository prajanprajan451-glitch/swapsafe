import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGuard');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/user-login', '/user-registration'];
  const protectedRoutes = ['/user-dashboard', '/marketplace-browse', '/product-details', '/transaction-management'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleRouteProtection();
    }
  }, [isAuthenticated, isLoading, location?.pathname]);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('swapsafe_token');
      const userData = localStorage.getItem('swapsafe_user');
      
      if (token && userData) {
        // Validate token expiry
        const tokenData = JSON.parse(atob(token?.split('.')?.[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenData?.exp > currentTime) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } else {
          // Token expired
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteProtection = () => {
    const currentPath = location?.pathname;
    
    if (protectedRoutes?.includes(currentPath) && !isAuthenticated) {
      // Redirect to login with return path
      navigate('/user-login', { 
        state: { returnTo: currentPath },
        replace: true 
      });
    } else if (publicRoutes?.includes(currentPath) && isAuthenticated) {
      // Redirect authenticated users away from auth pages
      const returnTo = location?.state?.returnTo || '/user-dashboard';
      navigate(returnTo, { replace: true });
    } else if (currentPath === '/' && isAuthenticated) {
      // Redirect root to dashboard for authenticated users
      navigate('/user-dashboard', { replace: true });
    } else if (currentPath === '/' && !isAuthenticated) {
      // Redirect root to login for unauthenticated users
      navigate('/user-login', { replace: true });
    }
  };

  const login = (token, userData) => {
    try {
      localStorage.setItem('swapsafe_token', token);
      localStorage.setItem('swapsafe_user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      
      // Navigate to return path or dashboard
      const returnTo = location?.state?.returnTo || '/user-dashboard';
      navigate(returnTo, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('swapsafe_token');
    localStorage.removeItem('swapsafe_user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/user-login', { replace: true });
  };

  const updateUser = (updatedUserData) => {
    try {
      localStorage.setItem('swapsafe_user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

  const getAuthToken = () => {
    return localStorage.getItem('swapsafe_token');
  };

  const authValue = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    updateUser,
    getAuthToken,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-primary-foreground rounded opacity-75"></div>
          </div>
          <div className="text-text-secondary font-caption">Loading SwapSafe...</div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationGuard;