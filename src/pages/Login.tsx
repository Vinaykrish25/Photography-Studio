import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Lock, ArrowRight } from 'lucide-react';
import { authApi } from '../api/apiService';
import { useAuthStore } from '../store/authStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login({ email, password });
      setAuth(res.data.user, res.data.access_token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 md:p-14">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-DEFAULT text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Camera className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-light">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">
              <Mail className="h-3 w-3 mr-2" /> Email Address
            </label>
            <input 
              required type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">
              <Lock className="h-3 w-3 mr-2" /> Password
            </label>
            <input 
              required type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-primary-DEFAULT outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full py-4 flex items-center justify-center group"
          >
            {loading ? 'Authenticating...' : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Default Admin: <span className="text-primary-DEFAULT font-medium">admin@example.com / admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
