'use client';

import { StockSubject, InvestorObserver } from './observer';
import { useState } from 'react';

export default function PatternPage() {
  const [stock] = useState(() => {
    const newStock = new StockSubject();
    const investor1 = new InvestorObserver('투자자');

    // 구독 설정
    newStock.attach(investor1);

    return newStock;
  });

  return (
    <div>
      <h1>주식 가격 변경</h1>
      <button onClick={() => stock.setPrice(1000)}>1000원으로 변경</button>
      <button onClick={() => stock.setPrice(1500)}>1500원으로 변경</button>
    </div>
  );
}
