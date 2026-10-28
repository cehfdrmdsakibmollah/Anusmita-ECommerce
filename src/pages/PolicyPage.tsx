import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ChevronRight
} from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms' | 'faq'>('shipping');

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all products at ANUSMITA 100% genuine and original?',
      a: 'Yes, unconditionally. We import directly from brand-authorized distributors in Seoul (South Korea), Tokyo and Osaka (Japan), and specialty ateliers in China. Every unit carries authentic manufacturing batch numbers, holographic seals, and barcode verification.'
    },
    {
      q: 'What are the delivery charges and timelines?',
      a: 'Inside Dhaka: ৳80 delivery charge with delivery in 24 to 48 hours. Outside Dhaka across all 64 districts of Bangladesh: ৳150 delivery charge via Pathao or Steadfast courier with delivery in 2 to 3 business days.'
    },
    {
      q: 'Is Cash on Delivery (COD) available nationwide?',
      a: 'Yes! We offer Cash on Delivery across all cities and upazilas in Bangladesh. You may inspect the outer package before paying the courier representative.'
    },
    {
      q: 'How does the 3-day easy return policy work?',
      a: 'If your product arrives damaged or unsealed, notify our team within 3 days with a brief unboxing video. We will dispatch an immediate replacement or process a full refund to your bKash/bank account.'
    },
    {
      q: 'How do pre-orders from overseas work?',
      a: 'When popular items are in transit from Seoul or Tokyo, you can reserve them with a 30% advance deposit via bKash/Nagad. The remaining 70% is payable upon delivery when the cargo arrives at our Dhaka hub.'
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Policies & Customer Guidance</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Transparency & Trust
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
          Policies, Shipping & FAQs
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Clear, honest policies for orders, deliveries, returns, data privacy, and common customer questions.
        </p>
      </div>

      {/* Policy Tabs */}
      <div className="flex border-b border-[#EADDE0] gap-2 overflow-x-auto text-xs font-semibold pb-2">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'shipping' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Delivery</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'returns' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Returns & Refunds</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'faq' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'privacy' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'terms' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs text-xs sm:text-sm text-[#514950] leading-relaxed">
        
        {/* 1. SHIPPING POLICY */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Shipping & Delivery Policy</h2>
            <div className="space-y-3">
              <h3 className="font-bold text-[#211D20] text-sm">1. Delivery Zones & Flat Charges</h3>
              <p>
                • <strong>Inside Dhaka Metropolitan:</strong> ৳80 flat delivery fee. Delivery completed within 24 to 48 hours.<br />
                • <strong>Outside Dhaka (All Bangladesh Districts):</strong> ৳150 flat delivery fee via Steadfast or Pathao courier. Delivery takes 2 to 3 business days.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#211D20] text-sm">2. Free Shipping Eligibility</h3>
              <p>
                Orders exceeding <strong>৳3,500</strong> automatically qualify for complimentary free delivery anywhere within Dhaka.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#211D20] text-sm">3. Packaging Security</h3>
              <p>
                Skincare glass flacons and luxury cosmetics are cushioned with double-layered bubble wrap and sealed inside branded Anusmita tamper-evident cartons.
              </p>
            </div>
          </div>
        )}

        {/* 2. RETURNS & REFUNDS */}
        {activeTab === 'returns' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Returns & Refund Policy</h2>
            <p>
              We stand behind every single item imported to Bangladesh. Because cosmetic hygiene is paramount, please review our straightforward return guidelines:
            </p>
            <div className="space-y-2">
              <h3 className="font-bold text-[#211D20] text-sm">Eligibility for Replacement:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Defective, leaking, or damaged container during transit.</li>
                <li>Incorrect product, variant volume, or apparel size received.</li>
                <li>Notification submitted within 72 hours (3 days) of parcel delivery.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-[#211D20] text-sm">Refund Processing:</h3>
              <p>
                Approved refunds are disbursed via bKash, Nagad, or original payment method within 3 business days of item inspection.
              </p>
            </div>
          </div>
        )}

        {/* 3. FAQ ACCORDION */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#211D20] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border border-[#EADDE0] rounded-2xl overflow-hidden bg-[#FFFAF7]/60">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full text-left p-4 sm:p-5 font-serif text-base font-bold text-[#211D20] flex items-center justify-between hover:bg-[#FDF1F3] transition"
                    >
                      <span>{f.q}</span>
                      <span className="text-[#B74764] ml-2 shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs text-[#514950] leading-relaxed border-t border-[#EADDE0]/60">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Privacy Policy</h2>
            <p>
              ANUSMITA respects your privacy. We collect only essential contact details (name, phone number, delivery address) necessary to fulfill courier delivery through our logistics partners.
            </p>
            <p>
              We never sell, rent, or trade your personal data. Payment transactions are processed through verified official gateways (bKash/Nagad); raw credentials or PINs are never stored on our servers.
            </p>
          </div>
        )}

        {/* 5. TERMS OF SERVICE */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Terms of Service</h2>
            <p>
              By accessing ANUSMITA or placing an order, you agree to these commercial terms. We reserve the right to verify high-value Cash on Delivery orders via phone prior to dispatch to prevent fictitious orders.
            </p>
            <p>
              All trademarks, product logos, and brand names (e.g. Beauty of Joseon, SKIN1004, Laneige, COSRX) are the property of their respective trademark holders.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
