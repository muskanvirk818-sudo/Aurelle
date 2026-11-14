import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Editorial Story Header */}
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.25em]">
            Since 1928 • Paris Atelier
          </span>
          <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-primary tracking-tight mt-2">
            The Maison Story
          </h1>
          <p className="font-title-editorial italic text-secondary text-2xl mt-2 font-light">
            An Unwavering Dedication to Permanent Form
          </p>
        </div>

        {/* Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center mb-space-xl">
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden shadow-xl bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT3QQf-GGrZDzvHTeEbufAfzoC-BBbMRxCiNfZPUSUdfyz5UAc8AMei5XfbA6YFVUPONlMxBxUj1ZO9lDCHTDmnCsH1swDdTtM-48eeD4bJdnbk5sFJmtmQx61twSpMpcPnOsCh6K49JfucmLBHtUvIE4dl9a_fbDsUDHWqgvs61DSoT5A9Yo2TsZlOZ4tKneUaEft2cAXRxsI4HuATXfHC64qHBo9JsP1nJpzFHB0NWJXq4RjVyZilA"
                alt="Master Artisan Stitching"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
              The Founding Creed
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary tracking-tight mt-1">
              Restrained Grandeur
            </h2>
            <div className="w-12 h-[2px] bg-secondary my-space-sm" />
            <p className="font-body-md text-on-surface-variant font-light leading-relaxed mb-4">
              Maison Aurelle was founded in Paris on the quiet principle that true luxury never announces itself with synthetic novelty or fleeting trends. True luxury is felt in the density of double-faced cashmere resting over the shoulders, the fluid drape of raw silk bias cutting, and seams tailored by hands possessing forty years of couture experience.
            </p>
            <p className="font-body-sm text-outline font-light leading-relaxed">
              We create strictly in numbered editions, refusing the pressures of mass commercial turnover. When a garment leaves our atelier, it is destined to exist in a client's private archive for decades.
            </p>
          </div>
        </div>

        {/* Provenance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-xl">
          <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8]">
            <span className="font-title-editorial italic text-headline-sm text-secondary block mb-2">01. Como</span>
            <h3 className="font-headline-sm text-lg text-primary">Mulberry Silk Ateliers</h3>
            <p className="font-body-sm text-on-surface-variant font-light mt-2 leading-relaxed">
              Our silks are woven along the shores of Lake Como, where natural Alpine water baths soften fiber grains without chemical detergents, yielding a liquid, non-static drape.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8]">
            <span className="font-title-editorial italic text-headline-sm text-secondary block mb-2">02. Biella</span>
            <h3 className="font-headline-sm text-lg text-primary">Pure Cashmere &amp; Wool</h3>
            <p className="font-body-sm text-on-surface-variant font-light mt-2 leading-relaxed">
              In the foothills of northern Italy, four-generation master mills spin undyed Mongolian cashmere and Australian virgin wool into double-faced weaves finished with single-needle hand-rolled edges.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8]">
            <span className="font-title-editorial italic text-headline-sm text-secondary block mb-2">03. Paris</span>
            <h3 className="font-headline-sm text-lg text-primary">Haute Couture Tailoring</h3>
            <p className="font-body-sm text-on-surface-variant font-light mt-2 leading-relaxed">
              At our flagship salon on Rue du Faubourg Saint-Honoré, master cutters execute precision architectural darts, roped shoulders, and made-to-measure bespoke fittings.
            </p>
          </div>
        </div>

        {/* Salons Directory */}
        <div className="bg-surface-container-low p-space-lg md:p-space-xl border border-outline-variant/30">
          <div className="text-center max-w-xl mx-auto mb-space-lg">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em]">
              Private Salons &amp; Ateliers
            </span>
            <h2 className="font-headline-md text-primary mt-1">Visit the Maison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div className="bg-surface p-space-md border border-outline-variant/40">
              <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">
                Paris Flagship Salon
              </span>
              <h4 className="font-title-editorial text-lg text-primary mt-1">14 Rue du Faubourg Saint-Honoré</h4>
              <p className="font-body-sm text-xs text-on-surface-variant font-light mt-1">
                75008 Paris, France &bull; Private Appointments Available Tuesday – Saturday
              </p>
              <Link
                to="/concierge?tab=appointment"
                className="mt-3 inline-block font-label-caps text-xs text-secondary uppercase tracking-wider underline"
              >
                Book Paris Private Fitting &rarr;
              </Link>
            </div>

            <div className="bg-surface p-space-md border border-outline-variant/40">
              <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">
                Milan Studio
              </span>
              <h4 className="font-title-editorial text-lg text-primary mt-1">Via Montenapoleone, 8</h4>
              <p className="font-body-sm text-xs text-on-surface-variant font-light mt-1">
                20121 Milano MI, Italy &bull; By Private Concierge Invitation Only
              </p>
              <Link
                to="/concierge?tab=appointment"
                className="mt-3 inline-block font-label-caps text-xs text-secondary uppercase tracking-wider underline"
              >
                Book Milan Private Fitting &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
