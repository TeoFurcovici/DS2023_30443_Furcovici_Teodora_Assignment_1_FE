import React, { useState } from 'react'
import "./Attraction.css"
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import './Food.css'
const Food = ({ triggerFood, setFood,titleF,menuName }) => {
    const[nameFood,setFoodName]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[categoryType,setCategoryType]=useState("")
    const  addFood =  async(e) =>
    {
      e.preventDefault()
      let item={nameFood, description,price, categoryType,menuName}
      let result = await fetch("http://localhost:8080/tripadvisor/demo/addFood", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"

        },
        body:JSON.stringify(item)
      });

    //   if(result.ok){
    //     notify()
    //     }
      result= await result.json();
     
    
    
    }
     
    return (triggerFood) ? (
        <div className='popupF'>
            <Card>
                <Card.Body>
                <h3 className='titlePopUpF'>{titleF}</h3>

                    <Form>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Food Name" className='formName' onChange={(e)=>setFoodName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Description" className='formDescription' onChange={(e)=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Price" className='formPrice' onChange={(e)=>setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Select value={categoryType}  onChange={(e) => setCategoryType(e.target.value)} >
                                <option className='formName' value="BREAKFAST" >BREAKFAST</option>
                                <option  className='formName' value="LUNCH" >LUNCH</option>
                                <option  className='formName' value="DINNER">DINNER</option>
                                <option  className='formName' value="DRINKS">DRINKS</option>
                                <option  className='formName' value="STARTER">STARTER</option>
                                <option  className='formName' value="DESSERTS">DESSERTS</option>

                                <option  className='formName' value="SIDES">SIDES</option>
                                <option  className='formName' value="MAINSIDES">MAINSIDES</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="outline-dark" type="submit" className='addButton'  onClick={(e) => addFood(e) } >Add Food  </Button>
                    </Form>
                    <div className='popup-innerF'>
                        <Button variant="outline-dark" className='close-btnF' onClick={() => setFood(false) }>Close</Button>
                       
                    </div>
                </Card.Body>
            </Card>
        </div>
    ) : "";
}

export default Food