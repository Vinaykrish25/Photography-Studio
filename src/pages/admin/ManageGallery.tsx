import React, { useEffect, useState } from 'react';
import { galleryApi } from '../../api/apiService';
import { Plus, Edit2, Trash2, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageGallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await galleryApi.getAll();
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching gallery', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        imageUrl: item.imageUrl
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        imageUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await galleryApi.update(editingItem._id, formData);
      } else {
        await galleryApi.create(formData);
      }
      setIsModalOpen(false);
      fetchGallery();
    } catch (error) {
      alert('Failed to save gallery item');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await galleryApi.delete(id);
        fetchGallery();
      } catch (error) {
        alert('Failed to delete item');
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <Link to="/admin" className="text-accent-dark flex items-center text-sm font-bold uppercase tracking-widest mb-2 hover:text-primary-dark">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif">Manage Portfolio</h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Photo
          </button>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-white animate-pulse rounded-2xl shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-3xl overflow-hidden shadow-lg group border border-gray-100">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 bg-white/90 backdrop-blur rounded-xl text-primary-dark hover:bg-primary-dark hover:text-white transition-all shadow-sm"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary-dark/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full p-20 text-center text-gray-400 italic bg-white rounded-3xl border border-dashed">
                No items in your portfolio yet. Click "Add New Photo" to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif">{editingItem ? 'Edit Photo' : 'Add New Photo'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title</label>
                <input 
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                  placeholder="e.g. Sunset Ceremony"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <select 
                    required
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Events">Events</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                  <input 
                    required
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none min-h-[100px]"
                  placeholder="Tell the story behind this photo..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
