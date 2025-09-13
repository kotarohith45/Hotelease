import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RoomList from './RoomList';

const RoomListPage = () => {
  const [searchCriteria] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    priceRange: [0, 1000],
    amenities: [],
    rating: 0
  });

  const handleBookRoom = (room) => {
    console.log('Booking room:', room);
    // You can redirect to booking form or show booking modal
    alert(`Booking ${room.name} for $${room.price}/night`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RoomList 
        searchCriteria={searchCriteria} 
        onBookRoom={handleBookRoom} 
      />
    </motion.div>
  );
};

export default RoomListPage;
