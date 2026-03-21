import initialData from '../data.json';

// Utility to handle local storage with fallback to initial data
const getLocalData = () => {
  const data = localStorage.getItem('studio-data');
  if (!data) {
    localStorage.setItem('studio-data', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const setLocalData = (data: any) => {
  localStorage.setItem('studio-data', JSON.stringify(data));
};

// Mock async delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: any) => {
    await delay();
    const data = getLocalData();
    const user = data.users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      return { data: { user, token: 'mock-jwt-token' } };
    }
    throw new Error('Invalid credentials');
  },
  register: async (userData: any) => {
    await delay();
    const data = getLocalData();
    const newUser = { ...userData, id: Date.now().toString(), role: 'user' };
    data.users.push(newUser);
    setLocalData(data);
    return { data: { user: newUser, token: 'mock-jwt-token' } };
  },
  getProfile: async () => {
    await delay();
    const auth = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    return { data: auth.state?.user };
  },
};

export const serviceApi = {
  getAll: async () => {
    await delay();
    return { data: getLocalData().services };
  },
  getById: async (id: string) => {
    await delay();
    const service = getLocalData().services.find((s: any) => s._id === id);
    return { data: service };
  },
  create: async (service: any) => {
    await delay();
    const data = getLocalData();
    const newService = { ...service, _id: Date.now().toString() };
    data.services.push(newService);
    setLocalData(data);
    return { data: newService };
  },
  update: async (id: string, service: any) => {
    await delay();
    const data = getLocalData();
    const index = data.services.findIndex((s: any) => s._id === id);
    if (index !== -1) {
      data.services[index] = { ...data.services[index], ...service };
      setLocalData(data);
      return { data: data.services[index] };
    }
    throw new Error('Service not found');
  },
  delete: async (id: string) => {
    await delay();
    const data = getLocalData();
    data.services = data.services.filter((s: any) => s._id !== id);
    setLocalData(data);
    return { data: { success: true } };
  }
};

export const galleryApi = {
  getAll: async (category?: string) => {
    await delay();
    let gallery = getLocalData().gallery;
    if (category) {
      gallery = gallery.filter((item: any) => item.category === category);
    }
    return { data: gallery };
  },
  getCategories: async () => {
    await delay();
    const gallery = getLocalData().gallery;
    const categories = Array.from(new Set(gallery.map((item: any) => item.category)));
    return { data: categories };
  },
  create: async (item: any) => {
    await delay();
    const data = getLocalData();
    const newItem = { ...item, _id: Date.now().toString() };
    data.gallery.push(newItem);
    setLocalData(data);
    return { data: newItem };
  },
  update: async (id: string, item: any) => {
    await delay();
    const data = getLocalData();
    const index = data.gallery.findIndex((g: any) => g._id === id);
    if (index !== -1) {
      data.gallery[index] = { ...data.gallery[index], ...item };
      setLocalData(data);
      return { data: data.gallery[index] };
    }
    throw new Error('Gallery item not found');
  },
  delete: async (id: string) => {
    await delay();
    const data = getLocalData();
    data.gallery = data.gallery.filter((g: any) => g._id !== id);
    setLocalData(data);
    return { data: { success: true } };
  }
};

export const bookingApi = {
  create: async (bookingData: any) => {
    await delay();
    const data = getLocalData();
    const service = data.services.find((s: any) => s._id === bookingData.serviceId);
    const newBooking = { 
      ...bookingData, 
      _id: Date.now().toString(), 
      status: 'pending',
      serviceId: service // Populating for frontend display like backend does
    };
    data.bookings.push(newBooking);
    setLocalData(data);
    return { data: newBooking };
  },
  getBookedSlots: async (date: string) => {
    await delay();
    const data = getLocalData();
    return { data: data.bookings.filter((b: any) => b.date === date).map((b: any) => b.timeSlot) };
  },
  findAll: async () => {
    await delay();
    return { data: getLocalData().bookings };
  },
  updateStatus: async (id: string, status: string) => {
    await delay();
    const data = getLocalData();
    const index = data.bookings.findIndex((b: any) => b._id === id);
    if (index !== -1) {
      data.bookings[index].status = status;
      setLocalData(data);
      return { data: data.bookings[index] };
    }
    throw new Error('Booking not found');
  },
};
