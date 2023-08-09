import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, } from "react";
import { fetchFilteredDevices } from "../DeviceList/devicesSlice";
import DeviceItem from "../DeviceItem/DeviceItem"
import Spinner from "../Spinner/Spinner";


const DeviceList = () => {
  const deviceLoadingStatus = useSelector(
    (state) => state.devices.devicesLoadingStatus
  );
  const filterTypeState = useSelector((state) => state.filter.typeFilter);
  const filterBrandState = useSelector((state) => state.filter.brandFilter);
  const page = useSelector((state) => state.filter.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilteredDevices());
    // eslint-disable-next-line
  }, [filterTypeState,filterBrandState, page]);
  const devices = useSelector((state) => state.devices.entities);

  if (deviceLoadingStatus === "loading") {
    return <Spinner />;
  } else if (deviceLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderDevicesList = (arr) => {
    const deviceKeys = Object.values(arr);
    return deviceKeys.map(({ ...props }) => {
      return <DeviceItem key={props.id} {...props} />;
    });
  };
  const elements = deviceLoadingStatus === "idle" ? renderDevicesList(devices) : null;
  return (
    <Row className="d-flex deviceList">
      {elements}
    </Row>
  );
};

export default DeviceList;
