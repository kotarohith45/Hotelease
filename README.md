# HotelEase - Modern Hotel Management System

A comprehensive hotel management system built with React, Node.js, and modern web technologies.

## 🚀 Features

### Frontend (React + Vite + Tailwind CSS)
- **Modern UI/UX** with beautiful animations and responsive design
- **Role-based Dashboard** (Customer, Manager, Admin)
- **Room Search & Booking** with advanced filters
- **Payment Processing** with secure forms
- **Analytics & Reports** with interactive charts
- **Real-time Updates** with smooth animations

### Backend (Node.js + Express)
- **RESTful API** with comprehensive endpoints
- **Mock Data System** for demo purposes
- **CORS Support** for cross-origin requests
- **Error Handling** with proper HTTP status codes
- **Health Check** endpoint for monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization
- **Lottie React** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request parsing middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:4000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5177`

## 🎯 Usage

### 1. Access the Application
Open your browser and navigate to `http://localhost:5177`

### 2. Role Selection
Use the role selector in the header to switch between:
- **Customer** - Book rooms, view bookings, make payments
- **Manager** - Manage bookings, view analytics
- **Admin** - Full system access

### 3. Key Features

#### Room Search & Booking
- Navigate to `/search` to find available rooms
- Use filters to narrow down your search
- Click on rooms to view details and book

#### Dashboard
- View upcoming and past bookings
- Quick access to common actions
- Loyalty points and membership status

#### Payment Processing
- Secure payment forms with validation
- Multiple payment methods
- Invoice generation and history

#### Analytics & Reports
- Revenue tracking and trends
- Occupancy rates and booking statistics
- Interactive charts and visualizations

## 🔧 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `GET /api/rooms/search` - Search rooms with filters
- `GET /api/rooms/available` - Get available rooms

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/invoice/:id` - Get invoice

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/revenue` - Get revenue data
- `GET /api/analytics/occupancy` - Get occupancy data
- `GET /api/analytics/bookings` - Get booking analytics

### Health Check
- `GET /api/health` - Check API status

## 🎨 Design Features

### Modern UI Components
- **Gradient Backgrounds** - Beautiful color transitions
- **Glass Morphism** - Frosted glass effects
- **Smooth Animations** - Framer Motion powered
- **Responsive Design** - Works on all devices
- **Interactive Elements** - Hover effects and transitions

### Color Schemes
- **Customer**: Blue to Cyan gradient
- **Manager**: Green to Emerald gradient  
- **Admin**: Purple to Pink gradient

### Typography
- **Poppins Font** - Modern, clean typography
- **Consistent Spacing** - Tailwind CSS spacing system
- **Readable Hierarchy** - Clear information structure

## 🔒 Security Features

- **CORS Protection** - Configured for specific origins
- **Input Validation** - Client and server-side validation
- **Error Handling** - Graceful error management
- **Mock Data** - Safe demo environment

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full feature set
- **Tablet** - Optimized layout
- **Mobile** - Touch-friendly interface

## 🚀 Performance

- **Fast Loading** - Vite for quick development
- **Optimized Images** - Unsplash integration
- **Efficient Animations** - Hardware-accelerated
- **Lazy Loading** - Components loaded on demand

## 🧪 Testing

The system includes mock data for testing:
- Sample bookings and rooms
- Payment processing simulation
- Analytics data generation
- Error handling scenarios

## 📈 Future Enhancements

- **Database Integration** - Oracle/PostgreSQL support
- **Authentication** - JWT-based auth system
- **Real-time Updates** - WebSocket integration
- **Email Notifications** - Booking confirmations
- **Mobile App** - React Native version
- **Advanced Analytics** - Machine learning insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


**HotelEase** - Making hotel management effortless! 🏨✨
