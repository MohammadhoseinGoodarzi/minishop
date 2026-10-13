import type { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function ProductList(props: ProductListProps) {
  const { products, onAddToCart } = props;

  return (
    <section>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>

              <p>{product.price.toFixed(2)}</p>

              <button onClick={() => onAddToCart(product)}>Add to cart</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
