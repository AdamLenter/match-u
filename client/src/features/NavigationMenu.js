import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';


function NavigationMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Match U</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavDropdown title="My Ratings" id="collasible-nav-dropdown">
              <LinkContainer to="/myRatings">
                <NavDropdown.Item>See my Ratings</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/addARating">
                <NavDropdown.Item>Add a Rating</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationMenu;