import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryApi } from '../api/apiService';
import { X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, categoriesRes] = await Promise.all([
          galleryApi.getAll(selectedCategory || undefined),
          galleryApi.getCategories()
        ]);
        setItems(galleryRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching gallery data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="section-container min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl mb-4">Portfolio</h1>
        <p className="text-gray-600 font-light max-w-2xl mx-auto">
          A curated collection of moments captured across various genres, reflecting our commitment to visual excellence.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full border transition-all ${
            !selectedCategory ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 'border-gray-300 hover:border-primary-DEFAULT'
          }`}
        >
          All Works
        </button>
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${
              selectedCategory === cat ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 'border-gray-300 hover:border-primary-DEFAULT'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer bg-gray-100"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="text-white text-xl font-serif">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl font-serif mb-2">{selectedImage.title}</h3>
                <p className="text-gray-400 font-light">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
