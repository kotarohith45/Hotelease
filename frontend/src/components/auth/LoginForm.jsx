import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import WelcomeScreen from '../common/WelcomeScreen';

const LoginForm = ({ onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Set role from landing page selection
    if (location.state?.selectedRole) {
      const selectedRole = location.state.selectedRole;
      const user = demoUsers[selectedRole];
      if (user) {
        setFormData({
          email: user.email,
          password: user.password,
          role: selectedRole
        });
      }
    }
  }, [location.state]);

  // Demo users for different roles
  const demoUsers = {
    customer: {
      email: 'customer@hotelease.com',
      password: 'customer123',
      name: 'Sarah Johnson',
      role: 'customer'
    },
    manager: {
      email: 'manager@hotelease.com', 
      password: 'manager123',
      name: 'Michael Chen',
      role: 'manager'
    },
    admin: {
      email: 'admin@hotelease.com',
      password: 'admin123', 
      name: 'David Wilson',
      role: 'admin'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = demoUsers[formData.role];
    
    if (formData.email === user.email && formData.password === user.password) {
      onLogin({
        ...user,
        id: Math.random().toString(36).substr(2, 9)
      });
      setShowWelcome(true);
    } else {
      alert('Invalid credentials! Try the demo credentials.');
    }
    
    setIsLoading(false);
  };

  const quickLogin = (role) => {
    const user = demoUsers[role];
    setFormData({
      email: user.email,
      password: user.password,
      role: role
    });
  };

  return (
    <>
      <WelcomeScreen 
        show={showWelcome} 
        onComplete={() => setShowWelcome(false)} 
      />
      
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Role Selection
        </motion.button>

        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <FaUser className="text-white text-2xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to HotelEase</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(demoUsers).map(([role, user]) => (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => quickLogin(role)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === role
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xs font-semibold capitalize">{role}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

      </motion.div>
    </motion.div>
    </>
  );
};

export default LoginForm;
