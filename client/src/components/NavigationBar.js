import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect bg="light" expand="md">
            <Navbar.Brand className="text-dark"><strong>MOVIE & TV DATABASE</strong></Navbar.Brand>
            <Navbar.Toggle className="bg-dark" aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} href='#' to='/' className="text-dark"><strong>Home</strong></Nav.Link>
                    <Nav.Link as={Link} href='#' to='/addMovie' className="text-dark"><strong>Add Movie</strong></Nav.Link>
                    <Nav.Link as={Link} href='#' to='/addTvSeries' className="text-dark"><strong>Add Tv Series</strong></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
