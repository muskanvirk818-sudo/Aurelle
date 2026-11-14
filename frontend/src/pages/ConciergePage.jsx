import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

export const ConciergePage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'appointment';
  const initialService = searchParams.get('service') || 'Made to Measure Private Fitting';
  const initialNotes = searchParams.get('notes') || '';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Appointment Form State
  const [appointmentData, setAppointmentData] = useState({
    fullName: '',
    email: '',
    phone: '',
    salon: 'Paris Atelier - Rue du Faubourg Saint-Honoré',
    service: initialService,
    date: '',
    time: '14:00',
    notes: initialNotes,
  });
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [appointmentMsg, setAppointmentMsg] = useState('');

  // Order Tracking State
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [searchParams]);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setAppointmentStatus('loading');
    try {
      const res = await api.bookAppointment(appointmentData);
      setAppointmentStatus('success');
      setAppointmentMsg(res.message || 'Your private salon appointment has been confirmed.');
    } catch (err) {
      setAppointmentStatus('error');
      setAppointmentMsg(err.message || 'Unable to schedule appointment. Please contact our salon concierge directly.');
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setTrackingLoading(true);
    setTrackingError('');
    setTrackedOrder(null);

    try {
      const res = await api.getOrderById(trackingNumber.trim());
      if (res.success && res.order) {
        setTrackedOrder(res.order);
      } else {
        setTrackingError('No atelier order found under this code.');
      }
    } catch (err) {
      setTrackingError('Unable to retrieve order: ' + err.message);
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Header */}
        <div className="border-b border-outline-variant/30 pb-space-md mb-space-lg">
          <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.25em]">
            Client Relations &amp; Services
          </span>
          <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mt-1">
            Client Concierge &amp; Private Salon
          </h1>
          <p className="font-body-md text-on-surface-variant font-light mt-1 max-w-2xl">
            We are devoted to an uncompromising standard of hospitality. Coordinate bespoke fittings, track active commissions, or consult our master tailors.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-outline-variant/30 mb-space-lg gap-6 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveTab('appointment')}
            className={`font-label-caps text-xs uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'appointment' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Book Private Salon Fitting
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`font-label-caps text-xs uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'track' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Track Atelier Order
          </button>
          <button
            onClick={() => setActiveTab('sizing')}
            className={`font-label-caps text-xs uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'sizing' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Size &amp; Fit Atelier
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`font-label-caps text-xs uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'shipping' ? 'border-secondary text-primary font-bold' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            Shipping &amp; Returns Protocol
          </button>
        </div>

        {/* TAB 1: BOOK PRIVATE APPOINTMENT */}
        {activeTab === 'appointment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg border border-[#E6D7B8] shadow-md">
              <h3 className="font-title-editorial text-2xl text-primary mb-2">Schedule Private Appointment</h3>
              <p className="font-body-sm text-xs text-on-surface-variant font-light mb-6">
                Appointments include a dedicated salon host, champagne service, and customized garment curation.
              </p>

              {appointmentStatus === 'success' ? (
                <div className="p-space-md bg-secondary-fixed/40 border border-secondary text-primary">
                  <h4 className="font-title-editorial text-lg font-bold">Salon Appointment Registered</h4>
                  <p className="font-body-sm text-xs mt-1">{appointmentMsg}</p>
                  <button
                    onClick={() => setAppointmentStatus(null)}
                    className="mt-4 bg-primary text-on-primary font-label-caps text-xs uppercase px-4 py-2"
                  >
                    Schedule Another Consultation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Full Name / Title
                      </label>
                      <input
                        type="text"
                        required
                        value={appointmentData.fullName}
                        onChange={(e) => setAppointmentData({ ...appointmentData, fullName: e.target.value })}
                        placeholder="e.g. Monsieur Henri de Saint"
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Correspondence Email
                      </label>
                      <input
                        type="email"
                        required
                        value={appointmentData.email}
                        onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                        placeholder="client@domaine.com"
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={appointmentData.phone}
                        onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                        placeholder="+33 1 42 68 00 00"
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Atelier Salon Location
                      </label>
                      <select
                        value={appointmentData.salon}
                        onChange={(e) => setAppointmentData({ ...appointmentData, salon: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      >
                        <option value="Paris Atelier - Rue du Faubourg Saint-Honoré">Paris Atelier - Rue du Faubourg Saint-Honoré</option>
                        <option value="Milan Salon - Via Montenapoleone">Milan Salon - Via Montenapoleone</option>
                        <option value="New York Private Suite - Madison Avenue">New York Private Suite - Madison Avenue</option>
                        <option value="Virtual Haute Couture Consultation">Virtual Haute Couture Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Service Requested
                      </label>
                      <select
                        value={appointmentData.service}
                        onChange={(e) => setAppointmentData({ ...appointmentData, service: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      >
                        <option value="Made to Measure Private Fitting">Made to Measure Private Fitting</option>
                        <option value="Seasonal Lookbook Trunk Consultation">Seasonal Lookbook Trunk Consultation</option>
                        <option value="Eveningwear & Bridal Commission">Eveningwear &amp; Bridal Commission</option>
                        <option value="Archive Piece Sourcing & Restoration">Archive Piece Sourcing &amp; Restoration</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={appointmentData.time}
                        onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                      >
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-label-caps text-xs uppercase text-outline block mb-1">
                      Styling Notes &amp; Specific Silhouettes
                    </label>
                    <textarea
                      rows="3"
                      value={appointmentData.notes}
                      onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                      placeholder="Specify garments of interest, sizing preferences, or special diplomatic arrangements..."
                      className="w-full bg-surface-container border border-outline-variant/40 p-3 text-sm focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={appointmentStatus === 'loading'}
                    className="w-full bg-secondary text-primary font-label-caps text-label-caps uppercase tracking-[0.2em] py-4 hover:bg-secondary-fixed transition-colors font-medium shadow-md mt-2"
                  >
                    {appointmentStatus === 'loading' ? 'Confirming...' : 'Request Salon Appointment'}
                  </button>
                </form>
              )}
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="bg-primary-container text-surface p-space-md shadow-md">
                <span className="font-label-caps text-xs text-secondary-fixed uppercase tracking-widest">
                  Atelier Standards
                </span>
                <h4 className="font-headline-sm text-surface-bright mt-1">Private Fitting Protocol</h4>
                <p className="font-body-sm text-xs text-surface-variant/80 font-light mt-2 leading-relaxed">
                  Every appointment is conducted in a private salon suite. Garments from our Como and Paris vaults are pressed and prepared prior to your arrival. Master patternmakers will record forty-two individual anatomical points to guarantee an absolute silhouette fit.
                </p>
              </div>

              <div className="bg-surface-container-low p-space-md border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">
                  Direct Salon Desk
                </span>
                <p className="font-body-sm text-xs text-primary">
                  Telephone: <a href="tel:+33142680000" className="underline font-semibold">+33 (0)1 42 68 00 00</a>
                </p>
                <p className="font-body-sm text-xs text-primary">
                  Email: <a href="mailto:concierge@maison-aurelle.com" className="underline font-semibold">concierge@maison-aurelle.com</a>
                </p>
                <p className="font-body-sm text-xs text-outline font-light mt-1">
                  Available Monday through Saturday, 9:00 AM – 8:00 PM Central European Time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRACK ATELIER ORDER */}
        {activeTab === 'track' && (
          <div className="max-w-2xl bg-surface-container-lowest p-space-lg border border-[#E6D7B8] shadow-md">
            <h3 className="font-title-editorial text-2xl text-primary mb-2">Track Atelier Dispatch</h3>
            <p className="font-body-sm text-xs text-on-surface-variant font-light mb-6">
              Enter your bespoke acquisition reference code (e.g., AUR-2025-XXXXXX).
            </p>

            <form onSubmit={handleTrackOrder} className="flex gap-2 mb-6">
              <input
                type="text"
                required
                placeholder="Order Reference (e.g. AUR-2025-849201)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 bg-surface-container border border-outline-variant/40 p-3 text-sm font-mono focus:outline-none"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase px-6 py-3 tracking-widest hover:bg-secondary transition-colors"
              >
                {trackingLoading ? 'Locating...' : 'Track'}
              </button>
            </form>

            {trackingError && (
              <div className="p-3 bg-error-container text-on-error-container text-xs mb-4">
                {trackingError}
              </div>
            )}

            {trackedOrder && (
              <div className="bg-surface-container-low p-space-md border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                  <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                    {trackedOrder.orderNumber}
                  </span>
                  <span className="bg-primary text-on-primary font-label-caps text-[10px] px-2 py-0.5 uppercase">
                    {trackedOrder.status}
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <p>Client: <strong className="text-primary">{trackedOrder.customer?.firstName} {trackedOrder.customer?.lastName}</strong></p>
                  <p>Destination: <strong className="text-primary">{trackedOrder.shippingAddress?.city}, {trackedOrder.shippingAddress?.country}</strong></p>
                  <p>Shipping Protocol: <strong className="text-primary">{trackedOrder.shippingMethod}</strong></p>
                  <p>Total Commission: <strong className="text-primary">${trackedOrder.total?.toLocaleString()} USD</strong></p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SIZE & FIT ATELIER */}
        {activeTab === 'sizing' && (
          <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8] shadow-md max-w-4xl">
            <h3 className="font-title-editorial text-2xl text-primary mb-2">Atelier Sizing Concordance</h3>
            <p className="font-body-sm text-xs text-on-surface-variant font-light mb-6">
              Maison Aurelle proportions follow classical French couture tailoring sizing. All garments include generous interior seam allowances for private alterations.
            </p>

            <div className="overflow-x-auto mb-space-lg">
              <table className="w-full text-left text-xs border border-outline-variant/30">
                <thead className="bg-surface-container text-primary font-label-caps uppercase tracking-wider">
                  <tr>
                    <th className="p-3">French (FR)</th>
                    <th className="p-3">Italian (IT)</th>
                    <th className="p-3">UK / US</th>
                    <th className="p-3">Bust (cm / in)</th>
                    <th className="p-3">Waist (cm / in)</th>
                    <th className="p-3">Hips (cm / in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-body-sm">
                  <tr>
                    <td className="p-3 font-semibold">36</td>
                    <td className="p-3">40</td>
                    <td className="p-3">UK 8 / US 4</td>
                    <td className="p-3">84 cm / 33"</td>
                    <td className="p-3">65 cm / 25.5"</td>
                    <td className="p-3">91 cm / 36"</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="p-3 font-semibold">38</td>
                    <td className="p-3">42</td>
                    <td className="p-3">UK 10 / US 6</td>
                    <td className="p-3">88 cm / 34.5"</td>
                    <td className="p-3">69 cm / 27"</td>
                    <td className="p-3">95 cm / 37.5"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">40</td>
                    <td className="p-3">44</td>
                    <td className="p-3">UK 12 / US 8</td>
                    <td className="p-3">92 cm / 36"</td>
                    <td className="p-3">73 cm / 28.5"</td>
                    <td className="p-3">99 cm / 39"</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="p-3 font-semibold">42</td>
                    <td className="p-3">46</td>
                    <td className="p-3">UK 14 / US 10</td>
                    <td className="p-3">96 cm / 38"</td>
                    <td className="p-3">77 cm / 30.5"</td>
                    <td className="p-3">103 cm / 40.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-surface-container-low p-4 border border-outline-variant/30 text-xs">
              <h4 className="font-label-caps uppercase text-primary font-bold mb-1">
                Made to Measure Commission
              </h4>
              <p className="font-light text-on-surface-variant">
                If your proportions require custom pattern drafting, our master cutlers in Paris construct bespoke single-piece garments upon request.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SHIPPING & RETURNS */}
        {activeTab === 'shipping' && (
          <div className="bg-surface-container-lowest p-space-lg border border-[#E6D7B8] shadow-md max-w-4xl space-y-6">
            <div>
              <h3 className="font-title-editorial text-2xl text-primary mb-2">White-Glove Shipping &amp; Returns Protocol</h3>
              <p className="font-body-sm text-sm text-on-surface-variant font-light leading-relaxed">
                Maison Aurelle provides complimentary insured courier delivery on all acquisitions exceeding $350. Each piece is transported flat in our rigid archival keepsake box accompanied by cedar moth sachets and a carved beechwood hanger.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-4 border-t border-outline-variant/30">
              <div className="space-y-2">
                <h4 className="font-label-caps text-xs uppercase text-secondary font-bold">Delivery Cadence</h4>
                <ul className="text-xs space-y-1.5 text-on-surface-variant font-light list-disc pl-4">
                  <li>European Union: 24 to 48 Hours via Private Courier</li>
                  <li>United Kingdom &amp; Switzerland: 48 Hours (Customs pre-cleared)</li>
                  <li>North America &amp; Middle East: 2 to 3 Business Days</li>
                  <li>Asia Pacific: 3 to 4 Business Days</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-label-caps text-xs uppercase text-secondary font-bold">Complimentary Returns</h4>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  Garments in pristine condition with untampered atelier security ribbons may be exchanged or refunded within thirty (30) days of delivery. Prepaid return courier labels are included inside every keepsake dispatch box.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
