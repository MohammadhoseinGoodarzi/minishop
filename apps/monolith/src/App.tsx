import { lazy, Suspense, useState } from "react";
import type { Product } from "./types/product";
import { ProductList } from "./components/ProductList";
import { ProductListContainer } from "./containers/ProductListContainer";

const CartPanel = lazy(() => import("./CartPanel"));

const featuredProducts: Product[] = [
  { id: "f-1", name: "Gift Card", price: 25, category: "gifts" },
];

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <h1>{import.meta.env.VITE_APP_TITLE}</h1>

      <ProductList
        products={featuredProducts}
        onAddToCart={(product) => console.log("featured:", product)}
      />

      <ProductListContainer />

      <button onClick={() => setShowCart(true)}>Show cart</button>
      {showCart && (
        <Suspense fallback={<p>Loading cart...</p>}>
          <CartPanel />
        </Suspense>
      )}
    </main>
  );
}
