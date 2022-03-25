import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import env from '../config/config'


export default function RmdNavBar() {

    return (
        <div>
            <Navbar sticky='top' bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Rate My Detour</Navbar.Brand>
                </Container>
            </Navbar>
            
        </div>
    )
}

