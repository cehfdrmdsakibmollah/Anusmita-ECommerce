import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setQuickViewProduct,
    formatPrice 
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const originEmoji = product.origin === 'Korea' ? '🇰🇷' : product.origin === 'Japan' ? '🇯🇵' : '🇨🇳';

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-[#EADDE0] overflow-hidden hover:shadow-[0_12px_28px_rgba(33,29,32,0.08)] transition-all duration-300 flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#FFF7F3] cursor-pointer" onClick={() => navigateTo('product', product.id)}>
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          <span className="bg-white/90 backdrop-blur-xs text-[#211D20] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-[#EADDE0]/60 flex items-center gap-1">
            <span>{originEmoji}</span> {product.origin}
          </span>
          {discountPercent > 0 && (
            <span className="bg-[#B74764] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-[#514950] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Pre-Order
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all z-10 ${
            isWishlisted 
              ? 'bg-[#B74764] text-white shadow-md' 
              : 'bg-white/85 text-[#746B70] hover:text-[#B74764] hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 text-[#211D20] hover:bg-white text-xs font-semibold py-2 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors border border-[#EADDE0]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#746B70] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#B74764]">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#211D20]">{product.rating.toFixed(1)}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => navigateTo('product', product.id)}
            className="font-serif text-base font-semibold text-[#211D20] group-hover:text-[#B74764] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {product.banglaName && (
            <p className="text-[11px] text-[#746B70] line-clamp-1 mt-0.5">
              {product.banglaName}
            </p>
          )}
        </div>

        {/* Pricing & Stock Status */}
        <div className="pt-2 border-t border-[#F4EBEF] flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#B74764]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#746B70] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {isLowStock && (
              <p className="text-[10px] font-bold text-amber-700 animate-pulse mt-0.5">
                ⚡ Only {product.stock} left in stock
              </p>
            )}
          </div>

          <button
            onClick={() => {
              if (isOutOfStock) {
                navigateTo('product', product.id);
              } else {
                addToCart(product);
              }
            }}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center justify-center transition-all ${
              isOutOfStock 
                ? 'bg-[#F9E9ED] text-[#B74764] hover:bg-[#F4DCE3]' 
                : 'bg-[#B74764] text-white hover:bg-[#9F3652] shadow-xs hover:shadow-md'
            }`}
            title={isOutOfStock ? 'Reserve via Pre-Order' : 'Add to Bag'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
