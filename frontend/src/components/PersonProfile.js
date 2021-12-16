import React, { useState, useEffect } from 'react'
import './styles/PersonProfile.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar'

const PersonProfile = () => {

    // All data fields we are using, will be modified with official backend
    //for testing purposes, organization = data.company // name = data.name // bio = data.bio // organization = data.company // title = data.type
    //skills still empty for now need to figure out storage method
    const [name, setName] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [title, setTitle] = useState(null);
    const [bio, setBio] = useState(null);
    const [contact, setContact] = useState(null);
    const [skills, setSkill] = useState(null);


    // fetching data, error and loading notifications included
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get data from github api. This is for testing purposes. Endpoint will be modified 
    // to use data from LOGGED IN USER

    useEffect(() => {
        // https://api.github.com/users/dleguisamo

        axios.get("/api/getUserProfile")
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setTitle(response.data.title);
                setOrganization(response.data.organization);
                setBio(response.data.bio);
                setContact(response.data.contact);
                setSkill(response.data.skills);
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
        <Container className='pProfileContainer'>
            <AppNavbar/>
            <Row className='pProfileRow'>
                <Col className='pProfileCard'>
                    <div className='personName'>{name}</div>
                    <div className='personTitle'>{title}</div>
                    <div className='personOrganization'>{organization}</div>
                    <div className='pContactText'>{contact}</div>
                    <Link to="/editpersonprofile">
                        <Button className='pEditProfileButton'>Edit Profile</Button>
                    </Link>
                    <hr className='line'/>
 
                    <div className='pHeader'>About Me</div>
                    <div className='pBioText'>{bio}</div>
                    <hr className='line'/>
                    <div className='pHeader'>My Skills</div>
                    <div className='pSkillsText'>{
                        skills.map((item) => (
                        <li key={item}>{item}</li>
                        ))
                    }</div>
                    {/* <hr className='line'/>
                    <div className='pHeader'>Contact Me</div> */}
                    

                </Col>
            </Row>
        </Container>

    )
}

export default PersonProfile

{/* <Container className='pProfileContainer'>
<AppNavbar/>
<Row className='personBasicInfoRow'>
    <Col className='personCard'>
        <div className='personName'>{name}</div>
        <div className='personTitle'>{title}</div>
        <div className='personOrganization'>{organization}</div>

        <Link to="/editpersonprofile">
            <Button className='pEditProfileButton'>Edit Profile</Button>
        </Link>
    </Col>
</Row>

<Row className='personBioRow'>

    <Col className='personContactCard'>
        <div className='personProfileText'>Contact</div>
        <div className='personContactText'>{contact}</div>

    </Col>

    <Col className='personBioCard'>
        <div className='personAbout'>
            About
            <div className='personBioText'>{bio}</div>

        </div>

        <div className='personSkills'>
            Skills
            <div className='skillsText'>{
                skills.map((item) => (
                    <li key={item}>{item}</li>
                ))
            }</div>

        </div>
    </Col>

</Row>

</Container>

) */}