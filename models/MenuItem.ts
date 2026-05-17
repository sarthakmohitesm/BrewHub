import mongoose, { Schema, Model } from 'mongoose';
import { IMenuItem } from '@/types';

const MenuItemSchema = new Schema<IMenuItem>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['coffee', 'tea', 'snacks', 'desserts', 'combos'],
      required: true,
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    popular: { type: Boolean, default: false },
    prepTime: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
export default MenuItem;
