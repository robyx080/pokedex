import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
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
            <Nav.Link href="#home" className="pokemon-link">Pokédex</Nav.Link>
            <Nav.Link href="#home" className="pokemon-link">Item</Nav.Link>
            <Nav.Link href="#home" className="pokemon-link">Moveset</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;