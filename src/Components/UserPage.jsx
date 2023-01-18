import React, { useEffect, useState } from 'react'
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import './UserPage.css'
import CardComponent from './Card'
import CardComponentR from './CardReview'
import CardRestaurant  from './CardRestaurant'
import App from '../App'
import SockJsClient from 'react-stomp';
import { toast } from 'react-toastify'
import ChatAdmin from './ChatAdmin/ChatAdmin'



toast.configure()
function UserPage({ props, trigger,accountId,roleType }) {
    const SOCKET_URL = 'http://localhost:8080/energyUtilityPlatform/stomp';
    const [message, setMessage] = useState('');
    const [review, setReview] = useState({ active: false, title: "" ,username:""})
    const [toLogin, setLogin] = useState(false)
    const [viewProfile, setViewProfile] = useState(false)
    const [card, setCard] = useState({ result: [], triggerCard: false });
    const [cardR, setCardR] = useState({ resultR: [], triggerCardR: false });
    const [cardRest, setCardRest] = useState({ resultRest: [], triggerCardRest: false });
    const [profile, setProfile] = useState({ triggerP: false, titleP: "My Profile", firstName: "", lastName: "", email: "", username: "", password: "" });
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [simpleCard, setSimpleCard] = useState(false)
    const [reviewCard, setReviewCard] = useState(false)
    const[disableUserPage,setDisableUserPage]=useState(false)
    const [specialRestCard, setSpecialRestCard] = useState(false)
    const [toChatUser, setToChatUser] = useState(false)


    let onMessageReceived = (msg) => {
        if(props=== msg.username && toLogin===false && msg.userId===accountId )
        notifyExceedDeviceConsumption(msg.message)
        else  if(props===msg.username &&  msg.userId!=accountId)
        notifyExceedDeviceConsumption("Device with id: " + msg.deviceId + " is not associated to this user!")
    }

    const notifyExceedDeviceConsumption = (message) => {
        toast(message, { position: toast.POSITION.TOP_RIGHT })
    }


    const goToLogin = () => {
        setLogin(true);
        setDisableUserPage(true)
        setSimpleCard(false)
        setSpecialRestCard(false)
        setReviewCard(false)
    }

    const goToChat = () => {
        setToChatUser(true)
        setLogin(false);
        setDisableUserPage(true)
        setSimpleCard(false)
        setSpecialRestCard(false)
        setReviewCard(false)
    }
    
    const allDevices = async (e) => {
        setSimpleCard(false)
        setReviewCard(true)
        setSpecialRestCard(false)
        let data = []
        fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllDevicesForUser/"+props)
            .then(async response => {
                data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setCardR({
                    resultR: data, triggerCardR: true
                })
                console.log(props)

            })

            .catch(error => {
                console.log("There was an error!", error);
            });
    }



    const allAvailableDevices = async (e) => {
        setReviewCard(false)
        setSimpleCard(false)
        setSpecialRestCard(true)

        let data = []
        fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllAvailableDevices")
            .then(async response => {
                data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log(data)
                setCardRest({
                    resultRest: data, triggerCardRest: true
                })



            })

            .catch(error => {
                console.log("There was an error!", error);
            });
    }


    const userProfile = async (e) => {
        setSimpleCard(false)
        setReviewCard(false)
        setViewProfile(true)
        setSpecialRestCard(false)

        let data = []
        let item = { firstName, lastName, email, username, password }
        fetch("http://localhost:8080/tripadvisor/demo/getUserInfo/" + props)
            .then(async response => {
                data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                setProfile({
                    triggerP: true, titleP: "My Profile", firstName: data.userAccount.firstName, lastName: data.userAccount.lastName,
                    email: data.userAccount.email, username: data.userAccount.username, password: data.userAccount.password
                })

            })

            .catch(error => {
                console.log("There was an error!", error);
            });
    }
    return (trigger) ? (
        <div>
            {!disableUserPage &&
                <body>
                    <Navbar className='navBarPrincipalUser' collapseOnSelect expand="lg" bg-primary="blue" variant="light">
                        <Container fluid>
                            <Navbar.Brand className='brandAdvisorUser' href="#">Hello, {props} </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link onClick={goToLogin}>Home</Nav.Link>
                                    <Nav.Link onClick={(e) => goToChat(e)}>Chat</Nav.Link>
                                    <NavDropdown title="Devices" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={(e) => allDevices(e)} >My Devices</NavDropdown.Item>
                                        <NavDropdown.Item onClick={(e) => allAvailableDevices(e)} >All Available Devices</NavDropdown.Item>

                                    </NavDropdown>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </body>
            }
            <div>
                {simpleCard &&
                    <CardComponent
                        result={card.result}
                        triggerCard={card.triggerCard}
                        setCard={setCard}
                        username={props}
                    />
                }
                {reviewCard &&
                    <CardComponentR
                        resultR={cardR.resultR}
                        triggerCardR={cardR.triggerCardR}
                        setCardR={setCardR}
                        username={props}
                    />
                }
                   {specialRestCard &&
                    <CardRestaurant
                        resultRest={cardRest.resultRest}
                        triggerCardRest={cardRest.triggerCardRest}
                        setCardR={setCardRest}
                        username={props}
                    />
                }
                 <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={console.log("Connected!!")}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
                <div>{message}</div>
            </div>
            {toLogin && disableUserPage &&
                <App />
            }
            {!toLogin &&
                <UserPage />
            }
            {!review &&
                <UserPage />
            }
             {toChatUser &&
                <ChatAdmin
                userRole={roleType}/>
            }
        </div>
    ) : ""
}

export default UserPage;
