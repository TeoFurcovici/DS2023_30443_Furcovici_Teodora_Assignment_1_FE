
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
import './CardRestaurant.css'
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.css"

toast.configure()
function CardRestaurant  ({ resultRest, triggerCardRest, setCardRest, username })  {
    const [toast1, setToast1] = useState(false)
    const [open, setOpen] = useState(true)
    const [button, setButton] = useState(true)
    const [buttonReview, setButtonReview] = useState(true)
    const [buttonMenu, setButtonMenu] = useState(true)
    const [nameAttraction, setNameAttraction] = useState("")
    const [review, setReview] = useState({ activeReview: false, title: "" })
    const [menu, setMenu] = useState({ resultM: [], triggerCardM:false, name:"",isAdmin:false})

    // const printtt = (name) => {
    //     // setButtonReview(false)
    //     setNameAttraction(name)
    //     // setButton(false)
    //     setReview({ activeReview: true, title: "Rate Me" })
    // }

    return (triggerCardRest) ? (
        <div>
            <Container>
                <Row className='rowR'>
                    {resultRest.map((resultRest, idx) => (

                        <Col key={idx} xs={12} md={4} lg={3}>
                            <Card  >
                                <Card.Body>
                                <Card.Text > <b>Address: </b>{resultRest.address}</Card.Text>
                                <Card.Text><b>Description: </b>{resultRest.description}</Card.Text>
                                <Card.Text><b>Maximum Consumption: </b>{resultRest.maxHourEnergyConsumption}</Card.Text>
                                </Card.Body>
                                {/* {button &&
                                    <Box sx={{ '& > :not(style)': { m: 1 } }}  >

                                        <Fab aria-label="like" key={idx} onClick={() => addtoFav(resultRest.name, resultRest.location.street, resultRest.location.nr)}>
                                            <FavoriteIcon />
                                        </Fab>
                                    </Box>
                                } */}
                                {/* {buttonReview &&
                                    <Box className='boxReviewR'  >

                                        <Fab color="default" key={idx} onClick={() => printtt(resultRest.name)} aria-label="add" className='boxReview'>
                                            <AddIcon />
                                        </Fab>
                                    </Box>
                                } */}

                            </Card>

                        </Col>
                    ))}
                </Row>
            </Container>
            {toast1 &&
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
            }
        </div>
    ) : () => setCardRest(false)
}
export default CardRestaurant

