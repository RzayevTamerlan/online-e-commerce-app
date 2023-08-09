import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BasketImg from "../../assets/basket-icon.svg";
const NavBar = () => {
  return (
    <Navbar bg="dark" className="p-3" data-bs-theme="dark">
      <Container
        className={"d-flex justify-content-between align-items-center"}
      >
        <NavLink style={{ color: "white", textDecoration: "none" }} to={"/"}>
          BuyDevice
        </NavLink>
        <Nav style={{ color: "white" }}>
          <Link to={'/basket'}>
            <Image style={{ cursor: "pointer" }} src={BasketImg}></Image>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
