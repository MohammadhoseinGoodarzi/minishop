import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { apiClient } from "../api/apiClient";

export function useProducts() {
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

  return { products, isLoading, error };
}
