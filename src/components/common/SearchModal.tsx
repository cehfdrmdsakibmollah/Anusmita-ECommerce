import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    searchModalOpen, 
    setSearchModalOpen, 
    products, 
    navigateTo, 
    formatPrice 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim() && selectedCategory === 'All') {
      return products.slice(0, 6);
    }
    return products.filter(p => {
      const matchQuery = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.banglaName && p.banglaName.includes(searchTerm)) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      return matchQuery && matchCat;
    });
  }, [searchTerm, selectedCategory, products]);

  if (!searchModalOpen) return null;

  const categories = ['All', 'Skincare', 'Beauty / Makeup', 'Fashion', 'Jewellery', 'Bags', 'Perfumes'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EADDE0] overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EADDE0] flex items-center gap-3 bg-[#FFF7F3]">
          <Search className="w-5 h-5 text-[#B74764] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, brand, SKU (e.g. Centella, Rice, Silk, Pearl)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#211D20] placeholder-[#746B70] focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#746B70] hover:text-[#211D20]"
            >
              Clear
            </button>
          )}
          <button 
            onClick={() => setSearchModalOpen(false)}
            className="p-1.5 text-[#746B70] hover:text-[#211D20] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Category Chips */}
        <div className="px-5 py-3 border-b border-[#EADDE0] bg-white flex gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#B74764] text-white font-semibold'
                  : 'bg-[#FFFAF7] text-[#514950] border border-[#EADDE0] hover:border-[#B74764]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#746B70] mb-2">
            {searchTerm ? `Found ${filteredProducts.length} matching products` : 'Trending Authentic Picks'}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-[#746B70] text-sm">
              No products found matching "{searchTerm}". Try searching for Centella, Sunscreen, Silk, or Pearl.
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  setSearchModalOpen(false);
                  navigateTo('product', prod.id);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#EADDE0] bg-[#FFFAF7]/40 hover:bg-[#FDF1F3] cursor-pointer transition"
              >
                <img 
                  src={prod.mainImage} 
                  alt={prod.name}
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-[#EADDE0]/60 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#B74764] uppercase">{prod.brand}</span>
                    <span className="text-[10px] text-[#746B70]">• {prod.origin}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#211D20] truncate">{prod.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-[#B74764]">{formatPrice(prod.price)}</span>
                    <span className="text-[10px] text-[#746B70] flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {prod.rating}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#746B70] shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FFF7F3] border-t border-[#EADDE0] text-center text-xs text-[#746B70]">
          Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#EADDE0] text-[10px]">ESC</kbd> to exit search
        </div>
      </div>
    </div>
  );
};
