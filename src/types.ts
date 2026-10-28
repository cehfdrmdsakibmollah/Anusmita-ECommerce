export type CountryOrigin = 'Korea' | 'Japan' | 'China';

export type ProductCategory = 
  | 'Skincare'
  | 'Beauty / Makeup'
  | 'Fashion'
  | 'Jewellery'
  | 'Watches'
  | 'Mobile Accessories'
  | 'Bedsheets'
  | 'Perfumes'
  | 'Bags';

export type VariantType = 'volume' | 'fashion_size' | 'jewelry_spec' | 'bag_spec' | 'bedsheet_spec' | 'none';

export interface ProductVariant {
  id: string;
  label: string; // e.g. "50ml", "100ml", "M", "L", "King Size", "Rose Gold"
  price: number;
  stock: number;
  colorHex?: string;
  image?: string;
  sku?: string;
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  banglaName?: string;
  brand: string;
  origin: CountryOrigin;
  category: ProductCategory;
  subCategory?: string;
  price: number; // in BDT
  originalPrice?: number;
  costPrice: number; // COGS in BDT
  stock: number;
  reservedStock: number;
  minStockAlert: number;
  description: string;
  benefits?: string;
  howToUse?: string;
  ingredients?: string;
  safetyScore?: string; // e.g., "100% EWG Green / Hypoallergenic"
  compatibility?: string; // For accessories
  specs?: {
    material?: string;
    dimensions?: string;
    plating?: string;
    weight?: string;
    threadCount?: string;
  };
  variantType: VariantType;
  variants: ProductVariant[];
  sizes?: string[]; // S, M, L, XL or EU 37, 38, etc.
  colors?: { name: string; hex: string; image?: string }[];
  skinType?: ('Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'All')[];
  concern?: ('Acne' | 'Pigmentation' | 'Brightening' | 'Sensitive' | 'Dryness' | 'Uneven Tone')[];
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFlashDeal?: boolean;
  flashDiscountPercent?: number;
  preOrderBatchId?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 
  | 'Pending' 
  | 'Awaiting Confirmation'
  | 'Confirmed' 
  | 'Processing' 
  | 'Packed' 
  | 'Shipped' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled' 
  | 'Return Requested'
  | 'Refunded';

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Bank Transfer';
export type PaymentStatus = 'Unpaid' | 'Paid' | 'Partial Advance' | 'Refunded';

export interface OrderItemSnapshot {
  productId: string;
  productName: string;
  sku: string;
  variantLabel?: string;
  color?: string;
  size?: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface OrderTrackingEvent {
  status: OrderStatus;
  timestamp: string;
  location?: string;
  note: string;
}

export interface Order {
  id: string; // e.g. "ANUS-89241"
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  district: 'Dhaka' | 'Outside Dhaka';
  deliveryArea?: string;
  deliveryNotes?: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  advancePaidAmount?: number;
  remainingCodAmount?: number;
  transactionReference?: string;
  orderStatus: OrderStatus;
  riskScore: 'Low' | 'Medium' | 'High';
  riskExplanation: string;
  courierName?: 'Pathao' | 'Steadfast' | 'RedX' | 'In-House';
  consignmentId?: string;
  trackingEvents: OrderTrackingEvent[];
  createdAt: string;
  source: 'Website' | 'Chatbot' | 'WhatsApp';
  isGift: boolean;
  giftNote?: string;
}

export interface PreOrderBatch {
  id: string; // e.g. "BATCH-SEOUL-102"
  originCity: string;
  originCountry: CountryOrigin;
  destination: string;
  status: 'Confirmed' | 'In Transit' | 'Customs Clearance' | 'Arrived';
  flightNumber: string;
  estimatedArrivalDate: string;
  productIds: string[];
  depositPercent: number; // e.g. 30% advance
  terms: string;
}

export interface BundleItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  originalTotal: number;
  bundlePrice: number;
  savingsBDT: number;
  image: string;
  includedProductNames: string[];
  productIds: string[];
  description: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Skincare Guide' | 'Beauty Secrets' | 'Style & Trends' | 'Sourcing Story';
  readTime: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  relatedProductIds: string[];
}

export interface CustomerStory {
  id: string;
  customerName: string;
  city: string;
  verifiedPurchase: boolean;
  quote: string;
  fullReview: string;
  productName: string;
  rating: number;
  image: string;
  date: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  country: CountryOrigin;
  suppliedBrands: string[];
  balanceDue: number;
  totalPurchased: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDate: string;
  status: 'Draft' | 'Submitted' | 'Partially Received' | 'Fully Received' | 'Invoiced' | 'Paid';
  items: {
    productName: string;
    sku: string;
    quantity: number;
    unitCost: number;
  }[];
  totalCost: number;
}
