import { revalidatePath } from 'next/cache';
import { db } from '../../lib/db'; // 상대 경로로 변경

// 1. RSC (데이터 읽기)
async function getProducts() {
  // 서버에서 직접 DB 접근
  const products = await db.products.findMany();
  return products;
}

// 2. 서버 액션 (데이터 쓰기)
async function addToCart(formData: FormData) {
  'use server';

  const productId = formData.get('productId') as string;
  const quantity = Number(formData.get('quantity') ?? 1);

  // 서버에서 직접 DB 작업
  await db.cart.create({
    data: {
      productId,
      quantity,
    },
  });

  // 장바구니 페이지 데이터 갱신
  revalidatePath('/cart');
}

// RSC와 서버 액션의 통합
export default async function ProductsPage() {
  // RSC로 데이터 가져오기
  const products = await getProducts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">상품 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl">{product.name}</h2>
            <p className="text-gray-600">{product.price}원</p>
            <form action={addToCart} className="mt-4">
              <input type="hidden" name="productId" value={product.id} />
              <input
                type="number"
                name="quantity"
                defaultValue={1}
                min={1}
                className="border p-1 w-20 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                장바구니 담기
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
