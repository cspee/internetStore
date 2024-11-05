import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import FullProduct from "./pages/FullProduct";
import { useEffect, useState } from "react";
import Basket from "./pages/Basket";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [basketPrducts, setBasketPorducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSort, setAciveSort] = useState("");
  //1, 2, 3
  function addToBasket(el) {
    console.log(basketPrducts);
    setBasketPorducts((prev) => {
      const existingProduct = prev.find((item) => item.id == el.id);
      if (existingProduct) {
        return prev.map((product) => {
          return product.id == el.id
            ? { ...product, count: product.count + 1 }
            : product;
        });
      } else {
        return [...prev, { ...el, count: 1 }];
      }
    });
  }

  useEffect(() => {
    const categoryUrl = activeCategory ? `/category/${activeCategory}` : "";
    const searchParams = new URLSearchParams();
    activeSort && searchParams.append("sort", activeSort);

    axios
      .get(
        `https://fakestoreapi.com/products${categoryUrl}?${searchParams.toString()}`
      )
      .then((response) => setProducts(response.data));
  }, [activeCategory, activeSort]);

  return (
    <>
      <header>
        <NavBar selectedProduct={selectedProduct} />{" "}
      </header>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route
          path={`/products`}
          element={
            <Products
              activeSort={activeSort}
              setAciveSort={setAciveSort}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              products={products}
              setSelectedProduct={setSelectedProduct}
              addToBasket={addToBasket}
            />
          }
        />
        <Route
          path={`/products/:id`}
          element={
            <FullProduct products={products} addToBasket={addToBasket} />
          }
        />
        <Route path={`/contact`} element={<Contact />} />
        <Route
          path={`/basket`}
          element={
            <Basket
              basketPrducts={basketPrducts}
              setBasketPorducts={setBasketPorducts}
            />
          }
        />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
