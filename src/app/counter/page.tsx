import { useCounterStore } from '@/store/counterStore';
import CounterDisplayPage from './display/page';

export default function CounterPage() {
  return (
    <div>
      <CounterDisplayPage />
    </div>
  );
}
