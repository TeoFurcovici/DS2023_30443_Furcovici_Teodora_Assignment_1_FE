import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, Col, Row, Form, Button } from 'react-bootstrap'
import './Menu.css'
import logo from '../images/logo1.png'
import introIcon from '../images/worldIcon.svg'
import introIcon1 from '../images/road.svg'


class Menu extends Component {
    render() {
        return (
            <div className='bigDiv'>
                <Navbar className='navBarPrincipal' collapseOnSelect expand="lg" bg-primary="blue" variant="light">
                    <Container>

                        <Navbar.Brand className='brandAdvisor' href="#home" >Energy Utility Platform</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="http://localhost:3000/Login">Login</Nav.Link>
                                <Nav.Link href="http://localhost:3000/SignUp">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
                <Container className="mt-5">
                    <Row>
                        <Col >
                        <img className='icon-png' src={introIcon} alt="loginIcon" />
                        </Col>
                    </Row>
                </Container>
            </div>


        )
    }
}

export default Menu
