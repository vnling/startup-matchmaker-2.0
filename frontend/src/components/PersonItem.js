import React from 'react'
import './styles/StartupItem.css'
import mascot from './styles/mascot.png'
import {Button, Container, Row, Col, Spinner} from 'react-bootstrap';

const PersonItem = (props) => {
    return (
        <Container className="startupItemContainer">
            {/* <div style={{ backgroundImage: `url(${image})` }}> </div> */}
            <h1>{props.name}</h1>
            <p>{props.bio}</p>
            <img src={mascot} className='img-fluid'/>
        </Container>
    )
}

export default PersonItem
