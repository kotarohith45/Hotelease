import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUsers, FaBed, FaFilter, FaMapMarkerAlt, FaStar, FaWifi, FaParking, FaUtensils } from 'react-icons/fa';

const RoomSearch = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    priceRange: [0, 1000],
    amenities: [],
    rating: 0
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
  const amenitiesList = ['WiFi', 'Parking', 'Breakfast', 'Gym', 'Pool', 'Spa', 'Restaurant'];

  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setSearchCriteria(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onSearch(searchCriteria);
  };

  const searchVariants = {
    collapsed: { height: 'auto', opacity: 1 },
    expanded: { height: 'auto', opacity: 1, transition: { duration: 0.5 } }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-2xl border border-blue-200"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <motion.h2
        className="text-4xl font-bold text-center mb-8 text-gray-800"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Find Your Perfect Room
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        variants={searchVariants}
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        {/* Location */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileFocus={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            placeholder="Destination (e.g., Goa, Mumbai, Delhi)"
            value={searchCriteria.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-lg"
            list="destinations"
          />
          <datalist id="destinations">
            <option value="Goa" />
            <option value="Mumbai" />
            <option value="Delhi" />
            <option value="Bangalore" />
            <option value="Chennai" />
            <option value="Kolkata" />
            <option value="Hyderabad" />
            <option value="Pune" />
            <option value="Jaipur" />
            <option value="Kochi" />
          </datalist>
        </motion.div>

        {/* Check-in */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          <input
            type="date"
            value={searchCriteria.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-lg"
          />
        </motion.div>

        {/* Check-out */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
          <input
            type="date"
            value={searchCriteria.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white shadow-lg"
          />
        </motion.div>

        {/* Guests */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <select
            value={searchCriteria.guests}
            onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white shadow-lg appearance-none"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} Guest{i !== 0 ? 's' : ''}</option>
            ))}
          </select>
        </motion.div>
      </motion.div>

      {/* Advanced Filters */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center mx-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilter className="mr-2" />
          {isExpanded ? 'Hide' : 'Show'} Advanced Filters
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={filterVariants}
          >
            {/* Room Type */}
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <FaBed className="mr-2 text-blue-500" />
                Room Type
              </h3>
              <select
                value={searchCriteria.roomType}
                onChange={(e) => handleInputChange('roomType', e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Any Type</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </motion.div>

            {/* Price Range */}
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={searchCriteria.priceRange[0]}
                  onChange={(e) => handleInputChange('priceRange', [parseInt(e.target.value), searchCriteria.priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={searchCriteria.priceRange[1]}
                  onChange={(e) => handleInputChange('priceRange', [searchCriteria.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${searchCriteria.priceRange[0]}</span>
                  <span>${searchCriteria.priceRange[1]}</span>
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map(amenity => (
                  <motion.button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                      searchCriteria.amenities.includes(amenity)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {amenity}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="bg-white p-4 rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <FaStar className="mr-2 text-yellow-500" />
                Minimum Rating
              </h3>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <motion.button
                    key={star}
                    onClick={() => handleInputChange('rating', star)}
                    className={`text-2xl ${
                      star <= searchCriteria.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ★
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-12 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Searching...
            </motion.div>
          ) : (
            <>
              <FaSearch className="inline mr-3" />
              Search Rooms
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <h3 className="text-xl font-semibold text-gray-800">Finding your perfect room...</h3>
              <p className="text-gray-600 mt-2">This may take a few seconds</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoomSearch;
