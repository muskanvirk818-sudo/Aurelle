import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
    },
    shippingAddress: {
      address: { type: String, required: true },
      suite: { type: String, default: '' },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        size: { type: String, default: 'M' },
        color: { type: String, default: 'Default' },
        image: { type: String, required: true },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    giftBox: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingMethod: {
      type: String,
      default: 'Complimentary White-Glove Shipping',
    },
    paymentMethod: {
      type: String,
      default: 'Encrypted Credit Card / Private Payment',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'In Atelier Preparation', 'Dispatched', 'Delivered'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
