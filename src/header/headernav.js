 // HeaderNav.js
 import React from 'react';
 import {useState} from 'react'
 import './headernav.css'
 import { Navbar,Nav,Container, Spinner,NavLink, NavbarToggle } from 'react-bootstrap';
 import { Link } from 'react-router-dom';
 import { WorldNews } from '../Component/Body/world';
 import VID from '../assests/Video.png';
 
 
 export function HeaderNav({ setCountry }) {
   const [activeKey, setActiveKey] = useState('');
  const [loading, setLoading] = useState(true)  // state to show loading

 
   const countryNames = {
     us: 'United States',
     gb: 'United Kingdom',
     ca: 'Canada',
     au: 'Australia',
     ng: 'Nigeria',
     ch: 'China',
     mx: 'Mexico',
     ae: 'Iraq',
     ru: 'Russia',
     it: 'Italy',
   };
 
   const handleCountryClick = (countryCode) => {
    setCountry(countryCode)
   };

   const handleSelect = (eventKey) => {
    // Do something when a NavItem is selected
    setActiveKey(eventKey);
  }
   return (
     <>
        <header>
    
            <Navbar collapseOnSelect expand="lg" >
                <div className="container-fluid bg-warning">
                  <Navbar.Brand as={Link} to="#" className="news">
                    NEWS
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarSupportedContent" />
                  <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="ms-auto mb-2 mb-lg-0" variant="underline" activeKey={activeKey}  onSelect={handleSelect}>
                      {Object.keys(countryNames).map((countryCode) => (
                        <Nav.Link
                          as={Link}
                          className={`nav-item  ${activeKey === countryCode ? 'active' : ''}`}
                          key={countryCode}
                          onClick={() => {
                            setCountry(countryCode);
                            setActiveKey(countryCode);
                          }}
                        >
                          {countryNames[countryCode]}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Navbar.Collapse>
                </div>
            </Navbar>   
      </header> 


      {/* <Navbar collapseOnSelect expand="lg" className="bg-warning">
      <Container>
        <Navbar.Brand href="#home">NEWS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" variant="underline" activeKey={activeKey}  onSelect={handleSelect}>
          {Object.keys(countryNames).map((countryCode) => (
                         <Nav.Link
                         as={Link}
                         to={`#${countryCode}`}
                         className={`nav-item ${activeKey === countryCode ? 'active' : ''}`}
                         key={countryCode}
                         onClick={() => {
                           setCountry(countryCode);
                           setActiveKey(countryCode);
                         }}
                       >
                         {countryNames[countryCode]}
                       </Nav.Link>
                      ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

     </>
   );
 }
 
 