import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaLock, FaShieldAlt, FaCheckCircle, FaTimes, FaEye, FaEyeSlash, FaCalendarAlt, FaUser } from 'react-icons/fa';

const PaymentForm = ({ amount, onPaymentSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardType, setCardType] = useState('');

  const detectCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    if (num.startsWith('6')) return 'discover';
    return '';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
      setCardType(detectCardType(processedValue));
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const cardNumber = formData.cardNumber.replace(/\s/g, '');

    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const expiry = new Date(parseInt(formData.expiryYear), parseInt(formData.expiryMonth) - 1);
      if (expiry < new Date()) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    if (!formData.cvv || formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'Valid CVV is required';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setPaymentSuccess(true);

    setTimeout(() => {
      onPaymentSuccess(formData);
    }, 2000);
  };

  const cardIcons = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳'
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  if (paymentSuccess) {
    return (
      <motion.div
        className="text-center p-8 bg-green-50 rounded-3xl border border-green-200"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-green-700 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Payment Successful!
        </motion.h2>
        <motion.p
          className="text-green-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your payment of ${amount.toFixed(2)} has been processed successfully.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold flex items-center">
              <FaCreditCard className="mr-3" />
              Secure Payment
            </h1>
            <p className="text-blue-100 mt-2 flex items-center">
              <FaLock className="mr-2" />
              256-bit SSL Encrypted
            </p>
          </motion.div>
          <motion.div
            className="text-right"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl font-bold">${amount.toFixed(2)}</div>
            <div className="text-blue-100">Total Amount</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="p-8">
        {/* Card Information */}
        <motion.div
          className="mb-8"
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaCreditCard className="mr-2 text-blue-500" />
            Card Information
          </h3>

          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              <FaCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {cardType && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                  {cardIcons[cardType]}
                </span>
              )}
            </div>
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          {/* Cardholder Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.cardName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="John Doe"
              />
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.expiryMonth}
                  onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                  className={`py-3 px-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                >
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.expiryYear}
                  onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                  className={`py-3 px-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                >
                  <option value="">YY</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                      {String(new Date().getFullYear() + i).slice(-2)}
                    </option>
                  ))}
                </select>
              </div>
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <div className="relative">
                <input
                  type={showCVV ? 'text' : 'password'}
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className={`w-full pl-4 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="123"
                  maxLength="4"
                />
                <button
                  type="button"
                  onClick={() => setShowCVV(!showCVV)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCVV ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </motion.div>

        {/* Billing Address */}
        <motion.div
          className="mb-8"
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaShieldAlt className="mr-2 text-green-500" />
            Billing Address
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              className={`w-full py-3 px-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                errors.billingAddress ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="123 Main Street"
            />
            {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full py-3 px-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.city ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={`w-full py-3 px-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-start">
            <FaShieldAlt className="text-blue-500 text-xl mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Secure Payment</h4>
              <p className="text-blue-700 text-sm">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption
                to protect your data. Your card details are not stored on our servers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300"
          >
            Cancel
          </button>

          <motion.button
            type="submit"
            disabled={isProcessing}
            className={`px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            whileHover={!isProcessing ? { scale: 1.05 } : {}}
            whileTap={!isProcessing ? { scale: 0.95 } : {}}
          >
            {isProcessing ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Processing Payment...
              </>
            ) : (
              <>
                <FaLock className="mr-2" />
                Pay ${amount.toFixed(2)}
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we securely process your payment...</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentForm;
