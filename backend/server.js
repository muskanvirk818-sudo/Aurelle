import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allows local dev and Cloudflare Pages origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    maison: 'Maison Aurelle Paris',
    edition: 'Edition N° 09 Paris • Como',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Maison Aurelle Paris - Haute Couture & Quiet Luxury API',
    documentation: '/api/health',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found in Aurelle Atelier archives.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'An unexpected atelier server error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(`[Aurelle Atelier] Server gracefully running on port ${PORT}`);
  console.log(`[Aurelle Atelier] Health check at http://localhost:${PORT}/api/health`);
});
