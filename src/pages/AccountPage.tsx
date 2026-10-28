import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Trash2, 
  ExternalLink, 
  Plus, 
  Check, 
  Truck,
  ChevronRight,
  Clock
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, products, addToCart, navigateTo, formatPrice, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders');

  // Customer profile info state
  const [profileName, setProfileName] = useState('Samira Rahman');
  const [profilePhone, setProfilePhone] = useState('01711223344');
  const [profileEmail, setProfileEmail] = useState('samira.rahman@gmail.com');

  // Saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Banani)',
      address: 'House 42, Road 11, Block D, Banani, Dhaka',
      district: 'Dhaka',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office (Gulshan 1)',
      address: 'Plot 18, South Avenue, Tower 3, Gulshan-1, Dhaka',
      district: 'Dhaka',
      isDefault: false
    }
  ]);

  const [newAddrTitle, setNewAddrTitle] = useState('');
  const [newAddrText, setNewAddrText] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrTitle || !newAddrText) return;

    setSavedAddresses(prev => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        title: newAddrTitle,
        address: newAddrText,
        district: 'Dhaka',
        isDefault: false
      }
    ]);
    setNewAddrTitle('');
    setNewAddrText('');
    setShowAddAddr(false);
    showToast('Saved new delivery address');
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Customer Dashboard</span>
      </nav>

      {/* Profile Header Banner */}
      <div className="bg-[#FFF7F3] rounded-3xl p-6 sm:p-8 border border-[#EADDE0] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#B74764] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {profileName.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#211D20]">{profileName}</h1>
            <p className="text-xs text-[#746B70]">{profilePhone} • {profileEmail}</p>
            <span className="inline-block mt-1 bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              👑 ANUSMITA VIP Lounge Member
            </span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('admin')}
          className="text-xs font-bold text-[#B74764] border border-[#B74764]/40 bg-white hover:bg-[#FDF1F3] px-4 py-2 rounded-xl transition"
        >
          Switch to Store ERP Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EADDE0] gap-4 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'wishlist' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'addresses' ? 'border-[#B74764] text-[#B74764]' : 'border-transparent text-[#746B70]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. ORDERS PANEL */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EADDE0]">
                <p className="text-xs text-[#746B70]">No recent orders placed.</p>
              </div>
            ) : (
              orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EADDE0] pb-3 text-xs">
                    <div>
                      <span className="font-serif text-base font-bold text-[#211D20]">Order #{ord.id}</span>
                      <p className="text-[#746B70] text-[11px]">{new Date(ord.createdAt).toLocaleDateString()} • {ord.district}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-[#FDF1F3] text-[#B74764]'
                      }`}>
                        {ord.orderStatus}
                      </span>
                      <button
                        onClick={() => navigateTo('invoice', ord.id)}
                        className="bg-[#FFF7F3] border border-[#EADDE0] px-3 py-1 rounded-lg text-xs font-semibold text-[#514950] hover:text-[#B74764]"
                      >
                        Invoice
                      </button>
                      <button
                        onClick={() => navigateTo('track-order', ord.id)}
                        className="bg-[#B74764] text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-[#9F3652]"
                      >
                        Track
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-[#EADDE0]/60 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={it.image} alt={it.productName} className="w-10 h-10 rounded-lg object-cover border border-[#EADDE0]" />
                          <div>
                            <p className="font-semibold text-[#211D20]">{it.productName}</p>
                            <p className="text-[10px] text-[#746B70]">Qty: {it.quantity} {it.variantLabel ? `(${it.variantLabel})` : ''}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#211D20]">{formatPrice(it.unitPrice * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#EADDE0] flex justify-between items-center text-xs">
                    <span className="text-[#746B70]">Payment: {ord.paymentMethod} ({ord.paymentStatus})</span>
                    <span className="text-sm font-bold text-[#B74764]">Total: {formatPrice(ord.total)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. WISHLIST PANEL */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EADDE0]">
                <p className="text-xs text-[#746B70]">Your wishlist is currently empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl p-4 border border-[#EADDE0] shadow-xs space-y-3">
                    <img src={p.mainImage} alt={p.name} className="w-full aspect-square object-cover rounded-2xl bg-[#FFF7F3]" />
                    <div>
                      <span className="text-[10px] font-bold text-[#B74764] uppercase">{p.brand}</span>
                      <h4 className="font-serif text-sm font-bold text-[#211D20] truncate">{p.name}</h4>
                      <p className="text-xs font-bold text-[#B74764] mt-0.5">{formatPrice(p.price)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-[#B74764] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#9F3652] transition shadow-xs"
                    >
                      Add to Shopping Bag
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#211D20]">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-[#514950]">{addr.address}</p>
                  <p className="text-[11px] text-[#746B70]">{addr.district}</p>
                </div>
              ))}
            </div>

            {showAddAddr ? (
              <form onSubmit={handleAddAddress} className="bg-white p-6 rounded-3xl border border-[#EADDE0] space-y-3 text-xs max-w-lg">
                <h4 className="font-bold text-[#211D20]">Add New Delivery Address</h4>
                <input
                  type="text"
                  required
                  placeholder="Address Label (e.g. Vacation Home, Uttara)"
                  value={newAddrTitle}
                  onChange={(e) => setNewAddrTitle(e.target.value)}
                  className="w-full p-2.5 border border-[#EADDE0] rounded-xl"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Street Address, House #, Road #, City..."
                  value={newAddrText}
                  onChange={(e) => setNewAddrText(e.target.value)}
                  className="w-full p-2.5 border border-[#EADDE0] rounded-xl"
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-[#B74764] text-white px-4 py-2 rounded-xl font-bold">
                    Save Address
                  </button>
                  <button type="button" onClick={() => setShowAddAddr(false)} className="border border-[#EADDE0] px-4 py-2 rounded-xl text-[#746B70]">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddAddr(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#B74764] hover:underline"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Delivery Address</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
