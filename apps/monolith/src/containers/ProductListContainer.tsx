import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";
import { cartStore } from "../store/cartStore";

export function ProductListContainer() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return <ProductList products={products} onAddToCart={cartStore.add} />;
}
