import React, { useState, useEffect } from 'react'
import StartupItem from './StartupItem'
import StartupNavbar from './StartupNavbar'
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './styles/personHomepage.css';


const StartupHomepage = () => {

  const [startupName, setStartupName ] = useState(null);
  const [data, setData ] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderStartups = () => {
    if (data == null) {
        console.log("render method: There is no data in 'data'");

        return (
            <Spinner animation='grow' />
        );
    }
    else {
        console.log("render method:", data);
        return (
            data.map((startup) => {
                return <StartupItem name={startup.name} bio={startup.bio} />
                //return (<div>{company.name}</div>)

            })

        )
    }

}
useEffect(() => {
  // https://api.github.com/users/dleguisamo
  // /api/getUserProfile

  // setData(mockData);
  axios.get("/api/getStartupProfile")
      .then((response) => {
          console.log(response.data);
          setStartupName(response.data.name);
      })
      .catch((error) => {
          console.error("Could not fetch data: ", error);
          setError(error)
      })

  axios.get("/api/getStartupMatches")
      .then((response) => {
          console.log(response.data);
          setData(response.data);
          // setName(response.data.name);
      })
      .catch((error) => {
          console.error("Could not fetch data: ", error);
          setError(error)
      })
      .finally(() => {
          setLoading(false)
      });
}, []);




  return (
    
    <Container className='phContainer'>

      <StartupNavbar />
      <Row className='phWelcomeRow'>
        <Col className='phWelcomeCol'>
            <div className='m1'>Welcome, {startupName} </div>
            <div className='m2'>Here are your matches based on the skills you are looking for!</div>
        </Col>
      </Row>

      <Row className='startupRow'>
        <div className='allStartups'>{renderStartups()}</div>

      </Row>
    </Container>

  )
}

export default StartupHomepage
