import Lalala from './components/lala';
import CSuspense from '../utils/CSuspense';

export default function Kaka() {
  return (
    <div>
      <CSuspense fallback={<p>Loading...</p>}>
        <Lalala />
      </CSuspense>
    </div>
  );
}
