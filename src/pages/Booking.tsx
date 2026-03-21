import React, { useState, useEffect } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar as CalendarIcon, Clock, User, Mail, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import { serviceApi, bookingApi } from '../api/apiService';
import { Link } from 'react-router-dom';

const Booking: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: startOfToday(),
    timeSlot: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
    "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
  ];

  useEffect(() => {
    serviceApi.getAll().then(res => setServices(res.data));
  }, []);

  useEffect(() => {
    if (formData.date) {
      bookingApi.getBookedSlots(format(formData.date, 'yyyy-MM-dd'))
        .then(res => setBookedSlots(res.data));
    }
  }, [formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookingApi.create({
        ...formData,
        date: format(formData.date, 'yyyy-MM-dd')
      });
      setStep(4);
    } catch (error) {
      console.error('Booking failed', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="section-container min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                step >= s ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 'bg-white text-gray-400 border-gray-200'
              }`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              <span className={`mt-2 text-xs font-bold uppercase tracking-widest ${step >= s ? 'text-primary-DEFAULT' : 'text-gray-400'}`}>
                {s === 1 ? 'Service' : s === 2 ? 'DateTime' : 'Details'}
              </span>
              {s < 3 && (
                <div className={`absolute left-1/2 top-5 w-full h-0.5 -z-0 ${step > s ? 'bg-primary-DEFAULT' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-serif mb-8 text-center">Select a Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div 
                      key={service._id}
                      onClick={() => setFormData({...formData, serviceId: service._id})}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.serviceId === service._id ? 'border-primary-DEFAULT bg-primary-light/30' : 'border-gray-100 hover:border-accent'
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-lg">${service.price}</span>
                        <span className="text-xs uppercase tracking-tighter text-accent-dark">{service.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-end">
                  <button 
                    disabled={!formData.serviceId}
                    onClick={nextStep}
                    className="btn btn-primary disabled:opacity-50 flex items-center"
                  >
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-serif mb-8 text-center">Date & Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="font-bold mb-4 flex items-center"><CalendarIcon className="mr-2 h-5 w-5" /> Select Date</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(12)].map((_, i) => {
                        const date = addDays(startOfToday(), i);
                        const isSelected = isSameDay(formData.date, date);
                        return (
                          <button
                            key={i}
                            onClick={() => setFormData({...formData, date})}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 'bg-gray-50 border-transparent hover:border-gray-300'
                            }`}
                          >
                            <span className="block text-[10px] uppercase font-bold">{format(date, 'eee')}</span>
                            <span className="text-lg font-serif">{format(date, 'dd')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 flex items-center"><Clock className="mr-2 h-5 w-5" /> Select Time</h4>
                    <div className="space-y-3">
                      {timeSlots.map(slot => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = formData.timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => setFormData({...formData, timeSlot: slot})}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${
                              isSelected ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 
                              isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' : 
                              'hover:border-primary-DEFAULT'
                            }`}
                          >
                            {slot} {isBooked && "(Booked)"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-between">
                  <button onClick={prevStep} className="btn btn-outline flex items-center">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </button>
                  <button 
                    disabled={!formData.timeSlot}
                    onClick={nextStep}
                    className="btn btn-primary flex items-center"
                  >
                    Almost Done <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-serif mb-8 text-center">Final Details</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest flex items-center"><User className="h-4 w-4 mr-2" /> Full Name</label>
                    <input 
                      required
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                      placeholder="Jane Doe"
                      value={formData.customerName}
                      onChange={e => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest flex items-center"><Mail className="h-4 w-4 mr-2" /> Email Address</label>
                    <input 
                      required type="email"
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                      placeholder="jane@example.com"
                      value={formData.customerEmail}
                      onChange={e => setFormData({...formData, customerEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest flex items-center"><Phone className="h-4 w-4 mr-2" /> Phone Number</label>
                    <input 
                      required
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none"
                      placeholder="+1 (555) 000-0000"
                      value={formData.customerPhone}
                      onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest">Questions or Special Requests?</label>
                    <textarea 
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none min-h-[120px]"
                      placeholder="Tell us about your direct vision..."
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2 mt-8 flex justify-between">
                    <button type="button" onClick={prevStep} className="btn btn-outline flex items-center">
                      <ChevronLeft className="mr-2 h-5 w-5" /> Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary px-12 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4" 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-4xl font-serif mb-4">Request Received!</h2>
                <p className="text-gray-600 font-light mb-10 max-w-md mx-auto">
                  Thank you, {formData.customerName}! We've received your booking request for {format(formData.date, 'MMMM do')} at {formData.timeSlot}. An email confirmation will be sent shortly.
                </p>
                <Link to="/" className="btn btn-primary">Return Home</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Booking;
