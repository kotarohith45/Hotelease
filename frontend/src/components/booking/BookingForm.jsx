import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaCreditCard, FaEnvelope, FaPhone } from 'react-icons/fa';

const BookingForm = ({ room, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) newErrors.checkOut = 'Check-out must be after check-in';
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Valid card number is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)) newErrors.expiryDate = 'Valid expiry date is required (MM/YY)';
    if (!formData.cvv.trim() || formData.cvv.length !== 3) newErrors.cvv = 'Valid CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    onSubmit(formData);
  };

  if (submitSuccess) {
    return (
      <motion.div
        className="p-8 bg-green-100 rounded-xl shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-4">Booking Successful!</h2>
        <p className="text-green-700 mb-6">Thank you for your booking. We look forward to your stay.</p>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          onClick={onCancel}
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg mx-auto"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 text-purple-700 text-center">Book {room?.name || 'Room'}</h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="fullName">
          Full Name
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="Your full name"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="phone">
          Phone Number
        </label>
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="+1 234 567 8900"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="checkIn">
            Check-In Date
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              id="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(e) => handleChange('checkIn', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                errors.checkIn ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
            />
          </div>
          {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="checkOut">
            Check-Out Date
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              id="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(e) => handleChange('checkOut', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                errors.checkOut ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
              }`}
            />
          </div>
          {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="guests">
          Number of Guests
        </label>
        <select
          id="guests"
          value={formData.guests}
          onChange={(e) => handleChange('guests', parseInt(e.target.value))}
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-all duration-300"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Guest{i !== 0 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-purple-700">Payment Details</h3>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="cardNumber">
          Card Number
        </label>
        <div className="relative">
          <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            id="cardNumber"
            type="text"
            maxLength="19"
            value={formData.cardNumber}
            onChange={(e) => handleChange('cardNumber', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="cardName">
          Name on Card
        </label>
        <input
          id="cardName"
          type="text"
          value={formData.cardName}
          onChange={(e) => handleChange('cardName', e.target.value)}
          className={`w-full py-3 px-4 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
            errors.cardName ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
          }`}
          placeholder="Full Name"
        />
        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="expiryDate">
            Expiry Date (MM/YY)
          </label>
          <input
            id="expiryDate"
            type="text"
            maxLength="5"
            value={formData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            className={`w-full py-3 px-4 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="cvv">
            CVV
          </label>
          <input
            id="cvv"
            type="password"
            maxLength="3"
            value={formData.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)}
            className={`w-full py-3 px-4 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
              errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            }`}
            placeholder="123"
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </motion.form>
  );
};

export default BookingForm;
