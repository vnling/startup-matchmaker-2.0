import React, { useState } from 'react'
import './styles/login.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BgImage from "./styles/bg_sm.png";

const PersonLogin = () => {
    const [loginPersonEmail, setLoginPersonEmail] = useState("")
    const [loginPersonPassword, setLoginPersonPassword] = useState("")
    const doPersonLogin = () => {
        console.log(JSON.stringify({
            username: loginPersonEmail,
            password: loginPersonPassword,
        }));
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: JSON.stringify({
                username: loginPersonEmail,
                password: loginPersonPassword,
            }),
            withCredentials: true,
            url: "/api/loginUser",
        }).then((res) => {
            console.log(res);
            if (res.data.redirectTo) {
                window.location = res.data.redirectTo;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <Container className='lgContainer'>
            <Row className='row'>
                <Col className='LGleftCol'>
                    <div className="logIn">Individual Log In</div>
                    <Form>
                        <Form.Group className="emailForm">
                            <FloatingLabel label="email">
                                <Form.Control onChange={e => setLoginPersonEmail(e.target.value)} className="emailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>


                        <Form.Group className="passwordForm">
                            <FloatingLabel label="password">
                                <Form.Control onChange={e => setLoginPersonPassword(e.target.value)} className="passwordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>
                        <Button onClick={doPersonLogin} className="loginButton">login</Button>

                    </Form>
                    <Link to="/personregister">
                        <Button className="toRegister">register</Button>
                    </Link>

                </Col>
                <Col className='LGrightCol'>
                    <div className='greetingImg'>
                        <img src={BgImage}/>
                    </div>
                    <div className='loginGreeting1'>Meet your match.</div>
                    <div className='loginGreeting2'>Find a startup where you'll grow and learn!</div>

                </Col>
            </Row>
        </Container>



    )
}

export default PersonLogin