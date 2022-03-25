import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'

export const LoggedInRmdNavBar = () => {
  return (
    <div>
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Rate My Detour</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            
              

            </Nav>
            <Nav>
              
              <Nav.Link href="/create">Create</Nav.Link>
              <Nav.Link href="/memes">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}
