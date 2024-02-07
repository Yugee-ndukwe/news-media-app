 // HeaderNav.js
 import React from 'react';
 import {useState} from 'react'
 import './headernav.css'
 import { Navbar,Nav, NavLink } from 'react-bootstrap';
 import { Link } from 'react-router-dom';
 import { WorldNews } from '../Component/Body/world';
 import VID from '../assests/Video.png'
 
 export function HeaderNav({ setCountry }) {
   const [activeKey, setActiveKey] = useState('');
 
   const countryNames = {
     us: 'United States',
     gb: 'United Kingdom',
     ca: 'Canada',
     au: 'Australia',
     ng: 'Nigeria',
     ch: 'China',
     mx: 'Mexico',
     ae: 'United Arab Emirates',
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
                          as="li"
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
 
       {/* <header className="">
         <div className="container-fluid bg-warning custom-nav">
           <Link to="#" className="news" style={{textDecoration: 'none'}}>
             <span className='fs-2'>NEWS</span>
           </Link>
           <Nav className="me-auto mb-2 mb-lg-0 link">
             {Object.keys(countryNames).map((countryCode) => (
              <NavLink className=''>
               <Link
                 key={countryCode}
                 className="nav-item country"
                 onClick={() => setCountry(countryCode)}
                style={{textDecoration: 'none'}}>
                 {countryNames[countryCode]}
               </Link>
              </NavLink>
             ))}
           </Nav>
         </div>
       </header> */}
     </>
   );
 }
 
 