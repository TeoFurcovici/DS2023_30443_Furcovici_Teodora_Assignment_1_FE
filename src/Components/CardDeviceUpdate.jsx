import React, { useState } from 'react'
import "./CardDeviceUpdate.css"
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import { toast } from 'react-toastify'

const CardDeviceUpdate = ({ triggerAttraction, setDevice,titleA,listOfAllUsers,address,maxHourEnergyConsumption }) => {
    const[newAddress,setnewAddress]=useState("")
    const[newMaxHourEnergyConsumption,setNewMaxHourEnergyConsumption]=useState("")
    const[description,setDescription]=useState("")
    const[enableButtons,setEnableButtons]=useState(false)
    const[username,setUsername]=useState("")
    const notifySuccesfullyUpdatedDevice = () => {
        toast('Yeey! Device updated successfully!', { position: toast.POSITION.TOP_RIGHT })
    }
    const updateDevice = async (e) => {
         e.preventDefault()
        setEnableButtons(true)
        let item = {address,description,maxHourEnergyConsumption,username}
        let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/updateDevice/"+address+"/"+maxHourEnergyConsumption, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify(item)
        });
    
        if(result.ok)
        {
            notifySuccesfullyUpdatedDevice()
            result = await result.json();
        }
    
      }

    return (triggerAttraction) ? (
        <div className='popupU'>
            <Card>
                <Card.Body>
                <h3 className='titlePopUpAtt'>{titleA}</h3>

                    <Form>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Device Description" className='formName' onChange={(e)=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Address" className='formStreet' onChange={(e)=>setnewAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Max HourEnergy Consumption" className='formZone' onChange={(e)=>setNewMaxHourEnergyConsumption(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Select value={username}  onChange={(e) => setUsername(e.target.value)} >
                                <option className='formName' value="user" > -- Select a user --  </option>
                                {listOfAllUsers.map((user) => <option className='formName' value={user.userAccount.username}>{user.userAccount.username}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="outline-dark" type="button" className='updateButton'  onClick={(e) => updateDevice(e) } >Update Device  </Button>
                    </Form>
                    <div className='popup-innerU'>
                        <Button variant="outline-dark" className='close-btnU' onClick={() => setDevice(false) }>Close</Button>
                       
                    </div>
                </Card.Body>
            </Card>
        </div>
    ) : "";
}

export default CardDeviceUpdate