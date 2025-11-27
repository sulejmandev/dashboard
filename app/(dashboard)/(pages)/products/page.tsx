export const dynamic = 'force-dynamic';

import CategoriesItem from '@/components/categories-item';
import { EmptyProducts } from '@/components/empty-products';
import ProductCard from '@/components/product-card';
import getAllProducts from '@/hooks/getAllProducts';

export default async function Blog() {
  const { products } = await getAllProducts();

  const isEmpty = products.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-(--breakpoint-xl) mx-auto py-10 lg:py-23 px-6 xl:px-0 flex flex-col lg:flex-row gap-12 ">
        <EmptyProducts />
      </div>
    );
  }

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row gap-12">
      {/* product card */}
      <ProductCard />

      {/* category side */}
      <CategoriesItem />
    </div>
  );
}
