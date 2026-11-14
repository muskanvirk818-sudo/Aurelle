import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export const AccountPage = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'appointments'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (token) {
      api.getMyOrders(token)
        .then((res) => {
          if (res.success && res.orders) {
            setOrders(res.orders);
          }
        })
        .catch((err) => console.log('Could not fetch user orders:', err));
    }
  }, [isAuthenticated, token, navigate]);

  if (!user) return null;

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Account Header */}
        <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8] mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm">
          <div className="flex items-center gap-4">
            <img
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1Xm0-PkcnmLpS1Rtg3A_scTy2aNBwwuFMUkuxNVAk03MI2rh61vwA0rRHOLv0nv98zwE871RdrZZMvUqa3SBooClgtWkp7b7oP6vFq-N-6sHPSoul7GFAuAddUzdd0-Om1sMrpaW0hEjoYca_AGxff7s3gOMKdpsZVpy-Yb1qFvGRAdFFUboxw2IzUv-FnRop7jXnDynFNkrWHzr-gcRrBEz5wN4IYynX47k-m7ZI0FrToHEefi6hA"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
                  Privileged Patron
                </span>
                <span className="bg-secondary/20 text-secondary font-label-caps text-[10px] px-2 py-0.5 uppercase font-bold">
                  Circle Salon VIP
                </span>
              </div>
              <h1 className="font-headline-sm text-headline-sm text-primary mt-0.5">
                {user.name}
              </h1>
              <p className="font-body-sm text-xs text-outline">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/concierge"
              className="bg-secondary text-primary font-label-caps text-xs uppercase px-5 py-3 tracking-wider hover:bg-secondary-fixed transition-colors text-center"
            >
              Book Private Salon
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="border border-outline-variant text-outline hover:text-error hover:border-error font-label-caps text-xs uppercase px-5 py-3 tracking-wider transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant/30 mb-space-lg gap-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`font-label-caps text-sm uppercase tracking-wider pb-3 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-secondary text-primary font-bold'
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Atelier Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`font-label-caps text-sm uppercase tracking-wider pb-3 border-b-2 transition-colors ${
              activeTab === 'wishlist'
                ? 'border-secondary text-primary font-bold'
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Saved Silhouettes ({wishlist.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-surface-container-lowest p-space-xl text-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-2">
                  inventory_2
                </span>
                <h3 className="font-title-editorial text-xl text-primary">No Registered Orders</h3>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto mt-1 mb-4 font-light">
                  Your acquisitions will be permanently chronicled here with live atelier dispatch status.
                </p>
                <Link
                  to="/catalog"
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase px-6 py-3 tracking-widest hover:bg-secondary transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-space-md">
                {orders.map((ord) => (
                  <div
                    key={ord._id || ord.orderNumber}
                    className="bg-surface-container-lowest p-space-md border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                          {ord.orderNumber}
                        </span>
                        <span className="text-outline">&bull;</span>
                        <span className="text-xs text-outline">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-surface-container px-2 py-0.5 text-[10px] font-label-caps uppercase text-primary">
                          {ord.status}
                        </span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                        {ord.items?.length || 1} Silhouettes &bull; Total ${ord.total?.toLocaleString()} USD
                      </p>
                    </div>

                    <Link
                      to={`/order-confirmation/${ord._id || ord.orderNumber}`}
                      state={{ order: ord }}
                      className="text-secondary font-label-caps text-xs uppercase tracking-wider hover:underline"
                    >
                      View Atelier Receipt &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-surface-container-lowest p-space-xl text-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-2">
                  favorite_border
                </span>
                <h3 className="font-title-editorial text-xl text-primary">Your Wishlist is Empty</h3>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto mt-1 mb-4 font-light">
                  Save silhouettes while exploring our catalog for future private appointments or acquisitions.
                </p>
                <Link
                  to="/catalog"
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase px-6 py-3 tracking-widest hover:bg-secondary transition-colors"
                >
                  Browse Atelier Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {wishlist.map((prod) => (
                  <div
                    key={prod._id || prod.id}
                    className="bg-surface-container-lowest p-space-sm border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <Link to={`/product/${prod._id || prod.id}`}>
                      <div className="aspect-[3/4] overflow-hidden bg-surface-container mb-2">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-title-editorial text-sm text-primary line-clamp-1">{prod.name}</h4>
                      <p className="font-body-md text-sm font-semibold text-primary mt-1">
                        ${prod.price?.toLocaleString()} USD
                      </p>
                    </Link>
                    <Link
                      to={`/product/${prod._id || prod.id}`}
                      className="mt-3 w-full bg-secondary text-primary font-label-caps text-[10px] uppercase tracking-widest py-2 text-center hover:bg-secondary-fixed transition-colors"
                    >
                      View Silhouette
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
