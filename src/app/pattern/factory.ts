// Factory 패턴 추가
interface Button {
  render(): string;
}

class PrimaryButton implements Button {
  render() {
    return 'Primary Button';
  }
}

class SecondaryButton implements Button {
  render() {
    return 'Secondary Button';
  }
}

export class ButtonFactory {
  createButton(type: 'primary' | 'secondary'): Button {
    switch (type) {
      case 'primary':
        return new PrimaryButton();
      case 'secondary':
        return new SecondaryButton();
      default:
        throw new Error('Unknown button type');
    }
  }
}
