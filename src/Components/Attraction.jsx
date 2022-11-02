import React, { useState } from 'react'
import "./Attraction.css"
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import { toast } from 'react-toastify'

const Attraction = ({ triggerAttraction, setDevice,titleA }) => {
    const[address,setAddress]=useState("")
    const[maxHourEnergyConsumption,setMaxHourEnergyConsumption]=useState("")
    const[description,setDescription]=useState("")
    const[enableButtons,setEnableButtons]=useState(false)
    const notifySuccesfullyAddedDevice = () => {
        toast('Yeey! Device added successfully!', { position: toast.POSITION.TOP_RIGHT })
    }
    const addDevice = async (e) => {
         e.preventDefault()
        setEnableButtons(true)
        let item = {address,description,maxHourEnergyConsumption }
        let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/addDevice", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify(item)
        });
    
        if(result.ok)
        {
            notifySuccesfullyAddedDevice()
            result = await result.json();
        }
    
      }
     
    return (triggerAttraction) ? (
        <div className='popupA'>
            <Card>
                <Card.Body>
                <h3 className='titlePopUpAtt'>{titleA}</h3>

                    <Form>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Device Description" className='formName' onChange={(e)=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Address" className='formStreet' onChange={(e)=>setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Max HourEnergy Consumption" className='formZone' onChange={(e)=>setMaxHourEnergyConsumption(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit" className='addButton'  onClick={(e) => addDevice(e) } >Add Device  </Button>
                    </Form>
                    <div className='popup-innerA'>
                        <Button variant="outline-dark" className='close-btnA' onClick={() => setDevice(false) }>Close</Button>
                       
                    </div>
                </Card.Body>
            </Card>
        </div>
    ) : "";
}

export default Attraction