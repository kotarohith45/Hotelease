import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      subtitle: 'Book Your Perfect Stay',
      description: 'Search hotels, make reservations, and manage your bookings with ease.',
      icon: '🏨',
      color: 'from-blue-500 to-cyan-500',
      features: ['Search Hotels', 'Book Rooms', 'Manage Bookings', 'View Invoices']
    },
    {
      id: 'manager',
      title: 'Manager',
      subtitle: 'Manage Hotel Operations',
      description: 'Oversee bookings, manage rooms, and analyze hotel performance.',
      icon: '📊',
      color: 'from-green-500 to-emerald-500',
      features: ['Room Management', 'Booking Analytics', 'Performance Reports', 'Staff Coordination']
    },
    {
      id: 'admin',
      title: 'Administrator',
      subtitle: 'System Administration',
      description: 'Full system control, user management, and comprehensive analytics.',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500',
      features: ['User Management', 'System Settings', 'Full Analytics', 'Security Controls']
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => {
      navigate('/login', { state: { selectedRole: roleId } });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const roleCardVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      rotateY: -30
    },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    selected: {
      scale: 1.1,
      y: -20,
      rotateY: 10,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bg-orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-white/10 to-blue-200/20 backdrop-blur-sm"
            style={{
              width: `${30 + Math.random() * 60}px`,
              height: `${30 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="w-32 h-32 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 20, ease: "linear", repeat: Infinity },
              scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <span className="text-6xl">🏨</span>
          </motion.div>

          <motion.h1 
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300 mb-6"
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            HotelEase
          </motion.h1>

          <motion.p 
            className="text-2xl text-blue-100 mb-4 font-light max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Revolutionizing hotel management with cutting-edge technology and exceptional service
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Role Selection Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Role</h2>
          <p className="text-xl text-blue-200 font-light">Select how you'd like to access HotelEase</p>
        </motion.div>

        {/* Role Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
          variants={containerVariants}
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              custom={index}
              variants={roleCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleRoleSelect(role.id)}
              className={`group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 cursor-pointer border border-white/20 overflow-hidden shadow-2xl ${
                selectedRole === role.id ? 'ring-4 ring-white/50' : ''
              }`}
            >
              {/* Background Gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
              />

              {/* Icon */}
              <motion.div 
                className="text-8xl mb-6 text-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: selectedRole === role.id ? [1, 1.2, 1] : [1, 1.05, 1]
                }}
                transition={{
                  duration: selectedRole === role.id ? 1 : 4,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {role.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.h3 
                  className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300"
                  animate={selectedRole === role.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {role.title}
                </motion.h3>

                <motion.h4 
                  className="text-xl font-semibold text-blue-200 mb-4"
                  animate={selectedRole === role.id ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {role.subtitle}
                </motion.h4>

                <p className="text-blue-100 text-base leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  {role.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {role.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center justify-center text-sm text-blue-200 group-hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 + 0.5 }}
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selection Indicator */}
              <AnimatePresence>
                {selectedRole === role.id && (
                  <motion.div
                    className="absolute inset-0 border-4 border-white/50 rounded-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-blue-300 text-lg font-light">
            Your perfect stay starts here. Experience the future of hotel management.
          </p>
        </motion.div>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-white text-xl font-semibold">
                Preparing your {roles.find(r => r.id === selectedRole)?.title} experience...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LandingPage;
