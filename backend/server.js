// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: config.FRONTEND_URL }));

// Mock data
const mockBookings = [
  {
    id: 1,
    hotel: 'HotelEase Downtown',
    room: 'Deluxe Suite - 101',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    status: 'Confirmed',
    price: 350,
    guestName: 'John Doe',
    guestEmail: 'john.doe@email.com',
    roomType: 'Deluxe Suite',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym']
  },
  {
    id: 2,
    hotel: 'HotelEase Resort',
    room: 'Premium Villa - 201',
    checkIn: '2024-02-05',
    checkOut: '2024-02-08',
    status: 'Confirmed',
    price: 450,
    guestName: 'John Doe',
    guestEmail: 'john.doe@email.com',
    roomType: 'Premium Villa',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Beach Access']
  }
];

const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Suite',
    type: 'Suite',
    price: 350,
    capacity: 4,
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Mini Bar'],
    description: 'Spacious suite with modern amenities and city view',
    available: true,
    location: 'Mumbai'
  },
  {
    id: 2,
    name: 'Premium Villa',
    type: 'Villa',
    price: 450,
    capacity: 6,
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Beach Access', 'Private Garden'],
    description: 'Luxury villa with private pool and beach access',
    available: true,
    location: 'Goa'
  },
  {
    id: 3,
    name: 'Executive Room',
    type: 'Business',
    price: 280,
    capacity: 2,
    amenities: ['WiFi', 'Business Center', 'Gym', 'Room Service'],
    description: 'Professional room designed for business travelers',
    available: true,
    location: 'Delhi'
  },
  {
    id: 4,
    name: 'Standard Room',
    type: 'Standard',
    price: 180,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Air Conditioning'],
    description: 'Comfortable room with essential amenities',
    available: true,
    location: 'Bangalore'
  },
  {
    id: 5,
    name: 'Beachfront Bungalow',
    type: 'Villa',
    price: 550,
    capacity: 4,
    amenities: ['WiFi', 'Beach Access', 'Private Pool', 'Spa', 'Restaurant', 'Bar'],
    description: 'Stunning beachfront bungalow with direct beach access',
    available: true,
    location: 'Goa'
  },
  {
    id: 6,
    name: 'Luxury Beach Resort',
    type: 'Resort',
    price: 650,
    capacity: 6,
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Water Sports'],
    description: 'Premium beach resort with all-inclusive amenities',
    available: true,
    location: 'Goa'
  },
  {
    id: 7,
    name: 'Heritage Palace Room',
    type: 'Suite',
    price: 400,
    capacity: 3,
    amenities: ['WiFi', 'Heritage View', 'Spa', 'Restaurant', 'Cultural Tours'],
    description: 'Elegant heritage room with traditional architecture',
    available: true,
    location: 'Jaipur'
  },
  {
    id: 8,
    name: 'Backwater Houseboat',
    type: 'Unique',
    price: 300,
    capacity: 4,
    amenities: ['WiFi', 'Backwater View', 'Traditional Meals', 'Fishing', 'Cultural Shows'],
    description: 'Traditional houseboat experience in Kerala backwaters',
    available: true,
    location: 'Kochi'
  }
];

// API Routes

// Bookings
app.get('/api/bookings', (req, res) => {
  res.json(mockBookings);
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = mockBookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

app.post('/api/bookings', (req, res) => {
  const newBooking = {
    id: mockBookings.length + 1,
    ...req.body,
    status: 'Confirmed'
  };
  mockBookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.put('/api/bookings/:id', (req, res) => {
  const index = mockBookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  mockBookings[index] = { ...mockBookings[index], ...req.body };
  res.json(mockBookings[index]);
});

app.delete('/api/bookings/:id', (req, res) => {
  const index = mockBookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  const deletedBooking = mockBookings.splice(index, 1)[0];
  res.json(deletedBooking);
});

// Rooms
app.get('/api/rooms', (req, res) => {
  res.json(mockRooms);
});

app.get('/api/rooms/:id', (req, res) => {
  const room = mockRooms.find(r => r.id === parseInt(req.params.id));
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(room);
});

app.get('/api/rooms/search', (req, res) => {
  let filteredRooms = [...mockRooms];
  
  if (req.query.location) {
    filteredRooms = filteredRooms.filter(room => 
      room.location && room.location.toLowerCase().includes(req.query.location.toLowerCase())
    );
  }
  if (req.query.type) {
    filteredRooms = filteredRooms.filter(room => room.type === req.query.type);
  }
  if (req.query.minPrice) {
    filteredRooms = filteredRooms.filter(room => room.price >= parseInt(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    filteredRooms = filteredRooms.filter(room => room.price <= parseInt(req.query.maxPrice));
  }
  if (req.query.capacity) {
    filteredRooms = filteredRooms.filter(room => room.capacity >= parseInt(req.query.capacity));
  }
  
  res.json(filteredRooms);
});

app.get('/api/rooms/available', (req, res) => {
  const availableRooms = mockRooms.filter(room => room.available);
  res.json(availableRooms);
});

// Payments
app.post('/api/payments/process', (req, res) => {
  // Simulate payment processing delay
  setTimeout(() => {
    res.json({
      success: true,
      transactionId: 'TXN' + Date.now(),
      amount: req.body.amount,
      status: 'completed',
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

app.get('/api/payments/history', (req, res) => {
  res.json([
    {
      id: 1,
      amount: 350,
      status: 'completed',
      date: '2024-01-15',
      description: 'HotelEase Downtown - Deluxe Suite'
    },
    {
      id: 2,
      amount: 450,
      status: 'completed',
      date: '2024-02-05',
      description: 'HotelEase Resort - Premium Villa'
    }
  ]);
});

app.get('/api/payments/invoice/:id', (req, res) => {
  res.json({
    id: req.params.id,
    invoiceNumber: 'INV-' + req.params.id,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345'
    },
    hotel: {
      name: 'HotelEase',
      address: '456 Hotel Ave, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@hotelease.com'
    },
    items: [
      {
        description: 'Deluxe Suite - 3 nights',
        quantity: 3,
        rate: 350,
        amount: 1050
      }
    ],
    subtotal: 1050,
    tax: 105,
    total: 1155
  });
});

// Analytics
app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    revenue: {
      total: 125000,
      change: 12.5,
      trend: 'up'
    },
    bookings: {
      total: 156,
      change: 8.3,
      trend: 'up'
    },
    occupancy: {
      rate: 78.5,
      change: 5.2,
      trend: 'up'
    },
    guests: {
      total: 312,
      change: 15.7,
      trend: 'up'
    }
  });
});

app.get('/api/analytics/revenue', (req, res) => {
  res.json({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [45000, 52000, 48000, 61000, 55000, 67000]
  });
});

app.get('/api/analytics/occupancy', (req, res) => {
  res.json({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [65, 72, 68, 78, 75, 82]
  });
});

app.get('/api/analytics/bookings', (req, res) => {
  res.json({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [45, 52, 48, 61, 55, 67]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 HotelEase backend running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
