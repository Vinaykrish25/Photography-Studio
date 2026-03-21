import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Settings, Calendar, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const stats = [
    { label: 'Total Bookings', value: '24', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Services', value: '6', icon: Settings, color: 'bg-purple-500' },
    { label: 'Gallery Items', value: '128', icon: Image, color: 'bg-green-500' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white p-6 hidden md:block">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-white text-primary-dark rounded-lg flex items-center justify-center font-bold">R</div>
          <span className="font-serif font-bold tracking-tight">Admin Console</span>
        </div>
        
        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl">
            <LayoutDashboard className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link to="/admin/bookings" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link to="/admin/gallery" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Image className="h-5 w-5" />
            <span>Portfolio</span>
          </Link>
          <Link to="/admin/services" className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="h-5 w-5" />
            <span>Services</span>
          </Link>
          <button onClick={logout} className="flex items-center space-x-3 p-3 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors w-full mt-10">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif">Welcome back, {user?.name}</h1>
            <p className="text-gray-500 font-light">Here's an overview of your studio's activity.</p>
          </div>
          <Link to="/" className="text-sm font-bold uppercase tracking-widest text-primary-DEFAULT hover:underline">View Website</Link>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
              <div className={`p-4 rounded-2xl text-white ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-serif font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Teaser */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-serif">Recent Booking Requests</h3>
            <Link to="/admin/bookings" className="text-accent-dark text-sm font-bold flex items-center hover:text-primary-dark">
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">JD</div>
                    <div>
                      <p className="font-bold">John Doe</p>
                      <p className="text-sm text-gray-400">Wedding Photography • Mar 15, 2024</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-tighter">Pending</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
