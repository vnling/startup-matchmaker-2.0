import React, {useState} from 'react';
import { Navbar, Container, Row, Nav, NavDropdown, Form, FormControl, Button, Spinner } from 'react-bootstrap';
import './styles/Navbar.css';
import axios from 'axios';

const StartupNavbar = () => {
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState(null);

    const handleShow = () => {
        setShow(true);
    }

    const renderResult = () => {
        if (searchData == null) {
            console.log('renderResult: There is no data in "searchData"')

            return(<Spinner animation='grow'/>);
        }
        else {
            console.log('there is data in searchData! see prev console log');
            console.log("data",searchData.data[0].name)
        
            return (
                <Container className='srchModalContainer'>
                    <Row className='srchModalCard'>
                        <div className='modalName'>{searchData.data[0].name}</div>
                        <hr/>
                        <div className='modalHeader'>About</div>
                        <div className='modalBioText'>{searchData.data[0].bio}</div>
                        <div className='modalHeader'>Contact</div>
                        <div className='modalContactText'>{searchData.data[0].contact}</div>
                        <div className='modalHeader'>skills</div>
                        <div className='modalSkillsText'>{
                            searchData.data[0].skills.map((item) => (
                                <li key={item}>{item}</li>
                            )
                            )

                        }
                        </div>
                    </Row>
                </Container>
            )
        }

    }
    
    const doSearch = () => {
        console.log(JSON.stringify({
            term: searchTerm,
        }));
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
            console.log(res);
            setSearchData(res);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar className='navTextName' href="#">Startup Matchmaker</Navbar>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link className='navText' href="/startuphomepage">Home</Nav.Link>
                    <Nav.Link className='navText' href="/startupprofile">Profile</Nav.Link>

                </Nav>
                <Form className="d-flex">
                    <FormControl
                    onChange={e => setSearchTerm(e.target.value)}
                    type="search"
                    placeholder="barack obama"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button onClick={()=>{doSearch(); handleShow();}} className='navbuttons' style={{ 
                        backgroundColor: "#5d89ba", 
                        border: "2px solid #edf2f4" }}>Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default StartupNavbar


// import React, { useState } from "react";
// // import Logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
// // import ReorderIcon from "@material-ui/icons/Reorder";
// // import "../styles/Navbar.css";

// function Navbar() {
//   const [openLinks, setOpenLinks] = useState(false);

//   const toggleNavbar = () => {
//     setOpenLinks(!openLinks);
//   };
//   return (
//     <div className="navbar">
//       <div className="leftSide" id={openLinks ? "open" : "close"}>
//         {/* <img src={Logo} /> */}
//         <div className="hiddenLinks">
//           <Link to="/"> Talents </Link>
//           <Link to="/startup"> Startups </Link>
//         </div>
//       </div>
//       <div className="rightSide">
//         <Link to="/"> Talents </Link>
//         <Link to="/startup"> Startups </Link>
//         <button onClick={toggleNavbar}>
//           {/* <ReorderIcon /> */}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;