import { useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchDevice } from "../DeviceList/devicesSlice";
import { addDeviceToBasket } from "../BasketItem/basketSlice"
import { useDispatch, useSelector } from "react-redux";
import bigStar from "../../assets/devicePageStar.svg";
import Spinner from "../Spinner/Spinner";
import "./devicePage.css"

const DevicePage = () => {
  const { deviceId } = useParams();
  const dispatch = useDispatch();
  const activeDevice = useSelector((state) => state.devices.activeDevice);

  useEffect(() => {
    dispatch(fetchDevice(deviceId));
  }, [deviceId]);
  const activeDeviceSpecs = activeDevice.specs;
  const addToBasket = (device) => {
    dispatch(addDeviceToBasket(device))
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col style={{display:"flex",justifyContent:"center"}} md={4}>
          <Image
            style={{ objectFit: "contain" }}
            width={300}
            height={300}
            src={activeDevice.img}
          ></Image>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-3" style={{ fontSize: "32px", textAlign: "center" }}>
              {activeDevice.name}
            </h2>
            <div
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
              className="d-flex align-items-center justify-content-center"
            >
              {activeDevice.raiting}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            style={{
              width:'100%',
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
            className={
              "d-flex flex-column align-items-center justify-content-between addToBasketCard"
            }
          >
            <h3 className="mt-3">From: {activeDevice.price}$</h3>
            <Button onClick={() => addToBasket(activeDevice)} className={"mb-3 p-3"} variant={"outline-dark"}>
              Add to basket
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className={"d-flex flex-column m-3"}>
        <h1 className="mb-4 mt-4">Specs</h1>
        {typeof activeDeviceSpecs === "object" ? (
          activeDeviceSpecs.map((item, index) => {
            return (
              <Row
                className="p-2"
                key={item.id}
                style={{
                  background: index % 2 === 0 ? "lightgray" : "white",
                  padding: 10,
                }}
              >
                {item.label}: {item.labelData}
              </Row>
            );
          })
        ) : (
          <Spinner></Spinner>
        )}
      </Row>
    </Container>
  );
};

export default DevicePage;
