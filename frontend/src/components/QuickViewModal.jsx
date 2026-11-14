import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
  );
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-3xl w-full p-space-md sm:p-space-lg relative shadow-2xl flex flex-col md:flex-row gap-space-lg max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-1 z-10"
          type="button"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* 3:4 Editorial Image Frame */}
        <div className="md:w-1/2 aspect-[3/4] bg-surface-container overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover object-center"
            src={(product.images && product.images[0]) || ''}
            alt={product.name}
          />
        </div>

        {/* Details & Actions */}
        <div className="md:w-1/2 flex flex-col justify-between pt-space-xs">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block">
              {product.category} &bull; {product.subtitle || 'Atelier Exclusive'}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary mt-1 leading-snug">
              {product.name}
            </h3>
            <p className="font-body-md text-body-md text-primary font-medium mt-1 mb-space-sm">
              ${product.price ? product.price.toLocaleString() : ''} USD
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed mb-space-md">
              {product.description}
            </p>

            {/* Color swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-space-md">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block mb-2">
                  Color: <span className="text-primary font-medium">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor === c.name
                          ? 'ring-2 ring-secondary ring-offset-2 scale-110'
                          : 'border-outline-variant opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector buttons */}
            <div className="mb-space-md">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant block mb-2">
                Select Size
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {(product.sizes || ['36', '38', '40', '42']).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[40px] h-10 px-3 font-label-sm text-label-sm border transition-colors ${
                      selectedSize === size
                        ? 'bg-primary text-on-primary border-primary font-semibold'
                        : 'bg-surface-container text-primary border-transparent hover:border-outline'
                    }`}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-secondary text-primary font-label-caps text-label-caps uppercase tracking-widest py-4 hover:bg-secondary-fixed transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {added ? 'check' : 'shopping_bag'}
              </span>
              {added ? 'Added to Bag' : 'Add to Shopping Bag'}
            </button>
            <Link
              to={`/product/${product._id || product.id}`}
              onClick={onClose}
              className="text-center font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary py-2 transition-colors border-b border-transparent hover:border-outline"
            >
              View Full Atelier Specifications &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
