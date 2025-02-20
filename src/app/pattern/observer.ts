// 인터페이스 정의
interface IObserver {
  update(data: { price: number; timestamp: Date }): void;
}

interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
}

// 주식 가격 Subject
export class StockSubject implements ISubject {
  private observers: Set<IObserver> = new Set();
  private price: number = 0;

  attach(observer: IObserver): void {
    this.observers.add(observer);
  }

  detach(observer: IObserver): void {
    this.observers.delete(observer);
  }

  setPrice(price: number): void {
    this.price = price;
    this.notify();
  }

  protected notify(): void {
    this.observers.forEach((observer) =>
      observer.update({ price: this.price, timestamp: new Date() }),
    );
  }
}

// 투자자 Observer
export class InvestorObserver implements IObserver {
  constructor(private name: string) {}

  update(data: { price: number; timestamp: Date }): void {
    console.log(
      `${this.name}: 주식 가격이 ${data.price}원으로 변경되었습니다. (${data.timestamp})`,
    );

    if (data.price > 1300) {
      alert(
        `${this.name}: 주식 가격이 1300원을 넘었습니다! (현재 ${data.price}원)`,
      );
    }
  }
}
