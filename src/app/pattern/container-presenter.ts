// Presenter (순수 UI 컴포넌트)
export class UserPresenter {
  constructor(private name: string, private email: string) {}

  render() {
    return {
      name: this.name,
      email: this.email,
    };
  }
}

// Container (비즈니스 로직)
export class UserContainer {
  private data: { name: string; email: string };

  constructor() {
    // 데이터 fetch 로직
    this.data = {
      name: 'John Doe',
      email: 'john@example.com',
    };
  }

  render() {
    const presenter = new UserPresenter(this.data.name, this.data.email);
    return presenter.render();
  }
}
