import { useQuery } from "@tanstack/react-query";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
export default function FullProduct() {
  const { id } = useParams();
  const {
    isPending,
    error,
    data: product,
  } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id,
  });
  if (isPending) {
    return (
      <div className="loader">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (error || !product) {
    return <div className="fullProduct-empty">Product not choosen.</div>;
  }

  return (
    <div className="fullProduct">
      <img src={product.image} alt="prod" className="fullProduct-img" />
      <div className="fullProduct-info">
        <h3 className="fullProduct-title">{product.title}</h3>
        <div className="fullProduct-actions">
          <button className="fullProduct-btn product-btn">
            Добавить в корзину {product.price}$
          </button>
        </div>
      </div>
    </div>
  );
}
