import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';

export default async function getSummaryData() {
  await connectDB();

  const totalProducts = await Product.countDocuments();
  const totalBuyers = await Product.countDocuments();

  return { totalBuyers, totalProducts };
}
