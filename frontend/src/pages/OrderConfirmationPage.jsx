import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { api } from '../services/api';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order && id) {
      api.getOrderById(id)
        .then((res) => {
          if (res.success && res.order) {
            setOrder(res.order);
          }
        })
        .catch((err) => console.log('Could not fetch order directly:', err))
        .finally(() => setLoading(false));
    }
  }, [id, order]);

  const displayOrder = order || {
    orderNumber: id || `AUR-${new Date().getFullYear()}-849201`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    customer: { firstName: 'Distinguished', lastName: 'Client' },
    shippingAddress: { city: 'Paris', country: 'France' },
    total: 2450,
    shippingMethod: 'Complimentary White-Glove Courier',
    items: [],
  };

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin">
        {/* Certificate Card */}
        <div className="bg-surface-container-lowest border-2 border-[#E6D7B8] p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-5">
            <span className="font-title-editorial text-9xl text-primary">AURELLE</span>
          </div>

          <div className="text-center max-w-xl mx-auto mb-space-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.25em]">
              Atelier Acquisition Confirmed
            </span>
            <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1">
              Thank You for Your Patronage
            </h1>
            <p className="font-body-md text-on-surface-variant font-light mt-2 leading-relaxed">
              Your commission has entered our atelier preparation registry. Master artisans in Paris and Como are now packaging your garments in bespoke cedar-scented archive boxes.
            </p>
          </div>

          {/* Details strip */}
          <div className="bg-surface-container-low p-space-md grid grid-cols-2 sm:grid-cols-4 gap-space-sm border border-outline-variant/30 text-xs">
            <div>
              <span className="font-label-caps uppercase text-outline block">Order Number</span>
              <strong className="text-primary font-mono text-sm">{displayOrder.orderNumber}</strong>
            </div>
            <div>
              <span className="font-label-caps uppercase text-outline block">Date of Registry</span>
              <strong className="text-primary">
                {new Date(displayOrder.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </strong>
            </div>
            <div>
              <span className="font-label-caps uppercase text-outline block">Status</span>
              <span className="text-secondary font-semibold uppercase">{displayOrder.status}</span>
            </div>
            <div>
              <span className="font-label-caps uppercase text-outline block">Courier Protocol</span>
              <strong className="text-primary">{displayOrder.shippingMethod}</strong>
            </div>
          </div>

          {/* Items Preview */}
          {displayOrder.items && displayOrder.items.length > 0 && (
            <div className="mt-space-md border-t border-outline-variant/30 pt-space-md">
              <h3 className="font-title-editorial text-base text-primary mb-3">Commissioned Pieces</h3>
              <div className="divide-y divide-outline-variant/20">
                {displayOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-surface-container" />
                      <div>
                        <p className="font-medium text-primary">{item.name}</p>
                        <span className="text-outline">
                          Size {item.size} &bull; {item.color} &times; {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-primary">
                      ${(item.price * item.quantity).toLocaleString()} USD
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concierge Assistance Box */}
          <div className="mt-space-lg p-space-md bg-secondary-fixed/30 border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold">
                Private Concierge Assistance
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant font-light mt-0.5">
                For custom fitting alteration requests or private courier schedule coordination:
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-label-caps tracking-wider shrink-0">
              <a href="tel:+33142680000" className="text-primary hover:text-secondary underline">
                +33 (0)1 42 68 00 00
              </a>
              <span className="text-outline">&bull;</span>
              <Link to="/concierge" className="text-secondary hover:underline">
                Client Portal
              </Link>
            </div>
          </div>

          {/* Return CTA */}
          <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-md">
            <Link
              to="/catalog"
              className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 tracking-[0.18em] hover:bg-secondary transition-colors"
            >
              Return to Catalog
            </Link>
            <Link
              to="/lookbook"
              className="border border-primary text-primary font-label-caps text-label-caps uppercase px-8 py-4 tracking-[0.18em] hover:bg-surface-container transition-colors"
            >
              Explore Editorial Lookbook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
