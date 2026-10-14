import { useSyncExternalStore } from "react";
import { cartStore } from "../store/cartStore";

export function useCartItems() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getItems);
}
