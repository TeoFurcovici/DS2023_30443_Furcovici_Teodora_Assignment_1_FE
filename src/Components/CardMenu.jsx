
import React, { useState } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import './CardMenu.css'
import Food from './Food'
const CardMenu = ({ resultM, triggerCardM, setCardM, restName, isAdmin }) => {
    const [food, setFood] = useState({ triggerFood: false, titleF: "Want to enlarge your menu? ", menuName: "" })
    const [enableFood, setEnableFood] = useState(false)
    const [menuName1, setMenuName1] = useState("")
    const goToAddNewFood = async (e) => {
        setEnableFood(true)
        e.preventDefault();
        let data = []
        fetch("http://localhost:8080/tripadvisor/demo/getMenuForRest/" + restName)
            .then(async response => {
                data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setMenuName1(data.menuName)
                setFood({ triggerFood: true, titleF: "Want to enlarge your menu?", menuName: menuName1 })
            })

            .catch(error => {
                console.log("There was an error!", error);
            });


    }
    return (triggerCardM) ? (
        < div className='popupMenu' >
            <div className='popup-innerMenu'>
                <div className='popup-innerMenu'>
                    <button
                        className='close-btnMenu'
                        onClick={() => setCardM(false)}
                    >
                        Close
                    </button>
                    {isAdmin &&
                        <Button variant="outline-dark" className='close-btnF' onClick={(e) => goToAddNewFood(e)} > New Food? </Button>
                    }

                </div>
                <Container>
                    <Row className='rowM'>
                        {resultM.map((resultM, idx) => (

                            <Col key={idx} xs={12} md={4} lg={3} >
                                <Card  >
                                    <Card.Body>
                                        <Card.Text> <b>Name:</b> {resultM.nameFood}</Card.Text>
                                        <Card.Text><b>Description:</b> {resultM.description}</Card.Text>
                                        <Card.Text><b>Price:</b> {resultM.price}</Card.Text>
                                        <Card.Text><b>Category:</b> {resultM.categoryType}</Card.Text>
                                    </Card.Body>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            {enableFood &&
                <Food
                    triggerFood={food.triggerFood}
                    setFood={setFood}
                    titleF={food.titleF}
                    menuName={menuName1}
                />
            }
        </div >

    ) : () => setCardM(false)
}

export default CardMenu

