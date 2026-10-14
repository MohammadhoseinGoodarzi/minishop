import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

export function ProductListContainer() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ProductList
      products={products}
      onAddToCart={(product) => console.log("add to cart:", product)}
    />
  );
}
