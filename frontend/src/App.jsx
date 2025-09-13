// frontend/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProvider, useUser } from './contexts/UserContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import SearchPage from './components/booking/SearchPage';
import BookingForm from './components/booking/BookingForm';
import RoomListPage from './components/booking/RoomListPage';
import PaymentPage from './components/billing/PaymentPage';
import Invoice from './components/billing/Invoice';
import Analytics from './components/reports/Analytics';
import Charts from './components/reports/Charts';
import LandingPage from './components/common/LandingPage';
import './index.css';

// Layout wrapper for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-poppins">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
        />
      
        <main className="flex-1 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

// Create a wrapper component to access UserContext
const AppContent = () => {
  const { login } = useUser();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes - No Header/Sidebar */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginForm onLogin={login} />
              </PublicRoute>
            }
          />
          
          {/* Protected Routes - With Header/Sidebar */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <CustomerDashboard />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <SearchPage />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <RoomListPage />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <BookingForm />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <PaymentPage />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/invoice" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Invoice />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Analytics />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/charts" 
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Charts />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <AdminDashboard />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager" 
            element={
              <ProtectedRoute requiredRole="manager">
                <AuthenticatedLayout>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ManagerDashboard />
                  </motion.div>
                </AuthenticatedLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
