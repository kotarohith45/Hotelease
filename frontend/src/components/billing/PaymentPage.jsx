import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentForm from './PaymentForm';

const PaymentPage = () => {
  const [paymentAmount] = useState(350); // Default amount for demo

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    // You can redirect to success page or show success message
    alert('Payment successful! Redirecting to confirmation page...');
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
    // You can redirect back to booking or show cancellation message
    alert('Payment cancelled');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Complete Your Payment
          </h1>
          <p className="text-lg text-gray-600">
            Secure payment processing for your hotel booking
          </p>
        </motion.div>

        <PaymentForm
          amount={paymentAmount}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    </motion.div>
  );
};

export default PaymentPage;
