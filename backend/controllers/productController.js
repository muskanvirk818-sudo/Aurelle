import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { sampleProducts } from '../seed/productsData.js';

let inMemoryProducts = [...sampleProducts];

// @desc    Fetch all products with optional category, search, sorting
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured, curated } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};

      if (category && category !== 'All' && category !== 'All Collections') {
        if (category === 'New In') {
          query.$or = [{ badge: 'New Season' }, { category: 'New In' }];
        } else {
          query.category = category;
        }
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (curated === 'true') {
        query.isCurated = true;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'price-low') sortOptions = { price: 1 };
      if (sort === 'price-high') sortOptions = { price: -1 };
      if (sort === 'rating') sortOptions = { rating: -1 };

      const products = await Product.find(query).sort(sortOptions);
      return res.json({ success: true, count: products.length, products });
    }

    // Fallback: In-memory filtering
    let filtered = [...inMemoryProducts];

    if (category && category !== 'All' && category !== 'All Collections') {
      if (category === 'New In') {
        filtered = filtered.filter(p => p.badge === 'New Season' || p.category === 'New In');
      } else {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
    }

    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    if (curated === 'true') {
      filtered = filtered.filter(p => p.isCurated);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

    res.json({ success: true, count: filtered.length, products: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const product = await Product.findById(id);
        if (product) return res.json({ success: true, product });
      }
    }

    const fallbackProduct = inMemoryProducts.find(p => p._id.toString() === id || p._id === id);
    if (fallbackProduct) {
      return res.json({ success: true, product: fallbackProduct });
    }

    // Return first product as smart fallback if not found
    return res.status(404).json({ success: false, message: 'Garment not found in atelier archive.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
