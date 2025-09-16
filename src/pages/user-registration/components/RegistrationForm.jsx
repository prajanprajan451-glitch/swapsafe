import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

const RegistrationForm = ({ onSocialRegister, onTermsModal, onPrivacyModal }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeTerms: false,
    agreePrivacy: false,
    marketingEmails: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return levels?.[strength] || 'Very Weak';
  };

  const getPasswordStrengthColor = (strength) => {
    const colors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    return colors?.[strength] || 'bg-error';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.Lkylp_o9E_aP4QZKKb6O6HZJjZ8Xz8X8X8X8X8X8X8X';
      const mockUser = {
        id: '12345',
        fullName: formData?.fullName,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        emailVerified: false,
        phoneVerified: false,
        identityVerified: false,
        trustScore: 0,
        joinedDate: new Date()?.toISOString(),
        marketingEmails: formData?.marketingEmails
      };

      login(mockToken, mockUser);
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Social Registration Options */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => onSocialRegister('google')}
            iconName="Chrome"
            iconPosition="left"
            className="w-full"
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => onSocialRegister('facebook')}
            iconName="Facebook"
            iconPosition="left"
            className="w-full"
          >
            Facebook
          </Button>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-text-secondary">Or continue with email</span>
          </div>
        </div>
      </div>
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-text-secondary">Password strength:</span>
                <span className={`font-medium ${passwordStrength >= 3 ? 'text-success' : passwordStrength >= 2 ? 'text-warning' : 'text-error'}`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />

        {/* Phone Number */}
        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="+1 (555) 123-4567"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          description="Required for account verification and security"
          required
        />

        {/* Terms and Privacy Checkboxes */}
        <div className="space-y-3 pt-2">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onTermsModal}
                  className="text-primary hover:text-primary/80 underline"
                >
                  Terms of Service
                </button>
              </span>
            }
            name="agreeTerms"
            checked={formData?.agreeTerms}
            onChange={handleInputChange}
            error={errors?.agreeTerms}
            required
          />

          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onPrivacyModal}
                  className="text-primary hover:text-primary/80 underline"
                >
                  Privacy Policy
                </button>
              </span>
            }
            name="agreePrivacy"
            checked={formData?.agreePrivacy}
            onChange={handleInputChange}
            error={errors?.agreePrivacy}
            required
          />

          <Checkbox
            label="I would like to receive marketing emails and updates"
            name="marketingEmails"
            checked={formData?.marketingEmails}
            onChange={handleInputChange}
            description="You can unsubscribe at any time"
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={16} className="text-error mr-2" />
              <span className="text-sm text-error">{errors?.submit}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
          className="mt-6"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      {/* Login Link */}
      <div className="mt-6 text-center">
        <span className="text-sm text-text-secondary">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/user-login')}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Sign in
          </button>
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm;