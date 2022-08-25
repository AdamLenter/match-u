import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';


function NavigationMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Match U</Navbar.Brand>
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
            
            <NavDropdown title="Matches" id="collasible-nav-dropdown">
              <LinkContainer to="/makeMatch">
                <NavDropdown.Item>Make a Match</NavDropdown.Item>
              </LinkContainer>
              
              <LinkContainer to="/receiveMatch">
                <NavDropdown.Item>Receive a Match</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/pendingMatches">
                <NavDropdown.Item>My Pending Matches</NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationMenu;