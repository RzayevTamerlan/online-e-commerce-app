import { Row, Card } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  filterChangedBrand,
  setActiveBrand,
  resetBrand,
} from "../TypeBar/filterSlice";
import Spinner from "./../Spinner/Spinner";
import "./brandBar.css"

const BrandBar = () => {
  const brandLoadingStatus = useSelector(
    (state) => state.filter.brandLoadingStatus
  );
  const brandsList = useSelector(
    (state) => state.filter.brands
  );
  const activeBtnId = useSelector(
    (state) => state.filter.brandBtnId
  )
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  },[dispatch])
  const handleClick = (brand,id) => {
    if(id === "reset") {
      dispatch(resetBrand());
      dispatch(setActiveBrand(null));
    } else {
      dispatch(setActiveBrand(id));
      dispatch(filterChangedBrand(brand));
    }
  }
  const elements = brandsList.map((item) => {
    const classCard = `brandscards p-3 ${activeBtnId === item.id ? "bg-info text-white p-3 brandscards" : "p-3 brandscards"}`
    return (
      <Card onClick={() => handleClick(item.brand, item.id)} key={item.id} className={classCard}>
        <h2>{item.brand}</h2>
      </Card>
    );
  });
  return (
    <Row className="d-flex brandsrow">
      {elements}
    </Row>
  );
};

export default BrandBar;
