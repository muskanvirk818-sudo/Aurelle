import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await register(name, email, password);
        if (res.success) {
          navigate('/account');
        } else {
          setError(res.message);
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          navigate('/account');
        } else {
          setError(res.message);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-margin-mobile">
        <div className="bg-surface-container-lowest p-space-lg md:p-space-xl border border-[#E6D7B8] shadow-xl">
          <div className="text-center mb-space-md">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.25em]">
              Maison Aurelle
            </span>
            <h1 className="font-headline-sm text-headline-sm text-primary mt-1">
              {isRegister ? 'Register Client Dossier' : 'Client Access Portal'}
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant font-light mt-1">
              {isRegister
                ? 'Join our private salon circle for priority commissions and personal trunk previews.'
                : 'Access your saved acquisitions, salon fittings, and bespoke orders.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs font-body-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
            {isRegister && (
              <div>
                <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                  Full Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Genevieve Vance"
                  className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                Correspondence Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@maison-aurelle.com"
                className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                Private Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-[0.2em] py-4 hover:bg-secondary transition-colors"
            >
              {loading ? 'Authenticating...' : isRegister ? 'Establish Client Dossier' : 'Enter Salon Portal'}
            </button>
          </form>

          <div className="mt-space-md pt-space-sm border-t border-outline-variant/30 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="font-label-sm text-xs text-on-surface hover:text-secondary transition-colors uppercase tracking-wider"
            >
              {isRegister
                ? 'Already possess an atelier account? Sign In &rarr;'
                : 'New to the Maison? Create Client Dossier &rarr;'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
