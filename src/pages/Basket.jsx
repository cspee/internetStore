export default function Basket({ basketPrducts, setBasketPorducts }) {
  
  // вынести в компонент?
  function deleteFromBasket(id) {
    setBasketPorducts(
      
        basketPrducts.filter((el) => {
        return el.id !== id;
      })
    );
  }

  function plusCount(id) {
    setBasketPorducts((prev) => {
      return prev.map((el) => {
        return el.id == id ? {...el, count: el.count + 1} : el
      })
    })
  }

  function minusCount(id) {
    setBasketPorducts((prev) => {
      return prev.map((el) => {
        return el.id == id ? {...el, count: el.count - 1} : el
      })
    })
  }

  const fullPrice = basketPrducts.reduce((sum, elem) => sum + elem.price * elem.count, 0)
  if (basketPrducts.length <= 0) {
    return <p className="basket-empty">Basket is Empty!</p>;
  }
  return (
    <div>
      {basketPrducts.map((el) => (
        <div key={el.id} className="basket">
          <div className="basket-container">
            <img src={el.image} alt="image" className="basket-img" />
            <p>{el.title}</p>
            <div className="basket-actions">
              <button className="basket-delete" onClick={() => deleteFromBasket(el.id)} >delete</button>
              <p>{el.price}$ </p>
              <div className="basket-count">
                
                <button onClick={() => minusCount(el.id)} disabled = {el.count == 1}>-</button>
                <span>{el.count}</span>
                <button onClick={() => plusCount(el.id)}>+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <p className="basket-fullPrice">Full price: {fullPrice}</p>
    </div>
  );
}
