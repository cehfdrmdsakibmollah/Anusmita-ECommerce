import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShoppingBag, ArrowRight, Check, ChevronRight } from 'lucide-react';

export const BundlesPage: React.FC = () => {
  const { bundles, products, addToCart, navigateTo, formatPrice } = useStore();

  const handleAddBundleToCart = (productIds: string[]) => {
    productIds.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (prod) {
        addToCart(prod, { quantity: 1 });
      }
    });
    navigateTo('cart');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Curated Bundles & Combos</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Complete Routine Value Packs
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
          Curated Routine Sets & Duos
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Carefully paired complementary products designed to work in synergy. Maximize skin absorption and enjoy bundled savings in Bangladeshi Taka.
        </p>
      </div>

      {/* Bundles Grid */}
      <div className="space-y-8">
        {bundles.map((bundle) => (
          <div 
            key={bundle.id}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADDE0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 bg-[#FFF7F3] rounded-2xl p-4 flex items-center justify-center border border-[#EADDE0]/60">
              <img 
                src={bundle.image} 
                alt={bundle.name}
                className="max-h-[340px] w-auto object-cover rounded-xl shadow-xs"
              />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">{bundle.category}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">{bundle.name}</h2>
                <p className="text-xs text-[#746B70]">{bundle.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-[#514950] leading-relaxed">
                {bundle.description}
              </p>

              {/* Included items breakdown */}
              <div className="p-4 bg-[#FFFAF7] rounded-2xl border border-[#EADDE0] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D20]">
                  What's Included in This Bundle:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#514950]">
                  {bundle.includedProductNames.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#EADDE0]">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#B74764]">{formatPrice(bundle.bundlePrice)}</span>
                    <span className="text-sm text-[#746B70] line-through">{formatPrice(bundle.originalTotal)}</span>
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Save {formatPrice(bundle.savingsBDT)}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#746B70] mt-0.5">Calculated from individual item prices.</p>
                </div>

                <button
                  onClick={() => handleAddBundleToCart(bundle.productIds)}
                  className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire Routine to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
