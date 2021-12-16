import React, {useState, useEffect } from 'react'
import './styles/editStartupProfile.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select'
import { Link } from 'react-router-dom';

const EditStartupProfile = () => {

    const startupSkills = [
        { value: 'software engineering', label: 'Software Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'product development', label: 'Product Development' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'graphic design', label: 'Graphic Design' },
        { value: 'design', label: 'Design' },
        { value: 'growth hacking', label: 'Growth Hacking' },
        { value: 'social media', label: 'Social Media' },
        { value: 'data', label: 'Data' },
        { value: 'hardware engineering', label: 'Hardware Engineering' },
        { value: 'biology', label: 'Biology' },
        { value: 'chemistry', label: 'Chemistry' },
        { value: 'physics', label: 'Physics' },
        { value: 'research', label: 'Research' }

    ];

    //states
    const [ startupName, setStartupName ] = useState(null);
    const [ startupBio, setStartupBio ] = useState(null);
    const [ startupContact, setStartupContact ] = useState(null);
    const [ skills, setSkills ] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    
    // useEffect(() => {
    //     // https://api.github.com/users/dleguisamo

    //     axios.get("/api/getStartupProfile")
    //         .then((response) => {
    //             console.log(response.data);
    //             setStartupName(response.data.name);
    //             setStartupBio(response.data.bio);
    //             setStartupContact(response.data.contact);
    //             setSkills(response.data.skills);
    //         })
    //         .catch((error) => {
    //             console.error("Could not fetch data: ", error);
    //             setError(error)
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         });
    // }, []);

    // if (loading) return "Loading data...";
    // if (error) return "An error!"
    // const doStartupProfileUpdate = () => {
    //     axios({
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         data: {
    //             startup_bio: setStartupBio, 
    //             startup_skills: setSkills,
    //         },
    //         withCredentials: true,
    //         url: "/api/editStartupProfile",
    //     }).then((res) => {
    //         console.log(res);
    //         console.log(res.data);
    //         // probably don't need a redirect for profile updates
    //         // if (res.data.redirectTo) {
    //         //     window.location = res.data.redirectTo;
    //         // }
    //     }).catch((error) => {
    //         console.error('Error:', error);
    //     });
        
    //     axios.interceptors.request.use(function (config) {
    //         // console.log(req);
    //         console.log(config)
    //         return config;
    //       }, function (error) {
    //         // Do something with request error
    //         return Promise.reject(error);
    //       });
    // };
    
    return (
        <Container className='pEditProfileContainer'>
            <Row className='pEditProfileRow'>
                <Col className='pEditProfileCol'>

                    <p className='pEditProfileTitle'>Edit Profile</p>
                    <Form>

                        <Form.Group className='sEditNameForm'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='sEditNameBorder' onChange={e => setStartupName(e.target.value)} type='name' />
                        </Form.Group>

                        <Form.Group className='pEditBioForm'>
                            <Form.Label>About Us</Form.Label>
                            <Form.Control className='sEditBioBorder' onChange={e => setStartupBio(e.target.value)} type='bio'  as='textarea' rows={3} />
                        </Form.Group>

                        <Form.Group className='pEditContactForm'>
                            <Form.Label>Contact Us</Form.Label>
                            <Form.Control className='sEditContactBorder' onChange={e => setStartupContact(e.target.value)} type='contact'  as='textarea' rows={3} />
                        </Form.Group>
                        Skills
                        <Select
                            className='pSkillSelectBorder'
                            options={startupSkills}
                            // value={skills
                            //     // skills.map((item) => (
                            //     //     <option value={item.value}>{item.label}</option>
                            //     // ))
                            // }
                            placeholder='Select skills here'
                            isMulti
                            autoFocus
                            onChange={setSkills}
                        />
                        <Button onClick className='pUpdateProfileButton'>Save Changes</Button>

                        <Link to="/startupprofile">
                            <Button className='pBackToProfileButton'>Back to Profile</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    
    )
}

export default EditStartupProfile
