import { lazy, Suspense, useState } from "react";
import type { Product } from "./types/product";
import { ProductList } from "./components/ProductList";
import { ProductListContainer } from "./containers/ProductListContainer";
import { ProductCount } from "./components/ProductCount";
import { CartBadge } from "./components/CartBadge";
import { cartStore } from "./store/cartStore";
import { withFeatureFlag } from "./hocs/withFeatureFlag";

const CartPanel = lazy(() => import("./CartPanel"));

const featuredProducts: Product[] = [
  { id: "f-1", name: "Gift Card", price: 25, category: "gifts" },
];

const FeaturedProductList = withFeatureFlag(
  ProductList,
  import.meta.env.VITE_FEATURE_FEATURED === "true",
);

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <h1>{import.meta.env.VITE_APP_TITLE}</h1>
      <ProductCount />
      <CartBadge />

      <FeaturedProductList
        products={featuredProducts}
        onAddToCart={cartStore.add}
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
