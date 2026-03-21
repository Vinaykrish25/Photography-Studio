import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';


const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="section-container">
        <div className="text-center mb-20">
          <h1 className="text-5xl mb-6">Let's Connect</h1>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-lg">
            Whether you have a specific project in mind or just want to say hello, we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-gray-200/50">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-serif mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                  <input required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 ring-primary-DEFAULT outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input required type="email" className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 ring-primary-DEFAULT outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <select className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 ring-primary-DEFAULT outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Wedding Inquiry</option>
                  <option>Commercial Project</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 ring-primary-DEFAULT outline-none min-h-[160px] transition-all"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-4 flex items-center justify-center space-x-2 group">
                <span>Send Message</span>
                <Send className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif mb-8">Get in Touch</h2>
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-primary-light rounded-2xl text-primary-DEFAULT">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Studio</h4>
                    <p className="text-gray-500 font-light">123 Photography Lane, Arts District<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-primary-light rounded-2xl text-primary-DEFAULT">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-gray-500 font-light">hello@rivetstudio.com<br />support@rivetstudio.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-primary-light rounded-2xl text-primary-DEFAULT">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-gray-500 font-light">+1 (555) 123-4567<br />Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
              <h4 className="font-bold mb-6 pt-6 border-t border-gray-100">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="p-4 bg-gray-100 rounded-2xl hover:bg-primary-DEFAULT hover:text-white transition-all">
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <section className="h-[400px] w-full grayscale opacity-80 mt-10">
        <iframe 
          title="Studio Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976373946229!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        />
      </section>
    </div>
  );
};

export default Contact;
