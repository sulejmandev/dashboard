import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: [String], default: [] },
    img: { type: [String], default: [] },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    offer: { type: String, default: null },
    weight: { type: [String], default: [] },
    category: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
