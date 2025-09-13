import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const roleColors = {
    customer: 'from-blue-500 to-cyan-500',
    admin: 'from-purple-500 to-pink-500',
    manager: 'from-green-500 to-emerald-500'
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`bg-gradient-to-r ${user ? roleColors[user.role] : 'from-gray-500 to-gray-600'} shadow-lg backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={sidebarOpen ? "hidden" : "inline-flex"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={sidebarOpen ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <Link to="/" className="ml-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">H</span>
                </div>
                <h1 className="text-xl font-bold text-white">HotelEase</h1>
              </motion.div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/search" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Search Rooms
            </Link>
            <Link to="/booking" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Book Now
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Admin Panel
              </Link>
            )}
            {user?.role === 'manager' && (
              <Link to="/manager" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Manager Panel
              </Link>
            )}
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Role badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-3 py-1 text-sm font-medium capitalize"
                >
                  {user.role}
                </motion.div>

                {/* User menu */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user.name}</span>
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaCog className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-4 py-2 text-sm font-medium hover:bg-opacity-30 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
