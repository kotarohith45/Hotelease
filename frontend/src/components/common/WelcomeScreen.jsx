import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const WelcomeScreen = ({ show, onComplete }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation();

  const getAccessibleFeatures = (role) => {
    const features = {
      customer: [
        { name: 'Search Hotels', icon: '🔍', path: '/search', description: 'Find and browse available hotels' },
        { name: 'View Rooms', icon: '🏨', path: '/rooms', description: 'Explore room types and amenities' },
        { name: 'Make Bookings', icon: '📅', path: '/booking', description: 'Reserve your perfect stay' },
        { name: 'Payment Center', icon: '💳', path: '/payment', description: 'Manage payments and billing' },
        { name: 'View Invoices', icon: '📄', path: '/invoice', description: 'Access your booking receipts' }
      ],
      manager: [
        { name: 'Manager Dashboard', icon: '📊', path: '/manager', description: 'Overview of hotel operations' },
        { name: 'Search Hotels', icon: '🔍', path: '/search', description: 'Find and browse available hotels' },
        { name: 'Room Management', icon: '🏨', path: '/rooms', description: 'Manage room inventory' },
        { name: 'Booking Management', icon: '📅', path: '/booking', description: 'Handle reservations' },
        { name: 'Analytics', icon: '📈', path: '/analytics', description: 'View performance metrics' },
        { name: 'Reports & Charts', icon: '📊', path: '/charts', description: 'Generate detailed reports' },
        { name: 'Payment Center', icon: '💳', path: '/payment', description: 'Manage payments and billing' }
      ],
      admin: [
        { name: 'Admin Dashboard', icon: '⚙️', path: '/admin', description: 'System administration panel' },
        { name: 'Manager Dashboard', icon: '📊', path: '/manager', description: 'Hotel operations overview' },
        { name: 'Search Hotels', icon: '🔍', path: '/search', description: 'Find and browse available hotels' },
        { name: 'Room Management', icon: '🏨', path: '/rooms', description: 'Manage room inventory' },
        { name: 'Booking Management', icon: '📅', path: '/booking', description: 'Handle all reservations' },
        { name: 'Analytics', icon: '📈', path: '/analytics', description: 'View comprehensive metrics' },
        { name: 'Reports & Charts', icon: '📊', path: '/charts', description: 'Generate system reports' },
        { name: 'Payment Center', icon: '💳', path: '/payment', description: 'Manage all payments' },
        { name: 'Invoice Management', icon: '📄', path: '/invoice', description: 'Access all invoices' }
      ]
    };
    return features[role] || features.customer;
  };

  const features = getAccessibleFeatures(user?.role);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    if (show) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [show]);

  const handleFeatureClick = (path) => {
    navigate(path);
    onComplete();
  };

  const handleSkip = () => {
    // Navigate to role-specific dashboard
    const dashboardPaths = {
      customer: '/dashboard',
      manager: '/manager',
      admin: '/admin'
    };
    navigate(dashboardPaths[user?.role] || '/dashboard');
    onComplete();
  };

  const welcomeVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotateY: -180,
      z: -1000
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      rotateY: 180,
      z: -1000,
      transition: { 
        duration: 0.8,
        ease: "easeInBack"
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8,
      rotateX: -90
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -45,
      z: -100
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      z: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }),
    hover: {
      scale: 1.08,
      y: -15,
      rotateY: 5,
      z: 50,
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
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-white/20 to-blue-200/30 backdrop-blur-sm"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [1, 1.2 + Math.random() * 0.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          ))}
          
          {/* Geometric Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-white/20"
              style={{
                width: `${30 + Math.random() * 20}px`,
                height: `${30 + Math.random() * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 4
              }}
            />
          ))}
          
          {/* Mouse-following gradient */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
              left: `${mousePosition.x * 100}%`,
              top: `${mousePosition.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.8 : 0.4
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div 
          ref={containerRef}
          className="relative z-10 max-w-6xl mx-auto px-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {currentStep === 0 && (
            <motion.div
              variants={welcomeVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div
                className="relative w-40 h-40 mx-auto mb-8"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, ease: "linear", repeat: Infinity },
                  scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full animate-pulse shadow-2xl" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <motion.span 
                    className="text-7xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    🎉
                  </motion.span>
                </div>
                
                {/* Sparkle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 80}px`,
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 80}px`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.div variants={textVariants}>
                <motion.h1 
                  className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-6"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  Welcome to HotelEase!
                </motion.h1>
                
                <motion.div
                  className="space-y-4"
                  variants={textVariants}
                >
                  <motion.p 
                    className="text-3xl text-white font-semibold"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Hello, {user?.name}! 👋
                  </motion.p>
                  
                  <motion.div 
                    className="inline-block px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-xl text-blue-100 font-medium">
                      Logged in as <span className="text-yellow-300 font-bold">{user?.role?.toUpperCase()}</span>
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div className="text-center mb-16">
                <motion.h2 
                  variants={textVariants}
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-6"
                >
                  Your Access Portal
                </motion.h2>
                
                <motion.p 
                  variants={textVariants}
                  className="text-2xl text-blue-100 mb-4 font-light"
                >
                  Explore your personalized features
                </motion.p>
                
                <motion.div
                  variants={textVariants}
                  className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full"
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    custom={index}
                    variants={featureVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleFeatureClick(feature.path)}
                    className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 cursor-pointer border border-white/20 overflow-hidden shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Icon with advanced animation */}
                    <motion.div 
                      className="text-6xl mb-6 relative z-10"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors duration-300"
                        animate={{
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.1
                        }}
                      >
                        {feature.name}
                      </motion.h3>
                      
                      <p className="text-blue-100 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={textVariants}
                className="flex justify-center space-x-4"
              >
                <motion.button
                  onClick={handleSkip}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-white to-blue-50 text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    🚀 Go to Dashboard
                  </span>
                </motion.button>
                
                <motion.button
                  onClick={handleSkip}
                  whileHover={{ 
                    scale: 1.08,
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:border-white/50 transition-all duration-300 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  />
                  <span className="relative z-10">
                    ⏭️ Skip Tour
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;
