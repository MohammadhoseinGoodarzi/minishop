import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type Listener = () => void;

export function createCartStore() {
  let items: CartItem[] = [];
  const listeners = new Set<Listener>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  return {
    getItems() {
      return items;
    },

    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    add(product: Product) {
      const existing = items.find((item) => item.product.id === product.id);

      items = existing
        ? items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...items, { product, quantity: 1 }];

      notify();
    },
  };
}

export const cartStore = createCartStore();
