import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fallbackProducts } from '../data/fallbackProducts';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const q = searchTerm.toLowerCase();
    const matches = fallbackProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(matches);
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleQuickTag = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary-container/80 backdrop-blur-md flex flex-col items-center justify-start pt-16 px-margin-mobile md:px-margin animate-fadeIn">
      <div className="w-full max-w-4xl bg-surface p-space-md md:p-space-lg shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-2"
          aria-label="Close search"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Search Header */}
        <div className="mb-space-md">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary">
            Atelier Archive Search
          </span>
          <h2 className="font-headline-sm text-headline-sm text-primary mt-1">
            Search Collections &amp; Silhouettes
          </h2>
        </div>

        {/* Input Bar */}
        <div className="relative border-b-2 border-primary flex items-center pb-2">
          <span className="material-symbols-outlined text-2xl text-outline mr-2">search</span>
          <input
            type="text"
            placeholder="Search by garment, fabric (cashmere, silk), or silhouette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent font-title-editorial text-lg md:text-xl text-primary placeholder:text-outline/70 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-outline hover:text-primary text-xs uppercase font-label-caps ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Tag Recommendations */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="font-label-sm text-xs text-outline uppercase tracking-wider">Suggested:</span>
          {['Cashmere', 'Mulberry Silk', 'Double-Breasted', 'Tote', 'Blazer', 'Trousers'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className="px-2.5 py-1 bg-surface-container hover:bg-secondary-fixed/50 text-xs font-label-sm text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live Results Display */}
        <div className="mt-space-md max-h-[50vh] overflow-y-auto divide-y divide-outline-variant/30">
          {searchTerm && results.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant font-light text-sm">
              No pieces match "{searchTerm}". Try exploring our{' '}
              <button
                onClick={() => {
                  onClose();
                  navigate('/catalog');
                }}
                className="text-secondary underline underline-offset-4"
              >
                complete catalog
              </button>
              .
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product._id}
                onClick={() => handleSelectProduct(product._id)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-surface-container-low px-2 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-16 object-cover object-center bg-surface-container shrink-0"
                  />
                  <div>
                    <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest block">
                      {product.category}
                    </span>
                    <h4 className="font-title-editorial text-base text-primary group-hover:text-secondary transition-colors">
                      {product.name}
                    </h4>
                    <span className="font-body-sm text-xs text-outline font-light">
                      {product.subtitle}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-body-md text-sm font-semibold text-primary block">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="font-label-caps text-[10px] text-secondary-fixed-variant uppercase tracking-wider">
                    View Piece &rarr;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
