import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeCount } from "./basketSlice";
import { useSelector } from "react-redux";
const BasketItem = (props) => {
  const { id, name, price, type, brand, img, count } = props.props;
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const changeCountDevice = (value, id) => {
    const index = basket.findIndex((item) => item.id === id);
    console.log(index)
    dispatch(changeCount([value, index]));
  };
  return (
    <div className="deviceItemBasket">
      <Link to={`/devices/${id}`} className="deviceItem__left">
        <div className="deviceItem__img">
          <img src={img} alt={name} />
        </div>
        <h2 className="deviceItem__name">
          {type} {brand} {name}
        </h2>
      </Link>
      <div className="deviceItem__center">
        <div className="deviceItem__center">
          <input
            onChange={(e) => changeCountDevice(e.target.value, id)}
            type="number"
            min="1"
            value={count}
            name="range"
          />
        </div>
      </div>
      <div className="deviceItem__right">
        <p className="deviceItem__price">{price}$</p>
        <Button
          className="p-2 deviceItem__delete"
          onClick={() => props.delete(id)}
        >
          Delete item
        </Button>
      </div>
    </div>
  );
};

export default BasketItem;
