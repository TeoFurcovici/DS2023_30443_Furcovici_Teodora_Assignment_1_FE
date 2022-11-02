import React, { Component, useState } from 'react'
import { Container, Row, Col, Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import loginIcon from '../images/loginIcon.svg'
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import introIcon from '../images/worldIcon.svg'
import './SignUp.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let isAdmin = false;
    const notify =() =>
    {
        toast('Woohoo, your account has been succesfully created!',{position : toast.POSITION.TOP_RIGHT})
    }
    const tooShortPass = () => {
        toast('Oops! Password must containt between 5 and 20 characters !', { position: toast.POSITION.TOP_RIGHT })
    }
    const signUpForUSer = async (e) => {
        e.preventDefault()
        let item = { firstName, lastName, email, password, username,isAdmin }
        let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/addUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"

            },
            body: JSON.stringify(item)
        });
        if(result.ok){
            notify()
            }
        result = await result.json();


    }
    const  signUpForAdmin =  async(e) =>
    {
      e.preventDefault()
      isAdmin=true
      let item={firstName, lastName,email, username,password,isAdmin}
      let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/addAdmin", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"

        },
        body:JSON.stringify(item)
      });

      if(result.ok){
        notify()
        }
      result= await result.json();
     
    
    
    }
    return (
        <div>
            <Navbar className='navBarPrincipal' collapseOnSelect expand="lg" bg-primary="blue" variant="light">
                <Container>

                    <Navbar.Brand className='brandAdvisor' href="http://localhost:3000/" >Energy Utility Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-left">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicFirstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        Password must contain between 5 and 20 characters.
                                    </Form.Text>
                                </Form.Group>



                            </Form.Group>

                            <Button  className='adminBtn' variant="primary" onClick={(e) => signUpForUSer(e)}>
                                Sign Up
                            </Button>
                            <Button className='adminBtn' variant="primary" onClick={(e) => signUpForAdmin(e)}>
                                Sign Up Admin
                            </Button>
                            
                        </Form>
                    </Col>
                    <Col >
                        <img className='icon-png' src={introIcon} alt="loginIcon" />
                    </Col>
                </Row>
            </Container>
        
        </div>
    )
}
export default SignUp
