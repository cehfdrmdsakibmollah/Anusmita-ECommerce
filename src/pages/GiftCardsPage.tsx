import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Sparkles, Send, Calendar, Check, ChevronRight } from 'lucide-react';

export const GiftCardsPage: React.FC = () => {
  const { navigateTo, formatPrice, showToast } = useStore();

  const [selectedStyle, setSelectedStyle] = useState<'Classic' | 'Blush' | 'Celebration'>('Blush');
  const [selectedAmount, setSelectedAmount] = useState<number>(2000);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryTiming, setDeliveryTiming] = useState<'now' | 'schedule'>('now');

  const denominations = [500, 1000, 2000, 5000];

  const handleOrderGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail || !senderName) {
      alert('Please fill in recipient and sender details.');
      return;
    }
    showToast(`Gift voucher (${formatPrice(selectedAmount)}) added to bag preview!`);
    navigateTo('shop');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Digital Gift Cards</span>
      </nav>

      {/* Hero */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          The Luxury of Choice
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
          “A little gift. Endless possibilities.”
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Surprise loved ones with a bespoke ANUSMITA digital voucher. Redeemable across all Korean skincare, Mulberry silk attire, and 18K jewellery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: LIVE VISUAL PREVIEW */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          <div className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Live Card Preview</div>
          
          <div className={`p-8 rounded-3xl border shadow-xl flex flex-col justify-between aspect-16/10 text-white relative overflow-hidden transition-all duration-300 ${
            selectedStyle === 'Blush' 
              ? 'bg-gradient-to-br from-[#B74764] to-[#9F3652] border-[#F4DCE3]/40' 
              : selectedStyle === 'Celebration'
              ? 'bg-gradient-to-br from-[#211D20] via-[#3a3036] to-[#1E2533] border-[#C0A06B]/50'
              : 'bg-gradient-to-br from-[#514950] to-[#211D20] border-[#EADDE0]/30'
          }`}>
            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-widest">ANUSMITA</h3>
                <p className="text-[9px] tracking-widest uppercase opacity-80">FASHION · JEWELLERY · BEAUTY</p>
              </div>
              <Gift className="w-6 h-6 opacity-80" />
            </div>

            <div className="z-10 space-y-1">
              <span className="text-xs uppercase tracking-wider opacity-75">Gift Voucher Value</span>
              <p className="font-serif text-3xl font-bold">{formatPrice(selectedAmount)}</p>
            </div>

            <div className="z-10 pt-2 border-t border-white/20 flex justify-between items-end text-xs">
              <div>
                <p className="text-[10px] opacity-75">FOR:</p>
                <p className="font-bold">{recipientName || 'Recipient Name'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-75">FROM:</p>
                <p className="font-bold">{senderName || 'Your Name'}</p>
              </div>
            </div>

            {/* Subtle decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-md pointer-events-none" />
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EADDE0] text-xs text-[#746B70] space-y-1">
            <p className="font-bold text-[#211D20]">Digital Delivery & Redemption:</p>
            <p>Vouchers include a secure 12-character alpha-numeric redemption code sent to the recipient’s email. Never expires.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: CUSTOMIZATION FORM */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs space-y-6">
          <form onSubmit={handleOrderGiftCard} className="space-y-6">
            
            {/* Visual Style Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70]">
                1. Select Card Aesthetic
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Blush', 'Celebration', 'Classic'] as const).map((style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-3 rounded-2xl border text-xs font-semibold transition ${
                      selectedStyle === style
                        ? 'bg-[#FDF1F3] border-[#B74764] text-[#B74764] shadow-xs'
                        : 'border-[#EADDE0] text-[#514950] hover:border-[#B74764]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Denomination */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70]">
                2. Select Voucher Amount (BDT)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {denominations.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      selectedAmount === amt
                        ? 'bg-[#B74764] text-white border-[#B74764] shadow-xs'
                        : 'bg-[#FFFAF7] text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                  >
                    {formatPrice(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3 pt-2 border-t border-[#EADDE0] text-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70] block">
                3. Recipient Information
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#514950]">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tasnim Ahmed"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#514950]">Recipient Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tasnim@gmail.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Your Name (Sender) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Siddiqa"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Personal Message</label>
                <textarea
                  rows={2}
                  placeholder="Write a heartwarming note for the occasion..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>
            </div>

            {/* Delivery Timing */}
            <div className="space-y-2 pt-2 border-t border-[#EADDE0] text-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70] block">
                4. Delivery Schedule
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timing"
                    checked={deliveryTiming === 'now'}
                    onChange={() => setDeliveryTiming('now')}
                    className="accent-[#B74764]"
                  />
                  <span>Send instantly after purchase confirmation</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Purchase Gift Card ({formatPrice(selectedAmount)})</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
