import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageSquare, 
  Clock, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Ruler, 
  X,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    formatPrice,
    navigateTo 
  } = useStore();

  const product = selectedProduct || products[0];

  // States
  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants[0]?.id || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'shipping' | 'reviews' | 'qa'>('details');
  const [isBundleChecked, setIsBundleChecked] = useState<boolean>(true);
  const [userDistrict, setUserDistrict] = useState<'Dhaka' | 'Outside'>('Dhaka');
  const [liveViewers, setLiveViewers] = useState<number>(14);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [activeInspectionView, setActiveInspectionView] = useState<'gallery' | '360' | 'texture'>('gallery');

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Size calculator inputs
  const [calcHeight, setCalcHeight] = useState('');
  const [calcWeight, setCalcWeight] = useState('');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  // Update active image if product changes
  useEffect(() => {
    setActiveImage(product.mainImage);
    if (product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  // Live viewers simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveViewers(Math.floor(Math.random() * 8) + 11);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const activePrice = currentVariant ? currentVariant.price : product.price;

  // Bundle companion item (e.g. Centella Ampoule + Sunscreen or Silk Kurti + Pearl Choker)
  const companionProduct = products.find(p => p.id !== product.id && (p.category === product.category || p.category === 'Jewellery')) || products[1];
  const bundleDiscount = 350;
  const bundleCombinedPrice = activePrice + companionProduct.price - bundleDiscount;

  const handleAddToCart = (directCheckout = false) => {
    addToCart(product, {
      variantId: currentVariant?.id,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    if (isBundleChecked && companionProduct) {
      addToCart(companionProduct, { quantity: 1 });
    }
    if (directCheckout) {
      navigateTo('checkout');
    }
  };

  const handleColorSelect = (colorObj: { name: string; hex: string; image?: string }) => {
    setSelectedColor(colorObj.name);
    if (colorObj.image) {
      setActiveImage(colorObj.image);
    }
  };

  const calculateUserSize = () => {
    if (!calcWeight) return;
    const w = Number(calcWeight);
    if (w < 55) setCalculatedSize('S (36)');
    else if (w <= 68) setCalculatedSize('M (38)');
    else if (w <= 80) setCalculatedSize('L (40)');
    else setCalculatedSize('XL (42)');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      setReviewSubmitted(true);
    }
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.origin === product.origin))
    .slice(0, 3);

  const deliveryFee = userDistrict === 'Dhaka' ? 80 : 150;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5 flex-wrap">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('shop')} className="hover:text-[#B74764]">Shop</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#514950] font-medium">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Image Gallery & 360/Texture Inspection */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative bg-[#FFF7F3] rounded-3xl border border-[#EADDE0] overflow-hidden p-6 flex items-center justify-center">
            {activeInspectionView === 'gallery' && (
              <img 
                src={activeImage} 
                alt={product.name}
                className="max-h-[460px] w-auto object-contain rounded-2xl shadow-xs transition-all duration-300"
              />
            )}
            {activeInspectionView === '360' && (
              <div className="h-[420px] w-full flex flex-col items-center justify-center text-center p-6 bg-white/70 rounded-2xl space-y-3">
                <Sparkles className="w-10 h-10 text-[#B74764] animate-spin" />
                <h4 className="font-serif text-lg font-bold text-[#211D20]">360° Multi-Angle Studio View</h4>
                <p className="text-xs text-[#746B70] max-w-sm">
                  Drag with mouse or swipe on touch screen to inspect symmetry, finish, and packaging craftsmanship.
                </p>
                <div className="inline-block bg-[#FDF1F3] text-[#B74764] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#B74764]/20">
                  Front · Side Profile · Seal Verification Active
                </div>
              </div>
            )}
            {activeInspectionView === 'texture' && (
              <div className="h-[420px] w-full flex flex-col items-center justify-center text-center p-6 bg-white/80 rounded-2xl space-y-3">
                <Award className="w-10 h-10 text-[#B74764]" />
                <h4 className="font-serif text-lg font-bold text-[#211D20]">Macro Texture & Authenticity Zoom</h4>
                <p className="text-xs text-[#746B70] max-w-sm">
                  Inspecting authentic batch stamps, formulation purity, and certified fabric weave density.
                </p>
                <p className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-md border border-green-200">
                  ✓ Verified Original Import Seal Intact
                </p>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-white/95 backdrop-blur-xs text-[#211D20] text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-[#EADDE0]">
                {product.origin === 'Korea' ? '🇰🇷 Korea' : product.origin === 'Japan' ? '🇯🇵 Japan' : '🇨🇳 China'}
              </span>
              {product.isFlashDeal && (
                <span className="bg-[#B74764] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Flash Deal
                </span>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs rounded-xl p-1 border border-[#EADDE0] flex gap-1 text-[11px] font-semibold text-[#514950]">
              <button 
                onClick={() => setActiveInspectionView('gallery')}
                className={`px-2.5 py-1 rounded-lg transition ${activeInspectionView === 'gallery' ? 'bg-[#B74764] text-white' : 'hover:text-[#B74764]'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => setActiveInspectionView('360')}
                className={`px-2.5 py-1 rounded-lg transition ${activeInspectionView === '360' ? 'bg-[#B74764] text-white' : 'hover:text-[#B74764]'}`}
              >
                360° View
              </button>
              <button 
                onClick={() => setActiveInspectionView('texture')}
                className={`px-2.5 py-1 rounded-lg transition ${activeInspectionView === 'texture' ? 'bg-[#B74764] text-white' : 'hover:text-[#B74764]'}`}
              >
                Texture Zoom
              </button>
            </div>
          </div>

          {/* Thumbnails list */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImage(img);
                  setActiveInspectionView('gallery');
                }}
                className={`w-18 h-18 rounded-2xl overflow-hidden bg-white border-2 transition-all shrink-0 p-1 ${
                  activeImage === img && activeInspectionView === 'gallery'
                    ? 'border-[#B74764] shadow-xs'
                    : 'border-[#EADDE0] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>

          {/* Sourcing & Authenticity Guarantee Banner */}
          <div className="p-4 bg-white rounded-2xl border border-[#EADDE0] flex items-center gap-3 text-xs">
            <ShieldCheck className="w-6 h-6 text-green-700 shrink-0" />
            <div>
              <p className="font-bold text-[#211D20]">100% Genuine Authenticity Guarantee</p>
              <p className="text-[#746B70] text-[11px]">
                Imported directly via air/sea freight from verified Asian suppliers. Free replacement if unsealed.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Information, Options, & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Brand, Title, Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">{product.brand}</span>
              <span className="text-[11px] text-[#746B70]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D20] leading-snug">
              {product.name}
            </h1>

            {product.banglaName && (
              <p className="text-xs text-[#746B70] font-medium">
                {product.banglaName}
              </p>
            )}

            {/* Ratings & Live Viewers */}
            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-[#211D20] ml-1">{product.rating.toFixed(1)}</span>
                <span className="text-[#746B70]">({product.reviewCount} customer reviews)</span>
              </div>
              <span className="text-[#EADDE0]">•</span>
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span>{liveViewers} people viewing now</span>
              </div>
            </div>
          </div>

          {/* Pricing & Stock State */}
          <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#B74764]">
                  {formatPrice(activePrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#746B70] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#746B70] mt-0.5">
                Inclusive of Bangladesh VAT. Free shipping on orders over ৳3,500.
              </p>
            </div>

            {/* Stock indicator badge */}
            <div>
              {isOutOfStock ? (
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl block text-center">
                  ✈️ Available for Pre-Order
                </span>
              ) : isLowStock ? (
                <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-xl block text-center animate-pulse">
                  ⚠️ Only {product.stock} items left!
                </span>
              ) : (
                <span className="bg-green-50 text-green-800 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-xl block text-center">
                  ✓ In Stock (Dhaka Hub)
                </span>
              )}
            </div>
          </div>

          {/* CATEGORY-AWARE DYNAMIC OPTIONS */}

          {/* A. Volume Selection (Skincare & Perfumes) */}
          {product.variantType === 'volume' && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70]">
                Select Volume / Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                      selectedVariantId === v.id
                        ? 'bg-[#B74764] text-white border-[#B74764] shadow-xs'
                        : 'bg-white text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                  >
                    <span>{v.label}</span>
                    <span className="ml-1.5 font-bold">({formatPrice(v.price)})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* B. Color Swatches (Fashion, Bags) */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[#746B70]">
                  Color: <strong className="text-[#211D20]">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorSelect(c)}
                    className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === c.name 
                        ? 'border-[#B74764] scale-110 shadow-sm' 
                        : 'border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                    title={c.name}
                  >
                    <span className="block w-full h-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* C. Apparel / Bedding Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[#746B70]">
                  {product.category === 'Bedsheets' ? 'Select Bedding Size:' : 'Select Apparel Size:'}
                </span>
                {product.category === 'Fashion' && (
                  <button 
                    onClick={() => setShowSizeModal(true)}
                    className="text-[#B74764] font-semibold underline flex items-center gap-1 hover:text-[#9F3652]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Smart Fit Calculator</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                      selectedSize === s
                        ? 'bg-[#211D20] text-white border-[#211D20]'
                        : 'bg-white text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* D. Jewellery Material & Anti-Tarnish Guarantee Badge */}
          {product.category === 'Jewellery' && (
            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs space-y-1">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>18K PVD Anti-Tarnish Guarantee</span>
              </p>
              <p className="text-amber-800 text-[11px]">
                Vacuum electroplated with real 18K Gold over hypoallergenic stainless steel. Waterproof and sweatproof.
              </p>
            </div>
          )}

          {/* Quantity & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#EADDE0] rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                >
                  -
                </button>
                <span className="px-4 py-3 text-xs font-bold text-[#211D20]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(false)}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md ${
                  isOutOfStock
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-[#B74764] hover:bg-[#9F3652] text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Reserve via Pre-Order' : 'Add to Shopping Bag'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border border-[#EADDE0] transition ${
                  isWishlisted ? 'bg-[#B74764] text-white' : 'bg-white text-[#746B70] hover:text-[#B74764]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(true)}
              className="w-full bg-[#211D20] hover:bg-[#B74764] text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition shadow-sm"
            >
              Buy Now (Instant Checkout)
            </button>
          </div>

          {/* Quick Delivery Estimator */}
          <div className="p-4 bg-white rounded-2xl border border-[#EADDE0] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#211D20] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#B74764]" />
                <span>Estimated Delivery & Courier</span>
              </span>
              <select
                value={userDistrict}
                onChange={(e) => setUserDistrict(e.target.value as any)}
                className="bg-[#FFF7F3] border border-[#EADDE0] rounded-lg px-2 py-1 text-xs font-medium focus:outline-none"
              >
                <option value="Dhaka">Inside Dhaka (৳80)</option>
                <option value="Outside">Outside Dhaka (৳150)</option>
              </select>
            </div>
            <p className="text-[11px] text-[#746B70]">
              Dispatch within 24 hours via Pathao/Steadfast with live SMS tracking. Cash on delivery accepted.
            </p>
          </div>

          {/* Direct WhatsApp Consultation Link */}
          <a
            href={`https://wa.me/8801310339192?text=${encodeURIComponent(`Hello ANUSMITA! I have a question about ${product.name} (Price: ৳${activePrice}). Could you please advise?`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 bg-white border border-[#EADDE0] hover:border-green-600 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-[#514950] hover:text-green-700 transition"
          >
            <MessageSquare className="w-4 h-4 text-green-600" />
            <span>Chat on WhatsApp about this item (+880 1310-339192)</span>
          </a>

          {/* COMPLETE THE ROUTINE / PAIRING BUNDLE WIDGET */}
          {companionProduct && (
            <div className="p-5 bg-white rounded-3xl border border-[#EADDE0] space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#211D20]">
                  ✨ Complete Your Routine & Save
                </h3>
                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save {formatPrice(bundleDiscount)} on Duo
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0]">
                <img 
                  src={companionProduct.mainImage} 
                  alt={companionProduct.name}
                  className="w-14 h-14 rounded-xl object-cover bg-white shrink-0 border border-[#EADDE0]/60"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#B74764] uppercase">{companionProduct.brand}</p>
                  <p className="text-xs font-semibold text-[#211D20] truncate">{companionProduct.name}</p>
                  <p className="text-xs font-bold text-[#B74764] mt-0.5">{formatPrice(companionProduct.price)}</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-[#EADDE0] text-xs font-semibold text-[#211D20]">
                  <input
                    type="checkbox"
                    checked={isBundleChecked}
                    onChange={(e) => setIsBundleChecked(e.target.checked)}
                    className="accent-[#B74764] w-4 h-4"
                  />
                  <span>Add Duo</span>
                </label>
              </div>

              {isBundleChecked && (
                <div className="flex justify-between items-center text-xs pt-1 text-[#514950]">
                  <span>Combined Bundle Price:</span>
                  <span className="font-bold text-[#B74764] text-sm">{formatPrice(bundleCombinedPrice)}</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* TABS SECTION: Details, Ingredients, Shipping, Reviews, Q&A */}
      <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-[#EADDE0] gap-4 sm:gap-8 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'details' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70] hover:text-[#211D20]'
            }`}
          >
            Product Overview & Benefits
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'ingredients' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70] hover:text-[#211D20]'
            }`}
          >
            Ingredients & Formulation Safety
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'shipping' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70] hover:text-[#211D20]'
            }`}
          >
            Shipping & Return Policies
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'reviews' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70] hover:text-[#211D20]'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs sm:text-sm text-[#514950] leading-relaxed">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              {product.benefits && (
                <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0]">
                  <h4 className="font-bold text-[#211D20] mb-1 text-xs sm:text-sm">✨ Key Dermatological Benefits:</h4>
                  <p>{product.benefits}</p>
                </div>
              )}
              {product.howToUse && (
                <div className="p-4 bg-white rounded-2xl border border-[#EADDE0]">
                  <h4 className="font-bold text-[#211D20] mb-1 text-xs sm:text-sm">📌 Recommended Application:</h4>
                  <p>{product.howToUse}</p>
                </div>
              )}
              {product.specs && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {product.specs.material && (
                    <div className="p-3 bg-[#FFFAF7] rounded-xl border border-[#EADDE0]">
                      <span className="text-[10px] uppercase font-bold text-[#746B70] block">Material</span>
                      <span className="font-semibold text-[#211D20] text-xs">{product.specs.material}</span>
                    </div>
                  )}
                  {product.specs.dimensions && (
                    <div className="p-3 bg-[#FFFAF7] rounded-xl border border-[#EADDE0]">
                      <span className="text-[10px] uppercase font-bold text-[#746B70] block">Dimensions</span>
                      <span className="font-semibold text-[#211D20] text-xs">{product.specs.dimensions}</span>
                    </div>
                  )}
                  {product.specs.plating && (
                    <div className="p-3 bg-[#FFFAF7] rounded-xl border border-[#EADDE0]">
                      <span className="text-[10px] uppercase font-bold text-[#746B70] block">Plating Finish</span>
                      <span className="font-semibold text-[#211D20] text-xs">{product.specs.plating}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 text-green-900 font-semibold text-xs">
                <Check className="w-4 h-4 text-green-700" />
                <span>EWG Verified Safety Rating: {product.safetyScore || 'Dermatologist Tested & Hypoallergenic'}</span>
              </div>
              <div>
                <h4 className="font-bold text-[#211D20] mb-1">Full Ingredient List (INCI):</h4>
                <p className="text-xs text-[#746B70] leading-relaxed bg-[#FFF7F3] p-4 rounded-2xl border border-[#EADDE0]">
                  {product.ingredients || 'Centella Asiatica Extract, Water, Butylene Glycol, Glycerin, 1,2-Hexanediol, Betaine, Ethylhexylglycerin, Allantoin, Panthenol.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>🚚 <strong>Inside Dhaka:</strong> Delivery in 24 to 48 hours. Charge: ৳80.</p>
              <p>🚚 <strong>Outside Dhaka:</strong> Delivery in 2 to 3 business days via Steadfast/Pathao. Charge: ৳150.</p>
              <p>🔄 <strong>Return Policy:</strong> 3-day easy return upon providing an unboxing video if any seal or container is damaged.</p>
              <p>💳 <strong>Payment:</strong> Cash on Delivery, bKash, and Nagad accepted with zero hidden charges.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Existing verified reviews */}
              <div className="space-y-3">
                <div className="p-4 bg-[#FFFAF7] rounded-2xl border border-[#EADDE0] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#211D20]">Maimuna Tabassum (Gulshan, Dhaka)</span>
                    <span className="text-[10px] text-[#746B70]">Oct 25, 2026</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] font-bold text-green-700 ml-1">Verified Purchase</span>
                  </div>
                  <p className="text-xs text-[#514950]">
                    "100% authentic. The holographic sticker is present and the texture matches my bottle bought from Incheon airport."
                  </p>
                </div>
              </div>

              {/* Add review form */}
              <div className="p-5 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] space-y-3">
                <h4 className="font-bold text-[#211D20] text-xs sm:text-sm">Write a Customer Review</h4>
                {reviewSubmitted ? (
                  <p className="text-xs text-green-700 font-bold bg-green-50 p-3 rounded-xl border border-green-200">
                    Thank you! Your verified review has been received and logged for moderation.
                  </p>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#514950]">Your Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1"
                          >
                            <Star className={`w-4 h-4 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name (e.g. Samira Khan)"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="p-2.5 bg-white border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                      />
                    </div>
                    <textarea
                      required
                      rows={2}
                      placeholder="Share your experience regarding texture, scent, packaging and skin results..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                    />
                    <button
                      type="submit"
                      className="bg-[#B74764] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#9F3652] transition shadow-xs"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#211D20]">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* SMART FIT CALCULATOR MODAL */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setShowSizeModal(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#EADDE0] space-y-4 z-10 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#EADDE0] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#211D20] flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#B74764]" />
                <span>Smart Fit & Size Calculator</span>
              </h3>
              <button onClick={() => setShowSizeModal(false)} className="p-1 text-[#746B70]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Height (e.g. 5 ft 4 in or 162 cm):</label>
                <input
                  type="text"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  placeholder="e.g. 5 ft 4 in"
                  className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Weight in KG (e.g. 62 kg):</label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  placeholder="e.g. 62"
                  className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <button
                type="button"
                onClick={calculateUserSize}
                className="w-full bg-[#B74764] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#9F3652] transition shadow-xs"
              >
                Calculate Recommended Size
              </button>

              {calculatedSize && (
                <div className="p-3 bg-[#FDF1F3] border border-[#B74764]/30 rounded-2xl text-center space-y-1">
                  <p className="text-[11px] text-[#746B70]">Your Ideal Anusmita Size:</p>
                  <p className="text-base font-serif font-bold text-[#B74764]">{calculatedSize}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EADDE0] p-3 flex items-center justify-between gap-3 lg:hidden z-30 shadow-lg">
        <div className="min-w-0">
          <p className="font-serif text-xs font-bold text-[#211D20] truncate">{product.name}</p>
          <p className="text-xs font-bold text-[#B74764]">{formatPrice(activePrice)}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleAddToCart(false)}
            className="bg-[#B74764] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs"
          >
            Add to Bag
          </button>
          <button
            onClick={() => handleAddToCart(true)}
            className="bg-[#211D20] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
};
