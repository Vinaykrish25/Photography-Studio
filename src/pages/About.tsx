import React from 'react';
import { motion } from 'framer-motion';
import { Award, Camera, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Story Section */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h1 className="text-5xl mb-8">Our Story</h1>
            <p className="text-xl text-gray-700 font-light leading-relaxed mb-6">
              Founded in 2012 by Alex Rivet, Rivet Studio began with a simple belief: that every moment, no matter how small, deserves to be captured with intentionality and art.
            </p>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              What started as a one-person passion project has grown into a collective of creative visionaries dedicated to the craft of visual storytelling. We've traveled across continents, documented hundreds of weddings, and collaborated with world-class brands, yet our core remains the same—finding the beauty in the authentic.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-light rounded-lg text-primary-DEFAULT">
                  <Camera className="h-6 w-6" />
                </div>
                <span className="font-bold">500k+ Shutter Clicks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-light rounded-lg text-primary-DEFAULT">
                  <Users className="h-6 w-6" />
                </div>
                <span className="font-bold">200+ Happy Couples</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80" 
              alt="Studio Life" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <p className="text-primary-dark font-serif italic text-xl mb-2">"Light is my paint, <br /> life is my canvas."</p>
              <p className="text-accent-dark uppercase text-xs tracking-widest font-bold">— Alex Rivet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary-dark py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">What We Stand For</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Heart, title: 'Authenticity', desc: 'We value real emotions over perfect poses, seeking the genuine connections that make your story unique.' },
              { icon: Camera, title: 'Artistry', desc: 'Every frame is composed with an artistic eye, utilizing light and shadow to create cinematic visuals.' },
              { icon: Award, title: 'Excellence', desc: 'From the initial inquiry to the final delivery, we provide a premium experience marked by professionalism.' }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl mb-4 font-serif">{value.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="section-container bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Meet the Team</h2>
          <p className="text-gray-500 font-light max-w-xl mx-auto">The dedicated artists behind every masterpiece at Rivet Studio.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Alex Rivet', role: 'Founder & Lead', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80' },
            { name: 'Sarah Chen', role: 'Wedding Specialist', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80' },
            { name: 'Marcus Bell', role: 'Portrait Artist', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' },
            { name: 'Elena Rossi', role: 'Editor & Retoucher', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80' }
          ].map((member, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-lg">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-accent-dark tracking-widest text-xs uppercase mt-1 font-bold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
