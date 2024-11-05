import { Link } from "react-router-dom";

export default function Product({ el, addToBasket }) {
  return (
    <div className="product">
      <div>
        <Link to = {`/products/${el.id}`}>
          <img className="product-img"   src={el.image} alt="" />
        </Link>
        <h3 className="product-name">{el.title}</h3>
      </div>

      <div className="product-info">
        <p className="product-price">{el.price} $</p>
        <button className="product-btn" onClick={() => addToBasket(el)}>Add to cart</button>
      </div>
    </div>
  );
}
