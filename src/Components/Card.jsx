
import React, { useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite'
import './Card.css'
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import UserPage from './UserPage'
toast.configure()
const CardComponent = ({ result, triggerCard, setCard, username }) => {
  const [toast1, setToast1] = useState(false)
  const [open, setOpen] = useState(true)
  const [button, setButton] = useState(true)
  const [buttonReview, setButtonReview] = useState(true)
  const [nameAttraction, setNameAttraction] = useState("")
  
  const [review, setReview] = useState({ activeReview: false, title: "" })
  const addedToFav = (name) => {
    toast('Huray! You  added '+ name + ' to your favourites!' , { position: toast.POSITION.TOP_RIGHT })
}
  const addtoFav = async (name, street, nr) => {
    let item = { name, street, nr, username }
    let result = await fetch("http://localhost:8080/tripadvisor/demo/addAttractionToFav", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify(item)
    });

      setButton(true)

      addedToFav(name)
      setOpen(true)

      result = await result.json();

  }

  const printtt = (name) => {
    // setButtonReview(false)
    setNameAttraction(name)
    // setButton(false)
    setReview({ activeReview: true, title: "Rate Me" })
  }

  return (triggerCard) ? (
    <div>
      <Container>
        <Row className='row'>
          {result.map((result, idx) => (

            <Col key={idx} xs={12} md={4} lg={3}>
              <Card  >
                <Card.Body>
                  <Card.Title >{result.name}</Card.Title>
                  <Card.Text><b>Location: </b>{result.location.street} {result.location.nr}</Card.Text>
                  <Card.Text><b>Zone: </b>{result.location.zoneName}</Card.Text>
                  <Card.Text><b>Description: </b>{result.description}</Card.Text>
                  <Card.Text><b>Type:</b>{result.attractionType}</Card.Text>
                </Card.Body>
                {button &&
                  <Box sx={{ '& > :not(style)': { m: 1 } }}  >

                    <Fab aria-label="like" key={idx} onClick={() => addtoFav(result.name, result.location.street, result.location.nr)}>
                      <FavoriteIcon />
                    </Fab>
                  </Box>
                }
                {buttonReview &&
                  <Box className='boxReview'  >

                    <Fab color="default" key={idx} onClick={() => printtt(result.name)} aria-label="add" className='boxReview'>
                      <AddIcon />
                    </Fab>
                  </Box>
                }
              </Card>

            </Col>
          ))}
        </Row>
      </Container>
      {/* {toast1 &&
        <Box sx={{ width: '25%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Added to favourites!!
            </Alert>
          </Collapse>
        </Box>
      } */}
    </div>
  ) : () => setCard(false)
}
export default CardComponent

