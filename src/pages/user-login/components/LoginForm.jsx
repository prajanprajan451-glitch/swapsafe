import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationGuard';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for different user types
  const mockCredentials = [
    {
      email: "buyer@swapsafe.com",
      password: "buyer123",
      userType: "buyer",
      userData: {
        id: "1",
        name: "Sarah Johnson",
        email: "buyer@swapsafe.com",
        userType: "buyer",
        trustScore: 4.8,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        joinedDate: "2024-01-15",
        totalTransactions: 23,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      }
    },
    {
      email: "seller@swapsafe.com",
      password: "seller123",
      userType: "seller",
      userData: {
        id: "2",
        name: "Michael Rodriguez",
        email: "seller@swapsafe.com",
        userType: "seller",
        trustScore: 4.9,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        joinedDate: "2023-11-20",
        totalTransactions: 47,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    },
    {
      email: "admin@swapsafe.com",
      password: "admin123",
      userType: "admin",
      userData: {
        id: "3",
        name: "Emma Thompson",
        email: "admin@swapsafe.com",
        userType: "admin",
        trustScore: 5.0,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        joinedDate: "2023-08-10",
        totalTransactions: 156,
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock data
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Generate mock JWT token
        const mockToken = btoa(JSON.stringify({
          userId: validCredential?.userData?.id,
          email: validCredential?.email,
          userType: validCredential?.userType,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));

        // Login successful
        login(mockToken, validCredential?.userData);
        
        // Reset form
        setFormData({ email: '', password: '', rememberMe: false });
        setLoginAttempts(0);
        
      } else {
        // Invalid credentials
        setLoginAttempts(prev => prev + 1);
        
        if (loginAttempts >= 2) {
          setErrors({
            general: `Invalid credentials. Please try: buyer@swapsafe.com / buyer123, seller@swapsafe.com / seller123, or admin@swapsafe.com / admin123`
          });
        } else {
          setErrors({
            general: 'Invalid email or password. Please check your credentials and try again.'
          });
        }
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please check your internet connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
              <div>
                <p className="text-sm text-error font-medium">Login Failed</p>
                <p className="text-xs text-error/80 mt-1">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          error={errors?.email}
          required
          disabled={isLoading}
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
            disabled={isLoading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-smooth"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Demo Credentials Helper */}
        {loginAttempts === 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-text-secondary font-caption">
              <Icon name="Info" size={14} className="inline mr-1" />
              Demo credentials available for testing different user roles
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;