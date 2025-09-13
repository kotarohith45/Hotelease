import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 1244,
    availableRooms: 42,
    occupancyRate: '78%',
    totalRevenue: '$142,856'
  });
  
  const [recentBookings] = useState([
    { id: 1, customer: 'Rohith Sharma', room: 'Deluxe-101', checkIn: '2024-01-15', checkOut: '2024-01-18', status: 'Confirmed' },
    { id: 2, customer: 'Priya Patel', room: 'Suite-202', checkIn: '2024-01-16', checkOut: '2024-01-20', status: 'Checked-in' },
    { id: 3, customer: 'Alex Johnson', room: 'Premium-102', checkIn: '2024-01-18', checkOut: '2024-01-22', status: 'Pending' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({ ...prev, availableRooms: Math.floor(Math.random() * 50) + 30 }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Manage all hotel operations from a single dashboard</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📅', title: 'Total Bookings', value: stats.totalBookings, trend: '+12%', color: 'from-blue-500 to-cyan-500' },
              { icon: '🛏️', title: 'Available Rooms', value: stats.availableRooms, trend: '-8%', color: 'from-green-500 to-emerald-500' },
              { icon: '🏨', title: 'Occupancy Rate', value: stats.occupancyRate, trend: '+5%', color: 'from-purple-500 to-pink-500' },
              { icon: '💰', title: 'Total Revenue', value: stats.totalRevenue, trend: '+18%', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                    <p className={`text-sm font-medium mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend} from last month
                    </p>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
              <Link
                to="/booking"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Room</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 font-medium text-gray-800">{booking.customer}</td>
                      <td className="py-4 px-4 text-gray-600">{booking.room}</td>
                      <td className="py-4 px-4 text-gray-600">{booking.checkIn}</td>
                      <td className="py-4 px-4 text-gray-600">{booking.checkOut}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '➕', title: 'New Booking', path: '/booking', color: 'from-green-500 to-emerald-500' },
                { icon: '📈', title: 'View Reports', path: '/analytics', color: 'from-blue-500 to-cyan-500' },
                { icon: '👥', title: 'Manage Users', path: '/users', color: 'from-purple-500 to-pink-500' },
                { icon: '🛏️', title: 'Room Management', path: '/rooms', color: 'from-orange-500 to-red-500' }
              ].map((action, index) => (
                <Link key={index} to={action.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-gradient-to-r ${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{action.icon}</div>
                      <h3 className="text-lg font-semibold">{action.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
