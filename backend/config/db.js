import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurelle_maison';
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Aurelle Atelier] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Aurelle Atelier] MongoDB direct connection unavailable (${error.message}).`);
    console.info('[Aurelle Atelier] Using resilient in-memory luxury catalog fallback mode for seamless operations.');
    return false;
  }
};

export default connectDB;
