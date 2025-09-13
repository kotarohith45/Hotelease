import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaBed, FaUsers, FaWifi, FaParking, FaUtensils, FaStar, FaHeart, FaEye, FaBookOpen, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { roomAPI } from '../../api/api';

const RoomList = ({ searchCriteria, onBookRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('price');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const roomsData = await roomAPI.getAll();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Fallback to empty array if API fails
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    let filtered = rooms.filter(room => {
      if (searchCriteria.location && room.location && !room.location.toLowerCase().includes(searchCriteria.location.toLowerCase())) return false;
      if (searchCriteria.roomType && room.type !== searchCriteria.roomType) return false;
      if (room.price < searchCriteria.priceRange[0] || room.price > searchCriteria.priceRange[1]) return false;
      if (searchCriteria.rating > 0 && room.rating && room.rating < searchCriteria.rating) return false;
      if (searchCriteria.amenities && searchCriteria.amenities.length > 0 && room.amenities && !searchCriteria.amenities.every(amenity => room.amenities.includes(amenity))) return false;
      return true;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredRooms(filtered);
  }, [rooms, searchCriteria, sortBy]);

  const toggleFavorite = (roomId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(roomId)) {
        newFavorites.delete(roomId);
      } else {
        newFavorites.add(roomId);
      }
      return newFavorites;
    });
  };

  const handleBookNow = (room) => {
    onBookRoom(room);
  };

  const RoomCard = ({ room, index }) => {
    const controls = useAnimation();

    return (
      <motion.div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        onHoverStart={() => controls.start({ scale: 1.05 })}
        onHoverEnd={() => controls.start({ scale: 1 })}
      >
        <motion.div
          className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full'} h-64 overflow-hidden`}
          animate={controls}
        >
          <motion.img
            src={room.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
            alt={room.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(room.id)}
          >
            <FaHeart className={`text-xl ${favorites.has(room.id) ? 'text-red-500' : 'text-gray-400'}`} />
          </motion.button>
          <motion.div
            className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ${room.price}/night
          </motion.div>
        </motion.div>

        <motion.div
          className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h3
            className="text-2xl font-bold text-gray-800 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            {room.name}
          </motion.h3>

          <motion.div
            className="flex items-center mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FaMapMarkerAlt className="text-gray-500 mr-1" />
            <span className="text-gray-600 text-sm">{room.location}</span>
            <div className="flex items-center ml-4">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-semibold">{room.rating || 4.5}</span>
              <span className="text-gray-500 ml-1">({room.reviews || 25} reviews)</span>
            </div>
          </motion.div>

          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {room.description}
          </motion.p>

          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                {room.capacity} guests
              </div>
              <div className="flex items-center">
                <FaBed className="mr-1" />
                {room.size || 'Standard'}
              </div>
            </div>
            <span className="text-lg font-bold text-blue-600">${room.price}</span>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {room.amenities.map((amenity, idx) => (
              <motion.span
                key={amenity}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: '#3B82F6', color: '#FFFFFF' }}
              >
                {amenity}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="flex space-x-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow(room)}
            >
              <FaBookOpen className="inline mr-2" />
              Book Now
            </motion.button>
            <motion.button
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, backgroundColor: '#E5E7EB' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRoom(room)}
            >
              <FaEye className="inline mr-2" />
              View Details
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Available Rooms ({filteredRooms.length})
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Grid
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              List
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        layout
      >
        <AnimatePresence>
          {filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredRooms.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No rooms found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </motion.div>
      )}

      {/* Room Details Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="relative">
                <motion.img
                  src={selectedRoom.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                  alt={selectedRoom.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.button
                  className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedRoom(null)}
                >
                  ✕
                </motion.button>
              </div>

              <div className="p-8">
                <motion.h3
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedRoom.name}
                </motion.h3>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Room Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaBed className="text-blue-500 mr-3" />
                        <span>{selectedRoom.type} • {selectedRoom.size || 'Standard'}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="text-green-500 mr-3" />
                        <span>Up to {selectedRoom.capacity} guests</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-red-500 mr-3" />
                        <span>{selectedRoom.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-3" />
                        <span>{selectedRoom.rating || 4.5} ({selectedRoom.reviews || 25} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedRoom.amenities.map((amenity, idx) => (
                        <motion.div
                          key={amenity}
                          className="flex items-center bg-gray-100 p-2 rounded-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                        >
                          {amenity === 'WiFi' && <FaWifi className="text-blue-500 mr-2" />}
                          {amenity === 'Parking' && <FaParking className="text-green-500 mr-2" />}
                          {amenity === 'Breakfast' && <FaUtensils className="text-orange-500 mr-2" />}
                          <span className="text-sm">{amenity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 flex justify-between items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-3xl font-bold text-blue-600">
                    ${selectedRoom.price}
                    <span className="text-lg text-gray-500">/night</span>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleBookNow(selectedRoom);
                      setSelectedRoom(null);
                    }}
                  >
                    Book This Room
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoomList;
