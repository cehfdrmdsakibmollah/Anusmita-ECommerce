import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductVariant {
  id: string;
  label: string; // e.g. "55ml", "100ml", "M", "L", "King Size"
  price: number;
  stock: number;
  colorHex?: string;
  image?: string;
  sku?: string;
}

export interface IProduct extends Document {
  sku: string;
  barcode: string;
  name: string;
  banglaName?: string;
  brand: string;
  origin: 'Korea' | 'Japan' | 'China';
  category: 
    | 'Skincare'
    | 'Beauty / Makeup'
    | 'Fashion'
    | 'Jewellery'
    | 'Watches'
    | 'Mobile Accessories'
    | 'Bedsheets'
    | 'Perfumes'
    | 'Bags';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  costPrice: number; // COGS for ERP profitability analytics
  stock: number;
  reservedStock: number;
  minStockAlert: number;
  description: string;
  benefits?: string;
  howToUse?: string;
  ingredients?: string;
  safetyScore?: string;
  specs?: {
    material?: string;
    dimensions?: string;
    plating?: string;
    weight?: string;
    threadCount?: string;
  };
  variantType: 'volume' | 'fashion_size' | 'jewelry_spec' | 'bag_spec' | 'bedsheet_spec' | 'none';
  variants: IProductVariant[];
  colors?: { name: string; hex: string; image?: string }[];
  sizes?: string[];
  skinType?: ('Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'All')[];
  concern?: ('Acne' | 'Pigmentation' | 'Brightening' | 'Sensitive' | 'Dryness' | 'Uneven Tone')[];
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  isPublished: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  isNewArrival: boolean;
  isFlashDeal: boolean;
  flashDiscountPercent?: number;
  preOrderBatchId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: [0, 'Price must be positive'] },
    stock: { type: Number, required: true, min: [0, 'Stock cannot be negative'], default: 0 },
    colorHex: { type: String, trim: true },
    image: { type: String, trim: true },
    sku: { type: String, trim: true }
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    sku: {
      type: String,
      required: [true, 'Unique Product SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    barcode: {
      type: String,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
      index: true
    },
    banglaName: {
      type: String,
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Brand Name is required'],
      trim: true,
      index: true
    },
    origin: {
      type: String,
      enum: ['Korea', 'Japan', 'China'],
      required: [true, 'Country of Origin is required'],
      index: true
    },
    category: {
      type: String,
      enum: [
        'Skincare',
        'Beauty / Makeup',
        'Fashion',
        'Jewellery',
        'Watches',
        'Mobile Accessories',
        'Bedsheets',
        'Perfumes',
        'Bags'
      ],
      required: true,
      index: true
    },
    subCategory: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Retail Selling Price is required'],
      min: [0, 'Price must be non-negative'],
      index: true
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    costPrice: {
      type: Number,
      required: [true, 'Purchase Cost (COGS) is required for financial auditing'],
      min: 0,
      default: 0
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
      index: true
    },
    reservedStock: {
      type: Number,
      min: 0,
      default: 0
    },
    minStockAlert: {
      type: Number,
      default: 5
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    benefits: { type: String, trim: true },
    howToUse: { type: String, trim: true },
    ingredients: { type: String, trim: true },
    safetyScore: { type: String, trim: true },
    specs: {
      material: String,
      dimensions: String,
      plating: String,
      weight: String,
      threadCount: String
    },
    variantType: {
      type: String,
      enum: ['volume', 'fashion_size', 'jewelry_spec', 'bag_spec', 'bedsheet_spec', 'none'],
      default: 'none'
    },
    variants: [ProductVariantSchema],
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        image: String
      }
    ],
    sizes: [{ type: String, trim: true }],
    skinType: [
      {
        type: String,
        enum: ['Oily', 'Dry', 'Combination', 'Sensitive', 'All']
      }
    ],
    concern: [
      {
        type: String,
        enum: ['Acne', 'Pigmentation', 'Brightening', 'Sensitive', 'Dryness', 'Uneven Tone']
      }
    ],
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5.0
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0
    },
    mainImage: {
      type: String,
      required: [true, 'Main product image is required']
    },
    images: [{ type: String }],
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    },
    isBestSeller: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true },
    isFlashDeal: { type: Boolean, default: false, index: true },
    flashDiscountPercent: { type: Number, min: 0, max: 90 },
    preOrderBatchId: { type: String, trim: true, index: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Compound Text Index for fast keyword search across multiple fields
ProductSchema.index({
  name: 'text',
  brand: 'text',
  banglaName: 'text',
  sku: 'text',
  description: 'text'
});

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
