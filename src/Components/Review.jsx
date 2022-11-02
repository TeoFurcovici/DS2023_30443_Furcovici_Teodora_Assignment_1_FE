import React, { useState } from 'react'
import "./Review.css"
import { Card, Row, Col, Container,Form,Button} from "react-bootstrap";
import CardComponent from './Card'
const Review = ({ triggerReview, setReview, title,nameAttraction,username }) => {
    const[nameReview,setNameReview]=useState("")
    const[description,setDescription]=useState("")
    const[enableButtons,setEnableButtons]=useState(false)
    let nrOfLikes=0
    const leaveReview = async () => {
        setEnableButtons(true)
        let item = {nameReview, nameAttraction, description,nrOfLikes, username }
        let result = await fetch("http://localhost:8080/tripadvisor/demo/leaveReview", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
    
    
      }
     
    return (triggerReview) ? (
        <div className='popup'>
            <Card>
                <Card.Body>
                <h3 className='titlePopUpReview'>{title}</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameReview">
                            <Form.Control type="text" placeholder="Name for your review" className='formName' onChange={(e)=>setNameReview(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionReview">
                            <Form.Control type="desctiption" placeholder="What do you think?" className='formDescription' onChange={(e)=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-dark" className='reviewButton'  onClick={() => leaveReview() } >Leave Review  </Button>
                    </Form>
                    <div className='popup-inner' >
                        <Button  variant="outline-dark"className='close-btn' onClick={() => setReview(false) }>Close</Button>
                       
                    </div>
                </Card.Body>
            </Card>
        </div>
    ) : "";
}

export default Review