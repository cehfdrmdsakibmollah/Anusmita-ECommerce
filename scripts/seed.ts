import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { Product } from '../src/models/Product';
import { INITIAL_PRODUCTS } from '../src/data/mockData';

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas at:', uri.split('@')[1] || 'cluster');

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB Atlas:', mongoose.connection.name);

    const count = await Product.countDocuments();
    console.log(`Current products in collection: ${count}`);

    if (count === 0) {
      console.log('Seeding initial authentic Asian products...');
      const docsToInsert = INITIAL_PRODUCTS.map(p => {
        const { id, ...rest } = p;
        return rest;
      });
      await Product.insertMany(docsToInsert);
      console.log(`✅ Successfully seeded ${docsToInsert.length} products into MongoDB Atlas!`);
    } else {
      console.log('ℹ️ Products already exist in database. Skipping seed to prevent duplicate overwrites.');
    }

    await mongoose.disconnect();
    console.log('Database operation completed cleanly.');
  } catch (err: any) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
}

seedDatabase();
