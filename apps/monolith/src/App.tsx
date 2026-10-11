import { lazy, Suspense, useState } from "react";

const CartPanel = lazy(() => import("./CartPanel"));

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      {import.meta.env.VITE_APP_TITLE}
      <button onClick={() => setShowCart(true)}>Show cart</button>
      {showCart && (
        <Suspense fallback={<p>Loading cart...</p>}>
          <CartPanel />
        </Suspense>
      )}
    </main>
  );
}
