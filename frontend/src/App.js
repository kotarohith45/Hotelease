import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import RoomSearch from './components/booking/RoomSearch';
import RoomList from './components/booking/RoomList';
import BookingForm from './components/booking/BookingForm';
import Invoice from './components/billing/Invoice';
import PaymentForm from './components/billing/PaymentForm';
import Analytics from './components/reports/Analytics';
import Charts from './components/reports/Charts';
import './styles/main.css';
import './styles/animations.css';

function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [bookingData, setBookingData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);

  const renderView = () => {
    switch(currentView) {
      case 'admin':
        return <AdminDashboard setView={setCurrentView} />;
      case 'manager':
        return <ManagerDashboard setView={setCurrentView} />;
      case 'booking':
        return <BookingForm 
                 room={selectedRoom} 
                 setView={setCurrentView}
                 setBookingData={setBookingData}
                 setInvoiceData={setInvoiceData}
               />;
      case 'payment':
        return <PaymentForm 
                 booking={bookingData} 
                 setView={setCurrentView}
                 setInvoiceData={setInvoiceData}
               />;
      case 'invoice':
        return <Invoice 
                 invoice={invoiceData} 
                 setView={setCurrentView}
               />;
      case 'analytics':
        return <Analytics setView={setCurrentView} />;
      case 'charts':
        return <Charts setView={setCurrentView} />;
      default:
        return (
          <>
            <RoomSearch setView={setCurrentView} />
            <RoomList setView={setCurrentView} setSelectedRoom={setSelectedRoom} />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
