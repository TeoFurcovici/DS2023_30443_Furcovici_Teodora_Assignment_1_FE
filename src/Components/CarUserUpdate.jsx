import React, { useState } from 'react'
import "./CardUserUpdate.css"
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import { toast } from 'react-toastify'
import $ from 'jquery'; 

const CardUserUpdate = ({ triggerUserCard, setUser,usernameProps}) => {
    const[firstName,setNewFirstName]=useState("")
    const[lastName,setNewLastName]=useState("")
    const[email,setEmail]=useState("")
    const[username,setUsername]=useState("")
    const[enableButtons,setEnableButtons]=useState(false)
    const[ceva,setCeva]=useState("ceva")
    const notifySuccesfullyUpdatedUser = () => {
        toast('Yeey! Your account has been successfully updated!', { position: toast.POSITION.TOP_RIGHT })
    }
    const updateUser = async (e) => {
        e.preventDefault()
        setEnableButtons(true)
        let item = {firstName,lastName,email,username}
        let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/updateUser/"+usernameProps, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify(item)
        });
    
        if(result.ok)
        {
            notifySuccesfullyUpdatedUser()
            result = await result.json();
        }
    
      }

    return (triggerUserCard) ? (
        <div className='popupUser'>
            <Card>
                <Card.Body>
                    <Form className='formUser'>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"   placeholder="First Name" className='formName' onChange={(e)=>setNewFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"   placeholder="Last Name" className='formStreet' onChange={(e)=>setNewLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"  placeholder="Email" className='formZone' onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"  placeholder="Username"  className='formZone' onChange={(e)=>setUsername(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-dark" type="button" className='updateAccount'  onClick={(e) => updateUser(e) } >Update Account  </Button>
                    </Form>
                    <div className='popup-innerUser'>
                        <Button variant="outline-dark" className='close-btnUser' onClick={() => setUser(false) }>Close</Button>
                       
                    </div>
                </Card.Body>
            </Card>
        </div>
    ) : "";
}
export default CardUserUpdate

