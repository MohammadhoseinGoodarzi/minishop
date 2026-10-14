import { useCartItems } from "../hooks/useCartItems";

export function CartBadge() {
  const items = useCartItems();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return <p>Cart: {totalQuantity}</p>;
}
