// API configuration and endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// API client with axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Don't redirect to login in demo mode
      console.warn('Authentication required');
    }
    return Promise.reject(error);
  }
);

// Mock data for demo purposes
const mockBookings = [
  {
    id: 1,
    hotel: 'HotelEase Downtown',
    room: 'Deluxe Suite - 101',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    status: 'Confirmed',
    price: 350,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    guestName: 'John Doe',
    guestEmail: 'john.doe@email.com',
    roomType: 'Premium Villa',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Beach Access']
  },
  {
    id: 3,
    hotel: 'HotelEase Business',
    room: 'Executive Room - 304',
    checkIn: '2023-12-12',
    checkOut: '2023-12-15',
    status: 'Completed',
    price: 280,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    guestName: 'John Doe',
    guestEmail: 'john.doe@email.com',
    roomType: 'Executive Room',
    amenities: ['WiFi', 'Business Center', 'Gym']
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
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    description: 'Traditional houseboat experience in Kerala backwaters',
    available: true,
    location: 'Kochi'
  }
];

// Booking API
export const bookingAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/bookings');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for bookings');
      return mockBookings;
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking');
      return mockBookings.find(booking => booking.id === parseInt(id));
    }
  },
  create: async (booking) => {
    try {
      const response = await apiClient.post('/bookings', booking);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking creation');
      const newBooking = {
        ...booking,
        id: mockBookings.length + 1,
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
      };
      mockBookings.push(newBooking);
      return newBooking;
    }
  },
  update: async (id, booking) => {
    try {
      const response = await apiClient.put(`/bookings/${id}`, booking);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking update');
      const index = mockBookings.findIndex(b => b.id === parseInt(id));
      if (index !== -1) {
        mockBookings[index] = { ...mockBookings[index], ...booking };
        return mockBookings[index];
      }
      throw new Error('Booking not found');
    }
  },
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking deletion');
      const index = mockBookings.findIndex(b => b.id === parseInt(id));
      if (index !== -1) {
        return mockBookings.splice(index, 1)[0];
      }
      throw new Error('Booking not found');
    }
  },
  search: async (params) => {
    try {
      const response = await apiClient.get('/bookings/search', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking search');
      return mockBookings.filter(booking => {
        if (params.hotel && !booking.hotel.toLowerCase().includes(params.hotel.toLowerCase())) {
          return false;
        }
        if (params.status && booking.status !== params.status) {
          return false;
        }
        return true;
      });
    }
  },
};

// Room API
export const roomAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/rooms');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for rooms');
      return mockRooms;
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for room');
      return mockRooms.find(room => room.id === parseInt(id));
    }
  },
  search: async (params) => {
    try {
      const response = await apiClient.get('/rooms/search', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for room search');
      return mockRooms.filter(room => {
        if (params.location && room.location && !room.location.toLowerCase().includes(params.location.toLowerCase())) {
          return false;
        }
        if (params.type && room.type !== params.type) {
          return false;
        }
        if (params.minPrice && room.price < params.minPrice) {
          return false;
        }
        if (params.maxPrice && room.price > params.maxPrice) {
          return false;
        }
        if (params.capacity && room.capacity < params.capacity) {
          return false;
        }
        return true;
      });
    }
  },
  getAvailable: async (params) => {
    try {
      const response = await apiClient.get('/rooms/available', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for available rooms');
      return mockRooms.filter(room => room.available);
    }
  },
};

// Payment API
export const paymentAPI = {
  process: async (payment) => {
    try {
      const response = await apiClient.post('/payments/process', payment);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for payment processing');
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        success: true,
        transactionId: 'TXN' + Date.now(),
        amount: payment.amount,
        status: 'completed',
        timestamp: new Date().toISOString()
      };
    }
  },
  getHistory: async () => {
    try {
      const response = await apiClient.get('/payments/history');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for payment history');
      return [
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
      ];
    }
  },
  getInvoice: async (id) => {
    try {
      const response = await apiClient.get(`/payments/invoice/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for invoice');
      return {
        id: id,
        invoiceNumber: 'INV-' + id,
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
      };
    }
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async () => {
    try {
      const response = await apiClient.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for analytics dashboard');
      return {
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
      };
    }
  },
  getRevenue: async (params) => {
    try {
      const response = await apiClient.get('/analytics/revenue', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for revenue analytics');
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [45000, 52000, 48000, 61000, 55000, 67000]
      };
    }
  },
  getOccupancy: async (params) => {
    try {
      const response = await apiClient.get('/analytics/occupancy', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for occupancy analytics');
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [65, 72, 68, 78, 75, 82]
      };
    }
  },
  getBookings: async (params) => {
    try {
      const response = await apiClient.get('/analytics/bookings', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for booking analytics');
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [45, 52, 48, 61, 55, 67]
      };
    }
  },
};

export default apiClient;
