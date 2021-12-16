import React, {useState, useEffect} from 'react'
import './styles/StartupProfile.css';
import { Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StartupNavbar from './StartupNavbar'

const StartupProfile = () => {


    const [ startupName, setStartupName ] = useState(null);
    const [ startupBio, setStartupBio ] = useState(null);
    const [ startupContact, setStartupContact ] = useState(null);
    const [ startupSkills, setStartupSkills ] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // https://api.github.com/users/dleguisamo

        axios.get("/api/getStartupProfile", {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                setStartupName(response.data.name);
                setStartupBio(response.data.bio);
                setStartupContact(response.data.contact);
                setStartupSkills(response.data.skills);
            })
            .catch((error) => {
                console.error("Could not fetch data: ", error);
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    if (loading) return "Loading data...";
    if (error) return "An error!"

    return (
        <Container className='sProfileContainer'>
            <StartupNavbar/>
            <Row className='sProfileRow'>
                <Col className='sProfileCard'>
                    <div className='startupName'>{startupName}</div>
                    <div className='sContactText'>{startupContact}</div>
                    <Link to="/editstartupprofile">
                        <Button className='sEditProfileButton'>Edit Profile</Button>
                    </Link>
                    <hr className='sLine'/>
                    <div className='sHeader'>About Us</div>
                    <div className='sBioText'>{startupBio}</div>
                    <hr className='sLine'/>
                    <div className='sHeader'>Desired Skills</div>
                    <div className='sSkillsText'>{
                        startupSkills.map((item) => (
                        <li key={item}>{item}</li>
                        ))
                    }</div>
                    <hr className='sLine'/>
                    {/* <div className='sHeader'>Contact Us</div> */}
                </Col>
            </Row>
        </Container>

    )
}

export default StartupProfile