import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
  const [branchStats] = useState({
    name: 'HotelEase Bangalore',
    occupancy: '82%',
    revenue: '$86,450',
    staff: 24,
    satisfaction: '4.7/5'
  });
  
  const [roomStatus, setRoomStatus] = useState([
    { number: '101', type: 'Deluxe', status: 'Occupied', guest: 'Rohith Sharma' },
    { number: '102', type: 'Premium', status: 'Available', guest: '' },
    { number: '103', type: 'Standard', status: 'Cleaning', guest: '' },
    { number: '201', type: 'Suite', status: 'Occupied', guest: 'Priya Patel' },
    { number: '202', type: 'Deluxe', status: 'Reserved', guest: 'Alex Johnson' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoomStatus(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        const statuses = ['Available', 'Occupied', 'Cleaning', 'Reserved'];
        if (updated[randomIndex].status !== 'Occupied') {
          updated[randomIndex].status = statuses[Math.floor(Math.random() * statuses.length)];
        }
        return updated;
      });
    }, 8000);
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

  const getRoomStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'cleaning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Manager Dashboard</h1>
            <p className="text-gray-600 text-lg">Monitor and manage {branchStats.name} in real-time</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏨', title: 'Occupancy Rate', value: branchStats.occupancy, color: 'from-blue-500 to-cyan-500' },
              { icon: '💰', title: 'Monthly Revenue', value: branchStats.revenue, color: 'from-green-500 to-emerald-500' },
              { icon: '👥', title: 'Staff Members', value: branchStats.staff, color: 'from-purple-500 to-pink-500' },
              { icon: '⭐', title: 'Guest Satisfaction', value: branchStats.satisfaction, color: 'from-orange-500 to-red-500' }
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
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Room Status */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Room Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {roomStatus.map((room, index) => (
                <motion.div
                  key={room.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-4 rounded-xl border-2 ${getRoomStatusColor(room.status)} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold mb-1">Room {room.number}</div>
                    <div className="text-sm opacity-75 mb-2">{room.type}</div>
                    <div className="text-sm font-medium mb-2">{room.status}</div>
                    {room.guest && (
                      <div className="text-xs opacity-75 truncate">{room.guest}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrivals & Departures */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arrivals */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">📥</span>
                Today's Arrivals (5)
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Rohith Sharma', room: 'Room 101', time: '3:00 PM' },
                  { name: 'Alex Johnson', room: 'Room 202', time: '4:30 PM' },
                  { name: 'Sarah Wilson', room: 'Room 103', time: '5:15 PM' }
                ].map((arrival, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{arrival.name}</div>
                      <div className="text-sm text-gray-600">{arrival.room}</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">{arrival.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Departures */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">📤</span>
                Today's Departures (3)
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Priya Patel', room: 'Room 201', time: '11:00 AM' },
                  { name: 'Michael Brown', room: 'Room 305', time: '12:00 PM' },
                  { name: 'Emma Davis', room: 'Room 108', time: '1:30 PM' }
                ].map((departure, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{departure.name}</div>
                      <div className="text-sm text-gray-600">{departure.room}</div>
                    </div>
                    <div className="text-sm font-medium text-red-600">{departure.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Management Tools */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Management Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '📅', title: 'Check Availability', path: '/search', color: 'from-blue-500 to-cyan-500' },
                { icon: '👥', title: 'Staff Management', path: '/staff', color: 'from-green-500 to-emerald-500' },
                { icon: '📊', title: 'Daily Reports', path: '/analytics', color: 'from-purple-500 to-pink-500' },
                { icon: '🛎️', title: 'Service Requests', path: '/services', color: 'from-orange-500 to-red-500' }
              ].map((tool, index) => (
                <Link key={index} to={tool.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-gradient-to-r ${tool.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <h3 className="text-lg font-semibold">{tool.title}</h3>
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

export default ManagerDashboard;
