import { Product, PreOrderBatch, BundleItem, JournalArticle, CustomerStory, SupplierRecord, PurchaseOrder, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    sku: 'SKIN-CENT-100',
    barcode: '8809576261012',
    name: 'SKIN1004 Madagascar Centella Ampoule',
    banglaName: 'স্কিন১০০৪ মাদাগাস্কার সেন্টেলা অ্যাম্পুল',
    brand: 'SKIN1004',
    origin: 'Korea',
    category: 'Skincare',
    subCategory: 'Serum & Ampoule',
    price: 1650,
    originalPrice: 1950,
    costPrice: 950,
    stock: 24,
    reservedStock: 2,
    minStockAlert: 5,
    description: '100% pure Centella Asiatica extract directly sourced from Madagascar. Instantly calms redness, repairs sensitive skin barrier, and deeply hydrates with zero stickiness.',
    benefits: 'Calms inflamed acne, hydrates depleted skin, restores skin moisture barrier, hypoallergenic formulation.',
    howToUse: 'Drop an appropriate amount onto cleansed and toned face. Gently pat with warm palms until fully absorbed into skin.',
    ingredients: '100% Centella Asiatica Extract (Centella Asiatica from Madagascar).',
    safetyScore: '100% EWG Green Grade, Non-Comedogenic, Fragrance-Free',
    variantType: 'volume',
    variants: [
      { id: 'v-101-1', label: '55ml', price: 1650, stock: 16, sku: 'SKIN-CENT-55' },
      { id: 'v-101-2', label: '100ml', price: 2450, stock: 8, sku: 'SKIN-CENT-100' }
    ],
    skinType: ['Sensitive', 'Oily', 'Combination', 'All'],
    concern: ['Acne', 'Sensitive', 'Dryness'],
    rating: 4.9,
    reviewCount: 148,
    mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f7193b0a29?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    isBestSeller: true,
    isTrending: true
  },
  {
    id: 'prod-102',
    sku: 'BOJ-RELIEF-50',
    barcode: '8809738313204',
    name: 'Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+ PA++++',
    banglaName: 'বিউটি অব জোসন রিলিফ সান সানস্ক্রিন',
    brand: 'Beauty of Joseon',
    origin: 'Korea',
    category: 'Skincare',
    subCategory: 'Sunscreen',
    price: 1550,
    originalPrice: 1800,
    costPrice: 880,
    stock: 32,
    reservedStock: 3,
    minStockAlert: 8,
    description: 'An organic, lightweight chemical sunscreen enriched with 30% Rice Extract and Grain Fermented Extracts. Delivers luminous, glass-skin glow without white cast or heaviness.',
    benefits: 'Broad-spectrum SPF50+ protection, natural glass glow, no eye stinging, non-greasy moisturizing finish.',
    howToUse: 'Apply evenly as the final step of your morning skincare routine 15 minutes before sun exposure.',
    ingredients: 'Oryza Sativa (Rice) Bran Water (30%), Grain Probiotics Complex, Niacinamide, Glycerin.',
    safetyScore: 'Dermatologically Tested, EWG Verified, Reef-Safe',
    variantType: 'volume',
    variants: [
      { id: 'v-102-1', label: '50ml Single', price: 1550, stock: 24, sku: 'BOJ-RELIEF-50' },
      { id: 'v-102-2', label: '50ml Duo Pack (2x)', price: 2850, stock: 8, sku: 'BOJ-RELIEF-DUO' }
    ],
    skinType: ['Dry', 'Combination', 'Sensitive', 'All'],
    concern: ['Brightening', 'Pigmentation', 'Uneven Tone'],
    rating: 5.0,
    reviewCount: 312,
    mainImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
    ],
    isBestSeller: true,
    isFlashDeal: true,
    flashDiscountPercent: 15
  },
  {
    id: 'prod-103',
    sku: 'HADA-GOKU-170',
    barcode: '4987241155712',
    name: 'Hada Labo Gokujyun Premium Hyaluronic Lotion (Gold)',
    banglaName: 'হাদা লাবো গোকুজুন প্রিমিয়াম হায়ালুরনিক লোশন',
    brand: 'Hada Labo',
    origin: 'Japan',
    category: 'Skincare',
    subCategory: 'Toner & Essence',
    price: 1850,
    originalPrice: 2100,
    costPrice: 1100,
    stock: 14,
    reservedStock: 1,
    minStockAlert: 4,
    description: 'Iconic Japanese ultra-hydrating essence formulated with 7 molecular types of Hyaluronic Acid. Acts like a moisture magnet for deeply dehydrated skin.',
    benefits: '7-layer hyaluronic acid hydration, plumps fine lines, alcohol-free, fragrance-free.',
    howToUse: 'Pour a coin-sized amount into palm and gently press into skin until fully absorbed.',
    ingredients: '7 Types of Hyaluronic Acid, Tremella Fuciformis Polysaccharide, Butylene Glycol.',
    safetyScore: 'Colorant-free, Mineral oil-free, Alcohol-free',
    variantType: 'volume',
    variants: [
      { id: 'v-103-1', label: '170ml Bottle', price: 1850, stock: 10, sku: 'HADA-170-BTL' },
      { id: 'v-103-2', label: '170ml Refill Pack', price: 1650, stock: 4, sku: 'HADA-170-REF' }
    ],
    skinType: ['Dry', 'Sensitive', 'Combination'],
    concern: ['Dryness', 'Uneven Tone'],
    rating: 4.9,
    reviewCount: 94,
    mainImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80'
    ],
    isNewArrival: true
  },
  {
    id: 'prod-104',
    sku: 'ANUS-SILK-ROSE',
    barcode: '6972048123019',
    name: 'Anusmita Imperial Mulberry Silk Kurti & Dupatta Set',
    banglaName: 'অনুষ্মিতা ইম্পেরিয়াল মালবেরি সিল্ক কুর্তি সেট',
    brand: 'Anusmita Atelier',
    origin: 'China',
    category: 'Fashion',
    subCategory: 'Luxury Apparel',
    price: 4850,
    originalPrice: 5600,
    costPrice: 2800,
    stock: 9,
    reservedStock: 1,
    minStockAlert: 3,
    description: 'Handcrafted from 100% natural Grade 6A Chinese Mulberry Silk with delicate tone-on-tone zari embroidery. Breathable, fluid drape designed for festive elegance.',
    specs: {
      material: '100% Mulberry Silk with Chiffon Dupatta',
      weight: '340g'
    },
    variantType: 'fashion_size',
    colors: [
      { name: 'Blush Rose', hex: '#F9E9ED', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Champagne Ivory', hex: '#FFF7F3', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80' },
      { name: 'Restrained Charcoal', hex: '#211D20', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    variants: [
      { id: 'v-104-s', label: 'S (36)', price: 4850, stock: 2, sku: 'SILK-ROSE-S' },
      { id: 'v-104-m', label: 'M (38)', price: 4850, stock: 4, sku: 'SILK-ROSE-M' },
      { id: 'v-104-l', label: 'L (40)', price: 4850, stock: 2, sku: 'SILK-ROSE-L' },
      { id: 'v-104-xl', label: 'XL (42)', price: 5100, stock: 1, sku: 'SILK-ROSE-XL' }
    ],
    rating: 4.8,
    reviewCount: 37,
    mainImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    isTrending: true
  },
  {
    id: 'prod-105',
    sku: 'JEWL-AURA-18K',
    barcode: '6948192038102',
    name: '18K Rose Gold Plated Anti-Tarnish Freshwater Pearl Choker',
    banglaName: '১৮কে রোজ গোল্ড অ্যান্টি-টার্নিশ ফ্রেশওয়াটার পার্ল চোকার',
    brand: 'Anusmita Jewellery',
    origin: 'China',
    category: 'Jewellery',
    subCategory: 'Necklaces & Chokers',
    price: 2450,
    originalPrice: 2900,
    costPrice: 1250,
    stock: 15,
    reservedStock: 0,
    minStockAlert: 4,
    description: 'Crafted with genuine baroque freshwater pearls and triple-layered 18K Rose Gold plating over surgical grade stainless steel. Waterproof, sweatproof, and guaranteed anti-tarnish for 2 years.',
    specs: {
      plating: 'Triple 18K Rose Gold electroplated PVD',
      material: 'Surgical Stainless Steel & Genuine Freshwater Pearls',
      dimensions: '38cm + 5cm adjustable extension'
    },
    variantType: 'jewelry_spec',
    variants: [
      { id: 'v-105-rg', label: '18K Rose Gold', price: 2450, stock: 10, sku: 'JEWL-AURA-RG' },
      { id: 'v-105-yg', label: '18K Champagne Gold', price: 2450, stock: 5, sku: 'JEWL-AURA-YG' }
    ],
    rating: 4.9,
    reviewCount: 68,
    mainImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'prod-106',
    sku: 'PERF-CHERRY-50',
    barcode: '4901301294810',
    name: 'Kyoto Cherry Blossom & White Tea Eau De Parfum',
    banglaName: 'কিয়োটো চেরি ব্লসম অ্যান্ড হোয়াইট টি পারফিউম',
    brand: 'Kyoto Atelier',
    origin: 'Japan',
    category: 'Perfumes',
    subCategory: 'Luxury Fragrance',
    price: 3600,
    originalPrice: 4200,
    costPrice: 1900,
    stock: 12,
    reservedStock: 1,
    minStockAlert: 3,
    description: 'An ethereal floral-green fragrance captured during springtime in Arashiyama, Kyoto. Notes of delicate Sakura petals, Uji white tea, sheer peony, and soft cedarwood.',
    benefits: 'Long-lasting 10-12 hours sillage, cruelty-free, clean IFRA certified ingredients.',
    variantType: 'volume',
    variants: [
      { id: 'v-106-10', label: '10ml Travel Atomizer', price: 950, stock: 6, sku: 'KYOTO-10' },
      { id: 'v-106-50', label: '50ml Signature Flacon', price: 3600, stock: 6, sku: 'KYOTO-50' }
    ],
    rating: 4.9,
    reviewCount: 52,
    mainImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    isTrending: true
  },
  {
    id: 'prod-107',
    sku: 'BAG-LOTUS-CREAM',
    barcode: '6938201948210',
    name: 'Anusmita Structured Vegan Leather Shoulder Bag',
    banglaName: 'অনুষ্মিতা স্ট্রাকচার্ড ভিগান লেদার শোল্ডার ব্যাগ',
    brand: 'Anusmita Leatherworks',
    origin: 'China',
    category: 'Bags',
    subCategory: 'Handbags & Crossbody',
    price: 2850,
    originalPrice: 3400,
    costPrice: 1450,
    stock: 11,
    reservedStock: 0,
    minStockAlert: 3,
    description: 'Clean architectural lines meet cruelty-free microfibre vegan leather. Spacious interior fits iPhone Pro Max, small perfume flacon, makeup compact, cards, and keys.',
    specs: {
      material: 'Scratch-resistant Microfiber Vegan Leather with Champagne Gold Hardware',
      dimensions: '24cm (W) x 16cm (H) x 8cm (D)'
    },
    variantType: 'bag_spec',
    colors: [
      { name: 'Warm Ivory', hex: '#FFF7F3', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dusty Rose', hex: '#F9E9ED', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' }
    ],
    variants: [
      { id: 'v-107-iv', label: 'Warm Ivory', price: 2850, stock: 6, sku: 'BAG-IVORY' },
      { id: 'v-107-ro', label: 'Dusty Rose', price: 2850, stock: 5, sku: 'BAG-ROSE' }
    ],
    rating: 4.8,
    reviewCount: 41,
    mainImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    isBestSeller: true
  },
  {
    id: 'prod-108',
    sku: 'BED-JAP-COTTON',
    barcode: '4920194839201',
    name: 'Kyoto 400TC Washed Cotton Floral Bedsheet Set',
    banglaName: 'কিয়োটো ৪০০টিসি ওয়াশড কটন ফ্লোরাল বেডশিট সেট',
    brand: 'Kyoto Living',
    origin: 'Japan',
    category: 'Bedsheets',
    subCategory: 'Bedding Sets',
    price: 3450,
    originalPrice: 4100,
    costPrice: 1950,
    stock: 8,
    reservedStock: 1,
    minStockAlert: 2,
    description: 'Crafted from breathable 400 thread-count long-staple Japanese washed cotton. Becomes softer with every wash; temperature regulating for Bangladesh climate.',
    specs: {
      threadCount: '400 Thread Count Long-Staple Cotton',
      dimensions: 'King: 230cm x 250cm | Queen: 200cm x 230cm',
      material: '100% Pre-washed Natural Cotton (Includes 2 pillow covers)'
    },
    variantType: 'bedsheet_spec',
    sizes: ['Queen Size (7x7.5 ft)', 'King Size (7.5x8.5 ft)'],
    variants: [
      { id: 'v-108-q', label: 'Queen Size (7x7.5 ft)', price: 3450, stock: 5, sku: 'BED-QUEEN' },
      { id: 'v-108-k', label: 'King Size (7.5x8.5 ft)', price: 3950, stock: 3, sku: 'BED-KING' }
    ],
    rating: 4.9,
    reviewCount: 29,
    mainImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-109',
    sku: 'LANEIGE-LIP-BERRY',
    barcode: '8809643068940',
    name: 'Laneige Lip Sleeping Mask EX [Berry]',
    banglaName: 'ল্যানেজ লিপ স্লিপিং মাস্ক বেরি',
    brand: 'Laneige',
    origin: 'Korea',
    category: 'Beauty / Makeup',
    subCategory: 'Lip Care',
    price: 1350,
    originalPrice: 1600,
    costPrice: 720,
    stock: 28,
    reservedStock: 2,
    minStockAlert: 6,
    description: 'Enriched with Berry Fruit Complex, Vitamin C, and coconut oil to gently melt stubborn dead skin cells from the lips overnight.',
    benefits: 'Plump baby-soft lips, deep overnight hydration, antioxidant rich.',
    variantType: 'volume',
    variants: [
      { id: 'v-109-8', label: '8g Mini Tub', price: 650, stock: 12, sku: 'LIP-8G' },
      { id: 'v-109-20', label: '20g Full Size', price: 1350, stock: 16, sku: 'LIP-20G' }
    ],
    skinType: ['All'],
    concern: ['Dryness'],
    rating: 5.0,
    reviewCount: 220,
    mainImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
    ],
    isFlashDeal: true,
    flashDiscountPercent: 12
  },
  {
    id: 'prod-110',
    sku: 'COSRX-SNAIL-96',
    barcode: '8809416470009',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    banglaName: 'কসআরএক্স অ্যাডভান্সড স্নেল ৯৬ মিউসিন পাওয়ার এসেন্স',
    brand: 'COSRX',
    origin: 'Korea',
    category: 'Skincare',
    subCategory: 'Serum & Ampoule',
    price: 1750,
    originalPrice: 2050,
    costPrice: 980,
    stock: 0, // Out of stock to test Pre-Order workflow!
    reservedStock: 0,
    minStockAlert: 5,
    description: 'Contains 96.3% Snail Secretion Filtrate to protect skin from moisture loss while improving skin elasticity and soothing damaged skin.',
    benefits: 'Repairs acne scars, promotes collagen elasticity, intense hydration.',
    howToUse: 'After cleansing and toning, apply a small amount on your entire face. Gently pat using fingertips.',
    variantType: 'volume',
    variants: [
      { id: 'v-110-1', label: '100ml', price: 1750, stock: 0, sku: 'COSRX-100' }
    ],
    skinType: ['Sensitive', 'Dry', 'Combination', 'All'],
    concern: ['Acne', 'Sensitive', 'Dryness'],
    rating: 4.9,
    reviewCount: 410,
    mainImage: 'https://images.unsplash.com/photo-1608248597359-00f7193b0a29?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597359-00f7193b0a29?auto=format&fit=crop&w=800&q=80'
    ],
    preOrderBatchId: 'BATCH-SEOUL-102'
  }
];

export const INITIAL_PREORDER_BATCHES: PreOrderBatch[] = [
  {
    id: 'BATCH-SEOUL-102',
    originCity: 'Seoul',
    originCountry: 'Korea',
    destination: 'Dhaka Air Cargo Hub',
    status: 'In Transit',
    flightNumber: 'KE-631',
    estimatedArrivalDate: '2026-11-04',
    productIds: ['prod-110'],
    depositPercent: 30,
    terms: '30% advance deposit via bKash/Nagad to reserve from this verified cargo flight. Balance payable upon delivery in Dhaka or countrywide.'
  },
  {
    id: 'BATCH-TOKYO-88',
    originCity: 'Tokyo',
    originCountry: 'Japan',
    destination: 'Dhaka Customs Terminal',
    status: 'Confirmed',
    flightNumber: 'JL-741',
    estimatedArrivalDate: '2026-11-09',
    productIds: ['prod-103', 'prod-106'],
    depositPercent: 30,
    terms: 'Direct authenticated batch from Ginza flagship wholesale distributors.'
  },
  {
    id: 'BATCH-GZ-304',
    originCity: 'Guangzhou',
    originCountry: 'China',
    destination: 'Chittagong Port Terminal',
    status: 'Customs Clearance',
    flightNumber: 'CZ-3057',
    estimatedArrivalDate: '2026-10-31',
    productIds: ['prod-104', 'prod-105', 'prod-107'],
    depositPercent: 30,
    terms: 'Handcrafted mulberry silks & 18K anti-tarnish jewelry batch.'
  }
];

export const INITIAL_BUNDLES: BundleItem[] = [
  {
    id: 'bundle-glass-skin',
    name: 'Korean Glass Skin Complete 4-Step Routine',
    subtitle: 'Gentle Cleanse + Hydrate + Repair + Sun Protection',
    category: 'Skincare',
    originalTotal: 5750,
    bundlePrice: 4850,
    savingsBDT: 900,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    includedProductNames: [
      'SKIN1004 Centella Ampoule (55ml)',
      'Beauty of Joseon Relief Sun Rice + Probiotics (50ml)',
      'Hada Labo Gokujyun Premium Lotion (170ml)',
      'Laneige Lip Sleeping Mask Berry (8g)'
    ],
    productIds: ['prod-101', 'prod-102', 'prod-103', 'prod-109'],
    description: 'Curated by Anusmita beauty specialists to achieve the coveted translucent Korean glass-skin glow in 14 days.'
  },
  {
    id: 'bundle-luxury-party',
    name: 'Imperial Evening Radiance Fashion & Jewellery Duo',
    subtitle: 'Grade 6A Mulberry Silk + 18K Rose Gold Pearl Choker',
    category: 'Fashion & Lifestyle',
    originalTotal: 7300,
    bundlePrice: 6250,
    savingsBDT: 1050,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    includedProductNames: [
      'Anusmita Mulberry Silk Kurti Set',
      '18K Rose Gold Anti-Tarnish Pearl Choker'
    ],
    productIds: ['prod-104', 'prod-105'],
    description: 'Effortless royal elegance for Bangladeshi weddings, celebrations, and formal soirees.'
  }
];

export const INITIAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'korean-glass-skin-routine-101',
    title: 'The Real Korean Glass Skin Routine: Dermatologist Insights for Bangladeshi Weather',
    category: 'Skincare Guide',
    readTime: '4 min read',
    publishedAt: 'October 24, 2026',
    author: 'Anusmita Skincare Editorial',
    excerpt: 'How to layer lightweight hydrating toners and serums without feeling sticky or clogged in high humidity.',
    content: `Glass skin isn’t about heavy makeup or blinding highlighters; it is about skin so hydrated, calm, and even-toned that it naturally reflects light like polished glass. 

In Dhaka and tropical Bangladesh, humidity often tricks us into skipping moisturizer or opting for harsh stripping cleansers. Here is the verified routine:

1. Double Cleanse gently: Start with a mild micellar water or light oil cleanser.
2. Layer watery hydration: Pat 2 to 3 thin layers of Hada Labo or Centella Ampoule directly with hands rather than cotton pads.
3. Lock with barrier cream: Look for rice bran or ceramides.
4. Non-negotiable SPF: Organic Korean sunscreens like Beauty of Joseon absorb with zero greasy residue.`,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    relatedProductIds: ['prod-101', 'prod-102', 'prod-103']
  },
  {
    id: 'art-2',
    slug: 'anti-tarnish-jewelry-care-guide',
    title: 'What Does 18K PVD Anti-Tarnish Really Mean?',
    category: 'Style & Trends',
    readTime: '3 min read',
    publishedAt: 'October 18, 2026',
    author: 'Anusmita Atelier',
    excerpt: 'Why Physical Vapor Deposition (PVD) gold plating resists sweat, water, and humidity ten times better than standard fashion plating.',
    content: `Traditional electroplating in fashion jewelry easily flakes off when exposed to sweat, perfume, or humidity. At Anusmita, our jewellery uses vacuum PVD coating where titanium nitride and 18K gold are deposited at atomic level onto medical-grade steel. 

You can wash your hands, wear perfume, or enjoy outdoor summer humidity without green skin stains or darkened metal.`,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    relatedProductIds: ['prod-105']
  }
];

export const INITIAL_CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: 'story-1',
    customerName: 'Tasnim Ahmed',
    city: 'Gulshan-2, Dhaka',
    verifiedPurchase: true,
    rating: 5,
    quote: 'Finally authentic Korean skincare in Bangladesh without the fear of counterfeits.',
    fullReview: 'I was hesitant about ordering Centella Ampoule online because of so many duplicates in local markets. Anusmita delivered in 24 hours with authentic holographic seals. My acne redness settled within 4 days.',
    productName: 'SKIN1004 Madagascar Centella Ampoule',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    date: '2 days ago'
  },
  {
    id: 'story-2',
    customerName: 'Nuzhat Farhana',
    city: 'Chittagong',
    verifiedPurchase: true,
    rating: 5,
    quote: 'The Mulberry silk texture is sublime. The blush shade matches the photos exactly.',
    fullReview: 'The packaging felt like a bespoke luxury unboxing from Paris. The kurti fabric is pure silk with soft luster, not shiny polyester. Delivered to Chittagong safely in 2 business days.',
    productName: 'Imperial Mulberry Silk Kurti Set',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    date: '5 days ago'
  },
  {
    id: 'story-3',
    customerName: 'Dr. Samira Khan',
    city: 'Uttara, Dhaka',
    verifiedPurchase: true,
    rating: 5,
    quote: 'Beauty of Joseon sunscreen has no white cast on South Asian skin tones. 10/10.',
    fullReview: 'As a dermatologist, I am very picky about UV filters. This rice sunscreen leaves zero ashiness, sits beautifully under light foundation, and feels like a serum.',
    productName: 'Beauty of Joseon Relief Sun SPF50+',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    date: '1 week ago'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ANUS-78219',
    customerName: 'Samira Rahman',
    phone: '01711223344',
    email: 'samira.rahman@gmail.com',
    deliveryAddress: 'House 42, Road 11, Banani',
    district: 'Dhaka',
    deliveryArea: 'Banani',
    deliveryNotes: 'Please ring bell before 4 PM',
    items: [
      {
        productId: 'prod-101',
        productName: 'SKIN1004 Madagascar Centella Ampoule',
        sku: 'SKIN-CENT-55',
        variantLabel: '55ml',
        unitPrice: 1650,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-102',
        productName: 'Beauty of Joseon Relief Sun: Rice + Probiotics',
        sku: 'BOJ-RELIEF-50',
        variantLabel: '50ml Single',
        unitPrice: 1550,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 3200,
    deliveryCharge: 80,
    discount: 320, // 10% with ANUSMITA10
    total: 2960,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Unpaid',
    orderStatus: 'Processing',
    riskScore: 'Low',
    riskExplanation: 'Verified 11-digit BD mobile number, full address depth, previous successful delivery.',
    courierName: 'Pathao',
    consignmentId: 'PTH-DH-89214',
    trackingEvents: [
      { status: 'Confirmed', timestamp: '2026-10-28 09:15 AM', location: 'Anusmita Dhaka Central Hub', note: 'Order verified by staff.' },
      { status: 'Processing', timestamp: '2026-10-28 11:30 AM', location: 'Packaging Station 2', note: 'Quality check and gift wrap packaging.' }
    ],
    createdAt: '2026-10-28T09:15:00Z',
    source: 'Website',
    isGift: true,
    giftNote: 'Happy Birthday Tahmina! Enjoy the authentic Korean glow ✨'
  },
  {
    id: 'ANUS-67120',
    customerName: 'Fahim Morshed',
    phone: '01819334455',
    email: 'fahim.morshed@yahoo.com',
    deliveryAddress: 'Flat 4B, Nasirabad Housing Society',
    district: 'Outside Dhaka',
    deliveryArea: 'Nasirabad, Chittagong',
    items: [
      {
        productId: 'prod-106',
        productName: 'Kyoto Cherry Blossom & White Tea EDP',
        sku: 'KYOTO-50',
        variantLabel: '50ml Signature Flacon',
        unitPrice: 3600,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 3600,
    deliveryCharge: 150,
    discount: 0,
    total: 3750,
    paymentMethod: 'bKash',
    paymentStatus: 'Paid',
    advancePaidAmount: 3750,
    transactionReference: 'BKASH-8X29104A',
    orderStatus: 'Shipped',
    riskScore: 'Low',
    riskExplanation: 'Full digital payment verified via official bKash Merchant API.',
    courierName: 'Steadfast',
    consignmentId: 'STDF-CTG-44129',
    trackingEvents: [
      { status: 'Confirmed', timestamp: '2026-10-27 02:00 PM', location: 'Dhaka Hub', note: 'bKash payment confirmed.' },
      { status: 'Packed', timestamp: '2026-10-27 05:00 PM', location: 'Dhaka Hub', note: 'Packed with bubble cushioning.' },
      { status: 'Shipped', timestamp: '2026-10-28 08:30 AM', location: 'Dhaka-Chittagong Highway Transit', note: 'In transit to Chittagong Steadfast Depot.' }
    ],
    createdAt: '2026-10-27T14:00:00Z',
    source: 'Website',
    isGift: false
  }
];

export const INITIAL_SUPPLIERS: SupplierRecord[] = [
  {
    id: 'sup-1',
    name: 'Seoul Beauty Wholesalers Corp',
    company: 'Seoul Beauty Co., Ltd',
    contactPerson: 'Min-Jun Park',
    phone: '+82 2-719-2041',
    email: 'export@seoulbeautycorp.kr',
    country: 'Korea',
    suppliedBrands: ['SKIN1004', 'Beauty of Joseon', 'Laneige', 'COSRX'],
    balanceDue: 240000,
    totalPurchased: 1850000
  },
  {
    id: 'sup-2',
    name: 'Kyoto Fragrance & Cosmetics Guild',
    company: 'Kyoto Aromatics Japan',
    contactPerson: 'Kenji Takahashi',
    phone: '+81 75-381-9920',
    email: 'orders@kyotoguild.jp',
    country: 'Japan',
    suppliedBrands: ['Hada Labo', 'Kyoto Atelier', 'Kyoto Living'],
    balanceDue: 110000,
    totalPurchased: 1220000
  },
  {
    id: 'sup-3',
    name: 'Guangzhou Silk & Fine Metals Atelier',
    company: 'GZ Luxury Crafts Export',
    contactPerson: 'Lin Xiaowei',
    phone: '+86 20-8912-3841',
    email: 'lin@gzcraftsexport.cn',
    country: 'China',
    suppliedBrands: ['Anusmita Atelier', 'Anusmita Jewellery', 'Anusmita Leatherworks'],
    balanceDue: 350000,
    totalPurchased: 2490000
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-101',
    poNumber: 'PO-2026-10-01',
    supplierId: 'sup-1',
    supplierName: 'Seoul Beauty Wholesalers Corp',
    orderDate: '2026-10-20',
    expectedDate: '2026-11-04',
    status: 'Partially Received',
    items: [
      { productName: 'SKIN1004 Centella Ampoule 100ml', sku: 'SKIN-CENT-100', quantity: 50, unitCost: 1450 },
      { productName: 'COSRX Advanced Snail 96 Mucin', sku: 'COSRX-100', quantity: 60, unitCost: 980 }
    ],
    totalCost: 131300
  },
  {
    id: 'po-102',
    poNumber: 'PO-2026-10-02',
    supplierId: 'sup-3',
    supplierName: 'Guangzhou Silk & Fine Metals Atelier',
    orderDate: '2026-10-22',
    expectedDate: '2026-10-31',
    status: 'Invoiced',
    items: [
      { productName: '18K Rose Gold Pearl Choker', sku: 'JEWL-AURA-RG', quantity: 30, unitCost: 1250 }
    ],
    totalCost: 37500
  }
];
