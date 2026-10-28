import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CountryOrigin, ProductCategory } from '../types';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw, 
  Search,
  Sparkles
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, formatPrice } = useStore();

  // Filter States
  const [selectedOrigin, setSelectedOrigin] = useState<CountryOrigin | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [priceRange, setPriceRange] = useState<number>(6000);
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popularity'>('popularity');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const origins: (CountryOrigin | 'All')[] = ['All', 'Korea', 'Japan', 'China'];
  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Skincare',
    'Beauty / Makeup',
    'Fashion',
    'Jewellery',
    'Watches',
    'Mobile Accessories',
    'Bedsheets',
    'Perfumes',
    'Bags'
  ];

  const concerns = ['All', 'Acne', 'Pigmentation', 'Brightening', 'Sensitive', 'Dryness', 'Uneven Tone'];
  const skinTypes = ['All', 'Oily', 'Dry', 'Combination', 'Sensitive'];

  const clearAllFilters = () => {
    setSelectedOrigin('All');
    setSelectedCategory('All');
    setPriceRange(6000);
    setSelectedConcern('All');
    setSelectedSkinType('All');
    setInStockOnly(false);
    setSearchQuery('');
  };

  // Active filters list for removable chips
  const activeFilters = useMemo(() => {
    const list: { label: string; clear: () => void }[] = [];
    if (selectedOrigin !== 'All') {
      list.push({ label: `Origin: ${selectedOrigin}`, clear: () => setSelectedOrigin('All') });
    }
    if (selectedCategory !== 'All') {
      list.push({ label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory('All') });
    }
    if (priceRange < 6000) {
      list.push({ label: `Max Price: ৳${priceRange}`, clear: () => setPriceRange(6000) });
    }
    if (selectedConcern !== 'All') {
      list.push({ label: `Concern: ${selectedConcern}`, clear: () => setSelectedConcern('All') });
    }
    if (selectedSkinType !== 'All') {
      list.push({ label: `Skin: ${selectedSkinType}`, clear: () => setSelectedSkinType('All') });
    }
    if (inStockOnly) {
      list.push({ label: 'In Stock Only', clear: () => setInStockOnly(false) });
    }
    if (searchQuery) {
      list.push({ label: `Search: "${searchQuery}"`, clear: () => setSearchQuery('') });
    }
    return list;
  }, [selectedOrigin, selectedCategory, priceRange, selectedConcern, selectedSkinType, inStockOnly, searchQuery]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Origin filter
      if (selectedOrigin !== 'All' && p.origin !== selectedOrigin) return false;

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Price filter
      if (p.price > priceRange) return false;

      // In stock filter
      if (inStockOnly && p.stock <= 0) return false;

      // Concern filter (relevant for skincare)
      if (selectedConcern !== 'All') {
        if (!p.concern || !p.concern.includes(selectedConcern as any)) return false;
      }

      // Skin type filter (relevant for skincare)
      if (selectedSkinType !== 'All') {
        if (!p.skinType || (!p.skinType.includes(selectedSkinType as any) && !p.skinType.includes('All'))) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBangla = p.banglaName && p.banglaName.includes(q);
        if (!matchesName && !matchesBrand && !matchesSku && !matchesBangla) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return b.reviewCount - a.reviewCount; // Popularity default
    });
  }, [products, selectedOrigin, selectedCategory, priceRange, inStockOnly, selectedConcern, selectedSkinType, searchQuery, sortBy]);

  const showSkincareFilters = selectedCategory === 'All' || selectedCategory === 'Skincare' || selectedCategory === 'Beauty / Makeup';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EADDE0] pb-6">
        <div>
          <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Verified Authentic Sourcing</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
            All Products & Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#746B70] mt-1">
            Showing <strong className="text-[#211D20]">{filteredProducts.length}</strong> Asian beauty, fashion & lifestyle items
          </p>
        </div>

        {/* Controls: Search + Sort + Mobile Filter Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#746B70] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in shop..."
              className="bg-white border border-[#EADDE0] rounded-xl pl-8 pr-3 py-2 text-xs text-[#211D20] focus:outline-none focus:border-[#B74764] w-44 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1.5 border border-[#EADDE0] rounded-xl bg-white px-3 py-2 text-xs">
            <span className="text-[#746B70]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#211D20] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-[#FDF1F3] text-[#B74764] border border-[#B74764]/30 px-3.5 py-2 rounded-xl text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFilters.length})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#746B70] font-semibold mr-1">Active filters:</span>
          {activeFilters.map((af, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 bg-[#FDF1F3] text-[#B74764] text-xs font-medium px-2.5 py-1 rounded-full border border-[#B74764]/20"
            >
              <span>{af.label}</span>
              <button onClick={af.clear} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#746B70] hover:text-[#B74764] underline ml-2 font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTER */}
        <aside className="hidden md:block space-y-6 bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between border-b border-[#EADDE0] pb-3">
            <h2 className="font-serif text-lg font-bold text-[#211D20] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#B74764]" />
              <span>Filters</span>
            </h2>
            {activeFilters.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-xs text-[#B74764] hover:underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {/* 1. Country of Origin */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Country of Origin</h3>
            <div className="flex flex-col gap-1 text-xs">
              {origins.map((orig) => (
                <button
                  key={orig}
                  onClick={() => setSelectedOrigin(orig)}
                  className={`text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                    selectedOrigin === orig 
                      ? 'bg-[#FDF1F3] text-[#B74764] font-bold' 
                      : 'text-[#514950] hover:bg-[#FFFAF7]'
                  }`}
                >
                  <span>{orig === 'All' ? 'All Origins' : `${orig === 'Korea' ? '🇰🇷 Korea' : orig === 'Japan' ? '🇯🇵 Japan' : '🇨🇳 China'}`}</span>
                  {selectedOrigin === orig && <span className="w-1.5 h-1.5 rounded-full bg-[#B74764]"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Categories */}
          <div className="space-y-2 pt-3 border-t border-[#EADDE0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Categories</h3>
            <div className="flex flex-col gap-1 text-xs max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                    selectedCategory === cat 
                      ? 'bg-[#FDF1F3] text-[#B74764] font-bold' 
                      : 'text-[#514950] hover:bg-[#FFFAF7]'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#B74764]"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-[#EADDE0]">
            <div className="flex justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#746B70]">Max Price</span>
              <span className="font-bold text-[#B74764]">৳{priceRange}</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#B74764] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#746B70]">
              <span>৳500</span>
              <span>৳6,000+</span>
            </div>
          </div>

          {/* 4. Skin Concern (Only for relevant categories) */}
          {showSkincareFilters && (
            <div className="space-y-2 pt-3 border-t border-[#EADDE0]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Skin Concern</h3>
              <div className="flex flex-wrap gap-1.5">
                {concerns.map((con) => (
                  <button
                    key={con}
                    onClick={() => setSelectedConcern(con)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                      selectedConcern === con
                        ? 'bg-[#B74764] text-white border-[#B74764]'
                        : 'bg-white text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                  >
                    {con}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. In Stock Checkbox */}
          <div className="pt-3 border-t border-[#EADDE0]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#514950]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#B74764] rounded cursor-pointer"
              />
              <span className="font-medium">In Stock Only (Immediate Dispatch)</span>
            </label>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="md:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EADDE0] space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#FDF1F3] rounded-full flex items-center justify-center text-[#B74764]">
                <Filter className="w-8 h-8 stroke-1" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#211D20]">No products matched your filters</h2>
              <p className="text-xs text-[#746B70] max-w-sm mx-auto">
                Try widening your price range, clearing specific skin concerns, or searching for other authentic Asian items.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#B74764] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#9F3652] transition shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EADDE0] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#211D20]">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-6 h-6 text-[#746B70]" />
                </button>
              </div>

              {/* Origin */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Country of Origin</h4>
                <div className="flex flex-wrap gap-1.5">
                  {origins.map((orig) => (
                    <button
                      key={orig}
                      onClick={() => setSelectedOrigin(orig)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        selectedOrigin === orig ? 'bg-[#B74764] text-white border-[#B74764]' : 'bg-[#FFFAF7] border-[#EADDE0]'
                      }`}
                    >
                      {orig}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Category</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        selectedCategory === cat ? 'bg-[#B74764] text-white border-[#B74764]' : 'bg-[#FFFAF7] border-[#EADDE0]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#746B70]">Max Price</span>
                  <span className="font-bold text-[#B74764]">৳{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#B74764]"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#B74764]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EADDE0] flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-[#EADDE0] rounded-xl text-xs font-semibold text-[#514950]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 bg-[#B74764] text-white py-2.5 rounded-xl text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
