import type { Product } from "../types/product";
import { products } from "./products.data";

type ApiClientOptions = {
  latencyMs?: number;
};

export function createApiClient({ latencyMs = 300 }: ApiClientOptions = {}) {
  let requestCount = 0;

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, latencyMs));
  }

  return {
    async getProducts(): Promise<Product[]> {
      requestCount++;
      await delay();
      return products;
    },
    getRequestCount() {
      return requestCount;
    },
  };
}

export const apiClient = createApiClient();
