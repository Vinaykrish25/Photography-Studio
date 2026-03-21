import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Camera, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-primary-dark">
        {/* Placeholder for Hero Image - In real app, use generate_image or real asset */}
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.3em] font-medium mb-4"
          >
            Capturing the essence of life
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl text-white font-serif mb-8 leading-tight"
          >
            Fine Art Photography <br /> for Modern Stories
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/portfolio" className="btn btn-primary bg-white text-primary-dark hover:bg-gray-100 px-10">
              Explore Portfolio
            </Link>
            <Link to="/booking" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-dark px-10">
              Book a Session
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-container bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Our Expertise</h2>
          <div className="w-20 h-1 bg-primary-DEFAULT mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Camera, title: 'Weddings', desc: 'Emotional storytelling of your most special day with a blend of fine art and documentary style.' },
            { icon: Star, title: 'Portraits', desc: 'Showcasing your authentic self through personalized portrait sessions tailored to your personality.' },
            { icon: Clock, title: 'Events', desc: 'Dynamic coverage of corporate events, parties, and milestones with professional precision.' }
          ].map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
            >
              <service.icon className="h-10 w-10 mb-6 text-primary-DEFAULT" />
              <h3 className="text-2xl mb-4 font-serif">{service.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">{service.desc}</p>
              <Link to="/services" className="text-primary-DEFAULT font-semibold flex items-center hover:translate-x-2 transition-transform">
                Read More <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="bg-primary-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80" 
              className="rounded-2xl shadow-2xl h-[600px] w-full object-cover" 
              alt="Featured Work" 
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl mb-6">Crafting Visual Legacies</h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
              We believe that every photograph is a piece of legacy. Our mission is to capture not just how things look, but how they feel. From the grandest weddings to the quietest portraits, we bring a cinematic perspective to every frame.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-3xl font-serif font-bold text-primary-DEFAULT mb-2">10+</h4>
                <p className="text-gray-600 uppercase text-xs tracking-widest font-bold">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-primary-DEFAULT mb-2">500+</h4>
                <p className="text-gray-600 uppercase text-xs tracking-widest font-bold">Photoshoots</p>
              </div>
            </div>
            <Link to="/about" className="btn btn-primary px-10">
              The Studio Story
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl mb-8">Ready to create something beautiful?</h2>
          <p className="text-xl text-gray-600 font-light mb-12">
            Let's discuss your vision and bring it to life with professional photography tailored to your needs.
          </p>
          <Link to="/booking" className="btn btn-primary px-12 py-4 text-lg">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
