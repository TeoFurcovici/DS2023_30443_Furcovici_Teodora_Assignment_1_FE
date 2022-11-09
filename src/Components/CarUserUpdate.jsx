import React, { useState ,useEffect} from 'react'
import "./CardUserUpdate.css"
import { Card,Form,Button} from "react-bootstrap";
import { toast } from 'react-toastify'

const CardUserUpdate = ({ triggerUserCard, setUser,firstNameProps,lastNameProps,emailProps,usernameProps}) => {
    const[firstName,setNewFirstName]=useState("")
    const[lastName,setNewLastName]=useState("")
    const[email,setNewEmail]=useState("")
    const[username,setUsername]=useState("")
    const[enableButtons,setEnableButtons]=useState(false)
    const notifySuccesfullyUpdatedUser = () => {
        toast('Yeey! Your account has been successfully updated!', { position: toast.POSITION.TOP_RIGHT })
    }

    useEffect(() => {
        setNewFirstName(firstNameProps);
        setNewLastName(lastNameProps);
        setNewEmail(emailProps);
        setUsername(usernameProps)
      }, [firstNameProps, lastNameProps,emailProps,usernameProps]);

    const updateUser = async (e) => {
        e.preventDefault()
        setEnableButtons(true)
      
        let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/updateUser/"+usernameProps, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username
          })
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
                            <Form.Control type="text"   placeholder="First Name" className='formName'  value={firstName}  onChange={(e)=>setNewFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"   placeholder="Last Name" className='formStreet' value={lastName}  onChange={(e)=>setNewLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"  placeholder="Email" className='formZone'  value={email}  onChange={(e)=>setNewEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text"  placeholder="Username"  className='formZone' value={username}  onChange={(e)=>setUsername(e.target.value)} />
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

