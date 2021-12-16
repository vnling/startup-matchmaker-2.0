import React, { useState } from 'react'
import './styles/register.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PersonRegister = () => {

    const [ registerPersonName, setPersonName ] = useState("")
    const [ registerPersonEmail, setRegisterPersonEmail ] = useState("")
    const [ registerPersonPassword, setRegisterPersonPassword ] = useState("")

    const doPersonRegister = () => {
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: {
                name: registerPersonName,
                email: registerPersonEmail,
                password: registerPersonPassword,
            },
            withCredentials: true,
            url: "/api/registerUser",
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
        <Container className='rgContainer'>
            <Row className='row'>
                <Col className='midCol'>
                    <div className='register'>Register</div>
                    <Form>

                        <Form.Group className="nameForm">
                            <FloatingLabel label="full name">
                                <Form.Control onChange={e => setPersonName(e.target.value)} className="nameBorder" type="name" placeholder="full name" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='rpEmailForm'>
                            <FloatingLabel label="email">
                                <Form.Control onChange={e => setRegisterPersonEmail(e.target.value)} className="rpEmailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="rpPasswordForm">
                            <FloatingLabel label="password">
                                <Form.Control onChange={e => setRegisterPersonPassword(e.target.value)} className="rpPasswordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>

                        <Link to="/personlogin">
                            <Button onClick={doPersonRegister} className='createAcctButton'>Create Account</Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default PersonRegister

/*
class PersonRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    // at some point we will need to have different reg pages
    // for users and startups; testing startup endpoint here
    handleSubmit = (event) => {
        console.log(JSON.stringify(this.state));
        fetch('/api/registerStartup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(function (response) {
            console.log(response)
            return response.json();
        }).then(data => {
            if (data.redirectTo) {
                window.location = data.redirectTo;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    }

    render() {

        return (
            <Container className='rgContainer'>
                <Row className='row'>
                    <Col className='midCol'>
                        <div className='register'>Register</div>
                        <Form>

                            <Form.Group className="nameForm">
                                <FloatingLabel label="full name">
                                    <Form.Control className="nameBorder" onChange={e => this.handleNameChange(e)} type="name" placeholder="full name" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='rpEmailForm'>
                                <FloatingLabel label="email">
                                    <Form.Control className="rpEmailBorder" onChange={e => this.handleEmailChange(e)} type="email" placeholder="email" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="rpPasswordForm">
                                <FloatingLabel label="password">
                                    <Form.Control className="rpPasswordBorder" onChange={e => this.handlePasswordChange(e)} type="password" placeholder="password" />
                                </FloatingLabel>
                            </Form.Group>

                            <Link to="/login">
                                <Button onClick={e => this.handleSubmit(e)} className='createAcctButton'>Create Account</Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default PersonRegister
*/