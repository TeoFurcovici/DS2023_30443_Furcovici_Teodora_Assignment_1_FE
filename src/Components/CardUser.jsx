import React, { useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import './CardUser.css'
import CarUserUpdate from './CarUserUpdate'
import { toast } from 'react-toastify'
import CardUserUpdate from './CarUserUpdate';

toast.configure()
const CardUser = ({ resultRestU, triggerCardRestU, setCardRestU }) => {
    const [buttonMenuAdd, setButtonMenuAdd] = useState(true)
    const [buttonDeviceDelete, setButtonDeviceDelete] = useState(true)
    const [reviewCardA, setReviewCardA] = useState(false)
    const [user, setUser] = useState({ triggerUserCard: false, username:"",firstName:"",lastName:"",email:""})
    const [simpleCard, setSimpleCard] = useState(false)
    const [specialRestCard, setSpecialRestCard] = useState(false)
    const [data, setData] = useState('');

    const goToDevice =(usernameProps,firstNameProps,lastNameProps,emailProps) => {
        let tempListOfUsers=[]
        // fetch("http://localhost:8080/energyUtilityPlatform/demo/findUserByUsername/" + usernameProps)
        // .then(async response => {
        //     const data = await response.json();
        //     if (!response.ok) {
        //         const error = (data && data.message) || response.statusText;
        //         return Promise.reject(error);
        //     }
        //     setData(data)
        // })
        // .catch(error => {
        //     console.log("There was an error!", error);
        // });

        fetch("http://localhost:8080/energyUtilityPlatform/demo/getAllRegularUsers")
        .then(async response => {
            tempListOfUsers = await response.json();
            if (!response.ok) {
                const error = (tempListOfUsers && tempListOfUsers.message) || response.statusText;
                return Promise.reject(error);
            }
            setUser({ triggerUserCard: true, username:usernameProps})
        })

        .catch(error => {
            console.log("There was an error!", error);
        });
       
        setReviewCardA(false)
        setSimpleCard(false)
        setSpecialRestCard(false) 
    }

    const deleteUser = async (username) => {
       let result = await fetch("http://localhost:8080/energyUtilityPlatform/demo/deleteUser/"+username, {
         method: 'DELETE',
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
   
         },
       });
   
       if(result.ok)
       {
           result = await result.json();
       }
   
     }
   
    return (triggerCardRestU) ? (
        <div>
            <Container>
                <Row className='rowRA'>
                    {resultRestU.map((resultRestU, idx) => (

                        <Col key={idx} xs={12} md={4} lg={3}>
                            <Card  >
                                <Card.Body>
                                    <Card.Text > <b>First Name: </b>{resultRestU.userAccount.firstName}</Card.Text>
                                    <Card.Text><b>Last Name: </b>{resultRestU.userAccount.lastName}</Card.Text>
                                    <Card.Text><b>Email: </b>{resultRestU.userAccount.email}</Card.Text>
                                    <Card.Text><b>Username: </b>{resultRestU.userAccount.username}</Card.Text>
                                </Card.Body>
                                {buttonMenuAdd &&
                                    <Button variant="outline-danger" onClick={() => goToDevice(resultRestU.userAccount.username,resultRestU.userAccount.firstName,resultRestU.userAccount.lastName,resultRestU.userAccount.email)}>Update User </Button>
                                }
                                 {buttonDeviceDelete &&
                                    <Button variant="outline-danger"  onClick={() => deleteUser(resultRestU.userAccount.username)} >Delete User </Button>
                                }
                            </Card>

                        </Col>
                    ))}
                </Row>
            </Container>
            {user &&
                <CardUserUpdate
                    triggerUserCard={user.triggerUserCard}
                    setUser={setUser}
                    usernameProps={user.username}

                />
            }
        </div>
    ) : () => setCardRestU(false)
}
export default CardUser

