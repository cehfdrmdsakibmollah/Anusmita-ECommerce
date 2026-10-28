import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, SupplierRecord, PurchaseOrder } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Truck, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Plus, 
  Trash2, 
  Printer, 
  Eye, 
  Download, 
  Upload, 
  Clock, 
  ShieldAlert, 
  Sliders, 
  MessageSquare,
  FileText,
  Boxes,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    suppliers, 
    purchaseOrders, 
    navigateTo, 
    formatPrice,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'suppliers' | 'risk' | 'chatbot' | 'abandoned'>('overview');

  // Filter & Search states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [inventorySearch, setInventorySearch] = useState('');

  // Add Product Form Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdOrigin, setNewProdOrigin] = useState<'Korea' | 'Japan' | 'China'>('Korea');
  const [newProdCategory, setNewProdCategory] = useState<any>('Skincare');
  const [newProdPrice, setNewProdPrice] = useState(1500);
  const [newProdCostPrice, setNewProdCostPrice] = useState(850);
  const [newProdStock, setNewProdStock] = useState(20);
  const [newProdSku, setNewProdSku] = useState('');

  // 1. FINANCIAL CALCULATIONS & BUSINESS INTELLIGENCE
  const validOrders = orders.filter(o => o.orderStatus !== 'Cancelled');
  const grossSales = validOrders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalDiscounts = validOrders.reduce((acc, o) => acc + o.discount, 0);
  const netSales = grossSales - totalDiscounts;
  const deliveryCollected = validOrders.reduce((acc, o) => acc + o.deliveryCharge, 0);
  
  // COGS (Cost of Goods Sold) based on snapshots
  const totalCOGS = validOrders.reduce((acc, o) => {
    return acc + o.items.reduce((itemAcc, item) => {
      const prod = products.find(p => p.id === item.productId);
      const cost = prod ? prod.costPrice : item.unitPrice * 0.55;
      return itemAcc + (cost * item.quantity);
    }, 0);
  }, 0);

  const grossProfit = netSales - totalCOGS;
  const estimatedCourierExpenses = validOrders.length * 90; // Avg ৳90 courier expense
  const estimatedNetProfit = grossProfit - estimatedCourierExpenses;
  const profitMarginPercent = netSales > 0 ? Math.round((grossProfit / netSales) * 100) : 0;

  const collectedRevenue = validOrders
    .filter(o => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
    .reduce((acc, o) => acc + o.total, 0);
  
  const outstandingCodReceivables = validOrders
    .filter(o => o.paymentStatus === 'Unpaid' && o.orderStatus !== 'Delivered')
    .reduce((acc, o) => acc + o.total, 0);

  // 2. ORDER PIPELINE & COD RISK ANALYSIS
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = 
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.phone.includes(orderSearch);
      
      const matchStatus = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const highRiskOrders = orders.filter(o => o.riskScore === 'High' || o.riskScore === 'Medium');

  // 3. INVENTORY & STOCK ANALYSIS
  const lowStockProducts = products.filter(p => p.stock <= p.minStockAlert);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdBrand) return;

    const skuGen = newProdSku || `${newProdBrand.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    addProduct({
      name: newProdName,
      brand: newProdBrand,
      origin: newProdOrigin,
      category: newProdCategory,
      price: Number(newProdPrice),
      costPrice: Number(newProdCostPrice),
      stock: Number(newProdStock),
      reservedStock: 0,
      minStockAlert: 5,
      sku: skuGen,
      barcode: `880${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      description: 'Authentic imported selection for discerning customers in Bangladesh.',
      variantType: 'volume',
      variants: [{ id: `v-${Date.now()}`, label: 'Standard', price: Number(newProdPrice), stock: Number(newProdStock) }],
      rating: 5.0,
      reviewCount: 1,
      mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80']
    });

    setShowAddProductModal(false);
    setNewProdName('');
  };

  const handleExportCSV = () => {
    const headers = 'SKU,Name,Brand,Origin,Category,Price,CostPrice,Stock\n';
    const rows = products.map(p => `"${p.sku}","${p.name}","${p.brand}","${p.origin}","${p.category}",${p.price},${p.costPrice},${p.stock}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ANUSMITA_Inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Exported inventory catalog CSV');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="bg-[#211D20] text-[#F8F3F0] p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white">ANUSMITA ERP</span>
            <span className="bg-[#B74764] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
              Business Suite
            </span>
          </div>
          <p className="text-xs text-[#D4C8C2]">
            Sales Intelligence, Inventory Control, Courier Tracking & COD Fraud Prevention
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-white/80 hover:text-white border border-white/20 px-3.5 py-2 rounded-xl transition"
          >
            Storefront
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EADDE0] gap-2 overflow-x-auto text-xs font-semibold pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Financials & Profit</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders Pipeline ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'risk' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Fake Order & COD Guard ({highRiskOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'inventory' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Inventory & Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'suppliers' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Suppliers & POs ({suppliers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chatbot')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'chatbot' ? 'bg-[#B74764] text-white shadow-xs font-bold' : 'text-[#514950] hover:bg-[#FDF1F3]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chatbot Assistant Knowledge</span>
        </button>
      </div>

      {/* 1. FINANCIALS & OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Gross Ordered Value</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#211D20]">{formatPrice(grossSales)}</p>
              <p className="text-[11px] text-green-700 font-medium">Valid placed orders</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Cost of Goods (COGS)</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#514950]">{formatPrice(totalCOGS)}</p>
              <p className="text-[11px] text-[#746B70]">Direct import costs</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Gross Profit</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#B74764]">{formatPrice(grossProfit)}</p>
              <p className="text-[11px] text-[#B74764] font-bold">{profitMarginPercent}% Operating Margin</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#EADDE0] shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Cash Collected vs Due</span>
              <p className="text-base sm:text-lg font-serif font-bold text-green-800">{formatPrice(collectedRevenue)}</p>
              <p className="text-[11px] text-amber-800 font-bold">Outstanding COD: {formatPrice(outstandingCodReceivables)}</p>
            </div>
          </div>

          {/* Revenue Reconciliation Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#211D20] border-b border-[#EADDE0] pb-2">
                Sales & Profit Reconciliation
              </h3>
              <div className="space-y-2 text-xs text-[#514950]">
                <div className="flex justify-between py-1 border-b border-[#EADDE0]/60">
                  <span>Gross Order Value (Ordered Sales):</span>
                  <span className="font-semibold text-[#211D20]">{formatPrice(grossSales)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EADDE0]/60 text-green-700">
                  <span>Promotional Voucher Cost (ANUSMITA10):</span>
                  <span>-{formatPrice(totalDiscounts)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EADDE0]/60">
                  <span>Net Merchandise Sales:</span>
                  <span className="font-bold text-[#211D20]">{formatPrice(netSales)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EADDE0]/60 text-red-600">
                  <span>Cost of Goods Sold (Wholesale Import Purchase):</span>
                  <span>-{formatPrice(totalCOGS)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EADDE0]/60 text-[#746B70]">
                  <span>Courier Subsidies & Packaging Allowance:</span>
                  <span>-{formatPrice(estimatedCourierExpenses)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold text-[#B74764] border-t border-[#EADDE0]">
                  <span>Estimated Net Storefront Profit:</span>
                  <span>{formatPrice(estimatedNetProfit)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#211D20] border-b border-[#EADDE0] pb-2">
                Logistics & Delivery Performance
              </h3>
              <div className="space-y-3 text-xs text-[#514950]">
                <div className="flex justify-between">
                  <span>Active Orders in Transit:</span>
                  <span className="font-bold text-[#211D20]">{orders.filter(o => o.orderStatus === 'Shipped' || o.orderStatus === 'Out for Delivery').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivered & Settled:</span>
                  <span className="font-bold text-green-700">{orders.filter(o => o.orderStatus === 'Delivered').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Return-to-Origin (RTO) Rate:</span>
                  <span className="font-bold text-[#211D20]">0% (All verified)</span>
                </div>
                <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] space-y-1">
                  <p className="font-bold text-[#B74764]">Courier Integration Adapters:</p>
                  <p className="text-[11px] text-[#746B70]">
                    Configured for <strong>Pathao Courier</strong> (Dhaka Hub) and <strong>Steadfast Courier</strong> (Countrywide 64 districts).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 shadow-xs space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#211D20]">Order Processing Pipeline</h2>
              <p className="text-xs text-[#746B70]">Inspect status, assign couriers, and generate A4/Thermal tax invoices</p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search order ID, phone, customer..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="p-2 border border-[#EADDE0] rounded-xl text-xs w-48 sm:w-60 focus:outline-none focus:border-[#B74764]"
              />

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="p-2 border border-[#EADDE0] rounded-xl text-xs bg-white font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto border border-[#EADDE0] rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F3] border-b border-[#EADDE0] text-[#746B70] uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer & Phone</th>
                  <th className="p-3">Items & Qty</th>
                  <th className="p-3">Total (BDT)</th>
                  <th className="p-3">Risk Flag</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADDE0] text-[#211D20]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FFFAF7]/50 transition">
                    <td className="p-3 font-mono font-bold text-[#B74764]">{ord.id}</td>
                    <td className="p-3">
                      <p className="font-semibold">{ord.customerName}</p>
                      <p className="text-[11px] text-[#746B70]">{ord.phone} ({ord.district})</p>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">{ord.items.length} items</span>
                      <p className="text-[10px] text-[#746B70] truncate max-w-[140px]">{ord.items[0]?.productName}</p>
                    </td>
                    <td className="p-3 font-bold">{formatPrice(ord.total)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.riskScore === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : ord.riskScore === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {ord.riskScore} Risk
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="p-1 border border-[#EADDE0] rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => navigateTo('invoice', ord.id)}
                        className="bg-[#FFF7F3] hover:bg-[#FDF1F3] text-[#B74764] border border-[#EADDE0] p-1.5 rounded-lg text-xs mr-1"
                        title="Print A4 / Thermal Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('track-order', ord.id)}
                        className="bg-[#FFF7F3] hover:bg-[#FDF1F3] text-[#514950] border border-[#EADDE0] p-1.5 rounded-lg text-xs"
                        title="Track Consignment"
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. FAKE ORDER & COD RISK MANAGEMENT TAB */}
      {activeTab === 'risk' && (
        <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[#211D20] flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-[#B74764]" />
              <span>Fake Order & COD Risk Management</span>
            </h2>
            <p className="text-xs text-[#746B70]">
              Real-time heuristic evaluation: 11-digit Bangladesh phone formatting, repeated address anomalies, and COD return protection.
            </p>
          </div>

          <div className="space-y-4">
            {highRiskOrders.length === 0 ? (
              <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200 text-xs text-green-800">
                ✓ All recent orders meet standard phone and address verification criteria.
              </div>
            ) : (
              highRiskOrders.map((ord) => (
                <div key={ord.id} className="p-5 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#211D20] font-mono">Order #{ord.id}</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {ord.riskScore} Risk Score
                      </span>
                    </div>
                    <p className="text-[#514950]"><strong>Customer:</strong> {ord.customerName} ({ord.phone}) • {ord.deliveryAddress}</p>
                    <p className="text-amber-900 font-semibold text-[11px]">Flag Reason: {ord.riskExplanation}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${ord.phone}`}
                      className="bg-white border border-[#EADDE0] hover:border-[#B74764] text-[#B74764] px-3.5 py-2 rounded-xl text-xs font-bold"
                    >
                      Call to Verify
                    </a>
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Confirmed', 'Verified via phone by manager')}
                      className="bg-green-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold"
                    >
                      Mark Approved
                    </button>
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Cancelled', 'Flagged as duplicate / unconfirmed')}
                      className="bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. INVENTORY & STOCK MANAGEMENT TAB */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 shadow-xs space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#211D20]">Inventory & Stock Control</h2>
              <p className="text-xs text-[#746B70]">SKUs, Barcodes, Cost of Goods (COGS), and Reorder Thresholds</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-[#B74764] hover:bg-[#9F3652] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="bg-[#FFF7F3] border border-[#EADDE0] text-[#514950] hover:text-[#B74764] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Low Stock Warning Banner */}
          {lowStockProducts.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span><strong>{lowStockProducts.length} items</strong> have reached minimum reorder threshold (≤ 5 units).</span>
              </div>
              <button onClick={() => navigateTo('pre-orders')} className="font-bold underline text-amber-800">
                View Pre-Order Freight
              </button>
            </div>
          )}

          {/* Products List Table */}
          <div className="overflow-x-auto border border-[#EADDE0] rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F3] border-b border-[#EADDE0] text-[#746B70] uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">SKU & Barcode</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Origin</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Selling Price</th>
                  <th className="p-3">Cost (COGS)</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADDE0] text-[#211D20]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFFAF7]/50 transition">
                    <td className="p-3 font-mono text-[11px] text-[#746B70]">
                      <div>{p.sku}</div>
                      <div className="text-[9px] text-[#A89E99]">{p.barcode}</div>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-[10px] text-[#B74764]">{p.brand}</p>
                    </td>
                    <td className="p-3">{p.origin}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 font-bold text-[#B74764]">{formatPrice(p.price)}</td>
                    <td className="p-3 text-[#746B70]">{formatPrice(p.costPrice)}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.stock === 0 ? 'bg-red-100 text-red-800' : p.stock <= 4 ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-green-100 text-green-800'
                      }`}>
                        {p.stock} pcs
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-[#746B70] hover:text-red-600 p-1"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. SUPPLIERS & PURCHASE ORDERS TAB */}
      {activeTab === 'suppliers' && (
        <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#211D20]">Wholesale Suppliers & Purchase Orders (POs)</h2>
            <p className="text-xs text-[#746B70]">Manage Asian distributor balances and purchase orders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suppliers.map(sup => (
              <div key={sup.id} className="p-5 bg-[#FFF7F3] rounded-3xl border border-[#EADDE0] space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#B74764]">{sup.country}</span>
                  <span className="bg-white px-2 py-0.5 rounded text-[10px] font-mono border border-[#EADDE0]">{sup.id}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#211D20]">{sup.company}</h3>
                <p className="text-[#514950]">Contact: {sup.contactPerson} ({sup.phone})</p>
                <div className="pt-2 border-t border-[#EADDE0] space-y-1">
                  <div className="flex justify-between">
                    <span>Balance Due:</span>
                    <span className="font-bold text-red-700">{formatPrice(sup.balanceDue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lifetime Purchases:</span>
                    <span className="font-bold text-[#211D20]">{formatPrice(sup.totalPurchased)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Purchase Orders */}
          <div className="space-y-3 pt-4">
            <h3 className="font-bold text-[#211D20] text-sm">Freight Purchase Orders</h3>
            <div className="overflow-x-auto border border-[#EADDE0] rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF7F3] border-b border-[#EADDE0] text-[#746B70] uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">PO Number</th>
                    <th className="p-3">Supplier Name</th>
                    <th className="p-3">Items Summary</th>
                    <th className="p-3">Expected Arrival</th>
                    <th className="p-3">Total Cost</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EADDE0] text-[#211D20]">
                  {purchaseOrders.map(po => (
                    <tr key={po.id}>
                      <td className="p-3 font-mono font-bold text-[#B74764]">{po.poNumber}</td>
                      <td className="p-3">{po.supplierName}</td>
                      <td className="p-3">{po.items.map(it => `${it.productName} (x${it.quantity})`).join(', ')}</td>
                      <td className="p-3">{po.expectedDate}</td>
                      <td className="p-3 font-bold">{formatPrice(po.totalCost)}</td>
                      <td className="p-3">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. CHATBOT KNOWLEDGE TAB */}
      {activeTab === 'chatbot' && (
        <div className="bg-white rounded-3xl border border-[#EADDE0] p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#211D20]">ANUSMITA AI Assistant Knowledge Base</h2>
            <p className="text-xs text-[#746B70]">
              Automated rules configured without requiring paid OpenAI/Claude API tokens. 100% Free code-based engine.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] space-y-1">
              <p className="font-bold text-[#B74764]">Rule 1: Delivery Charge & Timelines</p>
              <p className="text-[#514950]">Keywords: delivery, চার্জ, শিপিং ➔ Output: Inside Dhaka ৳80 (24-48 hrs), Outside Dhaka ৳150 (2-3 days).</p>
            </div>

            <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] space-y-1">
              <p className="font-bold text-[#B74764]">Rule 2: Anti-Spam Mobile Validation</p>
              <p className="text-[#514950]">Regex: <code>/^01[3-9]\d{8}$/</code> ➔ Validates 11-digit Bangladeshi mobile numbers in chat messages for quick order reservation.</p>
            </div>

            <div className="p-4 bg-[#FFF7F3] rounded-2xl border border-[#EADDE0] space-y-1">
              <p className="font-bold text-[#B74764]">Rule 3: Live Order Status Sync</p>
              <p className="text-[#514950]">Keywords: track, স্ট্যাটাস, ANUS-XXXXX ➔ Pulls live order timeline and courier consignment details directly from database state.</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setShowAddProductModal(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADDE0] space-y-5 z-10 animate-fadeIn">
            <h3 className="font-serif text-lg font-bold text-[#211D20]">Add New Product to Catalog</h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anusmita Imperial Rose Gold Bangle"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#514950]">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anusmita Atelier"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#514950]">Country of Origin *</label>
                  <select
                    value={newProdOrigin}
                    onChange={(e) => setNewProdOrigin(e.target.value as any)}
                    className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl bg-white"
                  >
                    <option value="Korea">Korea</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#514950]">Retail (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl font-bold text-[#B74764]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#514950]">Cost Price (COGS)</label>
                  <input
                    type="number"
                    required
                    value={newProdCostPrice}
                    onChange={(e) => setNewProdCostPrice(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#514950]">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 border border-[#EADDE0] rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#B74764] hover:bg-[#9F3652] text-white py-3 rounded-xl font-bold text-xs shadow-xs"
                >
                  Publish Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="border border-[#EADDE0] px-4 py-3 rounded-xl font-semibold text-[#514950]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
