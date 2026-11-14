import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    isFreeShipping,
    complimentaryShippingThreshold,
    shippingCost,
    total,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progressToFreeShipping = Math.min(100, Math.round((subtotal / complimentaryShippingThreshold) * 100));
  const amountNeeded = complimentaryShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary-container/40 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-[#E6D7B8] flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-space-md border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="font-title-editorial text-headline-sm text-primary">Shopping Bag</span>
              <span className="font-label-caps text-label-caps text-outline uppercase">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
              aria-label="Close Shopping Bag"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="bg-surface-container-low px-space-md py-3 border-b border-outline-variant/20">
            <p className="font-body-sm text-xs text-on-surface-variant">
              {isFreeShipping ? (
                <span className="text-secondary font-medium">
                  &check; You have unlocked Complimentary White-Glove Shipping &amp; Bespoke Gift Box
                </span>
              ) : (
                <>
                  Add <span className="font-medium text-primary">${amountNeeded.toLocaleString()}</span> more for Complimentary White-Glove Shipping
                </>
              )}
            </p>
            <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-secondary h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Bag Items List */}
          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30 p-space-md">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-outline-variant">
                  shopping_bag
                </span>
                <p className="font-title-editorial text-lg text-primary">Your shopping bag is empty</p>
                <p className="font-body-sm text-on-surface-variant text-xs max-w-xs font-light">
                  Explore our Autumn / Winter collection crafted from double-faced cashmere and mulberry silk.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/catalog');
                  }}
                  className="mt-2 bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 tracking-widest hover:bg-secondary transition-colors"
                >
                  Discover Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="py-4 flex gap-4">
                  {/* Thumbnail 3:4 */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-center bg-surface-container shrink-0 border border-outline-variant/20"
                  />
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-title-editorial text-sm text-primary font-medium leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size, item.color)}
                          className="text-outline hover:text-error transition-colors p-0.5"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant font-light">
                        <span>Size: <strong className="font-medium text-primary">{item.size}</strong></span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-outline-variant"
                            style={{ backgroundColor: item.colorHex || '#0A1F44' }}
                          />
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-outline-variant/40">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-outline-variant">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, -1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-label-sm text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-body-md text-sm font-semibold text-primary">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-space-md bg-surface-container-lowest border-t border-[#E6D7B8] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Estimated Atelier Packaging:</span>
                <span className="text-secondary font-medium">Complimentary Archive Box</span>
              </div>
              <div className="flex items-center justify-between font-label-caps text-xs uppercase tracking-wider text-outline">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/30">
                <span className="font-title-editorial text-base text-primary">Subtotal</span>
                <span className="font-headline-sm text-lg text-primary font-semibold">
                  ${total.toLocaleString()} USD
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-secondary text-primary font-label-caps text-label-caps uppercase tracking-widest py-4 hover:bg-secondary-fixed transition-colors font-medium text-center shadow-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full border border-primary text-primary font-label-caps text-[11px] uppercase tracking-widest py-3 hover:bg-primary hover:text-on-primary transition-colors text-center"
                >
                  View Full Shopping Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
