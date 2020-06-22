import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect bg="light" expand="md">
            <Navbar.Brand className="text-dark"><strong>MOVIE & TV DATABASE</strong></Navbar.Brand>
            <Navbar.Toggle className="bg-dark" aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} href='#' to='/' className="text-dark"><strong>Home</strong></Nav.Link>
                    <NavDropdown title={<strong>Add</strong>}>
                        <NavDropdown.Item as={Link} href='#' to='/addMovie' className="text-dark bg-white"><strong>Add Movie</strong></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} href='#' to='/addTvSeries' className="text-dark bg-white"><strong>Add Tv Series</strong></NavDropdown.Item>    
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
