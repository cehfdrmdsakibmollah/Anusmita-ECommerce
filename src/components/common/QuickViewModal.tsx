import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    formatPrice,
    navigateTo 
  } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock <= 0;

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const activePrice = currentVariant ? currentVariant.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, {
      variantId: currentVariant?.id,
      color: selectedColor || product.colors?.[0]?.name,
      size: selectedSize || product.sizes?.[0],
      quantity
    });
    setQuickViewProduct(null);
  };

  const handleGoToProduct = () => {
    setQuickViewProduct(null);
    navigateTo('product', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EADDE0] overflow-hidden z-10 animate-fadeIn grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-[#746B70] hover:text-[#211D20] bg-white/80 rounded-full z-20 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="bg-[#FFF7F3] p-6 flex items-center justify-center relative">
          <img 
            src={product.mainImage} 
            alt={product.name}
            className="max-h-[380px] w-auto object-contain rounded-2xl shadow-sm"
          />
          <div className="absolute top-4 left-4 bg-white/90 text-[#211D20] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#EADDE0]">
            {product.origin}
          </div>
        </div>

        {/* Right: Product Actions */}
        <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-[#746B70]">
              <span className="font-bold text-[#B74764] uppercase tracking-wider">{product.brand}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#211D20]">{product.rating}</span>
                <span>({product.reviewCount})</span>
              </div>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211D20] mt-1.5 leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold text-[#B74764]">{formatPrice(activePrice)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#746B70] line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-xs text-[#514950] line-clamp-3 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#746B70]">
                Select Option / Volume:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      (selectedVariantId === v.id || (!selectedVariantId && product.variants[0].id === v.id))
                        ? 'bg-[#B74764] text-white border-[#B74764]'
                        : 'bg-[#FFFAF7] text-[#514950] border-[#EADDE0] hover:border-[#B74764]'
                    }`}
                  >
                    {v.label} - {formatPrice(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2 border-t border-[#EADDE0]">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#EADDE0] rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-[#211D20]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#B74764] text-white hover:bg-[#9F3652] shadow-sm'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Pre-Order Now' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border border-[#EADDE0] transition ${
                  isWishlisted ? 'bg-[#B74764] text-white' : 'bg-white text-[#746B70] hover:text-[#B74764]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleGoToProduct}
              className="w-full text-center text-xs font-semibold text-[#B74764] hover:underline flex items-center justify-center gap-1"
            >
              <span>View full product details, ingredients & reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
