import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  MessageSquare,
  Gift,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    deliveryCharge, 
    cartDiscount, 
    cartTotal, 
    selectedDistrict, 
    setSelectedDistrict, 
    placeOrder, 
    formatPrice,
    navigateTo 
  } = useStore();

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'bKash' | 'Nagad'>('Cash on Delivery');
  
  // Gift option
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // bKash / Nagad simulated details
  const [trxId, setTrxId] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#211D20]">No Items in Cart</h1>
        <p className="text-xs text-[#746B70]">Please add products before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#B74764] text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Validate Bangladesh 11-digit mobile number
  const validateBanglaPhone = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    setPhone(clean);
    if (clean.length > 0 && !/^01[3-9]\d{8}$/.test(clean)) {
      setPhoneError('Please enter a valid 11-digit mobile number (e.g. 01711223344)');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !deliveryAddress.trim()) {
      alert('Please fill in your name, delivery address, and phone number.');
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setPhoneError('Valid 11-digit Bangladesh phone number required for courier delivery confirmation.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        customerName,
        phone,
        email: email || undefined,
        deliveryAddress,
        district: selectedDistrict,
        deliveryArea: deliveryArea || undefined,
        deliveryNotes: deliveryNotes || undefined,
        paymentMethod,
        isGift,
        giftNote: isGift ? giftNote : undefined,
        source: 'Website'
      });
      setIsSubmitting(false);
    }, 600);
  };

  const generateWhatsAppOrderLink = () => {
    const itemsText = cart.map(item => `• ${item.product.name} x${item.quantity}`).join('%0A');
    const message = `Hello ANUSMITA! I would like to place an order:%0A%0AItems:%0A${itemsText}%0A%0ACustomer: ${customerName || 'Customer'}%0APhone: ${phone || 'Pending'}%0AAddress: ${deliveryAddress || 'Pending'}, ${selectedDistrict}%0APayment: ${paymentMethod}%0ATotal: ৳${cartTotal}%0A%0APlease confirm.`;
    return `https://wa.me/8801310339192?text=${message}`;
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('cart')} className="hover:text-[#B74764]">Shopping Bag</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Secure Checkout</span>
      </nav>

      <div className="border-b border-[#EADDE0] pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#211D20]">Checkout & Shipping Details</h1>
        <p className="text-xs text-[#746B70] mt-1">Provide your delivery address and preferred payment method</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer and Address form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Customer Info */}
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#211D20] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B74764] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Customer Information</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samira Rahman"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#514950]">Mobile Number (11-digit) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    placeholder="e.g. 01711223344"
                    value={phone}
                    onChange={(e) => validateBanglaPhone(e.target.value)}
                    className={`w-full mt-1 p-3 bg-[#FFFAF7] border rounded-xl text-xs focus:outline-none ${
                      phoneError ? 'border-red-500 bg-red-50/40' : 'border-[#EADDE0] focus:border-[#B74764]'
                    }`}
                  />
                  {phoneError && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {phoneError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-[#514950]">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="For invoice copy (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#211D20] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B74764] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Address & Destination</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Select Region / City *</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    selectedDistrict === 'Dhaka'
                      ? 'border-[#B74764] bg-[#FDF1F3] text-[#B74764] font-bold'
                      : 'border-[#EADDE0] bg-[#FFFAF7] text-[#514950]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="district"
                        checked={selectedDistrict === 'Dhaka'}
                        onChange={() => setSelectedDistrict('Dhaka')}
                        className="accent-[#B74764]"
                      />
                      <span>Inside Dhaka (৳80)</span>
                    </div>
                    <span className="text-[10px]">24-48 hrs</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    selectedDistrict === 'Outside Dhaka'
                      ? 'border-[#B74764] bg-[#FDF1F3] text-[#B74764] font-bold'
                      : 'border-[#EADDE0] bg-[#FFFAF7] text-[#514950]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="district"
                        checked={selectedDistrict === 'Outside Dhaka'}
                        onChange={() => setSelectedDistrict('Outside Dhaka')}
                        className="accent-[#B74764]"
                      />
                      <span>Outside Dhaka (৳150)</span>
                    </div>
                    <span className="text-[10px]">2-3 days</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Specific Area / Thana (e.g. Dhanmondi, Uttara, Halishahar) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banani Block D"
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Full Street Address (House, Road, Apartment) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House #, Road #, Sector/Area, Landmark..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Special Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Call before arrival, leave with security..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#211D20] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B74764] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Method</span>
            </h2>

            <div className="space-y-2.5 text-xs">
              {/* COD */}
              <label className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                paymentMethod === 'Cash on Delivery'
                  ? 'border-[#B74764] bg-[#FDF1F3]'
                  : 'border-[#EADDE0] bg-[#FFFAF7]'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="accent-[#B74764] mt-1"
                />
                <div>
                  <p className="font-bold text-[#211D20]">Cash on Delivery (COD)</p>
                  <p className="text-[#746B70] text-[11px] mt-0.5">Pay the full amount in cash directly to Pathao/Steadfast courier upon receiving parcel.</p>
                </div>
              </label>

              {/* bKash */}
              <label className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                paymentMethod === 'bKash'
                  ? 'border-[#B74764] bg-[#FDF1F3]'
                  : 'border-[#EADDE0] bg-[#FFFAF7]'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bKash'}
                  onChange={() => setPaymentMethod('bKash')}
                  className="accent-[#B74764] mt-1"
                />
                <div className="w-full">
                  <p className="font-bold text-[#211D20]">bKash Merchant / Direct Transfer</p>
                  <p className="text-[#746B70] text-[11px] mt-0.5">Instant online payment verification via official bKash Merchant API.</p>
                  {paymentMethod === 'bKash' && (
                    <div className="mt-2.5 p-3 bg-white rounded-xl border border-[#EADDE0] space-y-2">
                      <p className="text-[11px] font-semibold text-[#B74764]">Official bKash Hotline: 01310-339192</p>
                      <input
                        type="text"
                        placeholder="Enter 8-digit bKash Transaction ID (e.g. 8X2940KA)"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="w-full p-2 border border-[#EADDE0] rounded-lg text-xs uppercase"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Nagad */}
              <label className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                paymentMethod === 'Nagad'
                  ? 'border-[#B74764] bg-[#FDF1F3]'
                  : 'border-[#EADDE0] bg-[#FFFAF7]'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Nagad'}
                  onChange={() => setPaymentMethod('Nagad')}
                  className="accent-[#B74764] mt-1"
                />
                <div>
                  <p className="font-bold text-[#211D20]">Nagad Payment</p>
                  <p className="text-[#746B70] text-[11px] mt-0.5">Fast mobile checkout with Nagad online verification.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Optional Gift Packing Toggle */}
          <div className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#B74764]" />
                <span className="font-serif text-sm font-bold text-[#211D20]">Send as a Curated Gift?</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="accent-[#B74764] w-4 h-4"
                />
                <span>Include Gift Card</span>
              </label>
            </div>

            {isGift && (
              <textarea
                rows={2}
                placeholder="Write your custom handwritten gift note for the recipient..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full p-2.5 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
              />
            )}
          </div>
        </div>

        {/* Right Column: Order Review & Confirmation */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4 sticky top-28">
            <h2 className="font-serif text-lg font-bold text-[#211D20] border-b border-[#EADDE0] pb-3">
              Order Review ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </h2>

            {/* Item list */}
            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#EADDE0]/60">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={item.product.mainImage} 
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#FFF7F3] shrink-0 border border-[#EADDE0]"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-[#211D20] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-[#746B70]">
                        Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant.label}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#211D20] shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="space-y-2 text-xs text-[#514950] pt-3 border-t border-[#EADDE0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({selectedDistrict})</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#211D20] pt-2 border-t border-[#EADDE0]">
                <span>Total Amount</span>
                <span className="text-[#B74764]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B74764] hover:bg-[#9F3652] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
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

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#746B70] pt-1">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>SSL Secured Checkout · Verified Authentic Stock</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
