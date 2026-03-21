import React from 'react';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-white" />
              <span className="text-xl font-serif font-bold tracking-tight">RIVET STUDIO</span>
            </div>
            <p className="text-gray-400 mb-6 font-light">
              Professional photography services capturing life's most precious moments with artistry and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-accent-dark rounded-full hover:bg-white hover:text-primary-dark transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-accent-dark rounded-full hover:bg-white hover:text-primary-dark transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-accent-dark rounded-full hover:bg-white hover:text-primary-dark transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Journal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/services" className="hover:text-white transition-colors">Wedding Photography</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Portrait Sessions</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Commercial Shoots</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Event Coverage</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Fine Art Prints</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                <span>123 Photography Lane, Arts District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span>hello@rivetstudio.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rivet Photography Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
