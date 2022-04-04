import React, { useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import env from '../../config/config'
import SearchByFitler from '../SearchByFitler/SearchByFitler'


export const LoggedInRmdNavBar = () => {

  const [showSearchFilter, setShowSearchFilter] = useState(false);

  const handleFilterSet = (e: { coordinates: { lat: number, lng: number } }) => {
    fetch(`${env.api}/api/v1/detour`, {
      body: JSON.stringify({ coordinates: e.coordinates }),
      method: 'post',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
    })
  }

  const handleSearchClick = (e: any) => {
    setShowSearchFilter(true);
  }

  const handleClose = () => {
    setShowSearchFilter(false);
  }



  return (

      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Rate My Detour</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="d-flex w-100 justify-content-center">

      

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

  
  )
}
