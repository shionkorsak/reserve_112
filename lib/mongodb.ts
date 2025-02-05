import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined :(");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

const cached: MongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "IBP112" }).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  globalThis.mongooseCache = cached;

  return cached.conn;
}
