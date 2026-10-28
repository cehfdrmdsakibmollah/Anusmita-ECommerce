import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  Plane, 
  MapPin, 
  AlertCircle, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { orders, routeParam, navigateTo, formatPrice } = useStore();

  const [orderIdInput, setOrderIdInput] = useState<string>(routeParam || '');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(() => {
    if (routeParam) {
      return orders.find(o => o.id.toUpperCase() === routeParam.toUpperCase()) || null;
    }
    return null;
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(Boolean(routeParam));

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setHasSearched(true);

    const cleanId = orderIdInput.trim().toUpperCase();
    const cleanPhone = phoneInput.replace(/[^0-9]/g, '');

    const found = orders.find(o => {
      const matchId = o.id.toUpperCase() === cleanId;
      // If phone provided, verify match for privacy protection
      if (cleanPhone) {
        return matchId && o.phone.includes(cleanPhone);
      }
      return matchId;
    });

    if (found) {
      setTrackedOrder(found);
    } else {
      setTrackedOrder(null);
      setErrorMessage(`No matching order found for "${cleanId}". Please check your order confirmation SMS or WhatsApp ticket.`);
    }
  };

  const statusSteps = [
    { label: 'Confirmed', desc: 'Order verified by staff' },
    { label: 'Processing', desc: 'Sourced & checked at hub' },
    { label: 'Packed', desc: 'Secure protective packaging' },
    { label: 'Shipped', desc: 'In courier transit' },
    { label: 'Out for Delivery', desc: 'Courier rider on the way' },
    { label: 'Delivered', desc: 'Delivered to recipient' }
  ];

  const getStepStatus = (stepLabel: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      'Pending': 0,
      'Confirmed': 1,
      'Processing': 2,
      'Packed': 3,
      'Shipped': 4,
      'Out for Delivery': 5,
      'Delivered': 6
    };
    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepLabel] || 1;

    if (currentRank > stepRank) return 'completed';
    if (currentRank === stepRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Editorial Hero */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          Real-Time Consignment Radar
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D20]">
          “A little closer to you.”
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Follow your ANUSMITA order, every step of the way from our Dhaka central hub or overseas cargo flight to your doorstep.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#514950]">Order Tracking ID *</label>
            <input
              type="text"
              required
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="e.g. ANUS-78219"
              className="w-full p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs uppercase font-mono focus:outline-none focus:border-[#B74764]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#514950]">Phone Number Used at Checkout</label>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. 01711223344"
              className="w-full p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl text-xs focus:outline-none focus:border-[#B74764]"
            />
            <p className="text-[10px] text-[#746B70]">Required to protect your private delivery address details.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Track Order Status</span>
          </button>
        </form>

        {/* Demo Quick Fills for convenience */}
        <div className="pt-2 border-t border-[#EADDE0] flex items-center justify-between text-xs text-[#746B70]">
          <span>Try sample orders:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setOrderIdInput('ANUS-78219');
                setPhoneInput('01711223344');
              }}
              className="text-[#B74764] hover:underline font-mono text-[11px]"
            >
              ANUS-78219
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setOrderIdInput('ANUS-67120');
                setPhoneInput('01819334455');
              }}
              className="text-[#B74764] hover:underline font-mono text-[11px]"
            >
              ANUS-67120
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Result Card with Timeline */}
      {trackedOrder && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EADDE0] shadow-sm space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADDE0] pb-6">
            <div>
              <span className="text-[10px] font-bold text-[#B74764] uppercase tracking-wider">Live Consignment</span>
              <h2 className="font-serif text-2xl font-bold text-[#211D20]">Order #{trackedOrder.id}</h2>
              <p className="text-xs text-[#746B70]">Placed on {new Date(trackedOrder.createdAt).toLocaleDateString('en-GB')}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="bg-[#FDF1F3] text-[#B74764] border border-[#B74764]/20 font-bold text-xs px-3 py-1 rounded-full">
                Status: {trackedOrder.orderStatus}
              </span>
              <p className="text-xs font-semibold text-[#514950] mt-1">
                Courier: {trackedOrder.courierName} ({trackedOrder.consignmentId})
              </p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B70] mb-6">Delivery Progress</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative">
              {statusSteps.map((step, idx) => {
                const stepState = getStepStatus(step.label, trackedOrder.orderStatus);
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                      stepState === 'completed'
                        ? 'bg-green-600 text-white shadow-xs'
                        : stepState === 'current'
                        ? 'bg-[#B74764] text-white animate-pulse shadow-md'
                        : 'bg-gray-100 text-[#746B70] border border-[#EADDE0]'
                    }`}>
                      {stepState === 'completed' ? '✓' : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${stepState === 'current' ? 'text-[#B74764]' : 'text-[#211D20]'}`}>
                        {step.label}
                      </p>
                      <p className="text-[10px] text-[#746B70] hidden sm:block mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking Events History Log */}
          <div className="space-y-3 pt-4 border-t border-[#EADDE0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B70]">Consignment Checkpoints</h3>
            <div className="space-y-3">
              {trackedOrder.trackingEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#FFFAF7] rounded-xl border border-[#EADDE0] text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#B74764] mt-1.5 shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-[#211D20]">{ev.status}</p>
                      <span className="text-[10px] text-[#746B70]">{ev.timestamp}</span>
                    </div>
                    {ev.location && <p className="text-[11px] text-[#746B70] mt-0.5">Location: {ev.location}</p>}
                    <p className="text-xs text-[#514950] mt-1">{ev.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Masked Privacy Delivery Details */}
          <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#514950]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#746B70] block">Delivery Destination</span>
              <p className="font-bold text-[#211D20]">{trackedOrder.district}</p>
              <p>{trackedOrder.deliveryAddress.slice(0, 15)}... (Masked for privacy)</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#746B70] block">Payment Summary</span>
              <p className="font-bold text-[#211D20]">{formatPrice(trackedOrder.total)}</p>
              <p>{trackedOrder.paymentMethod} ({trackedOrder.paymentStatus})</p>
            </div>
          </div>

          {/* Invoice and Support Action */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#EADDE0] text-xs">
            <button
              onClick={() => navigateTo('invoice', trackedOrder.id)}
              className="text-[#B74764] font-bold hover:underline"
            >
              View Printable Tax Invoice
            </button>
            <a
              href={`https://wa.me/8801310339192?text=${encodeURIComponent(`Hello ANUSMITA! I am inquiring about Order #${trackedOrder.id}`)}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-700 font-bold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Delivery Support on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
