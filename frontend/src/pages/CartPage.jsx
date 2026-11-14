import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    isFreeShipping,
    complimentaryShippingThreshold,
    total,
  } = useCart();

  const navigate = useNavigate();
  const [giftBox, setGiftBox] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const amountNeeded = complimentaryShippingThreshold - subtotal;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURELLE10' || promoCode.trim().toUpperCase() === 'VIP') {
      setPromoApplied(true);
    }
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  if (items.length === 0) {
    return (
      <div className="w-full bg-surface min-h-[70vh] flex flex-col items-center justify-center px-margin-mobile py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">
          shopping_bag
        </span>
        <h1 className="font-headline-md text-primary">Your Shopping Bag is Empty</h1>
        <p className="font-body-md text-on-surface-variant font-light mt-2 max-w-md">
          Explore our Autumn / Winter collection, sculpted from double-faced cashmere and mulberry silk in Como and Paris.
        </p>
        <Link
          to="/catalog"
          className="mt-6 bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 tracking-widest hover:bg-secondary transition-colors"
        >
          Discover the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Header */}
        <div className="border-b border-outline-variant/30 pb-space-md mb-space-lg flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
              Review Acquisition
            </span>
            <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1">
              Shopping Bag
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-outline hover:text-error font-label-caps text-xs uppercase tracking-wider self-start sm:self-auto"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-surface-container-low p-space-md mb-space-lg border border-outline-variant/30">
          <p className="font-body-sm text-sm text-on-surface">
            {isFreeShipping ? (
              <span className="text-secondary font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                You have unlocked Complimentary White-Glove Shipping &amp; Bespoke Keepsake Gift Box.
              </span>
            ) : (
              <span>
                Add <strong className="text-primary font-bold">${amountNeeded.toLocaleString()}</strong> more to receive Complimentary White-Glove Delivery.
              </span>
            )}
          </p>
        </div>

        {/* Main Grid: Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Items Table (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-outline-variant/30">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="py-space-md flex flex-col sm:flex-row gap-space-md">
                {/* 3:4 Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 sm:w-28 aspect-[3/4] object-cover bg-surface-container shrink-0 border border-outline-variant/20"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-title-editorial text-lg text-primary hover:text-secondary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="text-outline hover:text-error transition-colors p-1"
                        title="Remove piece"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs font-label-caps uppercase tracking-wider text-outline">
                      <span>Size: <strong className="text-primary font-semibold">{item.size}</strong></span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full inline-block border border-outline-variant"
                          style={{ backgroundColor: item.colorHex || '#0A1F44' }}
                        />
                        <strong className="text-primary font-semibold">{item.color}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-outline-variant/30">
                    <div className="flex items-center border border-outline-variant">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, -1)}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-label-sm font-semibold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-body-md text-base font-semibold text-primary">
                        ${(item.price * item.quantity).toLocaleString()} USD
                      </span>
                      {item.quantity > 1 && (
                        <span className="font-label-sm text-xs text-outline block">
                          (${item.price.toLocaleString()} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Gift Box Option */}
            <div className="py-space-md flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftBox}
                  onChange={(e) => setGiftBox(e.target.checked)}
                  className="accent-primary w-4 h-4"
                />
                <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold">
                  Complimentary Bespoke Gift Box &amp; Calligraphed Note Card
                </span>
              </label>
              {giftBox && (
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter your personal gift message to be hand-penned on Maison Aurelle parchment..."
                  rows="2"
                  className="w-full bg-surface-container-low p-space-sm border border-outline-variant/40 text-xs font-body-sm focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Order Summary (Right 4 cols) */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-space-lg border border-[#E6D7B8] shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">Order Summary</h3>

            <div className="flex flex-col gap-space-xs text-sm font-body-sm text-on-surface-variant border-b border-outline-variant/30 pb-space-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-primary">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="font-medium text-primary">{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
              </div>
              {giftBox && (
                <div className="flex justify-between text-secondary">
                  <span>Atelier Gift Packaging</span>
                  <span>Complimentary</span>
                </div>
              )}
              {promoApplied && (
                <div className="flex justify-between text-secondary font-medium">
                  <span>VIP Privileged Client (10%)</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-space-xs border-b border-outline-variant/30">
              <span className="font-title-editorial text-lg text-primary font-medium">Estimated Total</span>
              <span className="font-headline-sm text-xl text-primary font-semibold">
                ${finalTotal.toLocaleString()} USD
              </span>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Client Privilege Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2 text-xs font-label-caps uppercase tracking-wider focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary font-label-caps text-xs uppercase px-4 py-2 hover:bg-secondary transition-colors"
              >
                Apply
              </button>
            </form>
            {promoApplied && (
              <span className="text-secondary text-xs font-label-sm">
                Privilege code successfully applied to salon order.
              </span>
            )}

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-secondary text-primary font-label-caps text-label-caps uppercase tracking-[0.2em] py-4 hover:bg-secondary-fixed transition-colors font-medium text-center shadow-md mt-2"
            >
              Proceed to Bespoke Checkout
            </button>

            <Link
              to="/catalog"
              className="text-center font-label-caps text-[11px] uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              &larr; Continue Exploring Collection
            </Link>

            <div className="pt-space-sm border-t border-outline-variant/30 flex items-center justify-around text-outline text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">lock</span> Encrypted
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> Guaranteed
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">autorenew</span> 30-Day Return
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
