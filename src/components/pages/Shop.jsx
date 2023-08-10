import { Helmet } from "react-helmet";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../TypeBar/TypeBar";
import BrandBar from "../BrandBar/BrandBar";
import DeviceList from "../DeviceList/DeviceList";
import PaginationsBtns from "../PaginationBtns/PaginationsBtns";
const Shop = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Main page" />
        <title>
          Main page
        </title>
      </Helmet>
      <Container>
        <Row className="mt-2">
          <Col md="3">
            <TypeBar></TypeBar>
          </Col>
          <Col md="9" className="pb-3 pt-3">
            <BrandBar></BrandBar>
            <DeviceList></DeviceList>
            <PaginationsBtns></PaginationsBtns>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
