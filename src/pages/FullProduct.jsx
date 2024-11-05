import { useParams } from "react-router-dom";
export default function FullProduct({ products }) {
  const { id } = useParams();
  const product = products.find((prod) => prod.id === Number(id));

  if (!product) {
    return <div className="fullProduct-empty">Product not choosen.</div>;
  }

  return (
    <div className="fullProduct">
      <img src={product.image} alt="prod" className="fullProduct-img"/>
      <div className="fullProduct-info">
        <h3 className="fullProduct-title">{product.title}</h3>
        <div className="fullProduct-actions">
          
          <button className="fullProduct-btn product-btn">Добавить в корзину {product.price}$</button>
          
        </div>
      </div>
    </div>
  );
}
