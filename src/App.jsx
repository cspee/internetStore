import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import FullProduct from "./pages/FullProduct";
import { useState } from "react";
import Basket from "./pages/Basket";
import ErrorPage from "./pages/ErrorPage";
import { useQuery } from "@tanstack/react-query";

function App() {
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
  const categoryUrl = activeCategory ? `/category/${activeCategory}` : "";
  const searchParams = new URLSearchParams();
  activeSort && searchParams.append("sort", activeSort);

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["gerProducts", activeCategory, activeSort],
    queryFn: () =>
      fetch(
        `https://fakestoreapi.com/products${categoryUrl}?${searchParams.toString()}`
      ).then((res) => res.json()),
  });

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
              isPending={isPending}
              error={error}
            />
          }
        />
        <Route
          path={`/products/:id`}
          element={<FullProduct addToBasket={addToBasket} />}
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
        <Route path={"/error"} element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
