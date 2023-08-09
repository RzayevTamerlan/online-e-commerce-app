import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { decrementPage, incrementPage, setPage } from "../TypeBar/filterSlice";
import { fetchDevicesLength } from "../DeviceList/devicesSlice";
import "./paginationsBtns.css";

const PaginationsBtns = () => {
  const dispatch = useDispatch();

  const filterTypeState = useSelector((state) => state.filter.typeFilter);
  const filterBrandState = useSelector((state) => state.filter.brandFilter);
  const page = useSelector((state) => state.filter.page);
  const devicesLength = useSelector((state) => state.devices.devicesLength);
  useEffect(() => {
    dispatch(fetchDevicesLength());
  }, [filterTypeState, filterBrandState]);
  const handleSetPage = (page) => {
    dispatch(setPage(page));
  };
  const handleIncrement = () => {
    dispatch(incrementPage());
  };
  const handleDecrement = () => {
    dispatch(decrementPage());
  };
  const pages = Math.ceil(devicesLength / 16);
  const btnPrevDisable = page <= 1 ? "btn-primary pagination__btns btn__prev p-3 btn__disable" : "btn-primary pagination__btns btn__prev p-3"
  const btnNextDisable = page >= pages ? "btn-primary pagination__btns btn__prev p-3 btn__disable" : "btn-primary pagination__btns btn__next p-3"
  return (
    <Row className="d-flex pagination">
      <Button
        onClick={() => handleDecrement()}
        className={btnPrevDisable}
      >
        Prev
      </Button>
      {Array.from({ length: pages }, (_, index) => (
        <Button style={{background: index+1 === page ? "green" : "#0D6EFD"}} className="pagination__page p-3" key={index} onClick={() => handleSetPage(index + 1)}>
          Page {index + 1} 
        </Button>
      ))}
      <Button
        onClick={() => handleIncrement()}
        className={btnNextDisable}
      >
        Next
      </Button>
    </Row>
  );
};

export default PaginationsBtns;
