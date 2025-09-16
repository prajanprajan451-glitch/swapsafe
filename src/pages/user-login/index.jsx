import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginHeader from './components/LoginHeader';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import SecurityIndicators from './components/SecurityIndicators';

const UserLogin = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign In - SwapSafe | Secure Marketplace Login</title>
        <meta 
          name="description" 
          content="Sign in to your SwapSafe account for secure peer-to-peer marketplace trading with AI-powered scam detection and escrow protection." 
        />
        <meta name="keywords" content="login, sign in, secure trading, marketplace, SwapSafe" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://swapsafe.com/user-login" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Column - Login Form */}
                <div className="w-full max-w-md mx-auto lg:mx-0 space-y-8">
                  <LoginHeader />
                  <SocialLogin />
                  <LoginForm />
                </div>

                {/* Right Column - Security & Trust Indicators */}
                <div className="hidden lg:block w-full max-w-md mx-auto">
                  <SecurityIndicators />
                  
                  {/* Additional Trust Elements */}
                  <div className="mt-8 space-y-6">
                    {/* Feature Highlights */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-card-foreground mb-4">
                        Why Choose SwapSafe?
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-card-foreground">
                              AI Scam Detection
                            </h4>
                            <p className="text-xs text-text-secondary mt-1">
                              Advanced AI protects you from fraudulent listings and suspicious users
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-success/10 rounded-lg">
                            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-card-foreground">
                              Secure Escrow
                            </h4>
                            <p className="text-xs text-text-secondary mt-1">
                              Your payments are protected until you confirm receipt of items
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-secondary/10 rounded-lg">
                            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-card-foreground">
                              Eco-Impact Tracking
                            </h4>
                            <p className="text-xs text-text-secondary mt-1">
                              Track your environmental impact and earn sustainability rewards
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="User testimonial"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm text-card-foreground italic mb-2">
                            "SwapSafe gave me confidence to trade online again. The AI protection and escrow system work perfectly!"
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-card-foreground">
                              Jessica M.
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)]?.map((_, i) => (
                                <svg key={i} className="w-3 h-3 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserLogin;