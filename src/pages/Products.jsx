import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Product from "../components/Product";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

export default function Products({
  products,
  setSelectedProduct,
  addToBasket,
  activeCategory,
  setActiveCategory,
  activeSort,
  setAciveSort,
  error,
  isPending,
  basketPrducts,
}) {
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    setProductsCount(() => {
      let result = 0;
      for (let index = 0; index < basketPrducts.length; index++) {
        result += basketPrducts[index].count;
      }
      return result;
    });
  }, [basketPrducts]);

  if (error) {
    return <Navigate to={"/error"} />;
  }
  const skeletons = [...new Array(5)].map((_, i) => (
    <Skeleton key={i} height={"250px"} width={"220px"} />
  ));
  return (
    <>
      <div className="products-header">
        <Filter
          activeSort={activeSort}
          setAciveSort={setAciveSort}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div>Total prodcuts in basket : {productsCount}</div>
      </div>
      <div className="products">
        {isPending
          ? skeletons
          : products.map((el) => (
              <div key={el.id} onClick={() => setSelectedProduct(el.id)}>
                <Product el={el} addToBasket={addToBasket} />
              </div>
            ))}
      </div>
    </>
  );
}
