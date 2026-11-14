import Order from '../models/Order.js';

let inMemoryOrders = [];

// @desc    Create a new luxury order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customer, shippingAddress, items, subtotal, shippingCost, giftBox, total, shippingMethod, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order bag.' });
    }

    const orderNumber = `AUR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderNumber,
      user: req.user ? req.user._id : null,
      customer,
      shippingAddress,
      items,
      subtotal,
      shippingCost: shippingCost || 0,
      giftBox: giftBox !== undefined ? giftBox : true,
      total,
      shippingMethod: shippingMethod || 'Complimentary White-Glove Shipping',
      paymentMethod: paymentMethod || 'Encrypted Credit Card / Private Payment',
      status: 'Confirmed',
      createdAt: new Date(),
    };

    try {
      const order = await Order.create(orderData);
      return res.status(201).json({ success: true, order });
    } catch (dbErr) {
      // In-memory fallback
      const mockOrder = { _id: `ord_${Date.now()}`, ...orderData };
      inMemoryOrders.unshift(mockOrder);
      return res.status(201).json({ success: true, order: mockOrder });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID or orderNumber
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const order = await Order.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderNumber: id }],
      });
      if (order) return res.json({ success: true, order });
    } catch (err) {
      // Continue to fallback
    }

    const found = inMemoryOrders.find(o => o._id === id || o.orderNumber === id);
    if (found) {
      return res.json({ success: true, order: found });
    }

    res.status(404).json({ success: false, message: 'Atelier order not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    try {
      const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, orders });
    } catch (err) {
      const orders = inMemoryOrders.filter(o => o.user && o.user.toString() === req.user._id.toString());
      return res.json({ success: true, orders });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
