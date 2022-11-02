import React, { useState } from 'react'
import "./Profile.css"
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";

const Profile = ({ triggerP, setProfile, titleP, firstName, lastName, email, username, password }) => {
    const [firstName1, setFirstName] = useState("")
    const [lastName1, setLastName] = useState("")
    const [email1, setEmail] = useState("")
    const [username1, setUsername] = useState("")
    const [password1, setPassword] = useState("")
    const updateAccount = async () => {
        firstName=firstName1
        lastName=lastName1
        email=email1
        username=username1
        password=password1
        let item = { firstName, lastName, email, password, username }
        let result = await fetch("http://localhost:8080/tripadvisor/demo/updateAccount", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"

            },
            body: JSON.stringify(item)
        });
        result = await result.json();


    }
    return (triggerP) ? (
        <div className='popupProfile'>
            <div className='popup-innerProfile'>
                <button
                    className='close-btnProfile'
                    onClick={() => setProfile(false)}
                >
                    Close
                </button>
                <h3>{titleP}</h3>
                <Form>
                    <fieldset disabled={false}>
                        <Form.Group className="mb-3">
                            <Form.Label >First Name</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={firstName}  onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Last Name</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={lastName}  onChange={(e) => setLastName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={email}  onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={username}  onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={password}  onChange={(e) => setPassword(e.target.value)}  />
                        </Form.Group>
                    </fieldset>
                </Form>
                <Button variant="outline-dark" type="submit" className='editButton' onClick={() => updateAccount()}>Edit my profile  </Button>

            </div>
        </div>
    ) : "";
}

export default Profile