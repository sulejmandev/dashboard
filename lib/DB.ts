import mongoose from 'mongoose';

const MONGODB_URL = process.env.DATABASE_URL_MONGODB!;

if (!MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: DATABASE_URL_MONGODB');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (global as any).mongoose as MongooseCache;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
