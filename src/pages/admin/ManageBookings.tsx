import React, { useEffect, useState } from 'react';
import { bookingApi } from '../../api/apiService';
import { format } from 'date-fns';
import { Check, X, Clock, Mail, Phone, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await bookingApi.findAll();
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await bookingApi.updateStatus(id, status);
      fetchBookings();
    } catch (error) {
      alert('Failed to update status');
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
            <h1 className="text-4xl font-serif">Manage Bookings</h1>
          </div>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-white animate-pulse rounded-2xl shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary-dark text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                  <th className="px-8 py-6">Customer</th>
                  <th className="px-8 py-6">Service & Date</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-8">
                      <div className="font-bold text-lg">{booking.customerName}</div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {booking.customerEmail}</span>
                        <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {booking.customerPhone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="font-bold uppercase text-xs tracking-widest text-accent-dark">{booking.serviceId?.title}</div>
                      <div className="text-lg font-serif mt-1">{format(new Date(booking.date), 'MMMM do, yyyy')}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1"><Clock className="h-3 w-3 mr-1" /> {booking.timeSlot}</div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex justify-end space-x-2">
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="Confirm"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Cancel"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-20 text-center text-gray-400 italic">No bookings found yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
