import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useUser();
  const location = useLocation();

  const getMenuItems = (role = user?.role) => {
    const commonItems = [
      { path: '/', label: 'Dashboard', icon: '🏠' },
      { path: '/search', label: 'Search Rooms', icon: '🔍' },
      { path: '/rooms', label: 'Room List', icon: '🛏️' },
      { path: '/booking', label: 'Book Room', icon: '📅' },
    ];

    if (role === 'customer') {
      return [
        ...commonItems,
        { path: '/payment', label: 'Payment', icon: '💳' },
        { path: '/invoice', label: 'Invoice', icon: '📄' },
      ];
    }

    if (role === 'manager') {
      return [
        ...commonItems,
        { path: '/manager', label: 'Manager Panel', icon: '👔' },
        { path: '/analytics', label: 'Analytics', icon: '📊' },
        { path: '/charts', label: 'Charts', icon: '📈' },
      ];
    }

    if (role === 'admin') {
      return [
        ...commonItems,
        { path: '/admin', label: 'Admin Panel', icon: '👨‍💼' },
        { path: '/analytics', label: 'Analytics', icon: '📊' },
        { path: '/charts', label: 'Charts', icon: '📈' },
        { path: '/payment', label: 'Payments', icon: '💳' },
        { path: '/invoice', label: 'Invoices', icon: '📄' },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-xl z-50 lg:static lg:translate-x-0 lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">HotelEase</h2>
                <p className="text-sm text-gray-500 capitalize">{user?.role} Panel</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-medium">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
