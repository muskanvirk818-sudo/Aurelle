import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : '',
    lastName: user ? user.name.split(' ').slice(1).join(' ') : '',
    email: user ? user.email : '',
    phone: user?.phone || '',
    address: '14 Rue du Faubourg Saint-Honoré',
    suite: 'Apt 4B',
    city: 'Paris',
    country: 'France',
    postalCode: '75008',
    shippingMethod: 'Complimentary White-Glove Courier',
    paymentMethod: 'Encrypted Credit Card / Private Card',
    cardNumber: '•••• •••• •••• 8821',
    cardExp: '12/28',
    cardCvv: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="w-full bg-surface min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-headline-md text-primary">Your Shopping Bag is Empty</h2>
        <Link to="/catalog" className="mt-4 text-secondary uppercase font-label-caps tracking-widest underline">
          Return to Atelier Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const orderPayload = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        address: formData.address,
        suite: formData.suite,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      items,
      subtotal,
      shippingCost,
      total,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const res = await api.createOrder(orderPayload, token);
      if (res.success && res.order) {
        clearCart();
        navigate(`/order-confirmation/${res.order._id || res.order.orderNumber}`, {
          state: { order: res.order },
        });
      } else {
        setErrorMsg(res.message || 'Unable to place order. Please check connection.');
      }
    } catch (err) {
      setErrorMsg('Atelier server connection error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="border-b border-outline-variant/30 pb-space-sm mb-space-lg">
          <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
            Confidential Transaction
          </span>
          <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1">
            Bespoke Atelier Checkout
          </h1>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 bg-error-container text-on-error-container text-sm font-body-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left Form: Client and Shipping Details */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* 1. Client Correspondence */}
            <div className="bg-surface-container-lowest p-space-md border border-outline-variant/30 shadow-sm">
              <h3 className="font-title-editorial text-xl text-primary mb-space-sm flex items-center gap-2">
                <span className="font-label-caps text-xs text-secondary border border-secondary px-2 py-0.5">
                  1
                </span>
                Client Correspondence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    Email for Shipment Dispatch
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 1 42 68 00 00"
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Destination Address */}
            <div className="bg-surface-container-lowest p-space-md border border-outline-variant/30 shadow-sm">
              <h3 className="font-title-editorial text-xl text-primary mb-space-sm flex items-center gap-2">
                <span className="font-label-caps text-xs text-secondary border border-secondary px-2 py-0.5">
                  2
                </span>
                Delivery Destination
              </h3>
              <div className="grid grid-cols-1 gap-space-sm">
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    Street Address &amp; Hotel / Residence
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div>
                    <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                      Apartment / Suite
                    </label>
                    <input
                      type="text"
                      name="suite"
                      value={formData.suite}
                      onChange={handleChange}
                      className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                    Country / Sovereign Territory
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                  >
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Japan">Japan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-surface-container-lowest p-space-md border border-outline-variant/30 shadow-sm">
              <h3 className="font-title-editorial text-xl text-primary mb-space-sm flex items-center gap-2">
                <span className="font-label-caps text-xs text-secondary border border-secondary px-2 py-0.5">
                  3
                </span>
                Payment Protocol
              </h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border border-outline-variant/50 cursor-pointer bg-surface">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Encrypted Credit Card / Private Card"
                    checked={formData.paymentMethod === 'Encrypted Credit Card / Private Card'}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-medium">
                    Encrypted Credit Card / Centurion / Private Client Card
                  </span>
                </label>

                {formData.paymentMethod === 'Encrypted Credit Card / Private Card' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-surface-container-low border border-dashed border-outline-variant/40">
                    <div className="sm:col-span-2">
                      <label className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full bg-surface-container border border-outline-variant/40 p-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleChange}
                        className="w-full bg-surface-container border border-outline-variant/40 p-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-3 p-3 border border-outline-variant/50 cursor-pointer bg-surface">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Private Salon Bank Wire"
                    checked={formData.paymentMethod === 'Private Salon Bank Wire'}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-medium">
                    Private Atelier Wire Transfer (Paris BNP Paribas VIP Desk)
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-outline-variant/50 cursor-pointer bg-surface">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Concierge In-Person Payment at Salon Fitting"
                    checked={formData.paymentMethod === 'Concierge In-Person Payment at Salon Fitting'}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-medium">
                    Atelier Salon Fitting Invoice / Payment Upon Presentation
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Review & Order Trigger */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest p-space-md border border-[#E6D7B8] shadow-md">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-sm">
                Atelier Order Review
              </h3>

              <div className="divide-y divide-outline-variant/30 max-h-72 overflow-y-auto mb-space-sm pr-1">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-surface-container shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="font-medium text-primary truncate">{item.name}</p>
                      <span className="text-outline">
                        Size {item.size} &bull; {item.color} &times; {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-primary">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-outline-variant/30 pt-3 flex flex-col gap-1.5 text-xs text-on-surface-variant font-light">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-primary">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery:</span>
                  <span className="text-secondary font-medium">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost} USD`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bespoke Keepsake Box:</span>
                  <span className="text-secondary font-medium">Included</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-outline-variant/40 font-title-editorial text-primary font-semibold">
                  <span>Total Acquisition:</span>
                  <span className="font-headline-sm text-base text-primary">${total.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-secondary text-primary font-label-caps text-label-caps uppercase tracking-[0.2em] py-4 hover:bg-secondary-fixed transition-colors font-medium text-center shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Authenticating Order...' : 'Confirm Atelier Order'}
              </button>

              <div className="mt-4 text-center">
                <span className="font-label-sm text-[11px] text-outline">
                  By confirming, you authorize Maison Aurelle Paris to dispatch your garments according to international quiet luxury protocols.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
