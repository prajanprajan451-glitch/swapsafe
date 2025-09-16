// Currency utility functions for INR formatting
export const formatCurrency = (amount, options = {}) => {
  const {
    showSymbol = true,
    locale = 'en-IN',
    currency = 'INR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;

  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }

  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits,
      maximumFractionDigits
    })?.format(amount);
  } else {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits
    })?.format(amount);
  }
};

// Format currency with rupee symbol (₹) for display
export const formatINR = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  
  return `₹${amount?.toLocaleString('en-IN')}`;
};

// Convert USD to INR (approximate exchange rate)
// In a real application, this would fetch from a currency API
export const convertUSDToINR = (usdAmount, exchangeRate = 83) => {
  return usdAmount * exchangeRate;
};

export default formatCurrency;