import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  ShoppingBag, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Heart,
  ChevronRight
} from 'lucide-react';

export const RoutineQuizPage: React.FC = () => {
  const { products, addToCart, navigateTo, formatPrice } = useStore();

  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('Combination');
  const [concerns, setConcerns] = useState<string[]>(['Acne', 'Sensitive']);
  const [preference, setPreference] = useState<string>('Lightweight & Non-sticky');

  const skinTypes = [
    { id: 'Oily', label: 'Oily Skin', desc: 'Prone to excess shine, enlarged pores, and occasional breakouts' },
    { id: 'Dry', label: 'Dry Skin', desc: 'Feels tight, flaking, or rough, especially after washing' },
    { id: 'Combination', label: 'Combination Skin', desc: 'Oily T-zone (forehead, nose) with normal or dry cheeks' },
    { id: 'Sensitive', label: 'Sensitive Skin', desc: 'Easily reddened, reacts quickly to harsh weather or fragrances' },
    { id: 'Not sure', label: 'Not Sure', desc: 'Changes with weather and needs balanced gentle hydration' }
  ];

  const concernOptions = [
    'Acne & Breakouts',
    'Hyperpigmentation & Dark Spots',
    'Sun Protection & Glass Glow',
    'Redness & Barrier Repair',
    'Dehydration & Tightness',
    'Uneven Texture'
  ];

  const preferenceOptions = [
    'Lightweight & Non-sticky (Zero heaviness in humidity)',
    'Deep Nourishment & Intense Moisture',
    '100% Fragrance-Free & Hypoallergenic',
    'Multi-functional & Fast 3-Step Routine'
  ];

  const handleToggleConcern = (con: string) => {
    setConcerns(prev => 
      prev.includes(con) ? prev.filter(c => c !== con) : [...prev, con]
    );
  };

  // Curated product recommendations based on answers
  const amCleanserOrToner = products.find(p => p.id === 'prod-103') || products[2]; // Hada Labo
  const ampouleOrSerum = products.find(p => p.id === 'prod-101') || products[0]; // Centella
  const morningSunscreen = products.find(p => p.id === 'prod-102') || products[1]; // Relief Sun
  const eveningLipCare = products.find(p => p.id === 'prod-109') || products[8]; // Laneige

  const recommendedRoutine = [
    {
      step: 'Step 1: Hydrate & Prep',
      time: 'AM & PM',
      product: amCleanserOrToner,
      reason: '7-molecular hyaluronic acid deeply replenishes moisture barrier without clogging pores.'
    },
    {
      step: 'Step 2: Soothe & Repair',
      time: 'AM & PM',
      product: ampouleOrSerum,
      reason: 'Pure Madagascar Centella Asiatica calms irritation, soothes active redness, and accelerates healing.'
    },
    {
      step: 'Step 3: UV Shield & Glass Glow',
      time: 'Morning (AM)',
      product: morningSunscreen,
      reason: 'Rice and grain probiotics deliver broad spectrum SPF50+ protection with luminous, natural glass skin.'
    },
    {
      step: 'Step 4: Overnight Restoration',
      time: 'Night (PM)',
      product: eveningLipCare,
      reason: 'Berry fruit antioxidants gently dissolve dead skin cells while you sleep.'
    }
  ];

  const routineSubtotal = recommendedRoutine.reduce((acc, r) => acc + r.product.price, 0);
  const bundleDiscount = 650;
  const routineBundlePrice = routineSubtotal - bundleDiscount;

  const handleAddAllToCart = () => {
    recommendedRoutine.forEach(r => {
      addToCart(r.product, { quantity: 1 });
    });
    navigateTo('cart');
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Asian Skincare Diagnostic Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
          “Your skin. Your routine.”
        </h1>
        <p className="text-xs sm:text-base text-[#746B70] max-w-lg mx-auto leading-relaxed">
          A few simple questions. A routine made for you. Discover authentic dermatological solutions grounded in Asian herbal wisdom.
        </p>
      </div>

      {/* Wizard Steps Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-semibold">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
              step === s
                ? 'bg-[#B74764] text-white shadow-xs font-bold'
                : step > s
                ? 'bg-green-600 text-white'
                : 'bg-white border border-[#EADDE0] text-[#746B70]'
            }`}>
              {step > s ? '✓' : s}
            </span>
            {s < 4 && <span className="w-8 h-0.5 bg-[#EADDE0]"></span>}
          </div>
        ))}
      </div>

      {/* STEP 1: SKIN TYPE */}
      {step === 1 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B74764] uppercase">Question 1 of 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">How does your skin feel by midday?</h2>
            <p className="text-xs text-[#746B70]">Select the skin type that best describes your everyday experience in Bangladesh climate.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {skinTypes.map((st) => (
              <div
                key={st.id}
                onClick={() => setSkinType(st.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition ${
                  skinType === st.id
                    ? 'border-[#B74764] bg-[#FDF1F3] shadow-xs'
                    : 'border-[#EADDE0] bg-[#FFFAF7] hover:border-[#B74764]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base font-bold text-[#211D20]">{st.label}</h3>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    skinType === st.id ? 'border-[#B74764] bg-[#B74764] text-white' : 'border-[#EADDE0]'
                  }`}>
                    {skinType === st.id && <Check className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-xs text-[#514950] mt-1.5 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xs"
            >
              <span>Next: Primary Concerns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CONCERNS */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B74764] uppercase">Question 2 of 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">What are your primary skin goals?</h2>
            <p className="text-xs text-[#746B70]">Select up to 3 concerns that you would like your routine to target.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {concernOptions.map((con) => {
              const isSelected = concerns.includes(con);
              return (
                <div
                  key={con}
                  onClick={() => handleToggleConcern(con)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'border-[#B74764] bg-[#FDF1F3] shadow-xs text-[#B74764] font-bold'
                      : 'border-[#EADDE0] bg-[#FFFAF7] text-[#514950] hover:border-[#B74764]'
                  }`}
                >
                  <span className="text-xs font-medium">{con}</span>
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    isSelected ? 'border-[#B74764] bg-[#B74764] text-white' : 'border-[#EADDE0]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#746B70] hover:text-[#211D20]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xs"
            >
              <span>Next: Formulation Preference</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREFERENCES */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B74764] uppercase">Question 3 of 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">What texture and formulation do you prefer?</h2>
            <p className="text-xs text-[#746B70]">Personalizing absorption speed and daytime finish.</p>
          </div>

          <div className="space-y-3 pt-2">
            {preferenceOptions.map((pref) => (
              <div
                key={pref}
                onClick={() => setPreference(pref)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  preference === pref
                    ? 'border-[#B74764] bg-[#FDF1F3] shadow-xs text-[#B74764] font-bold'
                    : 'border-[#EADDE0] bg-[#FFFAF7] text-[#514950] hover:border-[#B74764]'
                }`}
              >
                <span className="text-xs">{pref}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  preference === pref ? 'border-[#B74764] bg-[#B74764] text-white' : 'border-[#EADDE0]'
                }`}>
                  {preference === pref && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-[#746B70] hover:text-[#211D20]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xs"
            >
              <span>Generate My Tailored Routine</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULTS: TAILORED AM/PM ROUTINE */}
      {step === 4 && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-[#FFF7F3] rounded-3xl p-6 sm:p-8 border border-[#EADDE0] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs font-bold text-[#B74764] uppercase tracking-wider">Diagnostic Summary</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20]">
                Your Tailored Asian Beauty Regimen
              </h2>
              <p className="text-xs text-[#746B70] mt-1">
                Calibrated for: <strong className="text-[#211D20]">{skinType} Skin</strong> • Targets: <strong className="text-[#211D20]">{concerns.join(', ')}</strong>
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#746B70] hover:text-[#B74764] flex items-center gap-1 border border-[#EADDE0] bg-white px-3.5 py-2 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Routine Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedRoutine.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#EADDE0] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-4">
                  <img 
                    src={item.product.mainImage} 
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-[#FFF7F3] shrink-0 border border-[#EADDE0]"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">{item.step}</span>
                      <span className="text-[10px] bg-[#FFF7F3] text-[#746B70] px-2 py-0.5 rounded-full font-semibold border border-[#EADDE0]">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#211D20] leading-snug">
                      {item.product.name}
                    </h3>
                    <p className="text-xs font-bold text-[#B74764]">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#FFFAF7] rounded-xl border border-[#EADDE0] text-xs text-[#514950]">
                  <p><strong>Why It’s Chosen:</strong> {item.reason}</p>
                </div>

                <button
                  onClick={() => addToCart(item.product)}
                  className="w-full bg-[#FFF7F3] hover:bg-[#FDF1F3] text-[#B74764] font-bold py-2.5 rounded-xl text-xs border border-[#B74764]/20 transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Step to Bag</span>
                </button>
              </div>
            ))}
          </div>

          {/* 1-Click Complete Routine Purchase Banner */}
          <div className="bg-[#211D20] text-[#F8F3F0] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold text-[#B74764] uppercase tracking-wider">Bundle Savings</span>
              <h3 className="font-serif text-2xl font-bold text-white">Order the Complete 4-Step Regimen</h3>
              <p className="text-xs text-[#D4C8C2]">
                Includes free courier delivery across Dhaka & countrywide with authentic batch certificates.
              </p>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-bold text-[#FFFFFF]">{formatPrice(routineBundlePrice)}</span>
                <span className="text-sm text-[#A89E99] line-through">{formatPrice(routineSubtotal)}</span>
                <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save {formatPrice(bundleDiscount)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddAllToCart}
              className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-4 px-8 rounded-2xl text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All 4 Steps to Bag</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
