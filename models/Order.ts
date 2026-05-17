import mongoose, { Schema, Model } from 'mongoose';
import { IOrder } from '@/types';

const OrderItemSchema = new Schema(
  {
    menuItem: {
      title: String,
      price: Number,
      category: String,
      image: String,
      description: String,
    },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    tableName: { type: String, required: true },
    customerName: { type: String, required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'completed', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
