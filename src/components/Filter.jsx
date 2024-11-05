import axios from "axios";
import { useEffect, useState } from "react";

export default function Filter({
  activeCategory,
  setActiveCategory,
  activeSort,
  setAciveSort,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data));
  }, []);
  return (
    <>
      <div className="categories">
        <button
          className={activeCategory == "" ? "btn-active" : "btn"}
          onClick={() => setActiveCategory("")}
        >
          all
        </button>
        {categories.map((el) => (
          <button
            className={el == activeCategory ? "btn-active" : "btn"}
            onClick={() => setActiveCategory(el)}
            key={el}
          >
            {el}
          </button>
        ))}
      </div>

      <select
        className="fitler-select"
        name=""
        id=""
        value={activeSort}
        onChange={(event) => setAciveSort(event.target.value)}
      >
        <option value="">default</option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </>
  );
}
