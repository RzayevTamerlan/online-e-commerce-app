import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BasketItem = (props) => {
  const { id, name, price, type, brand, img } = props.props;
  return (
    <div className="deviceItemBasket">
      <Link to={`/devices/${id}`} className="deviceItem__left">
        <div className="deviceItem__img">
          <img src={img} alt={name} />
        </div>
        <h2 className="deviceItem__name">{type} {brand} {name}</h2>
      </Link>
      <div className="deviceItem__right">
        <p className="deviceItem__price">{price}$</p>
        <Button className="p-2 deviceItem__delete" onClick={() => props.delete(id)}>Delete item</Button>
      </div>
    </div>
  );
};

export default BasketItem;
