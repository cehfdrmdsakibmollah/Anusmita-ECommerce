import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISavedAddress {
  title: string;
  district: 'Dhaka' | 'Outside Dhaka';
  area?: string;
  streetAddress: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  passwordHash?: string;
  role: 'customer' | 'admin' | 'manager' | 'support' | 'finance';
  vipPoints: number;
  vipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  savedAddresses: ISavedAddress[];
  wishlist: mongoose.Types.ObjectId[];
  totalOrdersCount: number;
  totalSpentBDT: number;
  isBlocked: boolean;
  blockReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SavedAddressSchema = new Schema<ISavedAddress>(
  {
    title: { type: String, required: true, trim: true },
    district: { 
      type: String, 
      enum: ['Dhaka', 'Outside Dhaka'], 
      required: true,
      default: 'Dhaka'
    },
    area: { type: String, trim: true },
    streetAddress: { type: String, required: true, trim: true, minlength: 10 },
    isDefault: { type: Boolean, default: false }
  },
  { _id: true }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    phone: {
      type: String,
      required: [true, 'Bangladesh 11-digit mobile number is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (v: string) => /^01[3-9]\d{8}$/.test(v),
        message: (props: { value: string }) => `${props.value} is not a valid 11-digit Bangladesh mobile number (013-019)`
      },
      index: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      validate: {
        validator: (v: string) => !v || /^\S+@\S+\.\S+$/.test(v),
        message: 'Invalid email address format'
      },
      index: true
    },
    passwordHash: {
      type: String,
      select: false // Never return password hash in regular queries
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'manager', 'support', 'finance'],
      default: 'customer',
      index: true
    },
    vipPoints: {
      type: Number,
      default: 0,
      min: [0, 'VIP points cannot be negative']
    },
    vipTier: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      default: 'Bronze'
    },
    savedAddresses: [SavedAddressSchema],
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    totalOrdersCount: {
      type: Number,
      default: 0,
      min: 0
    },
    totalSpentBDT: {
      type: Number,
      default: 0,
      min: 0
    },
    isBlocked: {
      type: Boolean,
      default: false,
      index: true
    },
    blockReason: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Helpful Virtuals & Methods
UserSchema.methods.calculateVipTier = function () {
  if (this.vipPoints >= 5000) this.vipTier = 'Platinum';
  else if (this.vipPoints >= 2500) this.vipTier = 'Gold';
  else if (this.vipPoints >= 1000) this.vipTier = 'Silver';
  else this.vipTier = 'Bronze';
  return this.vipTier;
};

export const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
