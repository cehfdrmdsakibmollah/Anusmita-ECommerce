import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChatbotLog extends Document {
  sessionId: string;
  userId?: mongoose.Types.ObjectId;
  customerPhone?: string;
  userMessage: string;
  intent: 
    | 'order_tracking'
    | 'product_inquiry'
    | 'skin_routine_quiz'
    | 'shipping_policy'
    | 'discount_coupon'
    | 'phone_order_extracted'
    | 'restock_alert'
    | 'human_escalation_whatsapp'
    | 'general_faq'
    | 'unknown';
  botResponse: string;
  matchedProductId?: mongoose.Types.ObjectId;
  extractedOrderDetails?: {
    rawNote?: string;
    extractedPhone?: string;
    extractedAddress?: string;
    extractedItemName?: string;
    isProcessedToOrder: boolean;
  };
  userSentiment: 'positive' | 'neutral' | 'frustrated';
  soundTriggered: boolean;
  wasEscalatedToWhatsApp: boolean;
  responseTimeMs: number;
  createdAt: Date;
}

const ChatbotLogSchema = new Schema<IChatbotLog>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    customerPhone: {
      type: String,
      trim: true,
      index: true
    },
    userMessage: {
      type: String,
      required: [true, 'User message content is required'],
      trim: true
    },
    intent: {
      type: String,
      enum: [
        'order_tracking',
        'product_inquiry',
        'skin_routine_quiz',
        'shipping_policy',
        'discount_coupon',
        'phone_order_extracted',
        'restock_alert',
        'human_escalation_whatsapp',
        'general_faq',
        'unknown'
      ],
      default: 'general_faq',
      index: true
    },
    botResponse: {
      type: String,
      required: [true, 'Bot response message is required']
    },
    matchedProductId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      index: true
    },
    extractedOrderDetails: {
      rawNote: String,
      extractedPhone: String,
      extractedAddress: String,
      extractedItemName: String,
      isProcessedToOrder: { type: Boolean, default: false }
    },
    userSentiment: {
      type: String,
      enum: ['positive', 'neutral', 'frustrated'],
      default: 'neutral'
    },
    soundTriggered: {
      type: Boolean,
      default: false
    },
    wasEscalatedToWhatsApp: {
      type: Boolean,
      default: false
    },
    responseTimeMs: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

// Indexes for analytics: conversation history & intent reporting
ChatbotLogSchema.index({ sessionId: 1, createdAt: 1 });
ChatbotLogSchema.index({ intent: 1, createdAt: -1 });

export const ChatbotLog: Model<IChatbotLog> =
  mongoose.models.ChatbotLog || mongoose.model<IChatbotLog>('ChatbotLog', ChatbotLogSchema);
