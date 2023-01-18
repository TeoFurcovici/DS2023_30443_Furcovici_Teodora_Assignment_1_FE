import React, { useState } from 'react'
import { Container, Row, Col, Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Button from 'react-bootstrap/Button';
import introIcon from './images/worldIcon.svg'
import { toast } from 'react-toastify'
import UserPage from './Components/UserPage'
import SignUp from './Components/SignUp'
import AdminPage from './Components/AdminPage'




toast.configure()
function App() {
    const [isLoggedIn, setLogin] = useState(false)
    const [isSignUp, setSignUp] = useState(false)
    const [toMenu, setMenu] = useState(false)
    const [data, setData] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [userPage, setUserPage] = useState({ parentToChild: "", active: false,userId:0})
    const [adminPage, setAdminPage] = useState({ parentToChild: "", active: false })
    const [showUserPage, setShowUserPage] = useState(false)
    const [showAdminPage, setShowAdminPage] = useState(false)
    
        
    const notifyUsernameEmpty = () => {
        toast('Oops! Username cannot be empty !', { position: toast.POSITION.TOP_RIGHT })
    }
    const accountNotFound = () => {
        toast('Oops! Account not found :( ', { position: toast.POSITION.TOP_RIGHT })
    }
    const notifyPasswordEmpty = () => {
        toast('Oops! Password cannot be empty !', { position: toast.POSITION.TOP_RIGHT })
    }
   
    const validateInputLogin = () => {
        if (!username) {
            notifyUsernameEmpty()
            return false
        }
        if (!password) {
            notifyPasswordEmpty()
            return false
        }

        return true
    }
    const parentToChild = () => {
        setData(username)
    }
    const goToMenuPage = () => {
        setMenu(true);
    }
    const goToSignUp = () => {
        setSignUp(true);
    }
      

    const login = async () => {
        let noEmptyFields = validateInputLogin();
        if (noEmptyFields) {
            let item = { username, password, isAdmin }
            fetch("http://localhost:8080/energyUtilityPlatform/demo/findUserByUsername/" + username)
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    if (data.isAdmin === "false" && data.username != null) {
                        if (data.password === password) {
                            setData(username)
                            setShowUserPage(true)
                            setIsAdmin(data.isAdmin)
                            setLogin(true)
                            setUserPage({ parentToChild: username, active: true,userId:data.accountId })
                        }
                        else {
                            accountNotFound()
                        }

                    }
                    else if (data.isAdmin === "true" && data.username != null) {
                        if (data.password === password) {
                            parentToChild()
                            setShowAdminPage(true)
                            setIsAdmin(data.isAdmin)
                            setLogin(true)
                            setAdminPage({ parentToChild: username, active: true })
                        }
                        else {
                            accountNotFound()
                        }

                    }


                })
                .catch(error => {
                    console.log("There was an error!", error);
                });
        }
    }
    return (
       
        <div>

            {!isLoggedIn && !toMenu && !isSignUp &&
                <body>
                    <Navbar className='navBarPrincipal' collapseOnSelect expand="lg" bg-primary="blue" variant="light">
                        <Container>

                            <Navbar.Brand className='brandAdvisor' onClick={goToMenuPage}>Energy Utility Platform</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link onClick={goToSignUp}>Sign Up</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>
                    <Container className="mt-5">
                        <Row>
                            <Col lg={4} md={6} sm={12} className="text-left">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        <Form.Text className="text-muted">
                                            Password must contain between 5 and 20 characters.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" onClick={login} >
                                        Login
                                    </Button>
                                </Form>
                            </Col>
                            <Col >
                                <img className='icon-png1' src={introIcon} alt="loginIcon" />
                            </Col>
                        </Row>
                    </Container>

                </body>
            }
            {isLoggedIn &&
                showUserPage &&
                <UserPage
                    props={data}
                    trigger={userPage.active}
                    accountId={userPage.userId}
                    roleType={isAdmin}
                />
            }
            {isLoggedIn && showAdminPage &&
                <AdminPage
                    propsAdmin={data}
                    triggerA={adminPage.active} 
                    roleType={isAdmin}/>
            }
            {isSignUp &&
                <SignUp />
            }
            
        </div>

    )
}
export default App;

