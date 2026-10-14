import { useCartItems } from "./hooks/useCartItems";

export default function CartPanel() {
  const items = useCartItems();

  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.product.id}>
          {item.product.name} x {item.quantity}
        </li>
      ))}
    </ul>
  );
}
