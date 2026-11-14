import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { sampleProducts } from './productsData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('[Seeder] MongoDB not reachable directly. Seed data loaded in memory catalog.');
      process.exit(0);
    }

    await Product.deleteMany({});
    console.log('[Seeder] Cleared existing products.');

    const formattedProducts = sampleProducts.map(({ _id, ...rest }) => rest);
    await Product.insertMany(formattedProducts);
    console.log(`[Seeder] Successfully seeded ${formattedProducts.length} luxury atelier products!`);

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
