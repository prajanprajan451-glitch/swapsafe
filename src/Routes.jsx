import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "components/ui/AuthenticationGuard";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import MarketplaceBrowse from './pages/marketplace-browse';
import ProductDetails from './pages/product-details';
import TransactionManagement from './pages/transaction-management';
import UserDashboard from './pages/user-dashboard';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationGuard>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<MarketplaceBrowse />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/marketplace-browse" element={<MarketplaceBrowse />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/transaction-management" element={<TransactionManagement />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthenticationGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;