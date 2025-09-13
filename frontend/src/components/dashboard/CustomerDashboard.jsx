import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../../api/api';

const CustomerDashboard = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    loyaltyPoints: 1250,
    membership: 'Platinum',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookings = await bookingAPI.getAll();
      const now = new Date();
      
      const upcoming = bookings.filter(booking => new Date(booking.checkIn) > now);
      const past = bookings.filter(booking => new Date(booking.checkOut) < now);
      
      setUpcomingBookings(upcoming);
      setPastBookings(past);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Mock data for demo
      setUpcomingBookings([
        { 
          id: 1, 
          hotel: 'HotelEase Downtown', 
          room: 'Deluxe Suite - 101', 
          checkIn: '2024-01-15', 
          checkOut: '2024-01-18', 
          status: 'Confirmed',
          price: 350,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
        },
        { 
          id: 2, 
          hotel: 'HotelEase Resort', 
          room: 'Premium Villa - 201', 
          checkIn: '2024-02-05', 
          checkOut: '2024-02-08', 
          status: 'Confirmed',
          price: 450,
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
        }
      ]);
      setPastBookings([
        { 
          id: 3, 
          hotel: 'HotelEase Business', 
          room: 'Executive Room - 304', 
          checkIn: '2023-12-12', 
          checkOut: '2023-12-15', 
          status: 'Completed',
          price: 280,
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👑</span>
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Ready for your next amazing stay?
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-right"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-sm font-medium">Loyalty Points</div>
                  <div className="text-2xl font-bold">{user.loyaltyPoints.toLocaleString()}</div>
                  <div className="text-xs opacity-90">{user.membership} Member</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Search Hotels</h3>
                  <p className="text-sm text-gray-600">Find your perfect stay</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Quick Book</h3>
                  <p className="text-sm text-gray-600">Book in seconds</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">💳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Manage Payments</h3>
                  <p className="text-sm text-gray-600">View invoices & payments</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Upcoming Bookings */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Stays</h2>
              <Link
                to="/search"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Book New Stay
              </Link>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex space-x-4">
                      <img
                        src={booking.image}
                        alt={booking.hotel}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{booking.hotel}</h3>
                        <p className="text-gray-600 mb-2">{booking.room}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>📅 {booking.checkIn}</span>
                          <span>➡️</span>
                          <span>📅 {booking.checkOut}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {booking.status}
                          </span>
                          <span className="text-lg font-bold text-blue-600">${booking.price}/night</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No upcoming stays</h3>
                <p className="text-gray-600 mb-6">Start planning your next amazing trip!</p>
                <Link
                  to="/search"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Browse Hotels
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Past Bookings */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Stays</h2>
            
            {pastBookings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pastBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex space-x-4">
                      <img
                        src={booking.image}
                        alt={booking.hotel}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{booking.hotel}</h3>
                        <p className="text-gray-600 mb-2">{booking.room}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>📅 {booking.checkIn}</span>
                          <span>➡️</span>
                          <span>📅 {booking.checkOut}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {booking.status}
                          </span>
                          <div className="flex space-x-2">
                            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                              View Invoice
                            </button>
                            <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors">
                              Book Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No past stays yet</h3>
                <p className="text-gray-600">Your future hotel experiences await!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomerDashboard;
