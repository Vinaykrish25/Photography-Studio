import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home.tsx';

// Lazy load other pages
const Portfolio = React.lazy(() => import('./pages/Portfolio.tsx'));
const Services = React.lazy(() => import('./pages/Services.tsx'));
const About = React.lazy(() => import('./pages/About.tsx'));
const Contact = React.lazy(() => import('./pages/Contact.tsx'));
const Booking = React.lazy(() => import('./pages/Booking.tsx'));
const Login = React.lazy(() => import('./pages/Login.tsx'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard.tsx'));
const ManageBookings = React.lazy(() => import('./pages/admin/ManageBookings.tsx'));
const ManageServices = React.lazy(() => import('./pages/admin/ManageServices.tsx'));
const ManageGallery = React.lazy(() => import('./pages/admin/ManageGallery.tsx'));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <React.Suspense fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-DEFAULT"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="booking" element={<Booking />} />
              <Route path="login" element={<Login />} />
            </Route>
            
            <Route path="/admin">
              <Route index element={<AdminDashboard />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="gallery" element={<ManageGallery />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
