import React, { useState } from 'react'
import './styles/login.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import BgImage from "./styles/bg_sm.png";

const StartupLogin = () => {
    const [loginStartupEmail, setLoginStartupEmail] = useState("")
    const [startupLoginPassword, setStartupLoginPassword] = useState("")
    const doStartupLogin = () => {
        console.log(JSON.stringify({
            startup_email: loginStartupEmail,
            startup_password: startupLoginPassword,
        }));
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: JSON.stringify({
                username: loginStartupEmail,
                password: startupLoginPassword,
            }),
            withCredentials: true,
            url: "/api/loginStartup",
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
                    <div className="logIn">Startup Log In</div>
                    <Form>
                        <Form.Group className="emailForm">
                            <FloatingLabel label="email">
                                <Form.Control onChange={e => setLoginStartupEmail(e.target.value)} className="emailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>


                        <Form.Group className="passwordForm">
                            <FloatingLabel label="password">
                                <Form.Control onChange={e => setStartupLoginPassword(e.target.value)} className="passwordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>
                        <Button onClick={doStartupLogin} className="loginButton">login</Button>

                    </Form>
                    <Link to="/startupregister">
                        <Button className="toRegister">register</Button>
                    </Link>

                </Col>
                <Col className='LGrightCol'>
                    <div className='greetingImg'>
                        <img src={BgImage} />
                    </div>
                    <div className='loginGreeting1'>Meet your match.</div>
                    <div className='loginGreeting2'>Find talented people to help grow your startup</div>
                </Col>
            </Row>
        </Container>



    )
}

export default StartupLogin
