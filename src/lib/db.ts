// 가상의 DB 인터페이스
interface Product {
  id: string;
  name: string;
  price: number;
}

// 가상의 DB 클라이언트
export const db = {
  products: {
    findMany: async () => {
      // 더미 데이터
      return [
        { id: '1', name: '상품 1', price: 1000 },
        { id: '2', name: '상품 2', price: 2000 },
      ] as Product[];
    },
  },
  cart: {
    create: async ({ data }: any) => {
      console.log('장바구니 추가:', data);
      return data;
    },
  },
};
