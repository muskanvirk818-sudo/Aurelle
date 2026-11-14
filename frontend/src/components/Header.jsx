import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Header = ({ onOpenSearch }) => {
  const location = useLocation();
  const { totalCount, setIsCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const navLinks = [
    { label: 'New In', path: '/catalog?category=New In' },
    { label: 'Ready to Wear', path: '/catalog?category=Ready to Wear' },
    { label: 'Dresses', path: '/catalog?category=Dresses' },
    { label: 'Knitwear & Outerwear', path: '/catalog?category=Knitwear & Outerwear' },
    { label: 'Accessories', path: '/catalog?category=Accessories' },
    { label: 'Editorial / Story', path: '/lookbook' },
  ];

  const isLinkActive = (path) => {
    return location.pathname + location.search === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top Announcement Bar */}
        <aside className="w-full bg-primary-container text-secondary-fixed py-space-xs px-margin border-b border-secondary/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-label-caps text-label-caps tracking-widest text-[10px] md:text-label-caps">
            <span className="hidden sm:inline">PARIS • COMO</span>
            <span className="text-center uppercase tracking-wider mx-auto sm:mx-0">
              COMPLIMENTARY WHITE-GLOVE SHIPPING &amp; BESPOKE GIFT BOX ON ORDERS OVER $350 &nbsp;|&nbsp; DISCOVER THE AUTUMN COLLECTION
            </span>
            <Link
              to="/concierge"
              className="hidden sm:inline cursor-pointer text-secondary-fixed hover:text-on-primary transition-colors uppercase"
            >
              CLIENT SERVICE
            </Link>
          </div>
        </aside>

        {/* Main Navbar */}
        <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-space-md">
            <Link to="/" className="flex items-center gap-space-sm">
              <img
                alt="Aurelle Brand Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UhntV-6XfUVdtrOB368VQTLl1i3Cx1Ah8k61O4Du1SCBCMn_d2jl1NmCxDemiekLtokS0-mrV3_wPvy37Q5cjhiKxXZ-0TuNwhqU6hDeCBf20MYzMoM3JwRO81CUWiaSgPSOb-6qMkObYWMS7RYSryXh4n0JvmGLm1iLbqU0aAGcrl9HzHiy-CKwdMaLpJ8U1GNYX1EQjiBZxSUYZV0wGfxXFbOLqCjquZT0_-NBAa4_xQHlA8m_o6V1Nl"
              />
              <span className="font-title-editorial text-title-editorial tracking-widest uppercase text-primary font-medium">
                Aurelle
              </span>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-space-lg">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`font-label-caps text-label-caps uppercase tracking-widest pb-space-xs transition-colors ${
                  isLinkActive(link.path)
                    ? 'text-primary font-medium border-b border-secondary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-space-xs sm:gap-space-md">
            {/* Currency selector */}
            <div className="relative hidden sm:flex items-center text-on-surface-variant font-label-sm text-label-sm tracking-wider">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="hover:text-primary transition-colors flex items-center gap-1 uppercase"
              >
                USD ($)
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              {currencyDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-surface-container-lowest border border-outline-variant/40 shadow-lg p-2 flex flex-col gap-1 w-24 z-50">
                  <span className="cursor-pointer px-2 py-1 hover:bg-surface-container text-xs font-semibold">USD ($)</span>
                  <span className="cursor-pointer px-2 py-1 hover:bg-surface-container text-xs">EUR (€)</span>
                  <span className="cursor-pointer px-2 py-1 hover:bg-surface-container text-xs">GBP (£)</span>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Atelier"
              className="p-space-xs text-on-surface-variant hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/catalog?filter=wishlist"
              aria-label="Wishlist"
              className="relative p-space-xs text-on-surface-variant hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary rounded-full w-4 h-4 flex items-center justify-center font-label-caps text-[9px]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative p-space-xs text-on-surface-variant hover:text-primary transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary rounded-full w-4 h-4 flex items-center justify-center font-label-caps text-[9px]">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Hairline Divider */}
            <div className="h-4 w-[1px] bg-outline-variant hidden sm:block"></div>

            {/* Sign In / Account Link */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1Xm0-PkcnmLpS1Rtg3A_scTy2aNBwwuFMUkuxNVAk03MI2rh61vwA0rRHOLv0nv98zwE871RdrZZMvUqa3SBooClgtWkp7b7oP6vFq-N-6sHPSoul7GFAuAddUzdd0-Om1sMrpaW0hEjoYca_AGxff7s3gOMKdpsZVpy-Yb1qFvGRAdFFUboxw2IzUv-FnRop7jXnDynFNkrWHzr-gcRrBEz5wN4IYynX47k-m7ZI0FrToHEefi6hA"
              />
              <span className="hidden xl:inline font-label-caps text-label-caps uppercase">
                {isAuthenticated ? (user?.name?.split(' ')[0] || 'Client') : 'Sign In'}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-space-xs text-primary"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-outline-variant/40 px-margin-mobile py-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-label-caps text-sm uppercase tracking-widest text-on-surface hover:text-secondary py-2 border-b border-outline-variant/20"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2 text-sm">
              <Link
                to="/concierge"
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary font-label-caps uppercase tracking-wider"
              >
                Book Private Salon Fitting
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary font-label-caps uppercase tracking-wider"
              >
                View Shopping Bag ({totalCount})
              </Link>
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-outline font-label-caps uppercase tracking-wider"
              >
                {isAuthenticated ? 'Client Account Portal' : 'Sign In / Register'}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
