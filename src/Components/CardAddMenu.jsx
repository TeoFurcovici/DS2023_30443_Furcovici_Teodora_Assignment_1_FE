import React, { Component ,useState} from 'react'
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import './CardAddMenu.css'
const  CardAddMenu = ( {triggerCardMenu, setMenu,restaurantName,titleMenu})=> {
    const[menuName,setMenuName]=useState("")
    const addMenu = async (e) => {
        e.preventDefault();
        let item = {menuName,restaurantName}
        let result = await fetch("http://localhost:8080/tripadvisor/demo/addMenu", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
    
    
      }
    const disableCard = () =>
    {
        setMenu(false)
    }
    return (triggerCardMenu)?(
        <div className='popupAM'>
        <Card>
            <Card.Body>
            <h3 className='titlePopUpAM'>{titleMenu}</h3>

                <Form>
                    <Form.Group className="mb-3" controlId="nameReview">
                        <Form.Control type="text" placeholder="Menu Name" className='formName' onChange={(e)=>setMenuName(e.target.value)} />
                    </Form.Group>

                    <Button variant="outline-dark"  className='addButton'  onClick={(e) => addMenu(e) } >Add Menu  </Button>
                </Form>
                <div className='popup-innerAM'>
                    <Button variant="outline-dark" className='close-btnAM' onClick={() => disableCard()}>Close</Button>
                </div>
            </Card.Body>
        </Card>
    </div>
    ):""

}
export default CardAddMenu
