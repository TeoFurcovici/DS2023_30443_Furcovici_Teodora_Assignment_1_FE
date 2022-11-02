import React, { Component, useState } from 'react'
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import './AdminPage.css'
import App from '../App'
import Attraction from './Attraction'
import CardRestAdmin from './CardRestAdmin'
import CardUser from './CardUser'

const AdminPage = ({ propsAdmin, triggerA }) => {
  const [toLogin, setLogin] = useState(false)
  const [disableAdminPage, setDisableAdminage] = useState(false)
  const [reviewCardA, setReviewCardA] = useState(false)
  const [device, setDevice] = useState({ activeAttraction: false, titleA: "New Device? " })
  const [simpleCard, setSimpleCard] = useState(false)
  const [specialRestCard, setSpecialRestCard] = useState(false)
  const [specialCardUser, setSpecialCardUser] = useState(false)
  const [cardRestA, setCardRestA] = useState({ resultRestA: [], triggerCardRestA: false , usernameA:""});
  const [cardUser, setUser] = useState({ resultRestU: [], triggerCardRestU: false });

  const goToLoginAdmin = () => {
    setSpecialRestCard(false)

    setLogin(true);
    setReviewCardA(false)
    setDisableAdminage(true)
    setSimpleCard(false)
    setSpecialCardUser(false)

  }

  const allDevices = async (e) => {
    setReviewCardA(false)
    setSimpleCard(false)
    setSpecialRestCard(true)
    setSpecialCardUser(false)

    let data = []
    fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllDevices")
        .then(async response => {
            data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setCardRestA({
                resultRestA: data, triggerCardRestA: true
            })



        })

        .catch(error => {
            console.log("There was an error!", error);
        });
}



const allAvailableDevices = async (e) => {
    setReviewCardA(false)
    setSimpleCard(false)
    setSpecialRestCard(true)
    setSpecialCardUser(false)

    let data = []
    fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllAvailableDevices")
        .then(async response => {
            data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setCardRestA({
                resultRestA: data, triggerCardRestA: true
            })



        })

        .catch(error => {
            console.log("There was an error!", error);
        });
}

const allUsers = async (e) => {
  setReviewCardA(false)
  setSimpleCard(false)
  setSpecialRestCard(false)
  setSpecialCardUser(true)

  let data = []
  fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllRegularUsers")
      .then(async response => {
          data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
          setUser({
              resultRestU: data, triggerCardRestU: true
          })



      })

      .catch(error => {
          console.log("There was an error!", error);
      });
}
 

  const goToDevice = () => {
    setDevice({ activeAttraction: true, title: "New Device? " })
    setReviewCardA(false)
    setSimpleCard(false)
    setSpecialRestCard(false)
    setSpecialCardUser(false)

  }

  return (triggerA) ? (
    <div>
      {!disableAdminPage &&
        <body>
          <Navbar className='navBarPrincipalAdmin' collapseOnSelect expand="lg" bg-primary="blue" variant="light">
            <Container>
              <Navbar.Brand className='brandAdvisorAdmin'>Hello,{propsAdmin}</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link onClick={goToLoginAdmin}>Home</Nav.Link>
                  <Nav.Link onClick={goToDevice}>Add Device</Nav.Link>
                  <NavDropdown title="Options" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={(e) => allDevices(e)}>All Devices</NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => allAvailableDevices(e)}>All Available Devices </NavDropdown.Item>
                    <NavDropdown.Item onClick={(e) => allUsers(e)}>All Clients </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </body>
      }
      {toLogin && disableAdminPage &&
        <App />
      }
      {device &&
        <Attraction
          triggerAttraction={device.activeAttraction}
          setDevice={setDevice}
          titleA={device.titleA}
        />
      }
      {specialRestCard &&
          <CardRestAdmin
            resultRestA={cardRestA.resultRestA}
            triggerCardRestA={cardRestA.triggerCardRestA}
            setCardRestA={setCardRestA}
            usernameA={propsAdmin}
            />
      }
      {specialCardUser &&
          <CardUser
            resultRestU={cardUser.resultRestU}
            triggerCardRestU={cardUser.triggerCardRestU}
            setCardRestU={setUser}
            />
      }
        
    </div>
  ) : ""

}
export default AdminPage
