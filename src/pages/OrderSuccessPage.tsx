import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Printer, 
  Truck, 
  ShoppingBag, 
  ChevronRight, 
  Copy, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, orders, routeParam, navigateTo, formatPrice, showToast } = useStore();

  const order = currentOrder || orders.find(o => o.id === routeParam) || orders[0];

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    showToast(`Copied Order #${order.id} to clipboard!`);
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 space-y-8 text-center sm:text-left">
      
      {/* Success Hero Card */}
      <div className="bg-[#FFF7F3] rounded-3xl p-8 sm:p-10 border border-[#EADDE0] shadow-xs space-y-6 text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 text-green-800 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">Order Confirmed</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
            Thank You, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#746B70] max-w-md mx-auto leading-relaxed">
            Your authentic Asian beauty & fashion order has been successfully logged. Our dispatch team is preparing your package.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#EADDE0] shadow-xs">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#746B70] block">Order Tracking Reference</span>
            <span className="font-serif text-lg font-bold text-[#B74764]">{order.id}</span>
          </div>
          <button
            onClick={handleCopyId}
            className="p-2 text-[#746B70] hover:text-[#211D20] hover:bg-[#FDF1F3] rounded-lg transition"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('invoice', order.id)}
            className="w-full sm:w-auto bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Printable Invoice (A4 & POS Receipt)</span>
          </button>

          <button
            onClick={() => navigateTo('track-order', order.id)}
            className="w-full sm:w-auto bg-white hover:bg-[#FDF1F3] text-[#211D20] font-semibold py-3 px-6 rounded-xl border border-[#EADDE0] text-xs flex items-center justify-center gap-2 transition"
          >
            <Truck className="w-4 h-4 text-[#B74764]" />
            <span>Track Live Shipment</span>
          </button>
        </div>
      </div>

      {/* Order Summary Snapshot */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADDE0] shadow-xs space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#211D20] border-b border-[#EADDE0] pb-3">
          Order Details & Delivery Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#514950]">
          <div className="space-y-1">
            <span className="font-bold text-[#746B70] uppercase text-[10px]">Recipient & Phone</span>
            <p className="font-semibold text-[#211D20] text-sm">{order.customerName}</p>
            <p>{order.phone}</p>
            {order.email && <p>{order.email}</p>}
          </div>

          <div className="space-y-1">
            <span className="font-bold text-[#746B70] uppercase text-[10px]">Delivery Address ({order.district})</span>
            <p className="font-semibold text-[#211D20]">{order.deliveryAddress}</p>
            {order.deliveryArea && <p>Area: {order.deliveryArea}</p>}
            <p className="text-[11px] text-green-700 font-semibold">Assigned Courier: {order.courierName || 'Pathao/Steadfast'}</p>
          </div>
        </div>

        {/* Item List */}
        <div className="pt-4 border-t border-[#EADDE0] space-y-3">
          <span className="font-bold text-[#746B70] uppercase text-[10px] block">Ordered Items</span>
          <div className="divide-y divide-[#EADDE0]/60">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-xl object-cover border border-[#EADDE0]" />
                  <div>
                    <p className="font-semibold text-[#211D20]">{item.productName}</p>
                    <p className="text-[11px] text-[#746B70]">
                      Qty: {item.quantity} {item.variantLabel ? `(${item.variantLabel})` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[#211D20]">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing totals */}
        <div className="pt-4 border-t border-[#EADDE0] space-y-2 text-xs text-[#514950]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-[#211D20]">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-700 font-semibold">
              <span>Voucher Discount:</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery ({order.district}):</span>
            <span className="font-semibold text-[#211D20]">{formatPrice(order.deliveryCharge)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#211D20] pt-2 border-t border-[#EADDE0]">
            <span>Total Payable:</span>
            <span className="text-[#B74764]">{formatPrice(order.total)}</span>
          </div>
          <div className="flex justify-between text-[11px] text-[#746B70] pt-1">
            <span>Payment Method:</span>
            <span className="font-bold text-[#211D20]">{order.paymentMethod} ({order.paymentStatus})</span>
          </div>
        </div>

        {/* Return to shop */}
        <div className="pt-4 border-t border-[#EADDE0] flex justify-between items-center text-xs">
          <button
            onClick={() => navigateTo('shop')}
            className="text-[#B74764] font-bold hover:underline flex items-center gap-1"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <span className="text-[#746B70] text-[11px]">Need assistance? Hotline: +880 1310-339192</span>
        </div>
      </div>

    </div>
  );
};
