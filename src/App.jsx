import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("No products found, come back later...");
      }
      const product = await response.json();

      setProducts(product);

    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className="title">Store Myanmar</h1>
      <section className="flex-ctr">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      {isLoading && <span className="loader"></span>}
      {isError && <h1>{isError}</h1>}
    </div>
  );
}

export default App;
