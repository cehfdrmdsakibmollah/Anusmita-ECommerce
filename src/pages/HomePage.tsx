import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Clock, 
  ChevronRight, 
  Star, 
  Heart, 
  Award,
  Zap,
  Package,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    navigateTo, 
    bundles, 
    preOrderBatches, 
    journalArticles, 
    customerStories, 
    formatPrice 
  } = useStore();

  // Flash Deal countdown timer calculation (e.g. countdown to midnight)
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

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival || p.isTrending).slice(0, 4);
  const flashDeals = products.filter(p => p.isFlashDeal);

  const categories = [
    { name: 'Skincare', icon: '✨', count: '100% Genuine K-Beauty' },
    { name: 'Beauty / Makeup', icon: '💄', count: 'Lip & Face Glow' },
    { name: 'Fashion', icon: '👗', count: 'Mulberry Silks' },
    { name: 'Jewellery', icon: '💍', count: '18K Anti-Tarnish' },
    { name: 'Watches', icon: '⌚', count: 'Luxury Minimalist' },
    { name: 'Bags', icon: '👜', count: 'Structured Leather' },
    { name: 'Perfumes', icon: '🌸', count: 'Japanese EDP' },
    { name: 'Bedsheets', icon: '🛏️', count: '400TC Washed Cotton' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative bg-[#FFF7F3] border-b border-[#EADDE0] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F9E9ED] text-[#B74764] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-[#B74764]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Asian Beauty & Luxury Lifestyle</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#211D20] leading-[1.12] tracking-tight">
              Grace in Purity. <br />
              <span className="italic font-normal text-[#B74764]">Timeless Asian Radiance.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#514950] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Carefully sourced from authorized distributors in Seoul, Tokyo, and Guangzhou. 
              Dermatologist-loved K-beauty, pure Mulberry silks, and 18K anti-tarnish jewellery delivered across Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('routine-quiz')}
                className="w-full sm:w-auto bg-white hover:bg-[#FDF1F3] text-[#211D20] font-semibold py-3.5 px-7 rounded-xl border border-[#EADDE0] transition-colors text-xs sm:text-sm"
              >
                Take Skin Routine Quiz
              </button>
            </div>

            {/* Sourcing badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#EADDE0]/60 max-w-md mx-auto lg:mx-0 text-left">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#211D20]">🇰🇷 Korea Direct</span>
                <p className="text-[10px] text-[#746B70]">Centella & Rice Ferments</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#211D20]">🇯🇵 Japan Ginza</span>
                <p className="text-[10px] text-[#746B70]">Hyaluronic & EDPs</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#211D20]">🇨🇳 China Silk</span>
                <p className="text-[10px] text-[#746B70]">Mulberry Silks & 18K</p>
              </div>
            </div>
          </div>

          {/* Hero Imagery Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white p-3.5 rounded-3xl shadow-xl border border-[#EADDE0] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" 
                alt="Beauty of Joseon Sunscreen"
                className="w-full aspect-4/5 object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xs p-4 rounded-2xl shadow-lg border border-[#EADDE0] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">Most Loved by Dhaka Customers</p>
                  <p className="font-serif text-sm font-bold text-[#211D20]">Beauty of Joseon Relief Sun</p>
                  <p className="text-xs font-bold text-[#B74764]">৳ 1,550 <span className="text-[10px] text-[#746B70] line-through">৳ 1,800</span></p>
                </div>
                <button
                  onClick={() => navigateTo('product', 'prod-102')}
                  className="bg-[#B74764] text-white p-2.5 rounded-xl text-xs hover:bg-[#9F3652] transition shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST VALUE PROPOSITIONS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#211D20]">100% Authenticity</h3>
              <p className="text-[11px] text-[#746B70]">Direct import seals</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#211D20]">Nationwide COD</h3>
              <p className="text-[11px] text-[#746B70]">Dhaka ৳80 / Outside ৳150</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#211D20]">Easy 3-Day Returns</h3>
              <p className="text-[11px] text-[#746B70]">Hassle-free replacement</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADDE0] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#211D20]">Safe Formulations</h3>
              <p className="text-[11px] text-[#746B70]">Dermatologically tested</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY DISCOVERY GRID */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EADDE0] pb-4">
          <div>
            <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Curated Collections</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Featured Categories</h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigateTo('shop')}
              className="group bg-white p-5 rounded-2xl border border-[#EADDE0] hover:border-[#B74764] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl mb-3">{cat.icon}</div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#211D20] group-hover:text-[#B74764] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#746B70] mt-0.5">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLASH DEALS WITH GENUINE COUNTDOWN */}
      {flashDeals.length > 0 && (
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-[#FFF7F3] rounded-3xl p-6 sm:p-8 border border-[#EADDE0] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADDE0] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B74764] text-white flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#211D20]">Flash Deals of the Day</h2>
                  <p className="text-xs text-[#746B70]">Limited quantity authentic stock with exclusive savings.</p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#211D20]">
                <Clock className="w-4 h-4 text-[#B74764]" />
                <span className="text-[#746B70]">Offer Ends In:</span>
                <span className="bg-[#211D20] text-white px-2.5 py-1 rounded-lg">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-[#211D20] text-white px-2.5 py-1 rounded-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-[#211D20] text-white px-2.5 py-1 rounded-lg">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. BEST SELLERS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-[#EADDE0] pb-4">
          <div>
            <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Top Rated in Bangladesh</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Best Sellers</h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
          >
            <span>See All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE ROUTINE QUIZ BANNER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-[#F9E9ED] rounded-3xl p-8 sm:p-12 border border-[#EADDE0] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">Personalized Skin Consultant</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
              “Your skin. Your routine.”
            </h2>
            <p className="text-xs sm:text-sm text-[#514950] max-w-lg leading-relaxed">
              A few simple questions. A routine made specifically for you. Discover whether your skin barrier needs 
              Centella calming, Rice grain probiotics, or Hyaluronic hydration.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('routine-quiz')}
                className="bg-[#211D20] hover:bg-[#B74764] text-white font-bold py-3.5 px-7 rounded-xl shadow-md transition text-xs tracking-wider uppercase flex items-center gap-2"
              >
                <span>Find My Routine (Takes 60s)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/70 p-4 border border-[#EADDE0] flex flex-col items-center justify-center text-center shadow-xs">
              <Sparkles className="w-8 h-8 text-[#B74764] mb-2" />
              <p className="font-serif text-lg font-bold text-[#211D20]">AM & PM Steps</p>
              <p className="text-[11px] text-[#746B70] mt-1">Cleanser · Essence · Sunscreen</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CURATED BUNDLES SHOWCASE */}
      {bundles.length > 0 && (
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-[#EADDE0] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Value Routine Sets</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Exclusive Routine Bundles</h2>
            </div>
            <button
              onClick={() => navigateTo('bundles')}
              className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
            >
              <span>Explore All Bundles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <div 
                key={bundle.id}
                className="bg-white rounded-3xl p-6 border border-[#EADDE0] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-2xl bg-[#FFF7F3] border border-[#EADDE0]/60 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">{bundle.category}</span>
                    <h3 className="font-serif text-lg font-bold text-[#211D20] leading-snug">{bundle.name}</h3>
                    <p className="text-xs text-[#746B70]">{bundle.subtitle}</p>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-bold text-[#B74764]">{formatPrice(bundle.bundlePrice)}</span>
                      <span className="text-xs text-[#746B70] line-through">{formatPrice(bundle.originalTotal)}</span>
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Save {formatPrice(bundle.savingsBDT)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EADDE0]/60 flex items-center justify-between text-xs">
                  <span className="text-[#746B70] font-medium">{bundle.includedProductNames.length} full-size items included</span>
                  <button
                    onClick={() => navigateTo('bundles')}
                    className="text-[#B74764] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Bundle Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. NEW ARRIVALS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-[#EADDE0] pb-4">
          <div>
            <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Fresh From Overseas</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">New Arrivals</h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
          >
            <span>Shop New</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 9. REAL CUSTOMER STORIES TEASER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-[#EADDE0] pb-4">
          <div>
            <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Real Dhaka & Bangladesh Feedback</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Customer Moments & Reviews</h2>
          </div>
          <button
            onClick={() => navigateTo('customer-stories')}
            className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
          >
            <span>Read All Stories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerStories.slice(0, 3).map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-2xl p-6 border border-[#EADDE0] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-serif text-base font-semibold text-[#211D20] italic">
                  "{story.quote}"
                </p>
                <p className="text-xs text-[#514950] leading-relaxed">
                  {story.fullReview}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EADDE0]/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#211D20]">{story.customerName}</p>
                  <p className="text-[10px] text-[#746B70]">{story.city}</p>
                </div>
                {story.verifiedPurchase && (
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BEAUTY JOURNAL TEASER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-end justify-between border-b border-[#EADDE0] pb-4">
          <div>
            <span className="text-[11px] font-bold text-[#B74764] uppercase tracking-wider">Educational Guides</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">Beauty & Lifestyle Journal</h2>
          </div>
          <button
            onClick={() => navigateTo('journal')}
            className="text-xs font-semibold text-[#B74764] hover:underline flex items-center gap-1"
          >
            <span>Read Journal</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalArticles.slice(0, 2).map((art) => (
            <div 
              key={art.id}
              onClick={() => navigateTo('journal-detail', art.slug)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EADDE0] shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-16/9 overflow-hidden bg-[#FFF7F3]">
                <img 
                  src={art.image} 
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#746B70]">
                  <span className="font-semibold text-[#B74764] uppercase">{art.category}</span>
                  <span>• {art.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#211D20] group-hover:text-[#B74764] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#514950] line-clamp-2">
                  {art.excerpt}
                </p>
                <div className="pt-2 text-xs font-bold text-[#B74764] flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. SUPPORT CTA BANNER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="bg-[#211D20] text-[#F8F3F0] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Have questions about shade matching or authenticity?</h2>
            <p className="text-xs sm:text-sm text-[#D4C8C2] max-w-lg">
              Our Dhaka-based beauty advisors are online to assist with personalized recommendations and order tracking.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/8801310339192?text=Hello%20ANUSMITA!%20I%20have%20a%20question%20about%20your%20products."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl text-xs border border-white/20 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
