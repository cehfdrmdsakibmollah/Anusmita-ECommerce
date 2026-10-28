import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CountryOrigin } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { 
  Plane, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const PreOrdersPage: React.FC = () => {
  const { preOrderBatches, products, navigateTo, formatPrice } = useStore();
  const [selectedOrigin, setSelectedOrigin] = useState<CountryOrigin | 'All'>('All');

  const filteredBatches = preOrderBatches.filter(b => 
    selectedOrigin === 'All' ? true : b.originCountry === selectedOrigin
  );

  const preOrderProducts = products.filter(p => p.preOrderBatchId || p.stock <= 0);

  const getTimelineIndex = (status: string) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'In Transit': return 1;
      case 'Customs Clearance': return 2;
      case 'Arrived': return 3;
      default: return 0;
    }
  };

  const steps = ['Confirmed', 'In Transit', 'Customs Clearance', 'Arrived at Hub'];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Overseas Cargo Pre-Orders</span>
      </nav>

      {/* Editorial Hero */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Verified Cargo Shipments
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
          “Worth the wait. Yours to reserve.”
        </h1>
        <p className="text-xs sm:text-base text-[#746B70] leading-relaxed">
          Discover our next authenticated arrivals from Korea, Japan, and China. Reserve rare or restocked items before public availability.
        </p>
      </div>

      {/* Filter Tabs by Origin */}
      <div className="flex justify-center gap-2 text-xs">
        {['All', 'Korea', 'Japan', 'China'].map((origin) => (
          <button
            key={origin}
            onClick={() => setSelectedOrigin(origin as any)}
            className={`px-4 py-2 rounded-xl font-semibold border transition ${
              selectedOrigin === origin
                ? 'bg-[#B74764] text-white border-[#B74764] shadow-xs'
                : 'bg-white text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
            }`}
          >
            {origin === 'All' ? 'All Overseas Batches' : `${origin === 'Korea' ? '🇰🇷 Korea' : origin === 'Japan' ? '🇯🇵 Japan' : '🇨🇳 China'}`}
          </button>
        ))}
      </div>

      {/* ACTIVE BATCH CARDS WITH FLIGHT RADAR */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#211D20] border-b border-[#EADDE0] pb-3">
          Incoming Freight Batches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => {
            const activeStep = getTimelineIndex(batch.status);
            return (
              <div 
                key={batch.id}
                className="bg-white rounded-3xl p-6 border border-[#EADDE0] shadow-xs space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#FFF7F3] text-[#B74764] border border-[#EADDE0] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                      {batch.id}
                    </span>
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">
                      Flight: {batch.flightNumber}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#211D20]">
                      {batch.originCity} ➔ {batch.destination}
                    </h3>
                    <p className="text-xs text-[#746B70] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B74764]" />
                      <span>Estimated Arrival: <strong>{batch.estimatedArrivalDate}</strong></span>
                    </p>
                  </div>

                  {/* Flight radar timeline */}
                  <div className="py-2 space-y-2">
                    <div className="flex justify-between text-[10px] text-[#746B70] font-semibold">
                      <span>Origin</span>
                      <span className="text-[#B74764] font-bold">{batch.status}</span>
                      <span>Dhaka</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#B74764] h-full rounded-full transition-all duration-500"
                        style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[#514950] leading-relaxed">
                    {batch.terms}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADDE0] flex items-center justify-between text-xs">
                  <span className="text-[#746B70]">{batch.depositPercent}% Advance Deposit</span>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="text-[#B74764] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Reserve Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRE-ORDER PRODUCTS GRID */}
      <div className="space-y-6 pt-4">
        <div className="flex items-end justify-between border-b border-[#EADDE0] pb-3">
          <div>
            <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">Reserved Allocation</span>
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Products Available for Reservation</h2>
          </div>
          <p className="text-xs text-[#746B70]">Direct from verified shipments</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {preOrderProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      {/* HOW PRE-ORDERS WORK ACCORDION / FAQ */}
      <div className="bg-[#FFF7F3] rounded-3xl p-6 sm:p-10 border border-[#EADDE0] space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#211D20] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#B74764]" />
          <span>How Overseas Pre-Orders Work at ANUSMITA</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#514950] leading-relaxed">
          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#B74764] text-white flex items-center justify-center font-bold text-xs">1</span>
            <h4 className="font-bold text-[#211D20]">Direct Air Freight Booking</h4>
            <p>We source authentic batches directly from authorized brand distributors in Seoul, Tokyo, and Guangzhou.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#B74764] text-white flex items-center justify-center font-bold text-xs">2</span>
            <h4 className="font-bold text-[#211D20]">Transparent Cargo Tracking</h4>
            <p>Every batch has an authentic airline airway bill or customs reference. We update arrival milestones transparently.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#B74764] text-white flex items-center justify-center font-bold text-xs">3</span>
            <h4 className="font-bold text-[#211D20]">Dhaka Quality Check & Delivery</h4>
            <p>Upon customs clearance, our team performs seal verification and dispatches via Pathao/Steadfast within 24 hours.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
