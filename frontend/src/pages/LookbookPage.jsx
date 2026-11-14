import React from 'react';
import { Link } from 'react-router-dom';

export const LookbookPage = () => {
  const lookbookChapters = [
    {
      edition: 'LOOK 01',
      title: 'The Courtyard Encounter',
      subtitle: 'Double-Faced Cashmere & Mulberry Slip',
      description: 'Captured in the stone cloister of Saint-Germain-des-Prés at dusk. An immaculate double-breasted navy cashmere coat draped over liquid champagne silk.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFMzzZWtiDQoU6gBZjDYPKUfshxqT4KOmtCGvpPBgPsLjvlrYR5YT9r-NL2RFUtimew9C4FWmNE_K0mNjqpdNOvrii3cf8sRF-mcVhDg4WoewEkLRpX_v5dAPTvr88ZAB28Q7MOt0yqgtNUSthpyT_udipRopGIDn9peDjwIW7GS_-TcdzmBKTDcxMhpptLhViHEx7Cb-_k2r_pfPEHa_R2oKdyNfq7kx84VHwmX2WOC0JKMGD-k0gPQ',
      products: [
        { name: 'The Sévérine Double-Breasted Wool Coat', id: '675000000000000000000001', price: '$2,450' },
        { name: 'The Atelier Silk Crêpe Slip Gown', id: '675000000000000000000002', price: '$1,680' },
      ],
    },
    {
      edition: 'LOOK 02',
      title: 'Monolithic Poise',
      subtitle: 'Barathea Wool Architectural Tailoring',
      description: 'Statuesque tailoring cut from dense English barathea wool. Roped shoulders echoing classical Roman columns with razor-sharp darting.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgSL8qlgwKvl3_S-7jL_001lYsz7wIWtO42-j2NEFIeUaOJeXX4LrPlsJycg8Z8TttTUu-qQlpDYzZumU1uhnwN2YGzb2AaQA8e-b02gRPnzVoNd-D47MFy3Z2AnFjC5ytD23QvAKAiT9KtUr2kHdG8Mq-qJvRCt0-v8fsx0Dd0Hkt5eSaexwBezK11gSTRvp5alhkKZWAG4wD2koOMKwav6_Q8J7Yb99q--40t2GgZQ6Zi4uFf67RsQ',
      products: [
        { name: 'The Sorbonne Architectural Navy Blazer', id: '675000000000000000000005', price: '$1,850' },
        { name: 'The Como High-Waisted Tailored Trouser', id: '675000000000000000000006', price: '$920' },
      ],
    },
    {
      edition: 'LOOK 03',
      title: 'Tactile Warmth',
      subtitle: '7-Gauge Undyed Mongolian Cashmere',
      description: 'An intimate study in raw texture. High ribbed neckline spun from unbleached fibers cultivated sustainably by pastoral cooperatives.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPW4pnkmWwhL5ewSzyDMCPocXPLxoAuL3nw_SWFYcskHwkj7oCynl0P3DqJKX277TyCCq7UeLatZG-yR8uIQr84rPOb51LOkdi2uyuDDPIjzRbuR4Pcku-EYA3baqN_BzvK9UiaTjQ0Rfnx3_-LTIOSIpuiut4Kbb8ZVRB950Hpb8MpnzI1S4wTkrJ21f_dINMm_yEvBXKSPvwqnwdgMZrr4mczdqz1QO64cE5tvwr0Xi-KdHP628mKQ',
      products: [
        { name: 'The Meribel Pure Cashmere Turtleneck', id: '675000000000000000000003', price: '$890' },
      ],
    },
    {
      edition: 'LOOK 04',
      title: 'Salon Evening Movement',
      subtitle: 'Liquid Satin Bias-Cut Gowns',
      description: 'Captured mid-motion across antique Parisian herringbone parquetry. Deep sapphire silk catching the amber warmth of candlelight.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYILEgklsdDZULorWSswiuLMn0E0-SD-mhrxWpgp-R8V55FPWY12M69cpSAvDJlQMmBg0cY9bxw1UZPNarjp4SP2GrV62Mc2cJ-V88_Wf5pHtO7OSZG4L1SXupoD7mBqJvDXkhmOg9pw4U71BDVPaPTHi_qx5-QanOfMVT95-fRKwIBrrDDmS3aXvmgmGFilqhjnqU6YofBlU463cOJHCg7C4INv2vJrCw-qg5idm3Yf1opQ8stNSljQ',
      products: [
        { name: 'The Opéra Sculptural Column Evening Gown', id: '675000000000000000000008', price: '$2,890' },
        { name: 'The Vendôme Hand-Hammered Gold Choker', id: '675000000000000000000007', price: '$780' },
      ],
    },
  ];

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Lookbook Title */}
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <div className="flex items-center justify-center gap-space-sm mb-space-xs">
            <span className="w-8 h-[1px] bg-secondary" />
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.25em]">
              Editorial Portfolio
            </span>
            <span className="w-8 h-[1px] bg-secondary" />
          </div>
          <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-primary tracking-tight">
            Edition N° 09 — Paris • Como
          </h1>
          <p className="font-title-editorial italic text-secondary text-xl mt-2 font-light">
            Autumn / Winter Campaign Lookbook
          </p>
          <p className="font-body-md text-on-surface-variant font-light mt-4 leading-relaxed">
            Photographed by master editorial lens in the private courtyards of Île Saint-Louis and the historic silk mills of Lake Como. A study of pure permanence beyond the ephemeral.
          </p>
        </div>

        {/* Lookbook Spreads */}
        <div className="flex flex-col gap-space-xl">
          {lookbookChapters.map((chapter, index) => (
            <div
              key={chapter.edition}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame 4:5 */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl bg-surface-container">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-6 left-6 bg-primary text-on-primary font-label-caps text-xs px-3 py-1 uppercase tracking-widest">
                    {chapter.edition}
                  </div>
                </div>
              </div>

              {/* Narrative & Shop The Look Box */}
              <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
                  {chapter.subtitle}
                </span>
                <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary tracking-tight mt-1">
                  {chapter.title}
                </h2>
                <div className="w-12 h-[2px] bg-secondary my-space-sm" />
                <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant font-light leading-relaxed mb-space-md">
                  {chapter.description}
                </p>

                {/* Hotspot / Shop Selected Pieces */}
                <div className="bg-surface-container-low p-space-md border border-outline-variant/30 flex flex-col gap-3">
                  <span className="font-label-caps text-xs text-primary uppercase tracking-wider font-semibold">
                    Silhouettes in this Composition:
                  </span>
                  {chapter.products.map((p) => (
                    <div key={p.name} className="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/20">
                      <Link
                        to={`/product/${p.id}`}
                        className="font-title-editorial text-sm text-primary hover:text-secondary underline underline-offset-4 truncate mr-2"
                      >
                        {p.name}
                      </Link>
                      <span className="font-semibold text-primary shrink-0">{p.price}</span>
                    </div>
                  ))}
                  <Link
                    to="/catalog"
                    className="mt-2 w-full bg-primary text-on-primary font-label-caps text-xs uppercase py-3 tracking-widest text-center hover:bg-secondary transition-colors"
                  >
                    Acquire Look Pieces &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook Footer Banner */}
        <div className="mt-space-xl p-space-lg md:p-space-xl bg-primary-container text-surface text-center flex flex-col items-center">
          <span className="font-label-caps text-xs text-secondary-fixed uppercase tracking-[0.25em]">
            Private Salon Viewing
          </span>
          <h3 className="font-headline-md text-surface-bright mt-2">
            Schedule a Trunk Show Preview
          </h3>
          <p className="font-body-md text-surface-variant/80 font-light max-w-md mt-2 mb-6">
            Our atelier traveling stylists visit private residences and diplomatic suites across Paris, Milan, London, and New York.
          </p>
          <Link
            to="/concierge?tab=appointment"
            className="bg-secondary text-primary font-label-caps text-label-caps uppercase px-8 py-4 tracking-widest hover:bg-secondary-fixed transition-colors"
          >
            Request Private Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};
