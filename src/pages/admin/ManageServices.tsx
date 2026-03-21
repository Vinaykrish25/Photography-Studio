import React, { useEffect, useState } from 'react';
import { serviceApi } from '../../api/apiService';
import { Plus, Edit2, Trash2, X, ChevronLeft, Check, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: 0,
    features: [] as string[]
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

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

  const handleOpenModal = (service?: any) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        category: service.category,
        description: service.description,
        price: service.price,
        features: service.features || []
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        price: 0,
        features: []
      });
    }
    setIsModalOpen(true);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await serviceApi.update(editingService._id, formData);
      } else {
        await serviceApi.create(formData);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      alert('Failed to save service');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceApi.delete(id);
        fetchServices();
      } catch (error) {
        alert('Failed to delete service');
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
            <h1 className="text-4xl font-serif">Manage Services</h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Service
          </button>
        </header>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-white animate-pulse rounded-2xl shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-accent-dark text-[10px] uppercase font-bold tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                    <h3 className="text-2xl mt-4 mb-2">{service.title}</h3>
                    <div className="text-2xl font-serif font-bold text-primary-dark">${service.price}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleOpenModal(service)}
                      className="p-2 bg-gray-50 text-primary-dark hover:bg-primary-dark hover:text-white rounded-xl transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">{service.description}</p>
                
                <div className="space-y-2 mt-auto">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3">Key Features</h4>
                  {(service.features || []).slice(0, 3).map((f: string, i: number) => (
                    <div key={i} className="flex items-center text-xs text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mr-2" /> {f}
                    </div>
                  ))}
                  {service.features?.length > 3 && (
                    <div className="text-[10px] text-gray-400 italic">+{service.features.length - 3} more...</div>
                  )}
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-full p-20 text-center text-gray-400 italic bg-white rounded-3xl border border-dashed">
                No services defined yet. Click "Add New Service" to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-serif">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Service Title</label>
                  <input 
                    required
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                    placeholder="e.g. Dream Wedding"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <select 
                    required
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Events">Events</option>
                    <option value="Studio">Studio</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Base Price
                  </label>
                  <input 
                    required type="number"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                    placeholder="e.g. 1500"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                <textarea 
                  required
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none min-h-[100px]"
                  placeholder="Describe your service and what makes it special..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Service Features</label>
                <div className="flex space-x-2">
                  <input 
                    className="flex-grow p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                    placeholder="e.g. High-res downloads"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button type="button" onClick={addFeature} className="p-4 bg-primary-DEFAULT text-white rounded-2xl hover:bg-primary-dark transition-colors">
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span key={index} className="flex items-center px-4 py-2 bg-primary-light/50 text-primary-dark rounded-full text-sm">
                      {feature}
                      <button onClick={() => removeFeature(index)} className="ml-2 hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex space-x-4 sticky bottom-0 bg-white border-t border-gray-100 -mx-8 px-8 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
