import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Product from "../components/Product";
import Skeleton from "react-loading-skeleton";

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
}) {
  if (error) {
    return <Navigate to={"/error"} />;
  }
  const skeletons = [...new Array(5)].map((_, i) => (
    <Skeleton key={i} height={"250px"} width={"220px"} />
  ));
  return (
    <>
      <Filter
        activeSort={activeSort}
        setAciveSort={setAciveSort}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="products">
        {isPending ? (
          skeletons
        ) : (
          products.map((el) => (
            <div key={el.id} onClick={() => setSelectedProduct(el.id)}>
              <Product el={el} addToBasket={addToBasket} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
