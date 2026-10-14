import type { Product } from "../types/product";
import type { ApiClient } from "./apiClient";

export function withCache(client: ApiClient): ApiClient {
  let cachedProducts: Promise<Product[]> | null = null;

  return new Proxy(client, {
    get(target, property, receiver) {
      if (property === "getProducts") {
        return () => {
          if (cachedProducts) {
            return cachedProducts;
          }
          cachedProducts = target.getProducts();
          return cachedProducts;
        };
      }
      return Reflect.get(target, property, receiver);
    },
  });
}
