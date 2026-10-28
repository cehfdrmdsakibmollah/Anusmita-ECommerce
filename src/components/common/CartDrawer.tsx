import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartDrawerOpen, 
    setCartDrawerOpen, 
    updateCartQuantity, 
    removeFromCart, 
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

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const generateWhatsAppOrderLink = () => {
    const itemsText = cart.map(item => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
      return `• ${item.product.name}${variantStr} x${item.quantity} = ৳${item.unitPrice * item.quantity}`;
    }).join('%0A');

    const message = `Hello ANUSMITA! I would like to order directly via WhatsApp:%0A%0A${itemsText}%0A%0ASubtotal: ৳${cartSubtotal}%0ADelivery (${selectedDistrict}): ৳${deliveryCharge}%0ATotal: ৳${cartTotal}%0A%0APlease confirm my order. Thank you!`;
    return `https://wa.me/8801310339192?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EADDE0]">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#EADDE0] flex items-center justify-between bg-[#FFF7F3]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B74764]" />
              <h2 className="font-serif text-lg font-bold text-[#211D20]">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 text-[#746B70] hover:text-[#211D20] hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#FDF1F3] rounded-full flex items-center justify-center text-[#B74764]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#211D20]">Your bag is empty</h3>
                  <p className="text-xs text-[#746B70] mt-1 max-w-xs mx-auto">
                    Explore our curated collection of authentic Asian skincare, apparel, and lifestyle pieces.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="bg-[#B74764] text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-[#9F3652] transition shadow-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${index}`}
                    className="flex gap-3 p-3 rounded-xl border border-[#EADDE0] bg-[#FFFAF7]/50 hover:bg-[#FFFAF7] transition-colors"
                  >
                    <img 
                      src={item.product.mainImage} 
                      alt={item.product.name}
                      className="w-18 h-18 rounded-lg object-cover bg-white border border-[#EADDE0]/60 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">{item.product.brand}</p>
                          <h4 className="text-xs font-semibold text-[#211D20] line-clamp-1">{item.product.name}</h4>
                          {(item.selectedVariant || item.selectedColor || item.selectedSize) && (
                            <p className="text-[11px] text-[#746B70] mt-0.5">
                              {item.selectedVariant?.label || item.selectedSize || item.selectedColor}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[#746B70] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#EADDE0] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-[#FDF1F3] text-[#746B70] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#211D20]">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-[#FDF1F3] text-[#746B70] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#B74764]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer: Pricing & Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EADDE0] bg-[#FFF7F3] space-y-4">
              {/* Delivery District selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#514950]">Delivery Area:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedDistrict('Dhaka')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition ${
                      selectedDistrict === 'Dhaka'
                        ? 'bg-[#B74764] text-white border-[#B74764]'
                        : 'bg-white text-[#514950] border-[#EADDE0]'
                    }`}
                  >
                    Dhaka (৳80)
                  </button>
                  <button
                    onClick={() => setSelectedDistrict('Outside Dhaka')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition ${
                      selectedDistrict === 'Outside Dhaka'
                        ? 'bg-[#B74764] text-white border-[#B74764]'
                        : 'bg-white text-[#514950] border-[#EADDE0]'
                    }`}
                  >
                    Outside (৳150)
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              {appliedDiscountPercent > 0 ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg text-xs">
                  <span className="font-semibold text-green-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Code: {couponCode} (-{appliedDiscountPercent}%)
                  </span>
                  <button 
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter coupon (ANUSMITA10)"
                    className="flex-1 bg-white border border-[#EADDE0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B74764] uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-[#211D20] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#B74764] transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#514950] pt-1 border-t border-[#EADDE0]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#211D20]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping ({selectedDistrict})</span>
                  <span>{formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#211D20] pt-2 border-t border-[#EADDE0]">
                  <span>Total Amount</span>
                  <span className="text-[#B74764]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full bg-[#B74764] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-[#9F3652] transition flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppOrderLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-xl shadow-xs hover:bg-[#20ba59] transition flex items-center justify-center gap-2 text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>1-Click WhatsApp Quick Checkout</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#746B70] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                <span>100% Original Products · Safe Delivery Nationwide</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
