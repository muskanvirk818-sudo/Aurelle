import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuickViewModal } from '../components/QuickViewModal';
import { api } from '../services/api';
import { fallbackProducts } from '../data/fallbackProducts';

export const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState(fallbackProducts);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    // Fetch products from backend or retain fallback
    api.getProducts({ curated: 'true' })
      .then((res) => {
        if (res.success && res.products && res.products.length > 0) {
          setProducts(res.products);
        }
      })
      .catch((err) => console.log('Using local catalog for homepage:', err));
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await api.subscribeNewsletter(newsletterEmail);
      setNewsletterSubscribed(true);
    } catch {
      setNewsletterSubscribed(true);
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          HERO SECTION: Bleeds under header with negative margin
          ========================================================================= */}
      <section className="relative w-full -mt-20 overflow-hidden bg-primary min-h-[942px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 transition-transform duration-1000 ease-out"
          id="hero-bg"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFMzzZWtiDQoU6gBZjDYPKUfshxqT4KOmtCGvpPBgPsLjvlrYR5YT9r-NL2RFUtimew9C4FWmNE_K0mNjqpdNOvrii3cf8sRF-mcVhDg4WoewEkLRpX_v5dAPTvr88ZAB28Q7MOt0yqgtNUSthpyT_udipRopGIDn9peDjwIW7GS_-TcdzmBKTDcxMhpptLhViHEx7Cb-_k2r_pfPEHa_R2oKdyNfq7kx84VHwmX2WOC0JKMGD-k0gPQ')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin pt-36 pb-space-xl flex flex-col items-start">
          <div className="flex items-center gap-space-sm mb-space-md">
            <span className="w-8 h-[1px] bg-secondary-fixed" />
            <span className="font-label-caps text-label-caps tracking-[0.25em] uppercase text-secondary-fixed">
              Edition N° 09 — Paris • Como
            </span>
          </div>

          <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-surface-container-lowest max-w-3xl leading-[1.08] tracking-tight">
            The Art of Quiet Distinction
            <span className="block font-title-editorial italic text-secondary-fixed text-headline-md md:text-headline-lg font-light mt-space-xs">
              Autumn / Winter Collection
            </span>
          </h1>

          <p className="font-body-lg text-body-md md:text-body-lg text-surface-variant/90 max-w-xl mt-space-md mb-space-lg font-light leading-relaxed">
            Crafted from double-faced cashmere and mulberry silk in our Como ateliers. Sculptural silhouettes designed for enduring permanence.
          </p>

          <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center bg-secondary text-primary font-label-caps text-label-caps tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:bg-secondary-fixed hover:shadow-lg shadow-black/20 text-center"
            >
              Shop the Collection
            </Link>
            <Link
              to="/lookbook"
              className="inline-flex items-center justify-center bg-surface/10 backdrop-blur-md text-surface font-label-caps text-label-caps tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:bg-surface hover:text-primary shadow-sm text-center"
            >
              Explore Lookbook
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-between w-full mt-space-xl pt-space-md">
            <div className="flex items-center gap-space-xl text-surface-variant/70 font-label-sm text-label-sm uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" /> Como Mill Silk No. 4
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" /> Pure Mongolian Cashmere
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" /> Limited Atelier Edition
              </span>
            </div>
            <div className="flex items-center gap-2 text-secondary-fixed">
              <span className="font-label-caps text-label-caps tracking-widest text-surface/80">Scroll</span>
              <span className="material-symbols-outlined text-[18px] animate-bounce">arrow_downward</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ATELIER MANIFESTO STRIP
          ========================================================================= */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
            <div className="md:col-span-3">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary">
                Philosophy of Form
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mt-space-xs">
                Restrained Grandeur.
              </h3>
            </div>
            <div className="md:col-span-9 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant font-light max-w-2xl leading-relaxed">
                We abandon seasonal ephemerality. Each garment is treated as an architectural commission, carved in heavy natural weaves and finished with invisible couture seamwork.
              </p>
              <div className="flex items-center gap-space-sm self-start md:self-auto">
                <span className="font-title-editorial italic text-headline-sm text-secondary">Aurelle</span>
                <span className="font-label-sm text-label-sm text-outline tracking-widest uppercase">Atelier Paris</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED CATEGORIES: High-fashion asymmetric editorial grid
          ========================================================================= */}
      <section className="w-full bg-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary">
                Autumn / Winter Matrix
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary tracking-tight mt-space-xs">
                Signature Disciplines
              </h2>
            </div>
            <Link
              to="/catalog"
              className="group inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-primary hover:text-secondary transition-colors"
            >
              View Complete Catalog
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Category 1: New Arrivals (Large editorial anchor) */}
            <Link
              to="/catalog?category=Ready to Wear"
              className="group relative md:col-span-6 overflow-hidden bg-surface-container flex flex-col justify-end min-h-[520px] p-space-lg shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgSL8qlgwKvl3_S-7jL_001lYsz7wIWtO42-j2NEFIeUaOJeXX4LrPlsJycg8Z8TttTUu-qQlpDYzZumU1uhnwN2YGzb2AaQA8e-b02gRPnzVoNd-D47MFy3Z2AnFjC5ytD23QvAKAiT9KtUr2kHdG8Mq-qJvRCt0-v8fsx0Dd0Hkt5eSaexwBezK11gSTRvp5alhkKZWAG4wD2koOMKwav6_Q8J7Yb99q--40t2GgZQ6Zi4uFf67RsQ')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-secondary-fixed">
                  Couture Tailoring
                </span>
                <div className="w-12 h-[2px] bg-secondary-fixed my-space-xs transition-all duration-300 group-hover:w-20" />
                <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                  New Arrivals
                </h3>
                <p className="font-body-sm text-body-sm text-surface-variant/80 max-w-sm mt-1 mb-space-sm font-light">
                  Structured midnight wools, sharp architectural shoulders, and precision darting.
                </p>
                <div className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed group-hover:text-surface-container-lowest transition-colors">
                  <span>Discover Collection</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                    east
                  </span>
                </div>
              </div>
            </Link>

            {/* Category 2: Timeless Cashmere */}
            <Link
              to="/catalog?category=Knitwear & Outerwear"
              className="group relative md:col-span-6 overflow-hidden bg-surface-container flex flex-col justify-end min-h-[520px] p-space-lg shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPW4pnkmWwhL5ewSzyDMCPocXPLxoAuL3nw_SWFYcskHwkj7oCynl0P3DqJKX277TyCCq7UeLatZG-yR8uIQr84rPOb51LOkdi2uyuDDPIjzRbuR4Pcku-EYA3baqN_BzvK9UiaTjQ0Rfnx3_-LTIOSIpuiut4Kbb8ZVRB950Hpb8MpnzI1S4wTkrJ21f_dINMm_yEvBXKSPvwqnwdgMZrr4mczdqz1QO64cE5tvwr0Xi-KdHP628mKQ')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-secondary-fixed">
                  Knitwear Atelier
                </span>
                <div className="w-12 h-[2px] bg-secondary-fixed my-space-xs transition-all duration-300 group-hover:w-20" />
                <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                  Timeless Cashmere
                </h3>
                <p className="font-body-sm text-body-sm text-surface-variant/80 max-w-sm mt-1 mb-space-sm font-light">
                  Undyed grade-A Mongolian cashmere spun into cloud-soft ribbed textures.
                </p>
                <div className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed group-hover:text-surface-container-lowest transition-colors">
                  <span>Discover Collection</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                    east
                  </span>
                </div>
              </div>
            </Link>

            {/* Category 3: Evening Silks */}
            <Link
              to="/catalog?category=Dresses"
              className="group relative md:col-span-7 overflow-hidden bg-surface-container flex flex-col justify-end min-h-[440px] p-space-lg shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYILEgklsdDZULorWSswiuLMn0E0-SD-mhrxWpgp-R8V55FPWY12M69cpSAvDJlQMmBg0cY9bxw1UZPNarjp4SP2GrV62Mc2cJ-V88_Wf5pHtO7OSZG4L1SXupoD7mBqJvDXkhmOg9pw4U71BDVPaPTHi_qx5-QanOfMVT95-fRKwIBrrDDmS3aXvmgmGFilqhjnqU6YofBlU463cOJHCg7C4INv2vJrCw-qg5idm3Yf1opQ8stNSljQ')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-secondary-fixed">
                  Formal Grandeur
                </span>
                <div className="w-12 h-[2px] bg-secondary-fixed my-space-xs transition-all duration-300 group-hover:w-20" />
                <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                  Evening Silks
                </h3>
                <p className="font-body-sm text-body-sm text-surface-variant/80 max-w-md mt-1 mb-space-sm font-light">
                  Bias-cut floor-skimming gowns and liquid satin separates woven in Lake Como.
                </p>
                <div className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed group-hover:text-surface-container-lowest transition-colors">
                  <span>Discover Collection</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                    east
                  </span>
                </div>
              </div>
            </Link>

            {/* Category 4: Bespoke Accessories */}
            <Link
              to="/catalog?category=Accessories"
              className="group relative md:col-span-5 overflow-hidden bg-surface-container flex flex-col justify-end min-h-[440px] p-space-lg shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR3aw0OraHC5YTKBLNLO8nTJWSsuZPpubfRbi4ED9UxATeUY58hXjt7NcGd459p7I48E1kNu7L6pK9fmZ1DEfAseghy3-Sg5qXn0wES9xj9rUmqpdGgCXn3ypd6dXJUxoMgcoz3EkdzwkxzUP6grXKo-dvULyrUNgQUZMLhQ0MkeiOljDXMNo2vytGbB08bgL0bEC6ZF_TLgJyNVdGo8FlRYURLvK48O6IcZsnovTc_ZLPUQYJEqJC8g')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-secondary-fixed">
                  Leather Goods &amp; Jewels
                </span>
                <div className="w-12 h-[2px] bg-secondary-fixed my-space-xs transition-all duration-300 group-hover:w-20" />
                <h3 className="font-headline-md text-headline-md text-surface-container-lowest">
                  Bespoke Accessories
                </h3>
                <p className="font-body-sm text-body-sm text-surface-variant/80 max-w-xs mt-1 mb-space-sm font-light">
                  Hand-buffed box calf leathers and cast-brass jewelry with matte gold leaf.
                </p>
                <div className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed group-hover:text-surface-container-lowest transition-colors">
                  <span>Discover Collection</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                    east
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CURATED EDITOR'S PICKS PRODUCT GRID
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps uppercase tracking-[0.2em]">
                <span>Curated Selection</span>
                <span>•</span>
                <span>Atelier Core</span>
              </div>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary tracking-tight mt-space-xs">
                Editor's Selected Pieces
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-md">
              A definitive capsule of silhouettes embodying quiet craftsmanship, rendered in finite quantities for discerning collectors.
            </p>
          </div>

          {/* Products 4-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.slice(0, 4).map((product) => {
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

                  {/* Save to Wishlist Button */}
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
                    {/* Quick View overlay button on hover */}
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

                  {/* Product Details */}
                  <div className="pt-space-md pb-space-xs flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                        {product.category}
                      </span>
                      {/* Color Swatches */}
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
                        {product.subtitle || 'Atelier Pure'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atelier Service Callout Strip */}
          <div className="mt-space-xl grid grid-cols-1 sm:grid-cols-3 gap-space-md bg-surface-container p-space-lg">
            <div className="flex items-start gap-space-md">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">verified</span>
              <div>
                <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
                  Made to Measure Available
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light mt-1">
                  Private fitting appointments at our Paris &amp; Milan salons.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-md">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">nest_eco_leaf</span>
              <div>
                <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
                  Certified Traceable Fibers
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light mt-1">
                  100% verified natural provenance from regenerative origins.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-md">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">local_shipping</span>
              <div>
                <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
                  White-Glove Delivery
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light mt-1">
                  Presented in our keepsake archive box with cedar sachet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BRAND STORY TEASER STRIP: Editorial split layout
          ========================================================================= */}
      <section className="w-full bg-primary-container text-surface overflow-hidden py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Visual Storytelling Image Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT3QQf-GGrZDzvHTeEbufAfzoC-BBbMRxCiNfZPUSUdfyz5UAc8AMei5XfbA6YFVUPONlMxBxUj1ZO9lDCHTDmnCsH1swDdTtM-48eeD4bJdnbk5sFJmtmQx61twSpMpcPnOsCh6K49JfucmLBHtUvIE4dl9a_fbDsUDHWqgvs61DSoT5A9Yo2TsZlOZ4tKneUaEft2cAXRxsI4HuATXfHC64qHBo9JsP1nJpzFHB0NWJXq4RjVyZilA"
                  alt="Artisan sewing coat"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/60 via-transparent to-transparent" />
              </div>
              {/* Editorial Floating Label */}
              <div className="absolute -bottom-6 -right-4 md:right-8 bg-secondary text-primary px-space-md py-space-sm shadow-xl flex items-center gap-space-sm">
                <span className="font-title-editorial italic text-headline-sm font-semibold">1928</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest leading-none">
                  Couture Heritage<br />Como • Paris
                </span>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 flex flex-col items-start lg:pl-space-lg">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <span className="w-6 h-[1px] bg-secondary-fixed" />
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-secondary-fixed">
                  The Aurelle Manifesto
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-surface-bright leading-tight tracking-tight">
                Timeless Sovereignty.<br />
                <span className="font-title-editorial italic text-secondary-fixed font-light">
                  No Trends. Pure Permanence.
                </span>
              </h2>
              <p className="font-body-lg text-body-md md:text-body-lg text-surface-variant/90 font-light mt-space-md mb-space-md leading-relaxed">
                In an era obsessed with velocity, Aurelle champions the deliberate cadence of slow craft. Every silhouette is tested through dozens of iterations, ensuring garments that gracefully survive decades in your wardrobe rather than weeks.
              </p>
              <p className="font-body-sm text-body-sm text-surface-variant/70 font-light mb-space-lg leading-relaxed">
                Our Como silk ateliers and Biella wool spinners cultivate relationships spanning four generations, preserving ancient hand-finishing traditions that machines can never replicate.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-space-sm font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary-fixed hover:text-surface-bright transition-colors"
              >
                <span>Learn Our Story • Read the Heritage Journal</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1.5">
                  east
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIP CIRCLE / NEWSLETTER SUBSCRIPTION CARD
          ========================================================================= */}
      <section className="w-full bg-surface py-space-xl">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin">
          <div className="bg-secondary-fixed/40 p-space-lg md:p-space-xl relative overflow-hidden shadow-sm">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary">
                By Invitation Only
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-space-xs mb-space-sm tracking-tight">
                Join the Aurelle Circle
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-space-lg">
                Receive private salon invitations, private trunk show lookbook previews, and curated atelier releases directly to your correspondence.
              </p>

              {newsletterSubscribed ? (
                <div className="p-space-md bg-surface-container-lowest text-primary font-title-editorial italic text-headline-sm border border-secondary/30">
                  Thank you. Your salon invitation has been addressed.
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="w-full flex flex-col sm:flex-row items-stretch gap-space-xs"
                >
                  <div className="relative flex-grow">
                    <input
                      className="w-full bg-surface-container-lowest text-primary placeholder:text-outline px-space-md py-4 font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all"
                      placeholder="Enter your email address"
                      required
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-primary text-on-primary font-label-caps text-label-caps tracking-[0.18em] uppercase px-8 py-4 hover:bg-primary-container transition-colors shrink-0"
                    type="submit"
                    disabled={newsletterLoading}
                  >
                    {newsletterLoading ? 'Addressing...' : 'Request Access'}
                  </button>
                </form>
              )}

              <div className="flex items-center gap-space-lg mt-space-md text-outline font-label-sm text-label-sm flex-wrap justify-center">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock</span> Encrypted • Discretion Assured
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">event</span> Bi-Weekly Atelier Notes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
