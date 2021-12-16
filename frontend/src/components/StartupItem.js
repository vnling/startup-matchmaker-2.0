import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import './styles/StartupItem.css'
import mascot from './styles/mascot.png'
import axios from 'axios'
// import { render } from 'ejs';
//on mount, fetch matches? 
import Modal from 'react-bootstrap/Modal'

const StartupItem = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const [modalName, setModalName] = useState(null);
  const [modalBio, setModalBio] = useState(null);
  const [modalSkills, setModalSkills] = useState("Skills");
  const [modalContact, setModalContact] = useState("Contact");

  const handleShow = () => {
    setModalShow(true);
  }

  const findCompany = (searchTerm) => {
    // console.log(JSON.stringify({
    //   term: searchTerm,
    // }));
    axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      data: JSON.stringify({
        term: searchTerm,
      }),
      withCredentials: true,
      url: "/api/search",
    }).then((res) => {
      console.log(res.data[0]);
      setModalName(res.data[0].name);
      setModalBio(res.data[0].bio);
      setModalSkills(res.data[0].skills);
      setModalContact(res.data[0].contact);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const renderCompany = () => {
    console.log(modalSkills);

    return (
      <Container className='srchModalContainer'>
        {/* <Row className='srchModalCard'>
          <div>{modalName}</div>
          <div>{modalContact}</div>
          <div className='modalHeader'>About</div>
          <div>{modalBio}</div>
          <div>{
            // modalSkills.map((item) => (
            // <li key={item}>{item}</li>
            // ))
            // <p>{modalSkills}</p>
          }</div>
        </Row> */}

        <Row className='srchModalCard'>
          <div className='modalName'>{modalName}</div>
          <hr />
          <div className='modalHeader'>About</div>
          <div className='modalBioText'>{modalBio}</div>
          <div className='modalHeader'>Contact</div>
          <div className='modalContactText'>{modalContact}</div>
          <div className='modalHeader'>Skills</div>
          <div className='modalSkillsText'>{
            // modalSkills.map((item) => (
            //   <li key={item}>{item}</li>
            // )
            // )
            <ul>
              <li>{modalSkills[0]}</li>
              <li>{modalSkills[1]}</li>
            </ul>
            // <p>{modalSkills}</p>
          }
          </div>
        </Row>
      </Container>
    )
  }

  async function findAndRender(searchTerm) {
    await findCompany(searchTerm);
    renderCompany();
  }

  return (
    <Container onClick={() => { findAndRender(props.name); handleShow(); }} className="startupItemContainer">
      {/* <div style={{ backgroundImage: `url(${image})` }}> </div> */}
      <h1 className="startupName">{props.name}</h1>
      <p>{props.bio}</p>
      <img src={mascot} className='img-fluid' />

      <Modal className='searchModal' show={modalShow} fullscreen={true} onHide={() => setModalShow(false)}>
        <Modal.Header>
          <Modal.Title>Displaying information for {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{renderCompany()}</div>
        </Modal.Body>
      </Modal>

    </Container>
  )
}

export default StartupItem
