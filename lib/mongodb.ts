import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development and across serverless/edge API route invocations in production.
 * This prevents connection exhaustion by reusing the existing database pool.
 */

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB Atlas using Mongoose with connection pooling and caching.
 * @returns {Promise<typeof mongoose>} The active Mongoose connection instance
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections in pool
      serverSelectionTimeoutMS: 8000, // Timeout after 8 seconds instead of hanging
    };

    const uri = MONGODB_URI || 'mongodb://localhost:27017/anusmita_shop';

    if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
      console.warn(
        '⚠️ MONGODB_URI environment variable is not defined. Please configure it in your deployment settings.'
      );
    }

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // Reset promise so subsequent requests can retry
    throw err;
  }

  return cached.conn;
}

/**
 * Helper to obtain the underlying native MongoClient promise if needed
 * (compatible with NextAuth or raw MongoDB driver usage).
 */
export const clientPromise = (async () => {
  const m = await connectToDatabase();
  return m.connection.getClient();
})();

export default connectToDatabase;
