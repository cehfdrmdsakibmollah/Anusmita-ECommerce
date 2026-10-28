import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Star, 
  MessageSquare, 
  CheckCircle, 
  Heart, 
  Camera, 
  X, 
  ShieldCheck, 
  Upload,
  ChevronRight
} from 'lucide-react';

export const CustomerStoriesPage: React.FC = () => {
  const { customerStories, addCustomerStory, navigateTo } = useStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [productName, setProductName] = useState('');
  const [quote, setQuote] = useState('');
  const [fullReview, setFullReview] = useState('');
  const [rating, setRating] = useState(5);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote || !consentChecked) return;

    addCustomerStory({
      customerName: name,
      city: city || 'Dhaka',
      verifiedPurchase: true,
      quote,
      fullReview: fullReview || quote,
      productName: productName || 'Anusmita Skincare Selection',
      rating,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    });

    setModalOpen(false);
    setName('');
    setQuote('');
    setFullReview('');
    setConsentChecked(false);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Customer Moments & Unboxing</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EADDE0] pb-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
            Community Love & Social Proof
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
            “Your moments. Our favourite stories.”
          </h1>
          <p className="text-xs sm:text-sm text-[#746B70] max-w-lg leading-relaxed">
            Authentic experiences from beauty connoisseurs and fashion lovers across Dhaka, Chittagong, Sylhet, and beyond.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center gap-2 shrink-0"
        >
          <Camera className="w-4 h-4" />
          <span>Share Your ANUSMITA Story</span>
        </button>
      </div>

      {/* Stories Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customerStories.map((story) => (
          <div 
            key={story.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#EADDE0] shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="aspect-4/3 overflow-hidden bg-[#FFF7F3] relative">
              <img 
                src={story.image} 
                alt={story.customerName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-green-800 border border-green-200">
                ✓ Verified Buyer
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-serif text-base font-bold text-[#211D20] italic">
                  "{story.quote}"
                </h3>
                <p className="text-xs text-[#514950] leading-relaxed">
                  {story.fullReview}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EADDE0] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#211D20]">{story.customerName}</p>
                  <p className="text-[10px] text-[#746B70]">{story.city} • {story.date}</p>
                </div>
                <span className="text-[10px] text-[#B74764] font-semibold max-w-[130px] truncate text-right">
                  {story.productName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADDE0] space-y-5 z-10 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#EADDE0] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#211D20]">
                Submit Your Verified Story
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-[#746B70]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhana Yasmin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#514950]">City / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#514950]">Product Purchased</label>
                  <input
                    type="text"
                    placeholder="e.g. Centella Ampoule"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Short Headline Quote *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Truly authentic Korean glow with zero stickiness."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Full Story & Review</label>
                <textarea
                  rows={3}
                  placeholder="Share details on texture, delivery experience, packaging, and results..."
                  value={fullReview}
                  onChange={(e) => setFullReview(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="accent-[#B74764] w-4 h-4 mt-0.5"
                  />
                  <span className="text-[11px] text-[#746B70]">
                    I confirm that I purchased authentic products from ANUSMITA and grant permission to feature my feedback on the customer gallery.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-xs"
              >
                Submit Story for Moderation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
