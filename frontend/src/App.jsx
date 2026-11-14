import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { LookbookPage } from './pages/LookbookPage';
import { AboutPage } from './pages/AboutPage';
import { ConciergePage } from './pages/ConciergePage';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <ScrollToTop />
      {/* Fixed Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-320px)] flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/concierge" element={<ConciergePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Comprehensive Atelier Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
