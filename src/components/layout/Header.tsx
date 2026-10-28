import React, { useState } from 'react';
import { useStore, AppRoute } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Phone, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  Sparkles,
  Percent,
  Clock,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    cart, 
    wishlist, 
    setCartDrawerOpen, 
    setSearchModalOpen,
    soundEnabled,
    toggleSound,
    currency,
    toggleCurrency,
    cartTotal,
    formatPrice
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; route: AppRoute; badge?: string }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Shop', route: 'shop' },
    { label: 'Bundles', route: 'bundles' },
    { label: 'Flash Deals', route: 'deals', badge: 'Hot' },
    { label: 'Pre-Orders', route: 'pre-orders', badge: 'Cargo' },
    { label: 'Routine Quiz', route: 'routine-quiz' },
    { label: 'Journal', route: 'journal' },
    { label: 'Contact', route: 'contact' },
  ];

  const moreLinks: { label: string; route: AppRoute }[] = [
    { label: 'Customer Stories', route: 'customer-stories' },
    { label: 'Digital Gift Cards', route: 'gift-cards' },
    { label: 'Track Your Order', route: 'track-order' },
    { label: 'About ANUSMITA', route: 'about' },
    { label: 'Shipping & Delivery', route: 'policy' },
    { label: 'Returns & Refunds', route: 'policy' },
    { label: 'Business ERP & Admin', route: 'admin' },
  ];

  const handleNav = (route: AppRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EADDE0] shadow-[0_2px_12px_rgba(33,29,32,0.03)]">
      {/* Top Announcement Bar */}
      <div className="bg-[#FFF7F3] border-b border-[#EADDE0] text-[#514950] text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-[1240px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#B74764] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 100% Original Asian Beauty
            </span>
            <span className="hidden md:inline text-[#746B70]">• Direct Import from Korea, Japan & China</span>
            <span className="hidden lg:inline bg-[#F9E9ED] text-[#B74764] px-2 py-0.5 rounded font-medium text-[10px]">
              CODE: ANUSMITA10 (10% OFF)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#746B70]">
            <a 
              href="tel:+8801310339192" 
              className="flex items-center gap-1 hover:text-[#B74764] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#B74764]" />
              <span className="font-medium">+880 1310-339192</span>
            </a>

            <button 
              onClick={toggleCurrency}
              className="hover:text-[#B74764] font-medium transition-colors"
              title="Toggle currency display"
            >
              {currency} (৳/$)
            </button>

            <button 
              onClick={toggleSound}
              className="hover:text-[#B74764] transition-colors"
              title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#B74764]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#746B70]" />
              )}
            </button>

            <button 
              onClick={() => handleNav('admin')}
              className="text-[#B74764] hover:underline font-semibold hidden sm:inline"
            >
              ERP / Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#211D20] hover:text-[#B74764] hover:bg-[#FDF1F3] rounded-lg transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-[#211D20] hover:text-[#B74764] hover:bg-[#FDF1F3] rounded-lg transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Wordmark & Tagline */}
        <div 
          onClick={() => handleNav('home')}
          className="cursor-pointer text-center lg:text-left select-none flex-1 lg:flex-none"
        >
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.08em] text-[#211D20] hover:text-[#B74764] transition-colors">
            ANUSMITA
          </h1>
          <p className="text-[10px] tracking-[0.24em] font-semibold text-[#746B70] uppercase mt-[-2px]">
            FASHION · JEWELLERY · BEAUTY
          </p>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`relative px-3 py-2 text-xs xl:text-sm font-medium tracking-wide transition-all rounded-md flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-[#B74764] bg-[#FDF1F3] font-semibold' 
                    : 'text-[#514950] hover:text-[#B74764] hover:bg-[#FFFAF7]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-[#B74764] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Accessible More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="px-2.5 py-2 text-xs xl:text-sm font-medium text-[#514950] hover:text-[#B74764] rounded-md flex items-center gap-1 transition-colors"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-white border border-[#EADDE0] rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                {moreLinks.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => handleNav(m.route)}
                    className="w-full text-left px-4 py-2 text-xs text-[#514950] hover:bg-[#FDF1F3] hover:text-[#B74764] transition-colors font-medium flex items-center justify-between"
                  >
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons: Search, Wishlist, Account, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button 
            onClick={() => setSearchModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#EADDE0] bg-[#FFFAF7] text-xs text-[#746B70] hover:border-[#B74764] hover:text-[#B74764] transition-all"
          >
            <Search className="w-4 h-4 text-[#B74764]" />
            <span className="pr-4">Search authentic products...</span>
            <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] border border-[#EADDE0] text-[#746B70]">⌘K</kbd>
          </button>

          <button
            onClick={() => handleNav('account')}
            className={`p-2 rounded-lg transition-colors ${
              currentRoute === 'account' ? 'text-[#B74764] bg-[#FDF1F3]' : 'text-[#514950] hover:text-[#B74764] hover:bg-[#FDF1F3]'
            }`}
            title="Customer Account & Orders"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNav('shop')}
            className="relative p-2 text-[#514950] hover:text-[#B74764] hover:bg-[#FDF1F3] rounded-lg transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B74764] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 bg-[#B74764] text-white hover:bg-[#9F3652] rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-all"
            aria-label="Open shopping bag"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#B74764] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#B74764]">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">
              {totalCartItems > 0 ? formatPrice(cartTotal) : 'Bag'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EADDE0]">
                <div>
                  <h2 className="font-serif text-xl font-bold tracking-wider text-[#211D20]">ANUSMITA</h2>
                  <p className="text-[9px] tracking-widest text-[#746B70] uppercase">FASHION · JEWELLERY · BEAUTY</p>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#746B70] hover:text-[#211D20] rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.route}
                    onClick={() => handleNav(link.route)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                      currentRoute === link.route 
                        ? 'bg-[#FDF1F3] text-[#B74764] font-semibold' 
                        : 'text-[#514950] hover:bg-[#FFFAF7]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-[#B74764] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EADDE0] space-y-1">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#746B70] mb-2">Additional Services</p>
                {moreLinks.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => handleNav(m.route)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#514950] hover:bg-[#FDF1F3] hover:text-[#B74764]"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADDE0] text-xs text-[#746B70] space-y-2">
              <div className="flex justify-between items-center">
                <span>Direct Hotline:</span>
                <a href="tel:+8801310339192" className="font-semibold text-[#B74764]">
                  +880 1310-339192
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>WhatsApp:</span>
                <a href="https://wa.me/8801310339192" target="_blank" rel="noreferrer" className="text-green-700 font-semibold">
                  Chat Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
