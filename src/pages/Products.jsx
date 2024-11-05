import Filter from "../components/Filter";
import Product from "../components/Product";

export default function Products({
  products,
  setSelectedProduct,
  addToBasket,
  activeCategory,
  setActiveCategory,
  activeSort,
  setAciveSort,
}) {
  return (
    <>
      <Filter
        activeSort={activeSort}
        setAciveSort={setAciveSort}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="products">
        {products.map((el) => (
          <div key={el.id} onClick={() => setSelectedProduct(el.id)}>
            <Product el={el} addToBasket={addToBasket} />
          </div>
        ))}
      </div>
    </>
  );
}
