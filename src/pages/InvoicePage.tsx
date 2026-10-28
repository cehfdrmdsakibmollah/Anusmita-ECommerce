import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  CheckCircle, 
  QrCode, 
  Barcode, 
  FileText,
  Sliders
} from 'lucide-react';

export const InvoicePage: React.FC = () => {
  const { orders, routeParam, navigateTo, formatPrice } = useStore();
  const [printFormat, setPrintFormat] = useState<'a4' | '80mm' | '58mm'>('a4');

  const order = orders.find(o => o.id === routeParam) || orders[0];
  const invoiceNumber = `INV-${order.id.replace('ANUS-', '')}`;
  const issueDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-6">
      
      {/* Interactive Controls Bar (Hidden during print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-[#EADDE0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('order-success', order.id)}
          className="text-xs font-semibold text-[#514950] hover:text-[#B74764] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Order</span>
        </button>

        {/* Format Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#746B70] uppercase">Print Layout:</span>
          <div className="flex bg-[#FFF7F3] p-1 rounded-xl border border-[#EADDE0] text-xs font-semibold">
            <button
              onClick={() => setPrintFormat('a4')}
              className={`px-3 py-1.5 rounded-lg transition ${
                printFormat === 'a4' ? 'bg-[#B74764] text-white shadow-xs' : 'text-[#514950] hover:text-[#B74764]'
              }`}
            >
              A4 Standard
            </button>
            <button
              onClick={() => setPrintFormat('80mm')}
              className={`px-3 py-1.5 rounded-lg transition ${
                printFormat === '80mm' ? 'bg-[#B74764] text-white shadow-xs' : 'text-[#514950] hover:text-[#B74764]'
              }`}
            >
              80mm Thermal
            </button>
            <button
              onClick={() => setPrintFormat('58mm')}
              className={`px-3 py-1.5 rounded-lg transition ${
                printFormat === '58mm' ? 'bg-[#B74764] text-white shadow-xs' : 'text-[#514950] hover:text-[#B74764]'
              }`}
            >
              58mm Thermal
            </button>
          </div>
        </div>

        {/* Print Trigger */}
        <button
          onClick={handlePrint}
          className="bg-[#211D20] hover:bg-[#B74764] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* PRINTABLE CONTAINER: A4 FORMAT */}
      {printFormat === 'a4' && (
        <div className="invoice-a4-page bg-white p-8 sm:p-12 rounded-3xl border border-[#EADDE0] shadow-sm space-y-8 font-sans">
          
          {/* Header & Wordmark */}
          <div className="flex justify-between items-start border-b border-[#EADDE0] pb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-[0.08em] text-[#211D20]">
                ANUSMITA
              </h1>
              <p className="text-[10px] tracking-[0.24em] font-semibold text-[#746B70] uppercase mt-0.5">
                FASHION · JEWELLERY · BEAUTY
              </p>
              <div className="text-[11px] text-[#746B70] mt-2 space-y-0.5">
                <p>Website: anusmita.netlify.app</p>
                <p>Email: anusmitashopbd@gmail.com</p>
                <p>Hotline: +880 1310-339192</p>
                <p>Origin: Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="text-right">
              <span className="bg-[#FFF7F3] border border-[#EADDE0] text-[#B74764] text-xs font-bold px-3 py-1 rounded-full uppercase">
                Tax Invoice
              </span>
              <div className="text-xs text-[#514950] mt-2 space-y-1">
                <p><strong>Invoice No:</strong> {invoiceNumber}</p>
                <p><strong>Order Ref:</strong> #{order.id}</p>
                <p><strong>Date:</strong> {issueDate}</p>
                <p>
                  <strong>Payment State:</strong>{' '}
                  <span className={order.paymentStatus === 'Paid' ? 'text-green-700 font-bold' : 'text-amber-800 font-bold'}>
                    {order.paymentStatus} ({order.paymentMethod})
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Section */}
          <div className="grid grid-cols-2 gap-8 text-xs text-[#514950] pb-2">
            <div className="space-y-1">
              <h3 className="font-bold text-[#211D20] uppercase text-[11px] tracking-wider text-[#746B70]">Billed To:</h3>
              <p className="font-bold text-sm text-[#211D20]">{order.customerName}</p>
              <p>Phone: {order.phone}</p>
              {order.email && <p>Email: {order.email}</p>}
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-[#211D20] uppercase text-[11px] tracking-wider text-[#746B70]">Shipping Address:</h3>
              <p className="font-semibold text-[#211D20]">{order.deliveryAddress}</p>
              {order.deliveryArea && <p>Area: {order.deliveryArea}</p>}
              <p>Destination: {order.district}</p>
              <p>Courier Provider: {order.courierName || 'Pathao/Steadfast'} ({order.consignmentId || 'Pending'})</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#EADDE0] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F3] border-b border-[#EADDE0] text-[#746B70] uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADDE0] text-[#211D20]">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono text-[11px] text-[#746B70]">{item.sku}</td>
                    <td className="p-3">
                      <p className="font-semibold">{item.productName}</p>
                      {item.variantLabel && (
                        <p className="text-[10px] text-[#746B70]">Variant: {item.variantLabel}</p>
                      )}
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right">{formatPrice(item.unitPrice)}</td>
                    <td className="p-3 text-right font-bold">{formatPrice(item.unitPrice * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation & Totals */}
          <div className="flex justify-between items-start pt-2">
            <div className="text-xs text-[#746B70] max-w-sm space-y-2">
              {order.isGift && (
                <div className="p-3 bg-[#FFF7F3] rounded-xl border border-[#EADDE0] text-[11px]">
                  <p className="font-bold text-[#B74764]">🎁 Gift Note Attached:</p>
                  <p className="italic text-[#514950]">"{order.giftNote}"</p>
                </div>
              )}
              <p><strong>Authenticity Note:</strong> All products are 100% genuine Asian imports.</p>
              <p>For inquiries, quote order ID <strong>#{order.id}</strong> via WhatsApp at +880 1310-339192.</p>
            </div>

            <div className="w-64 space-y-2 text-xs text-[#514950] border-t border-[#EADDE0] pt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount:</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({order.district}):</span>
                <span className="font-semibold text-[#211D20]">{formatPrice(order.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#211D20] pt-2 border-t border-[#EADDE0]">
                <span>Total Amount:</span>
                <span className="text-[#B74764]">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1">
                <span>Amount Paid:</span>
                <span className="font-bold">{formatPrice(order.advancePaidAmount || (order.paymentStatus === 'Paid' ? order.total : 0))}</span>
              </div>
              <div className="flex justify-between text-[11px] text-amber-900 font-bold">
                <span>Remaining Due on COD:</span>
                <span>{formatPrice(order.remainingCodAmount || (order.paymentStatus === 'Unpaid' ? order.total : 0))}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Verification Footer */}
          <div className="border-t border-[#EADDE0] pt-6 flex justify-between items-center text-xs text-[#746B70]">
            <div>
              <p className="font-bold text-[#211D20]">ANUSMITA Central Logistics</p>
              <p className="text-[10px]">Authorized Signature / System Generated Receipt</p>
            </div>
            <div className="text-center font-mono text-[10px]">
              <div className="tracking-widest bg-gray-100 px-3 py-1 rounded border border-gray-300 font-bold">
                ||||| | |||| ||| ||||||| ||| ||||
              </div>
              <span>{order.id}</span>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE CONTAINER: 80MM / 58MM THERMAL RECEIPT FORMAT */}
      {(printFormat === '80mm' || printFormat === '58mm') && (
        <div className={`mx-auto bg-white p-4 rounded-2xl border border-gray-300 shadow-sm font-mono text-xs ${printFormat === '80mm' ? 'receipt-80mm max-w-[340px]' : 'receipt-58mm max-w-[270px]'}`}>
          <div className="text-center space-y-1 pb-3 border-b border-dashed border-gray-400">
            <h2 className="font-bold text-base tracking-wider text-black">ANUSMITA</h2>
            <p className="text-[10px] uppercase text-gray-600">FASHION · JEWELLERY · BEAUTY</p>
            <p className="text-[10px]">Hotline: +880 1310-339192</p>
            <p className="text-[10px]">Order: #{order.id}</p>
            <p className="text-[10px]">{issueDate}</p>
          </div>

          <div className="py-2 border-b border-dashed border-gray-400 text-[11px] space-y-0.5">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Dest:</strong> {order.district}</p>
            <p><strong>Address:</strong> {order.deliveryAddress}</p>
          </div>

          {/* Items */}
          <div className="py-2 border-b border-dashed border-gray-400 space-y-1.5 text-[11px]">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="pr-2">
                  <p className="font-bold">{it.productName}</p>
                  <p className="text-[10px] text-gray-500">Qty: {it.quantity} x {formatPrice(it.unitPrice)}</p>
                </div>
                <span className="font-bold whitespace-nowrap">{formatPrice(it.unitPrice * it.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="py-2 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{formatPrice(order.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm border-t border-black pt-1">
              <span>TOTAL:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between text-[10px] pt-1">
              <span>Payment:</span>
              <span>{order.paymentMethod} ({order.paymentStatus})</span>
            </div>
          </div>

          <div className="text-center pt-3 border-t border-dashed border-gray-400 text-[10px] text-gray-600 space-y-1">
            <p>Thank you for shopping at ANUSMITA!</p>
            <p>100% Authentic Imported Products</p>
            <div className="font-bold pt-1 tracking-widest">
              ||| | ||||| ||| ||||
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
