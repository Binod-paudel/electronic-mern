import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/react.svg";

function Header() {
  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="logo" />
            Broadways
          </Navbar.Brand>
          <Navbar.Toggle arial-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <Nav.Link>
                <FaShoppingCart />
                Cart
              </Nav.Link>
              <Nav.Link>
                <FaUser />
                Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
