import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Camera, User, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary-DEFAULT" />
            <span className="text-xl font-serif font-bold tracking-tight">RIVET STUDIO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-accent-dark' : ''}`}>Home</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'text-accent-dark' : ''}`}>Portfolio</NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'text-accent-dark' : ''}`}>Services</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'text-accent-dark' : ''}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'text-accent-dark' : ''}`}>Contact</NavLink>
            <NavLink to="/booking" className="btn btn-primary !py-2 !px-4 text-sm">Book a Session</NavLink>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/admin" className="text-primary-DEFAULT hover:text-accent-dark font-medium">Dashboard</Link>
                <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-primary-DEFAULT hover:text-accent-dark font-medium ml-4">
                <User className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-primary-DEFAULT">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/portfolio" className="block px-3 py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
            <Link to="/services" className="block px-3 py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/about" className="block px-3 py-2 nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block px-3 py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/booking" className="block px-3 py-2 btn btn-primary text-center mx-3 my-2" onClick={() => setIsMenuOpen(false)}>Book a Session</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
