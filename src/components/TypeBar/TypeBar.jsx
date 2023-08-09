import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchTypes,
  setActiveType,
  filterChangedType,
  resetType,
} from "./filterSlice";
import Spinner from "./../Spinner/Spinner";
import "./typeBar.css";
const TypeBar = () => {
  const typeLoadingStatus = useSelector(
    (state) => state.filter.typeLoadingStatus
  );
  const activeBtnId = useSelector((state) => state.filter.typeBtnId);
  const types = useSelector((state) => state.filter.types);
  const dispatch = useDispatch();
  const onClick = (id) => {
    if (id === "reset") {
      dispatch(resetType());
      dispatch(setActiveType(null))
    } else {
      dispatch(setActiveType(id));
      dispatch(filterChangedType(id));
    }
  };
  useEffect(() => {
    dispatch(fetchTypes());
    // eslint-disable-next-line
  }, [dispatch]);

  const elements = types.map((item) => {
    const classActive = "bg-primary text-white";
    return (
      <ListGroup.Item
        className={activeBtnId === item.id ? classActive : null}
        onClick={() => onClick(item.id)}
        key={item.id}
        style={{ cursor: "pointer", transition: "0.3s all" }}
      >
        {item.label}
      </ListGroup.Item>
    );
  });
  return <ListGroup>{elements.length ? elements : <Spinner />}</ListGroup>;
};

export default TypeBar;
