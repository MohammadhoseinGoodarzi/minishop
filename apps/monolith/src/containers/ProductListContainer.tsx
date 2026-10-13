import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { apiClient } from "../api/apiClient";
import { ProductList } from "../components/ProductList";

export function ProductListContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    apiClient
      .getProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch(() => {
        if (!ignore) setError("Failed to load products");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

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
