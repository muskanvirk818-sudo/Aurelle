import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await api.subscribeNewsletter(email);
      setStatus('success');
      setMessage(res.message || 'Thank you. Your salon invitation has been addressed.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Unable to register correspondence. Please try again.');
    }
  };

  return (
    <footer className="w-full bg-primary-container text-surface border-t border-secondary/20 pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl border-b border-outline-variant/30">
          {/* Column 1: Maison Aurelle */}
          <div className="flex flex-col gap-space-md">
            <span className="font-title-editorial text-headline-sm text-secondary-fixed">
              Aurelle
            </span>
            <p className="font-body-sm text-body-sm text-surface-variant/80 max-w-xs leading-relaxed font-light">
              Born in Paris, curated for timeless poise. High-fashion ateliers embracing slow luxury, pristine natural textiles, and sculptural tailoring created for enduring permanence.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs flex-wrap">
              <a
                className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-secondary-fixed transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                INSTAGRAM
              </a>
              <a
                className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-secondary-fixed transition-colors"
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
              >
                PINTEREST
              </a>
              <a
                className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-secondary-fixed transition-colors"
                href="https://vogue.com"
                target="_blank"
                rel="noreferrer"
              >
                VOGUE
              </a>
              <a
                className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-secondary-fixed transition-colors"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          {/* Column 2: Client Services */}
          <div className="flex flex-col gap-space-md">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed">
              Client Services
            </span>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-surface-variant/80 font-light">
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/concierge">
                  Complimentary Concierge
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/concierge?tab=appointment">
                  Book Private Appointment
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/concierge?tab=shipping">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/concierge?tab=sizing">
                  Size &amp; Fit Atelier
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/concierge?tab=track">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div className="flex flex-col gap-space-md">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed">
              The Maison
            </span>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-surface-variant/80 font-light">
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/about">
                  About Aurelle
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/about">
                  Artisanal Craftsmanship
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/about">
                  Sustainability &amp; Silk Traceability
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/lookbook">
                  Press &amp; Editorial
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-fixed transition-colors" to="/about">
                  Careers &amp; Ateliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Join the Circle */}
          <div className="flex flex-col gap-space-md">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed">
              Join the Aurelle Circle
            </span>
            <p className="font-body-sm text-body-sm text-surface-variant/80 font-light">
              Receive private salon invitations, lookbook previews, and curated atelier releases.
            </p>
            {status === 'success' ? (
              <div className="p-3 bg-secondary-container/20 text-secondary-fixed border border-secondary/40 font-body-sm text-sm">
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-space-sm">
                <div className="flex items-center border-b border-secondary/50 pb-space-xs">
                  <input
                    className="bg-transparent w-full text-surface placeholder:text-surface-variant/60 font-body-sm text-body-sm focus:outline-none"
                    placeholder="Enter your email address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="font-label-caps text-label-caps text-secondary-fixed hover:text-surface uppercase tracking-widest pl-space-xs transition-colors"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
                <span className="font-label-sm text-label-sm text-surface-variant/60">
                  By subscribing you accept our privacy policy. Encrypted discretion assured.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-space-lg gap-space-md font-label-sm text-label-sm text-surface-variant/60">
          <span>&copy; {new Date().getFullYear()} Maison Aurelle Paris. All Rights Reserved.</span>
          <div className="flex items-center gap-space-lg flex-wrap justify-center">
            <span className="cursor-pointer hover:text-surface transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-surface transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-surface transition-colors">Cookie Settings</span>
            <span className="cursor-pointer hover:text-surface transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
