import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { fallbackProducts } from '../data/fallbackProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProductById(id)
      .then((res) => {
        if (res.success && res.product) {
          setProduct(res.product);
          setSelectedColor(res.product.colors?.[0]?.name || 'Noir');
        } else {
          // Check fallback
          const found = fallbackProducts.find((p) => (p._id || p.id) === id) || fallbackProducts[0];
          setProduct(found);
          setSelectedColor(found.colors?.[0]?.name || 'Noir');
        }
      })
      .catch(() => {
        const found = fallbackProducts.find((p) => (p._id || p.id) === id) || fallbackProducts[0];
        setProduct(found);
        setSelectedColor(found.colors?.[0]?.name || 'Noir');
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-title-editorial text-lg text-primary">Accessing Atelier Archive...</p>
      </div>
    );
  }

  const inWish = isInWishlist(product._id || product.id);

  const handleAddBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const relatedProducts = fallbackProducts
    .filter((p) => (p._id || p.id) !== (product._id || product.id))
    .slice(0, 4);

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-label-caps uppercase tracking-widest text-outline mb-space-lg">
          <Link to="/" className="hover:text-primary">Maison</Link>
          <span>/</span>
          <Link to={`/catalog?category=${product.category}`} className="hover:text-primary">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary truncate">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-md">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-space-xs overflow-x-auto md:overflow-y-auto shrink-0">
              {(product.images || []).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 aspect-[3/4] border transition-all overflow-hidden ${
                    selectedImage === idx ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Primary Image Viewport */}
            <div className="relative flex-1 aspect-[3/4] bg-surface-container overflow-hidden shadow-sm">
              <img
                src={product.images?.[selectedImage] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-caps text-label-caps px-3 py-1 tracking-widest uppercase">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Garment Architecture & Ordering */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <span className="font-label-sm text-xs text-outline tracking-widest">
                  Atelier Code: #{product._id ? product._id.slice(-6).toUpperCase() : 'AUR901'}
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary tracking-tight mt-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-space-md mt-space-xs">
                <span className="font-headline-sm text-2xl text-primary font-medium tracking-tight">
                  ${product.price ? product.price.toLocaleString() : ''} USD
                </span>
                <span className="font-label-caps text-xs text-secondary-fixed-variant uppercase tracking-widest bg-secondary-fixed/30 px-2 py-0.5">
                  {product.subtitle || 'Como Origin'}
                </span>
              </div>

              <p className="font-body-md text-on-surface-variant font-light leading-relaxed mt-space-md mb-space-lg">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="border-t border-outline-variant/30 pt-space-md mb-space-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps text-xs uppercase tracking-wider text-on-surface">
                      Tonal Colorway: <strong className="text-primary font-semibold">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border transition-all ${
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

              {/* Size Selector */}
              <div className="border-t border-outline-variant/30 pt-space-md mb-space-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs uppercase tracking-wider text-on-surface">
                    Tailored Size: <strong className="text-primary font-semibold">{selectedSize}</strong>
                  </span>
                  <Link to="/concierge?tab=sizing" className="text-secondary font-label-caps text-[11px] uppercase tracking-wider hover:underline">
                    Atelier Sizing Guide &rarr;
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  {(product.sizes || ['36', '38', '40', '42']).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 font-label-md text-sm border transition-colors ${
                        selectedSize === size
                          ? 'bg-primary text-on-primary border-primary font-semibold'
                          : 'bg-surface-container text-primary border-transparent hover:border-outline'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-space-lg">
                <span className="font-label-caps text-xs uppercase tracking-wider text-on-surface">
                  Quantity:
                </span>
                <div className="flex items-center border border-outline-variant">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-10 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-label-sm font-semibold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-10 flex items-center justify-center text-primary hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Bag and Wishlist Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddBag}
                  className="w-full bg-secondary text-primary font-label-caps text-label-caps tracking-[0.2em] uppercase py-4 hover:bg-secondary-fixed transition-colors font-medium shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  {addedNotice ? 'Added to Bag ✓' : 'Add to Shopping Bag'}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="border border-outline-variant py-3 px-4 font-label-caps text-[11px] uppercase tracking-widest text-primary hover:border-secondary flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${inWish ? 'text-secondary fill-active' : 'text-outline'}`}>
                      favorite
                    </span>
                    {inWish ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>
                  <Link
                    to={`/concierge?service=Made to Measure Private Fitting&notes=${encodeURIComponent(product.name)}`}
                    className="border border-outline-variant py-3 px-4 font-label-caps text-[11px] uppercase tracking-widest text-primary hover:border-secondary flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">event</span>
                    Private Fitting
                  </Link>
                </div>
              </div>

              {/* Atelier Assurance Notice */}
              <div className="mt-space-md p-space-sm bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
                <span className="font-body-sm text-xs text-on-surface-variant font-light">
                  Complimentary white-glove courier shipping and archival wooden hanger included with this piece.
                </span>
              </div>
            </div>

            {/* Accordion Specification Tabs */}
            <div className="mt-space-xl border-t border-[#E6D7B8] pt-space-md">
              <div className="flex items-center border-b border-outline-variant/30 gap-6">
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`font-label-caps text-xs uppercase tracking-widest pb-3 border-b-2 transition-colors ${
                    activeTab === 'specifications' ? 'border-secondary text-primary font-semibold' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`font-label-caps text-xs uppercase tracking-widest pb-3 border-b-2 transition-colors ${
                    activeTab === 'details' ? 'border-secondary text-primary font-semibold' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Atelier Seamwork
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`font-label-caps text-xs uppercase tracking-widest pb-3 border-b-2 transition-colors ${
                    activeTab === 'shipping' ? 'border-secondary text-primary font-semibold' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Delivery &amp; Care
                </button>
              </div>

              <div className="py-space-md font-body-sm text-on-surface-variant text-sm font-light leading-relaxed">
                {activeTab === 'specifications' && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <dt className="text-xs uppercase font-label-caps text-outline">Fabric Provenance</dt>
                      <dd className="text-primary font-medium mt-0.5">{product.specifications?.fabric || 'Pure Natural Fibers'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase font-label-caps text-outline">Country of Origin</dt>
                      <dd className="text-primary font-medium mt-0.5">{product.specifications?.origin || 'Atelier Paris & Como'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase font-label-caps text-outline">Interior Finish</dt>
                      <dd className="text-primary font-medium mt-0.5">{product.specifications?.lining || 'Silk Piped'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase font-label-caps text-outline">Closure</dt>
                      <dd className="text-primary font-medium mt-0.5">{product.specifications?.closure || 'Bespoke Fasteners'}</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'details' && (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {(product.details || [
                      'Hand-finished seams executed by master tailors',
                      'Double-faced weave allowing unlined comfort and structured drape',
                      'Single-needle precision edge stitching',
                      'Finished in our Como and Paris salons'
                    ]).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      <strong>White-Glove Delivery:</strong> Ships within 24 to 48 hours in our signature rigid archive box with cedar sachets and garment protective sheath.
                    </p>
                    <p>
                      <strong>Returns &amp; Exchanges:</strong> Maison Aurelle accommodates complimentary returns within 30 days of client receipt.
                    </p>
                    <p>
                      <strong>Care Recommendation:</strong> {product.specifications?.care || 'Specialist dry cleaning only.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces Gallery */}
        <div className="mt-space-xl pt-space-xl border-t border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-lg">
            <div>
              <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
                Complete the Ensemble
              </span>
              <h3 className="font-headline-md text-primary mt-1">Harmonizing Silhouettes</h3>
            </div>
            <Link to="/catalog" className="font-label-caps text-xs uppercase tracking-widest text-primary hover:text-secondary">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {relatedProducts.map((rel) => (
              <Link
                key={rel._id || rel.id}
                to={`/product/${rel._id || rel.id}`}
                className="group flex flex-col bg-surface-container-lowest p-space-sm shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-space-sm">
                  <span className="font-label-caps text-[10px] text-outline uppercase">{rel.category}</span>
                  <h4 className="font-title-editorial text-sm text-primary group-hover:text-secondary transition-colors mt-0.5 truncate">
                    {rel.name}
                  </h4>
                  <span className="font-body-sm text-xs font-semibold text-primary mt-1 block">
                    ${rel.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
