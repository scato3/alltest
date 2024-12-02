import CSuspense from "@/app/utils/CSuspense";
import Keke from "./components/keke";

export default function Kaka() {
  return (
    <div>
      <CSuspense fallback={<p>Loading...</p>}>
        <Keke />
      </CSuspense>
    </div>
  );
}
