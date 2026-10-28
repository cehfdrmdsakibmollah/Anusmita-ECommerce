import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  PreOrderBatch, 
  BundleItem, 
  JournalArticle, 
  CustomerStory, 
  SupplierRecord, 
  PurchaseOrder,
  OrderStatus,
  CountryOrigin,
  ProductCategory
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_PREORDER_BATCHES, 
  INITIAL_BUNDLES, 
  INITIAL_JOURNAL_ARTICLES, 
  INITIAL_CUSTOMER_STORIES,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASE_ORDERS
} from '../data/mockData';

export type AppRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'invoice'
  | 'track-order'
  | 'routine-quiz'
  | 'deals'
  | 'bundles'
  | 'pre-orders'
  | 'customer-stories'
  | 'gift-cards'
  | 'journal'
  | 'journal-detail'
  | 'about'
  | 'contact'
  | 'policy'
  | 'account'
  | 'admin';

interface StoreContextType {
  // Navigation
  currentRoute: AppRoute;
  routeParam: string | null;
  navigateTo: (route: AppRoute, param?: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  selectedProduct: Product | null;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, options?: { variantId?: string; color?: string; size?: string; quantity?: number }) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Pricing & Calculations
  couponCode: string;
  appliedDiscountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  selectedDistrict: 'Dhaka' | 'Outside Dhaka';
  setSelectedDistrict: (district: 'Dhaka' | 'Outside Dhaka') => void;
  cartSubtotal: number;
  deliveryCharge: number;
  cartDiscount: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Orders & Checkout
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    district: 'Dhaka' | 'Outside Dhaka';
    deliveryArea?: string;
    deliveryNotes?: string;
    paymentMethod: 'Cash on Delivery' | 'bKash' | 'Nagad';
    isGift: boolean;
    giftNote?: string;
    source?: 'Website' | 'Chatbot' | 'WhatsApp';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  
  // Audio & Notification
  soundEnabled: boolean;
  toggleSound: () => void;
  playNotificationSound: (type?: 'message' | 'chime') => void;

  // Currency
  currency: 'BDT' | 'USD';
  toggleCurrency: () => void;
  formatPrice: (amountBDT: number) => string;

  // Other Entities
  preOrderBatches: PreOrderBatch[];
  bundles: BundleItem[];
  journalArticles: JournalArticle[];
  selectedArticle: JournalArticle | null;
  customerStories: CustomerStory[];
  suppliers: SupplierRecord[];
  purchaseOrders: PurchaseOrder[];
  addCustomerStory: (story: Omit<CustomerStory, 'id' | 'date'>) => void;

  // Search & Modals
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [routeParam, setRouteParam] = useState<string | null>(null);

  // Entities State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('anusmita_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('anusmita_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('anusmita_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('anusmita_wishlist');
    return saved ? JSON.parse(saved) : ['prod-101', 'prod-105'];
  });

  const [suppliers] = useState<SupplierRecord[]>(INITIAL_SUPPLIERS);
  const [purchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [preOrderBatches] = useState<PreOrderBatch[]>(INITIAL_PREORDER_BATCHES);
  const [bundles] = useState<BundleItem[]>(INITIAL_BUNDLES);
  const [journalArticles] = useState<JournalArticle[]>(INITIAL_JOURNAL_ARTICLES);
  const [customerStories, setCustomerStories] = useState<CustomerStory[]>(INITIAL_CUSTOMER_STORIES);

  // UI state
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sound preference
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('anusmita_sound');
    return saved !== null ? saved === 'true' : true;
  });

  // Currency
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  // Checkout pricing state
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('anusmita_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('anusmita_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('anusmita_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('anusmita_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('anusmita_sound', String(soundEnabled));
  }, [soundEnabled]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navigateTo = (route: AppRoute, param?: string) => {
    setCurrentRoute(route);
    setRouteParam(param || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    showToast(soundEnabled ? 'Notification sounds muted' : 'Notification sounds enabled');
  };

  const playNotificationSound = (type: 'message' | 'chime' = 'message') => {
    if (!soundEnabled) return;
    try {
      const audioUrl = type === 'chime'
        ? 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3';
      const audio = new Audio(audioUrl);
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch {
      // Audio autoplay may be constrained by browser
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'BDT' ? 'USD' : 'BDT');
  };

  const formatPrice = (amountBDT: number): string => {
    if (currency === 'USD') {
      const usd = (amountBDT / 120).toFixed(2);
      return `$${usd}`;
    }
    return `৳ ${amountBDT.toLocaleString('en-BD')}`;
  };

  // Product mutations
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}"`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog');
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    options?: { variantId?: string; color?: string; size?: string; quantity?: number }
  ) => {
    const qty = options?.quantity || 1;
    let selectedVariant = product.variants.find(v => v.id === options?.variantId);
    if (!selectedVariant && product.variants.length > 0) {
      selectedVariant = product.variants[0];
    }

    const unitPrice = selectedVariant?.price || product.price;

    setCart(prev => {
      // check if identical item variant already in cart
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id &&
        item.selectedVariant?.id === selectedVariant?.id &&
        item.selectedColor === options?.color &&
        item.selectedSize === options?.size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      } else {
        return [
          ...prev, 
          {
            product,
            selectedVariant,
            selectedColor: options?.color,
            selectedSize: options?.size,
            quantity: qty,
            unitPrice
          }
        ];
      }
    });

    playNotificationSound('chime');
    showToast(`Added ${product.name} to your shopping bag`);
    setCartDrawerOpen(true);
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ANUSMITA10' || clean === 'ROYAL10') {
      setCouponCode(clean);
      setAppliedDiscountPercent(10);
      playNotificationSound('chime');
      showToast('Coupon ANUSMITA10 applied: 10% discount!');
      return true;
    }
    showToast('Invalid coupon code. Try ANUSMITA10');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscountPercent(0);
    showToast('Coupon removed');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const deliveryCharge = cartSubtotal > 0 ? (selectedDistrict === 'Dhaka' ? 80 : 150) : 0;
  const cartDiscount = Math.round((cartSubtotal * appliedDiscountPercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryCharge);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        playNotificationSound('chime');
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  // Risk Scoring Algorithm for Bangladesh E-Commerce (Fake Order & COD Guard)
  const assessRiskScore = (phone: string, address: string, district: string, paymentMethod: string): {
    score: 'Low' | 'Medium' | 'High';
    explanation: string;
  } => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const isStandardBD = /^01[3-9]\d{8}$/.test(cleanPhone);
    const hasDetailedAddress = address.trim().length >= 15;

    if (!isStandardBD) {
      return {
        score: 'High',
        explanation: 'Invalid Bangladesh mobile number structure. Requires 11 digits starting with 013-019.'
      };
    }

    if (!hasDetailedAddress) {
      return {
        score: 'Medium',
        explanation: 'Brief address provided. Manual phone confirmation recommended before parcel dispatch.'
      };
    }

    if (paymentMethod === 'bKash' || paymentMethod === 'Nagad') {
      return {
        score: 'Low',
        explanation: 'Prepaid digital transaction. Zero cash-on-delivery return risk.'
      };
    }

    return {
      score: 'Low',
      explanation: 'Verified 11-digit mobile format and adequate delivery address depth.'
    };
  };

  // Place Order
  const placeOrder = (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    district: 'Dhaka' | 'Outside Dhaka';
    deliveryArea?: string;
    deliveryNotes?: string;
    paymentMethod: 'Cash on Delivery' | 'bKash' | 'Nagad';
    isGift: boolean;
    giftNote?: string;
    source?: 'Website' | 'Chatbot' | 'WhatsApp';
  }): Order => {
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ANUS-${orderNum}`;
    const risk = assessRiskScore(orderData.phone, orderData.deliveryAddress, orderData.district, orderData.paymentMethod);

    const snapshots = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.selectedVariant?.sku || item.product.sku,
      variantLabel: item.selectedVariant?.label,
      color: item.selectedColor,
      size: item.selectedSize,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      image: item.product.mainImage
    }));

    const newOrder: Order = {
      id: orderId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      deliveryAddress: orderData.deliveryAddress,
      district: orderData.district,
      deliveryArea: orderData.deliveryArea,
      deliveryNotes: orderData.deliveryNotes,
      items: snapshots,
      subtotal: cartSubtotal,
      deliveryCharge,
      discount: cartDiscount,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: (orderData.paymentMethod === 'bKash' || orderData.paymentMethod === 'Nagad') ? 'Paid' : 'Unpaid',
      advancePaidAmount: (orderData.paymentMethod === 'bKash' || orderData.paymentMethod === 'Nagad') ? cartTotal : 0,
      remainingCodAmount: orderData.paymentMethod === 'Cash on Delivery' ? cartTotal : 0,
      transactionReference: (orderData.paymentMethod === 'bKash' || orderData.paymentMethod === 'Nagad') 
        ? `TRX-${Math.random().toString(36).substring(2, 9).toUpperCase()}` 
        : undefined,
      orderStatus: 'Confirmed',
      riskScore: risk.score,
      riskExplanation: risk.explanation,
      courierName: orderData.district === 'Dhaka' ? 'Pathao' : 'Steadfast',
      consignmentId: `CSG-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingEvents: [
        {
          status: 'Confirmed',
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          location: 'Anusmita Central Warehouse, Dhaka',
          note: 'Order successfully created and verified.'
        }
      ],
      createdAt: new Date().toISOString(),
      source: orderData.source || 'Website',
      isGift: orderData.isGift,
      giftNote: orderData.giftNote
    };

    // Deduct stock safely
    setProducts(prev => prev.map(prod => {
      const orderedItem = cart.find(ci => ci.product.id === prod.id);
      if (orderedItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - orderedItem.quantity)
        };
      }
      return prod;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    playNotificationSound('chime');
    navigateTo('order-success', newOrder.id);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const newEvent = {
          status,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          location: 'Dhaka Logistics Hub',
          note: note || `Order updated to ${status}`
        };
        return {
          ...ord,
          orderStatus: status,
          trackingEvents: [...ord.trackingEvents, newEvent]
        };
      }
      return ord;
    }));
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const addCustomerStory = (story: Omit<CustomerStory, 'id' | 'date'>) => {
    const newStory: CustomerStory = {
      ...story,
      id: `story-${Date.now()}`,
      date: 'Just now'
    };
    setCustomerStories(prev => [newStory, ...prev]);
    showToast('Thank you! Your story has been submitted.');
  };

  const selectedProduct = routeParam && currentRoute === 'product'
    ? products.find(p => p.id === routeParam) || products[0]
    : null;

  const selectedArticle = routeParam && currentRoute === 'journal-detail'
    ? journalArticles.find(a => a.slug === routeParam || a.id === routeParam) || journalArticles[0]
    : null;

  return (
    <StoreContext.Provider value={{
      currentRoute,
      routeParam,
      navigateTo,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      selectedProduct,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartDrawerOpen,
      setCartDrawerOpen,
      couponCode,
      appliedDiscountPercent,
      applyCoupon,
      removeCoupon,
      selectedDistrict,
      setSelectedDistrict,
      cartSubtotal,
      deliveryCharge,
      cartDiscount,
      cartTotal,
      wishlist,
      toggleWishlist,
      orders,
      currentOrder,
      placeOrder,
      updateOrderStatus,
      soundEnabled,
      toggleSound,
      playNotificationSound,
      currency,
      toggleCurrency,
      formatPrice,
      preOrderBatches,
      bundles,
      journalArticles,
      selectedArticle,
      customerStories,
      suppliers,
      purchaseOrders,
      addCustomerStory,
      searchModalOpen,
      setSearchModalOpen,
      quickViewProduct,
      setQuickViewProduct,
      toastMessage,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
