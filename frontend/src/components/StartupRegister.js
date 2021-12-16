import React, { useState } from 'react'
import './styles/register.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

const StartupRegister = () => {

    const [registerStartupName, setRegisterStartupName] = useState("")
    const [registerStartupEmail, setRegisterEmail] = useState("")
    const [registerStartupPassword, setRegisterPassword] = useState("")

    const doStartupRegister = () => {
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: {
                startup_name: registerStartupName,
                startup_email: registerStartupEmail,
                startup_password: registerStartupPassword,
            },
            withCredentials: true,
            url: "/api/registerStartup",
        }).then((res) => {
            console.log(res);
            if (res.data.redirectTo) {
                window.location = res.data.redirectTo;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
        

        axios.interceptors.request.use(function (config) {
            // console.log(req);
            console.log(config)
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
        
    };
    return (
        <Container className='rgContainer'>
            <Row className='row'>
                <Col className='midCol'>
                    <div className='register'>Register as a Startup</div>
                    <Form>

                        <Form.Group className="nameForm">
                            <FloatingLabel label="startup name">
                                <Form.Control onChange={e => setRegisterStartupName(e.target.value)} className="nameBorder" type="name" placeholder="startup name" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='rpEmailForm'>
                            <FloatingLabel label="email">
                                <Form.Control onChange={e => setRegisterEmail(e.target.value)} className="rpEmailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="rpPasswordForm">
                            <FloatingLabel label="password">
                                <Form.Control onChange={e => setRegisterPassword(e.target.value)} className="rpPasswordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>

                        <Link to="/startuplogin">
                            <Button onClick={doStartupRegister} className='createAcctButton'>Create Account</Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default StartupRegister
