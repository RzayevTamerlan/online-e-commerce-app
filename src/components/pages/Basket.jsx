import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  deleteDeviceFromBasket,
  clearBasket,
  findTotalValueOfBasket,
} from "../BasketItem/basketSlice";
import { Container, Row, Button } from "react-bootstrap";
import BasketItem from "../BasketItem/BasketItem";
import "./basket.css";

const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  useEffect(() => {
    dispatch(findTotalValueOfBasket());
  }, [basket]);
  const emptyBasket = () => {
    dispatch(clearBasket());
  };
  const deleteItem = useCallback(
    (id) => {
      dispatch(deleteDeviceFromBasket(id));
    },
    [dispatch]
  );
  const totalValue = useSelector((state) => state.basket.basketTotalPrice);
  
  const elements = basket.map((item) => {
    return (
      <BasketItem delete={deleteItem} key={item.id} props={item}></BasketItem>
    );
  });
  const basketTitle = `In basket ${elements.length} devices`
  return (
    <>
      <Helmet>
        <meta name="description" content="Device page " />
        <title>
          {elements.length > 0 ? basketTitle : "Basket is empty"}
        </title>
      </Helmet>
      <Container>
        <Row
          className={`flex-column ${
            elements.length === 0 ? "emptyBasketRow" : ""
          }`}
        >
          {elements.length === 0 ? (
            <h2
              className="emptyBasket"
              style={{ fontSize: "50px", textAlign: "center" }}
            >
              Add devices to your basket!
            </h2>
          ) : (
            elements
          )}
        </Row>
        {elements.length === 0 ? null : (
          <Row className="justify-content-between align-items-center">
            <h1 className="total-price">Total price: {totalValue}$</h1>
            <Button
              onClick={() => emptyBasket()}
              className="btn-primary p-3 clear-basket"
            >
              Clear basket
            </Button>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Basket;
