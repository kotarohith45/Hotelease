import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoomSearch from './RoomSearch';
import RoomList from './RoomList';

const SearchPage = () => {
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
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (criteria) => {
    setIsSearching(true);
    setSearchCriteria(criteria);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowResults(true);
    setIsSearching(false);
  };

  const handleBookRoom = (room) => {
    console.log('Booking room:', room);
    alert(`Booking ${room.name} for $${room.price}/night`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <RoomSearch onSearch={handleSearch} />
        </motion.div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-6 mb-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Search Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 mr-2">Location:</span>
                    <span className="text-gray-800">{searchCriteria.location || 'Any'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 mr-2">Check-in:</span>
                    <span className="text-gray-800">{searchCriteria.checkIn || 'Any'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 mr-2">Check-out:</span>
                    <span className="text-gray-800">{searchCriteria.checkOut || 'Any'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 mr-2">Guests:</span>
                    <span className="text-gray-800">{searchCriteria.guests}</span>
                  </div>
                </div>
              </motion.div>

              <RoomList 
                searchCriteria={searchCriteria} 
                onBookRoom={handleBookRoom} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isSearching && (
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Searching for rooms...</h3>
              <p className="text-gray-600">Finding the best matches for your criteria</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;
