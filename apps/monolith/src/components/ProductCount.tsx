import { useProducts } from "../hooks/useProducts";

export function ProductCount() {
  const { products, isLoading } = useProducts();
  if (isLoading) return null;
  return <p>{products.length} products available</p>;
}
