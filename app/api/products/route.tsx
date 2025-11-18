import { connectDB } from '@/lib/DB';
import { productSchema } from '@/lib/validations/product.schema';
import { Product } from '@/models/Product';

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return Response.json({
    total: products.length,

    products,
  });
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const data = productSchema.parse(body);

  const product = await Product.create(data);

  return Response.json({
    status: 'success',
    product,
  });
}
