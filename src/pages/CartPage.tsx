import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  MessageSquare, 
  ChevronRight,
  Truck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    deliveryCharge, 
    cartDiscount, 
    cartTotal,
    couponCode,
    appliedDiscountPercent,
    applyCoupon,
    removeCoupon,
    selectedDistrict,
    setSelectedDistrict,
    formatPrice,
    navigateTo 
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const generateWhatsAppOrderLink = () => {
    const itemsText = cart.map(item => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
      return `• ${item.product.name}${variantStr} x${item.quantity} = ৳${item.unitPrice * item.quantity}`;
    }).join('%0A');

    const message = `Hello ANUSMITA! I would like to place this order via WhatsApp:%0A%0A${itemsText}%0A%0ASubtotal: ৳${cartSubtotal}%0ADelivery Area: ${selectedDistrict} (৳${deliveryCharge})%0ANet Total: ৳${cartTotal}%0A%0APlease proceed with confirmation. Thank you!`;
    return `https://wa.me/8801310339192?text=${message}`;
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-[#FDF1F3] rounded-full flex items-center justify-center text-[#B74764]">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#211D20]">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-[#746B70] max-w-md mx-auto">
            You haven't added any products to your bag yet. Explore our genuine Korean skincare, Mulberry silks, and 18K jewellery.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition shadow-md"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Shopping Bag</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EADDE0] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#211D20]">Your Shopping Bag</h1>
          <p className="text-xs text-[#746B70] mt-1">Review selected items before proceeding to secure checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:underline font-semibold"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart items table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-[#EADDE0] overflow-hidden shadow-xs divide-y divide-[#EADDE0]">
            {cart.map((item, index) => (
              <div key={`${item.product.id}-${index}`} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img 
                    src={item.product.mainImage} 
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-[#FFF7F3] border border-[#EADDE0]/60 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">{item.product.brand}</span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#211D20]">{item.product.name}</h3>
                    {(item.selectedVariant || item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-[#746B70] mt-0.5">
                        {item.selectedVariant?.label || item.selectedSize || item.selectedColor}
                      </p>
                    )}
                    <p className="text-xs font-bold text-[#B74764] mt-1 sm:hidden">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#EADDE0] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(index, item.quantity - 1)}
                      className="px-3 py-2 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-[#211D20]">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(index, item.quantity + 1)}
                      className="px-3 py-2 text-xs font-bold text-[#746B70] hover:bg-[#FDF1F3]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right hidden sm:block min-w-[90px]">
                    <span className="text-sm font-bold text-[#211D20]">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                    <p className="text-[10px] text-[#746B70]">{formatPrice(item.unitPrice)} each</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-[#746B70] hover:text-red-600 rounded-lg"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EADDE0] flex items-center justify-between text-xs text-[#746B70]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>Authentic products directly imported with original factory seals</span>
            </span>
            <button onClick={() => navigateTo('shop')} className="text-[#B74764] font-semibold hover:underline">
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#211D20] border-b border-[#EADDE0] pb-3">
              Order Summary
            </h2>

            {/* Delivery District selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B74764]" />
                <span>Select Delivery Destination:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Dhaka')}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedDistrict === 'Dhaka'
                      ? 'bg-[#B74764] text-white border-[#B74764]'
                      : 'bg-[#FFFAF7] text-[#514950] border-[#EADDE0]'
                  }`}
                >
                  Dhaka (৳80)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Outside Dhaka')}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedDistrict === 'Outside Dhaka'
                      ? 'bg-[#B74764] text-white border-[#B74764]'
                      : 'bg-[#FFFAF7] text-[#514950] border-[#EADDE0]'
                  }`}
                >
                  Outside Dhaka (৳150)
                </button>
              </div>
            </div>

            {/* Coupon Code Engine */}
            <div className="space-y-2 pt-2 border-t border-[#EADDE0]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#746B70]">
                Have a Promo Voucher?
              </label>
              {appliedDiscountPercent > 0 ? (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-green-800 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-green-700" />
                    <span>{couponCode} (-{appliedDiscountPercent}%) Applied</span>
                  </span>
                  <button onClick={removeCoupon} className="text-red-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter ANUSMITA10"
                    className="flex-1 p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs uppercase focus:outline-none focus:border-[#B74764]"
                  />
                  <button
                    type="submit"
                    className="bg-[#211D20] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#B74764] transition"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#514950] pt-2 border-t border-[#EADDE0]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({selectedDistrict})</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#211D20] pt-3 border-t border-[#EADDE0]">
                <span>Total Payable</span>
                <span className="text-[#B74764]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => navigateTo('checkout')}
                className="w-full bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppOrderLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>1-Click WhatsApp Quick Checkout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
