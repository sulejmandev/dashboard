import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { productSchema } from '@/validations/product.schema';

// get all products fun
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);

  const skip = (page - 1) * limit;

  const total = await Product.countDocuments();

  const products = await Product.find().skip(skip).limit(limit);

  return Response.json(
    {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      products,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// create a product fun
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = productSchema.parse(body);

    const product = await Product.create({
      ...data,
      createdAt: new Date(),
    });

    return Response.json(
      {
        status: 'success',
        product,
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': 'https://dashboard-pups.vercel.app',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error: any) {
    console.error('CREATE PRODUCT ERROR:', error);

    // 🔥 خطأ Zod (Validation)
    if (error.name === 'ZodError') {
      return Response.json(
        {
          status: 'error',
          message: 'بيانات غير صالحة',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // 🔥 أخطاء أخرى
    return Response.json(
      {
        status: 'error',
        message: 'فشل في إنشاء المنتج',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
