import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPrint, FaEnvelope, FaCheckCircle, FaFileInvoiceDollar, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaCreditCard, FaReceipt } from 'react-icons/fa';

const Invoice = ({ booking, onClose }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const invoiceRef = useRef();

  // Mock invoice data
  const invoiceData = {
    invoiceNumber: `INV-${Date.now()}`,
    issueDate: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    bookingId: booking?.id || 'BK-12345',
    guestName: booking?.guestName || 'John Doe',
    guestEmail: booking?.guestEmail || 'john.doe@example.com',
    guestPhone: booking?.guestPhone || '+1 234 567 8900',
    roomName: booking?.roomName || 'Deluxe Ocean View Suite',
    checkIn: booking?.checkIn || '2024-01-15',
    checkOut: booking?.checkOut || '2024-01-18',
    nights: booking?.nights || 3,
    roomRate: booking?.roomRate || 350,
    subtotal: booking?.subtotal || 1050,
    tax: booking?.tax || 105,
    serviceCharge: booking?.serviceCharge || 52.5,
    total: booking?.total || 1207.5,
    paymentMethod: booking?.paymentMethod || 'Credit Card',
    hotelName: 'Grand Hotel Paradise',
    hotelAddress: '123 Ocean Drive, Paradise City, PC 12345',
    hotelPhone: '+1 555 123 4567',
    hotelEmail: 'reservations@grandhotelparadise.com'
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 1000);
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('PDF download functionality would be implemented here');
  };

  const handleEmail = () => {
    setIsEmailing(true);
    setTimeout(() => {
      setIsEmailing(false);
      alert('Invoice sent to guest email');
    }, 2000);
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      ref={invoiceRef}
    >
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FaFileInvoiceDollar className="text-4xl" />
            <div>
              <h1 className="text-3xl font-bold">Invoice</h1>
              <p className="text-blue-100">#{invoiceData.invoiceNumber}</p>
            </div>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold">{invoiceData.hotelName}</h2>
            <p className="text-blue-100">{invoiceData.hotelAddress}</p>
            <p className="text-blue-100">{invoiceData.hotelPhone}</p>
            <p className="text-blue-100">{invoiceData.hotelEmail}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Invoice Details */}
      <motion.div
        className="p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Guest Information */}
          <motion.div
            className="bg-gray-50 p-6 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Guest Information
            </h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {invoiceData.guestName}</p>
              <p><strong>Email:</strong> {invoiceData.guestEmail}</p>
              <p><strong>Phone:</strong> {invoiceData.guestPhone}</p>
            </div>
          </motion.div>

          {/* Invoice Details */}
          <motion.div
            className="bg-gray-50 p-6 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaReceipt className="mr-2 text-green-500" />
              Invoice Details
            </h3>
            <div className="space-y-2">
              <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
              <p><strong>Issue Date:</strong> {invoiceData.issueDate}</p>
              <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
              <p><strong>Booking ID:</strong> {invoiceData.bookingId}</p>
            </div>
          </motion.div>
        </div>

        {/* Booking Information */}
        <motion.div
          className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            Booking Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-2"><strong>Room:</strong> {invoiceData.roomName}</p>
              <p className="mb-2"><strong>Check-in:</strong> {invoiceData.checkIn}</p>
              <p className="mb-2"><strong>Check-out:</strong> {invoiceData.checkOut}</p>
              <p><strong>Nights:</strong> {invoiceData.nights}</p>
            </div>
            <div>
              <p className="mb-2"><strong>Room Rate:</strong> ${invoiceData.roomRate}/night</p>
              <p className="mb-2"><strong>Payment Method:</strong> {invoiceData.paymentMethod}</p>
              <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Paid</span></p>
            </div>
          </div>
        </motion.div>

        {/* Billing Breakdown */}
        <motion.div
          className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Billing Breakdown</h3>

          <div className="space-y-4">
            <motion.div
              className="flex justify-between items-center py-3 border-b border-gray-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>Room Rate ({invoiceData.nights} nights)</span>
              <span className="font-semibold">${invoiceData.roomRate} × {invoiceData.nights} = ${invoiceData.subtotal}</span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center py-3 border-b border-gray-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <span>Tax (10%)</span>
              <span className="font-semibold">${invoiceData.tax}</span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center py-3 border-b border-gray-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <span>Service Charge (5%)</span>
              <span className="font-semibold">${invoiceData.serviceCharge}</span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center py-4 bg-gray-50 px-4 rounded-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">${invoiceData.total}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-green-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-green-800">Payment Confirmed</h3>
          </div>
          <p className="text-green-700">
            Payment of ${invoiceData.total} has been successfully processed via {invoiceData.paymentMethod}.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPrint className="mr-2" />
            {isPrinting ? 'Printing...' : 'Print Invoice'}
          </motion.button>

          <motion.button
            onClick={handleDownload}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="mr-2" />
            Download PDF
          </motion.button>

          <motion.button
            onClick={handleEmail}
            disabled={isEmailing}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="mr-2" />
            {isEmailing ? 'Sending...' : 'Email Invoice'}
          </motion.button>

          <motion.button
            onClick={onClose}
            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="bg-gray-100 p-6 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <p>Thank you for choosing {invoiceData.hotelName}!</p>
        <p className="text-sm mt-2">For any questions, please contact us at {invoiceData.hotelPhone} or {invoiceData.hotelEmail}</p>
      </motion.div>
    </motion.div>
  );
};

export default Invoice;
