import z from 'zod';

export const productSchema = z.object({
  name: z.string(),
  description: z.array(z.string()),
  img: z.array(z.string()),
  price: z.number(),
  oldPrice: z.number(),
  offer: z.string(),
  weight: z.array(z.string()),
  category: z.array(z.string()),
});
