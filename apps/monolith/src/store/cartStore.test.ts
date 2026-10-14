import { describe, expect, it, vi } from "vitest";
import type { Product } from "../types/product";
import { createCartStore } from "./cartStore";

const keyboard: Product = {
  id: "p-1",
  name: "Mechanical Keyboard",
  price: 89.5,
  category: "electronics",
};

// Subscribes a fresh spy and clears any calls made during subscribe(),
// so assertions only count notifications caused by later actions.
function subscribeSpy(store: ReturnType<typeof createCartStore>) {
  const listener = vi.fn();
  const unsubscribe = store.subscribe(listener);
  listener.mockClear();
  return { listener, unsubscribe };
}

describe("createCartStore: subscribe", () => {
  it("calls a subscribed listener once after add()", () => {
    const store = createCartStore();
    const { listener } = subscribeSpy(store);

    store.add(keyboard);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("stops calling the listener after unsubscribe", () => {
    const store = createCartStore();
    const { listener, unsubscribe } = subscribeSpy(store);

    store.add(keyboard);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.add(keyboard);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("notifies every subscribed listener, not only the first", () => {
    const store = createCartStore();
    const first = subscribeSpy(store);
    const second = subscribeSpy(store);

    store.add(keyboard);

    expect(first.listener).toHaveBeenCalledTimes(1);
    expect(second.listener).toHaveBeenCalledTimes(1);
  });
});

describe("createCartStore: items", () => {
  it("merges the same product into one item with quantity 2", () => {
    const store = createCartStore();

    store.add(keyboard);
    store.add(keyboard);

    expect(store.getItems()).toEqual([{ product: keyboard, quantity: 2 }]);
  });

  it("returns a new array reference from getItems() after add()", () => {
    const store = createCartStore();
    const before = store.getItems();

    store.add(keyboard);

    expect(store.getItems()).not.toBe(before);
  });
});
