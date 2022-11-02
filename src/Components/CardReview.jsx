
import React, { useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import './CardReview.css'

const CardComponentR = ({ resultR, triggerCardR, setCardR, username }) => {
  const [button, setButton] = useState(true)

  return (triggerCardR) ? (
    <div>
      <Container>
        <Row className='rowRev'>
          {resultR.map((resultR, idx) => (

            <Col key={idx} xs={12} md={4} lg={3}>
              <Card  >
                <Card.Body>

                  <Card.Text > <b>Address: </b>{resultR.address}</Card.Text>
                  <Card.Text><b>Description: </b>{resultR.description}</Card.Text>
                  <Card.Text><b>Maximum Consumption: </b>{resultR.maxHourEnergyConsumption}</Card.Text>
                </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>
      </Container>

    </div>
  ) : () => setCardR(false)
}
export default CardComponentR

