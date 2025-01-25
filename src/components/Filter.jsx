import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function Filter({
  activeCategory,
  setActiveCategory,
  activeSort,
  setAciveSort,
}) {
  const navigate = useNavigate();
  const {
    isPending,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
  });
  console.log(categories);

  
  if (error) {
    navigate("/error");
    return;
  }
  const skeletons = [...new Array(6)].map((_, i) => (
    <Skeleton key={i} height={"16px"} width={"50px"} />
  ));
  return (
    <>
    <div className="categories-container">
      <div className="categories">
        <button
          className={activeCategory == "" ? "btn-active" : "btn"}
          onClick={() => setActiveCategory("")}
        >
          all
        </button>
        {isPending ? skeletons : categories.map((el) => (
          <button
          style={{display: 'inline-block'}}
            className= { el == activeCategory ? "btn-active " : "btn" } 
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
    </div>
    </>
  );
}
