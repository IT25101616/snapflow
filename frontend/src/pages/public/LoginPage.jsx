import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, LogIn, Lock, Mail } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, login, getDashboardPath } = useAuth();
  const { showError, showSuccess, showInfo } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(getDashboardPath(user.role), { replace: true });
    }
    if (searchParams.get('expired') === 'true') {
      showInfo('Your session has expired. Please log in again.');
    }
  }, [user, navigate, searchParams, getDashboardPath, showInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      if (res.success && res.data) {
        login(res.data);
        showSuccess('Welcome back, ' + res.data.fullName);
        navigate(getDashboardPath(res.data.role), { replace: true });
      }
    } catch (err) {
      showError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200/80">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mx-auto mb-3 border border-gold-500/30">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in to SnapFlow</h2>
          <p className="mt-1.5 text-xs text-gray-500">Lanka Moments Event Photography System</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
          />

          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button type="submit" variant="primary" loading={loading} className="w-full" icon={LogIn}>
            Sign In
          </Button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Quick Demo Logins:</p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => fillDemo('thisara@gmail.com', 'thisara@2005')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition"
            >
              Director
            </button>
            <button
              type="button"
              onClick={() => fillDemo('nadun@gmail.com', 'nadun@2006')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition"
            >
              Ops Manager
            </button>
            <button
              type="button"
              onClick={() => fillDemo('sahan@gmail.com', 'sahan@2004')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition"
            >
              CRO
            </button>
            <button
              type="button"
              onClick={() => fillDemo('nethuli@gmail.com', 'nethuli@2005')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition"
            >
              Photographer
            </button>
            <button
              type="button"
              onClick={() => fillDemo('finance@gmail.com', 'finance@2005')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition"
            >
              Finance Exec
            </button>
            <button
              type="button"
              onClick={() => fillDemo('afrith@gmail.com', 'afrith@2005')}
              className="text-left p-1.5 rounded bg-gray-50 hover:bg-gold-50 hover:text-gold-700 transition font-medium"
            >
              Customer
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-gold-600 hover:text-gold-700">
            Register as Customer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
