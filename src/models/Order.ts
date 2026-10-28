import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItemSnapshot {
  productId: mongoose.Types.ObjectId;
  productName: string;
  sku: string;
  variantLabel?: string;
  color?: string;
  size?: string;
  unitPrice: number;
  costPrice: number; // Stored at time of purchase for immutable historical profit reporting
  quantity: number;
  image: string;
}

export interface IOrderTrackingEvent {
  status: string;
  timestamp: Date;
  location?: string;
  note: string;
}

export interface IOrder extends Document {
  orderNumber: string; // e.g. "ANUS-78219"
  userId?: mongoose.Types.ObjectId;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  district: 'Dhaka' | 'Outside Dhaka';
  deliveryArea?: string;
  deliveryNotes?: string;
  items: IOrderItemSnapshot[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Bank Transfer';
  paymentStatus: 'Unpaid' | 'Paid' | 'Partial Advance' | 'Refunded';
  advancePaidAmount: number;
  remainingCodAmount: number;
  transactionReference?: string;
  orderStatus: 
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
  riskScore: 'Low' | 'Medium' | 'High';
  riskExplanation?: string;
  courier: {
    provider: 'Pathao' | 'Steadfast' | 'RedX' | 'In-House';
    consignmentId?: string;
    trackingUrl?: string;
    shippingFee?: number;
    settlementStatus: 'Pending' | 'Settled' | 'Returned';
  };
  trackingEvents: IOrderTrackingEvent[];
  isGift: boolean;
  giftNote?: string;
  source: 'Website' | 'Chatbot' | 'WhatsApp' | 'Manual';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSnapshotSchema = new Schema<IOrderItemSnapshot>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    sku: { type: String, required: true },
    variantLabel: String,
    color: String,
    size: String,
    unitPrice: { type: Number, required: true, min: 0 },
    costPrice: { type: Number, required: true, min: 0, default: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    image: { type: String, required: true }
  },
  { _id: false }
);

const OrderTrackingEventSchema = new Schema<IOrderTrackingEvent>(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    location: String,
    note: { type: String, required: true }
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: [true, 'Order Number is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      validate: {
        validator: (v: string) => /^01[3-9]\d{8}$/.test(v),
        message: 'Must be a valid 11-digit Bangladeshi mobile number (013-019)'
      },
      index: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery street address is required'],
      minlength: [10, 'Please provide an address with at least 10 characters for courier delivery']
    },
    district: {
      type: String,
      enum: ['Dhaka', 'Outside Dhaka'],
      required: true,
      default: 'Dhaka',
      index: true
    },
    deliveryArea: { type: String, trim: true },
    deliveryNotes: { type: String, trim: true },
    items: {
      type: [OrderItemSnapshotSchema],
      validate: {
        validator: (items: IOrderItemSnapshot[]) => items && items.length > 0,
        message: 'An order must contain at least one product item.'
      }
    },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryCharge: { type: Number, required: true, min: 0, default: 80 },
    discount: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    couponCode: { type: String, uppercase: true, trim: true },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'bKash', 'Nagad', 'Bank Transfer'],
      required: true,
      default: 'Cash on Delivery',
      index: true
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Partial Advance', 'Refunded'],
      default: 'Unpaid',
      index: true
    },
    advancePaidAmount: { type: Number, default: 0, min: 0 },
    remainingCodAmount: { type: Number, default: 0, min: 0 },
    transactionReference: { type: String, trim: true },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Awaiting Confirmation',
        'Confirmed',
        'Processing',
        'Packed',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
        'Return Requested',
        'Refunded'
      ],
      default: 'Confirmed',
      index: true
    },
    riskScore: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
      index: true
    },
    riskExplanation: { type: String, trim: true },
    courier: {
      provider: {
        type: String,
        enum: ['Pathao', 'Steadfast', 'RedX', 'In-House'],
        default: 'Pathao'
      },
      consignmentId: { type: String, trim: true, index: true },
      trackingUrl: { type: String, trim: true },
      shippingFee: { type: Number, default: 0 },
      settlementStatus: {
        type: String,
        enum: ['Pending', 'Settled', 'Returned'],
        default: 'Pending'
      }
    },
    trackingEvents: [OrderTrackingEventSchema],
    isGift: { type: Boolean, default: false },
    giftNote: { type: String, trim: true },
    source: {
      type: String,
      enum: ['Website', 'Chatbot', 'WhatsApp', 'Manual'],
      default: 'Website',
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Compound indexes for fast admin querying & reporting
OrderSchema.index({ createdAt: -1, orderStatus: 1 });
OrderSchema.index({ phone: 1, createdAt: -1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
