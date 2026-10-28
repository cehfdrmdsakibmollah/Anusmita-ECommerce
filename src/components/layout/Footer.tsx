import React from 'react';
import { useStore, AppRoute } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();
  const currentYear = new Date().getFullYear();

  const handleNav = (route: AppRoute, param?: string) => {
    navigateTo(route, param);
  };

  return (
    <footer className="bg-[#252525] text-[#F8F3F0] pt-16 pb-12 border-t border-[#383838]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-[#3d3d3d]">
          {/* Brand Column: Text-only ANUSMITA wordmark with Tagline */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-serif text-3xl font-bold tracking-[0.08em] text-[#FFFFFF]">
              ANUSMITA
            </h2>
            <p className="text-xs tracking-[0.24em] font-semibold text-[#D4C8C2] uppercase">
              FASHION · JEWELLERY · BEAUTY
            </p>
            <p className="text-xs sm:text-sm text-[#A89E99] leading-relaxed max-w-md pt-2">
              Authentic Asian beauty and elegant lifestyle collections thoughtfully sourced directly from 
              Korea, Japan, and China for Bangladesh. Committed to uncompromising purity, verified authenticity, 
              and skin-safe formulations.
            </p>
            <div className="pt-2 text-xs text-[#C8BEB9] space-y-1">
              <p>Email: <a href="mailto:anusmitashopbd@gmail.com" className="hover:text-white underline">anusmitashopbd@gmail.com</a></p>
              <p>Hotline: <a href="tel:+8801310339192" className="hover:text-white underline">+880 1310-339192</a></p>
            </div>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF]">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs text-[#B5ABA5]">
              <li>
                <button 
                  onClick={() => handleNav('track-order')}
                  className="hover:text-white transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policy')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policy')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('policy')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#FFFFFF]">
              Shop
            </h3>
            <ul className="space-y-2 text-xs text-[#B5ABA5]">
              <li>
                <button 
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors"
                >
                  Beauty & Skincare
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors"
                >
                  Fashion & Jewellery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors"
                >
                  Home & Lifestyle
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('bundles')}
                  className="hover:text-white transition-colors"
                >
                  Curated Routine Bundles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('pre-orders')}
                  className="hover:text-white transition-colors"
                >
                  Overseas Pre-Orders
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8480]">
          <p>© {currentYear} ANUSMITA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleNav('policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNav('policy')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNav('admin')}
              className="hover:text-white text-[#D4C8C2] transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
