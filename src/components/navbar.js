import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import pokeball from "../image/pokeball.png";

function NavBar() {
  return (
    <Navbar expand="lg" className="fixed">
      <Container fluid>
        <Navbar.Brand>
          <Image src={pokeball} style={{ maxHeight: '70px', maxWidth: '70px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-lg-auto">
            <Nav.Link href="#home" className="pokemon-link">Home</Nav.Link>
            <NavDropdown title="Generation" id="navbarScrollingDropdown" className="pokemon-link">
              <NavDropdown.Item href="#action3" className="pokemon-link-dropdown">Gen 1</NavDropdown.Item>
              <NavDropdown.Item href="#action4" className="pokemon-link-dropdown">Gen 2</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 3</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 4</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 5</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 6</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 7</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 8</NavDropdown.Item>
              <NavDropdown.Item href="#action5" className="pokemon-link-dropdown">Gen 9</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home" className="pokemon-link">Item</Nav.Link>
            <Nav.Link href="#home" className="pokemon-link">Moveset</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;