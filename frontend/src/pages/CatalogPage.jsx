import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { fallbackProducts } from '../data/fallbackProducts';
import { useWishlist } from '../context/WishlistContext';
import { QuickViewModal } from '../components/QuickViewModal';

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter') || '';

  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(3500);
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = [
    'All',
    'New In',
    'Ready to Wear',
    'Dresses',
    'Knitwear & Outerwear',
    'Accessories',
  ];

  const materials = ['All', 'Cashmere', 'Silk', 'Wool', 'Calfskin'];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    api.getProducts({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      sort: sortBy,
    })
      .then((res) => {
        if (res.success && res.products && res.products.length > 0) {
          setProducts(res.products);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, [selectedCategory, sortBy]);

  // Client-side filtering for wishlist, price, and material
  const filteredProducts = products.filter((p) => {
    if (filterParam === 'wishlist') {
      const isWish = wishlist.some((w) => (w._id || w.id) === (p._id || p.id));
      if (!isWish) return false;
    }
    if (p.price > priceMax) return false;
    if (selectedMaterial !== 'All') {
      const mat = selectedMaterial.toLowerCase();
      const match =
        p.name.toLowerCase().includes(mat) ||
        p.subtitle.toLowerCase().includes(mat) ||
        p.description.toLowerCase().includes(mat) ||
        (p.specifications?.fabric && p.specifications.fabric.toLowerCase().includes(mat));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Page Header */}
        <div className="border-b border-outline-variant/30 pb-space-lg mb-space-lg">
          <div className="flex items-center gap-2 text-secondary font-label-caps text-xs tracking-[0.2em] uppercase">
            <Link to="/" className="hover:text-primary">Maison</Link>
            <span>/</span>
            <span>{filterParam === 'wishlist' ? 'Client Wishlist' : 'Atelier Catalog'}</span>
          </div>
          <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-2">
            {filterParam === 'wishlist' ? 'Your Saved Atelier Pieces' : selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
          </h1>
          <p className="font-body-md text-on-surface-variant font-light mt-1 max-w-2xl">
            {filterParam === 'wishlist'
              ? 'Silhouettes curated by your personal discernment. Ready for acquisition or salon trial.'
              : 'Sculptural silhouettes and unlined double-faced tailoring woven from natural fibers in Lake Como and Biella.'}
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg bg-surface-container-low p-space-md">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchParams({ category: cat });
                }}
                className={`font-label-caps text-label-caps uppercase tracking-wider px-3.5 py-2 transition-all whitespace-nowrap ${
                  selectedCategory === cat && filterParam !== 'wishlist'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface hover:bg-surface-container text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
            {wishlist.length > 0 && (
              <button
                onClick={() => setSearchParams({ filter: 'wishlist' })}
                className={`font-label-caps text-label-caps uppercase tracking-wider px-3.5 py-2 transition-all whitespace-nowrap flex items-center gap-1 ${
                  filterParam === 'wishlist'
                    ? 'bg-secondary text-primary font-bold'
                    : 'bg-surface hover:bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">favorite</span>
                Wishlist ({wishlist.length})
              </button>
            )}
          </div>

          {/* Sort & Quick Selectors */}
          <div className="flex items-center gap-space-md flex-wrap">
            {/* Material */}
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-outline uppercase">Fabric:</span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-surface text-primary border border-outline-variant/50 px-2 py-1.5 font-label-sm text-xs focus:outline-none"
              >
                {materials.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-outline uppercase">Under:</span>
              <span className="font-label-sm text-xs text-primary font-semibold">${priceMax}</span>
              <input
                type="range"
                min="500"
                max="3500"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-24 accent-primary"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-outline uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface text-primary border border-outline-variant/50 px-2 py-1.5 font-label-sm text-xs focus:outline-none"
              >
                <option value="featured">Atelier Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-5xl text-outline-variant">
              filter_list_off
            </span>
            <h3 className="font-title-editorial text-2xl text-primary">No silhouettes match these criteria</h3>
            <p className="font-body-sm text-on-surface-variant max-w-sm font-light">
              Try adjusting your price ceiling or selecting all categories to view the broader atelier archive.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setPriceMax(3500);
                setSelectedMaterial('All');
                setSearchParams({});
              }}
              className="mt-2 bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 tracking-widest hover:bg-secondary transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredProducts.map((product) => {
              const inWish = isInWishlist(product._id || product.id);

              return (
                <div
                  key={product._id || product.id}
                  className="group flex flex-col bg-surface-container-lowest p-space-sm shadow-sm hover:shadow-md transition-all duration-300 relative"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`font-label-caps text-[10px] px-2.5 py-1 tracking-widest uppercase ${
                          product.badge === 'New Season'
                            ? 'bg-secondary text-primary font-semibold'
                            : product.badge === 'Bespoke Knit'
                            ? 'bg-surface-container-highest text-primary'
                            : 'bg-primary text-on-primary'
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist toggle */}
                  <button
                    aria-label="Save to Wishlist"
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center transition-colors ${
                      inWish ? 'text-secondary' : 'text-outline hover:text-secondary'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${inWish ? 'fill-active' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* 3:4 Image Frame */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      src={product.images[0]}
                      alt={product.name}
                    />
                    {/* Quick view button */}
                    <div className="absolute inset-x-0 bottom-0 p-space-sm bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        className="w-full bg-surface/95 text-primary font-label-caps text-label-caps uppercase tracking-widest py-3 hover:bg-secondary hover:text-primary transition-colors shadow-md"
                        onClick={() => setQuickViewProduct(product)}
                        type="button"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-space-md pb-space-xs flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                        {product.category}
                      </span>
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c, idx) => (
                            <span
                              key={c.name}
                              className={`w-3.5 h-3.5 rounded-full shadow-sm ${
                                idx === 0 ? 'ring-1 ring-primary/20' : ''
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/product/${product._id || product.id}`}
                      className="font-title-editorial text-body-md text-primary hover:text-secondary transition-colors mt-space-xs line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-space-sm pt-space-xs flex items-center justify-between">
                      <span className="font-body-md text-body-md text-primary font-medium tracking-tight">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                        {product.subtitle || 'Atelier'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
