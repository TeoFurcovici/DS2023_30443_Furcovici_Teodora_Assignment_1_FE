import React, { useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import './CardRestAdmin.css'
import CardDeviceUpdate from './CardDeviceUpdate'
import { toast } from 'react-toastify'
import CardAddMenu from './CardAddMenu'

toast.configure()
const CardRestAdmin = ({ resultRestA, triggerCardRestA, setCardRestA, usernameA }) => {
    const [buttonMenuAdd, setButtonMenuAdd] = useState(true)
    const [buttonDeviceDelete, setButtonDeviceDelete] = useState(true)
    const [cardAddMenu, setCardAddMenu] = useState({ triggerCardMenu: false, restaurantName: "", titleMenu: "New Menu?" });
    const [enableAddMenu, setEnableAddMenu] = useState(false)
    const [reviewCardA, setReviewCardA] = useState(false)
    const [device, setDevice] = useState({ activeAttraction: false, titleA: "New Device? ",listOfAllUsers:[],address:"",maxHourEnergyConsumption:""})
    const [simpleCard, setSimpleCard] = useState(false)
    const [specialRestCard, setSpecialRestCard] = useState(false)

    const notifyAlreadyMenu = () => {
        toast('Oops! It looks like this restaurant already have a menu! ', { position: toast.POSITION.TOP_RIGHT })
    }

    const goToDevice =(address,maxHourEnergyConsumption) => {
        let tempListOfUsers=[]
        fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllRegularUsers")
        .then(async response => {
            tempListOfUsers = await response.json();
            if (!response.ok) {
                const error = (tempListOfUsers && tempListOfUsers.message) || response.statusText;
                return Promise.reject(error);
            }
            setDevice({ activeAttraction: true, title: "New Device?",listOfAllUsers:tempListOfUsers,
        address:address, maxHourEnergyConsumption:maxHourEnergyConsumption})
        })

        .catch(error => {
            console.log("There was an error!", error);
        });
       
        setReviewCardA(false)
        setSimpleCard(false)
        setSpecialRestCard(false) 
    }

    const deleteDevice = async (address) => {
        console.log(address)
       let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/deleteDevice/"+address, {
         method: 'DELETE',
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
   
         },
       });
   
       if(result.ok)
       {
           result = await result.json();
       }
   
     }
   
    return (triggerCardRestA) ? (
        <div>
            <Container>
                <Row className='rowRA'>
                    {resultRestA.map((resultRestA, idx) => (

                        <Col key={idx} xs={12} md={4} lg={3}>
                            <Card  >
                                <Card.Body>
                                    <Card.Text > <b>Address: </b>{resultRestA.address}</Card.Text>
                                    <Card.Text><b>Description: </b>{resultRestA.description}</Card.Text>
                                    <Card.Text><b>Maximum Consumption: </b>{resultRestA.maxHourEnergyConsumption}</Card.Text>
                                    </Card.Body>
                                {buttonMenuAdd &&
                                    <Button variant="outline-danger" onClick={() => goToDevice(resultRestA.address,resultRestA.maxHourEnergyConsumption)}>Update Device </Button>
                                }
                                 {buttonDeviceDelete &&
                                    <Button variant="outline-danger"  onClick={() => deleteDevice(resultRestA.address)} >Delete Device </Button>
                                }
                            </Card>

                        </Col>
                    ))}
                </Row>
            </Container>
            {enableAddMenu &&
                <CardAddMenu
                    triggerCardMenu={cardAddMenu.triggerCardMenu}
                    setMenu={setCardAddMenu}
                    restaurantName={cardAddMenu.restaurantName}
                    titleMenu={cardAddMenu.titleMenu}
                />
            }
            {device &&
                <CardDeviceUpdate
                    triggerAttraction={device.activeAttraction}
                    setDevice={setDevice}
                    titleA={device.titleA}
                    listOfAllUsers={device.listOfAllUsers}
                    address={device.address}
                    maxHourEnergyConsumption={device.maxHourEnergyConsumption}
                />
            }
        </div>
    ) : () => setCardRestA(false)
}
export default CardRestAdmin

