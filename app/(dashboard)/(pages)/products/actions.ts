'use server';

import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { ArSlug } from '@/lib/ar-sulg';
import { productSchema } from '@/validations/product.schema';

// Server Action: Create Product
export async function createProductAction(formData: FormData) {
  await connectDB();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const oldPrice = formData.get('oldPrice') as string;
  const offer = formData.get('offer') as string;
  const category = formData.get('category') as string;
  const weight = formData.get('weight') as string;
  const img = formData.get('img') as string;

  // Validate data via Zod
  const parsed = productSchema.safeParse({
    name,
    description,
    price,
    oldPrice,
    offer,
    category,
    weight,
    img,
    slug: ArSlug(name),
  });

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error('البيانات غير صالحة');
  }

  // Create product in DB
  const product = await Product.create(parsed.data);

  return product;
}
