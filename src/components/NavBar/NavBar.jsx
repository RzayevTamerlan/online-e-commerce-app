import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BasketImg from "../../assets/basket-icon.svg";
import "./navBar.css";

const NavBar = () => {
  const basketLength = useSelector((state) => state.basket.basket);
  return (
    <Navbar bg="dark" className="p-3" data-bs-theme="dark">
      <Container
        className={"d-flex justify-content-between align-items-center"}
      >
        <NavLink style={{ color: "white", textDecoration: "none" }} to={"/"}>
          BuyDevice
        </NavLink>
        <Nav style={{ color: "white" }}>
          <Link className="basketBox" to={'/basket'}>
            <Image style={{ cursor: "pointer" }} src={BasketImg}></Image>
            {basketLength.length > 0 ? <div className="basket__icon">{basketLength.length}</div> : null}
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
