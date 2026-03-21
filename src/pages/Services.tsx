import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/apiService';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getAll();
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="section-container">
      <div className="text-center mb-20">
        <h1 className="text-5xl mb-6">Investment & Services</h1>
        <p className="text-gray-600 font-light max-w-2xl mx-auto text-lg">
          Transparent pricing and carefully crafted packages to suit your unique needs. All sessions include professional editing and high-resolution digital delivery.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[500px] bg-gray-50 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow border-t-4 border-t-primary-DEFAULT"
            >
              <div className="mb-8">
                <span className="text-accent-dark text-xs uppercase tracking-widest font-bold bg-gray-100 px-3 py-1 rounded-full">{service.category}</span>
                <h3 className="text-2xl mt-4 mb-2">{service.title}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-serif font-bold">${service.price}</span>
                  <span className="text-gray-500 ml-1">/ session</span>
                </div>
              </div>
              
              <p className="text-gray-600 font-light mb-8 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {service.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-primary-DEFAULT mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/booking" className="btn btn-primary w-full text-center py-3 flex items-center justify-center group">
                Reserve Date <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Custom Packages CTA */}
      <div className="mt-20 bg-primary-dark rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl mb-4 font-serif">Need a custom package?</h2>
        <p className="text-white/70 font-light mb-8 max-w-xl mx-auto">
          We understand that every project is unique. Let's customize a session that perfectly matches your vision and requirements.
        </p>
        <Link to="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100 px-10">
          Inquire Now
        </Link>
      </div>
    </div>
  );
};

export default Services;
