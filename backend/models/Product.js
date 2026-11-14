import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      enum: ['New In', 'Ready to Wear', 'Dresses', 'Knitwear & Outerwear', 'Accessories', 'Atelier Edition'],
    },
    badge: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    details: [
      {
        type: String,
      },
    ],
    specifications: {
      fabric: { type: String, default: 'Pure Natural Fibers' },
      origin: { type: String, default: 'Atelier Paris & Como, Italy' },
      lining: { type: String, default: '100% Cupro Silk' },
      closure: { type: String, default: 'Bespoke Horn Buttons / Concealed Zips' },
      care: { type: String, default: 'Specialist Dry Clean Only' },
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    sizes: [
      {
        type: String,
        default: ['36', '38', '40', '42'],
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isCurated: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 16,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
