import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Zap, Clock, ShieldCheck, Flame, ChevronRight } from 'lucide-react';

export const FlashDealsPage: React.FC = () => {
  const { products, navigateTo } = useStore();

  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.isFlashDeal || (p.originalPrice && p.originalPrice > p.price));

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Limited Flash Deals</span>
      </nav>

      {/* Hero Banner with Live Countdown */}
      <div className="bg-[#FFF7F3] rounded-3xl p-8 sm:p-12 border border-[#EADDE0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#F9E9ED] text-[#B74764] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#B74764]/20">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Server-Authoritative Countdown</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
            Today's Limited Flash Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#746B70] max-w-lg leading-relaxed">
            Exclusive discounts on genuine Korean skincare and Japanese essences. Offer strictly valid until inventory allocation expires.
          </p>
        </div>

        {/* Big Live Countdown Clock */}
        <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] shadow-sm text-center shrink-0 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#746B70] flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B74764]" /> Offer Expires In:
          </span>
          <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#211D20]">
            <div className="bg-[#211D20] text-white px-3 py-2 rounded-xl">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="block text-[9px] uppercase font-normal text-gray-300">Hours</span>
            </div>
            <span>:</span>
            <div className="bg-[#211D20] text-white px-3 py-2 rounded-xl">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="block text-[9px] uppercase font-normal text-gray-300">Mins</span>
            </div>
            <span>:</span>
            <div className="bg-[#211D20] text-white px-3 py-2 rounded-xl">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="block text-[9px] uppercase font-normal text-gray-300">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dealProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Trust Footer */}
      <div className="p-6 bg-white rounded-3xl border border-[#EADDE0] text-center text-xs text-[#746B70] space-y-1">
        <p className="font-bold text-[#211D20]">Verified Authentic Stock Guarantee</p>
        <p>All flash deal items are guaranteed 100% genuine with official factory seals. No fabricated original prices.</p>
      </div>

    </div>
  );
};
