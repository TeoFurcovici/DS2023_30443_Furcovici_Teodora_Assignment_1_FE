
import React, { useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import './CardAdmin.css'
const CardComponentA = ({ resultAdmin, triggerCardAdmin, setCardAdmin, usernameAdmin }) => {

  
  return (triggerCardAdmin) ? (
    <div>
      <Container>
        <Row className='rowAdmin'>
          {resultAdmin.map((resultAdmin, idx) => (

            <Col key={idx} xs={12} md={4} lg={3}>
              <Card  >
                <Card.Body>
                  <Card.Title >{resultAdmin.name}</Card.Title>
                  <Card.Text > <b>Location:</b> {resultAdmin.location.street} {resultAdmin.location.nr}</Card.Text>
                  <Card.Text ><b>Zone:</b> {resultAdmin.location.zoneName}</Card.Text>
                  <Card.Text ><b>Description:</b> {resultAdmin.description}</Card.Text>
                  <Card.Text ><b>Type:</b> {resultAdmin.attractionType}</Card.Text>
                </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>
      </Container>
    
    </div>
  ) : () => setCardAdmin(false)
}
export default CardComponentA

