import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Heart, 
  Award, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">About ANUSMITA</span>
      </nav>

      {/* Editorial Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
            Our Philosophy & Sourcing Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#211D20] leading-tight">
            Authentic Asian Radiance. <br />
            <span className="italic font-normal text-[#B74764]">Curated for Bangladesh.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#514950] leading-relaxed">
            ANUSMITA was founded with a singular conviction: discerning customers in Bangladesh deserve 
            uncompromising access to 100% genuine Asian beauty and lifestyle treasures without fear of counterfeit formulations.
          </p>
          <p className="text-xs sm:text-sm text-[#514950] leading-relaxed">
            Every product in our catalog—from soothing Centella ampoules in Seoul to Kyoto green tea fragrances 
            and Grade 6A Mulberry silk ensembles in China—is selected through authorized wholesale channels with verified factory seals.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center gap-2"
            >
              <span>Explore Sourced Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#FFF7F3] rounded-3xl p-4 border border-[#EADDE0] shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" 
            alt="ANUSMITA Sourcing"
            className="w-full aspect-4/5 object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Sourcing Hubs Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#B74764] uppercase tracking-wider">Direct Origin Partnerships</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">
            Where We Source
          </h2>
          <p className="text-xs text-[#746B70]">
            Transparent logistics verified through air cargo manifests and customs checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-3">
            <span className="text-3xl">🇰🇷</span>
            <h3 className="font-serif text-xl font-bold text-[#211D20]">Seoul, South Korea</h3>
            <p className="text-xs text-[#514950] leading-relaxed">
              Direct partnerships with K-beauty giants and clean clinical brands including Beauty of Joseon, SKIN1004, Laneige, and COSRX.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-3">
            <span className="text-3xl">🇯🇵</span>
            <h3 className="font-serif text-xl font-bold text-[#211D20]">Kyoto & Tokyo, Japan</h3>
            <p className="text-xs text-[#514950] leading-relaxed">
              Legendary multi-layer hyaluronic acid lotions, washed cotton home linens, and artisanal Sakura botanic perfumes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-3">
            <span className="text-3xl">🇨🇳</span>
            <h3 className="font-serif text-xl font-bold text-[#211D20]">Guangzhou & Suzhou, China</h3>
            <p className="text-xs text-[#514950] leading-relaxed">
              Millennia of silk weaving expertise: 100% pure Mulberry silks and medical-grade PVD 18K anti-tarnish jewelry ateliers.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className="bg-[#FFF7F3] rounded-3xl p-8 sm:p-12 border border-[#EADDE0] space-y-8">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Our Core Commitments</h3>
          <p className="text-xs text-[#746B70]">The principles that guide every shipment we bring to Dhaka.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#514950]">
          <div className="bg-white p-6 rounded-2xl border border-[#EADDE0] space-y-2">
            <ShieldCheck className="w-6 h-6 text-green-700" />
            <h4 className="font-bold text-[#211D20]">Authenticity First</h4>
            <p>We do not compromise on supply chain integrity. Every item is verified against brand batch codes and holographic seals.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EADDE0] space-y-2">
            <Sparkles className="w-6 h-6 text-[#B74764]" />
            <h4 className="font-bold text-[#211D20]">Climate-Conscious Care</h4>
            <p>Our skincare selections are specifically vetted for South Asian tropical climates—lightweight, non-comedogenic, and breathable.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EADDE0] space-y-2">
            <Heart className="w-6 h-6 text-amber-700" />
            <h4 className="font-bold text-[#211D20]">Dignified Service</h4>
            <p>Friendly customer care in Bengali & English, nationwide cash on delivery, and transparent 3-day return policies.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
