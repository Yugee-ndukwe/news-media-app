import React, { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
// import ReactForms from './ReactForms';
import {Navbar,Nav} from 'react-bootstrap';
import './navbar.css'

export function BasicExample({setCategory}) {
  // const [category, setCategory] = useState('general')
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('Top');
  const categories = ['top', 'business', 'technology', 'health', 'science', 'sports','entertainment','politics','tourism'];

  const handleSelect = (eventKey) => {
    // Do something when a NavItem is selected
    setActiveKey(eventKey);
  }

  const handleJoinCommunityClick = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // const handleCategoryClick = (category) => {
  //   // Call the callback function to update the category in the parent component
  //   onCategoryChange(category);
  // };

  
    return (
    
     

      <>
      {/* <Navbar expand="lg" bg="dark" sticky="top">
        <div className="container-fluid">
      <Navbar.Brand as={Link} to="/">
        <span className="logo1">N&M</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto" variant='underline'activeKey={activeKey}
      onSelect={handleSelect}>
          <Nav.Link  as={Link} to="/category/general" className="text-light list" aria-active onClick={() => handleCategoryClick('general')}>
            General
          </Nav.Link>
          <Nav.Link eventKey={'technology'} as={Link} to="/category/technology" className="text-light list" onClick={() => handleCategoryClick('technology')}>
            Technology
          </Nav.Link>
          <Nav.Link eventKey={'health'} as={Link} to="/category/health" className="text-light list" onClick={() => handleCategoryClick('health')}>
            Health
          </Nav.Link>
          <Nav.Link eventKey={'sport'} as={Link} to="/category/sports" className="text-light list" onClick={() => handleCategoryClick('sports')}>
            Sports
          </Nav.Link>
          <Nav.Link eventKey={'entertainment'} as={Link} to="/category/entertainment" className="text-light list" onClick={() => handleCategoryClick('entertainment')}>
            Entertainment
          </Nav.Link>
          <Nav.Link eventKey={'science'} as={Link} to="/category/science" className="text-light list" onClick={() => handleCategoryClick('science')}>
            Science
          </Nav.Link>
          <Nav.Link eventKey={'business'} as={Link} to="/category/business" className="text-light list" onClick={() => handleCategoryClick('business')}>
            Business
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={'join our community'} as={Link} to='/pages' className="text-light list" onClick={handleJoinCommunityClick}>
            <FaUserCircle style={{ width: '20px', color: '#fff' }} /> Join Our Community
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
 */}

    <Navbar expand="lg" bg="dark" sticky= 'top'className="categoryNav">
        <div className="container-fluid ">
          <Navbar.Brand as={Link} to="/">
            <span className="logo1">N&M</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto" variant='underline' activeKey={activeKey} onSelect={handleSelect}>
              {categories.map((category) => (
                <Nav.Link
                  key={category}
                  eventKey={category}
                  as={Link}
                  className={`text-light list${activeKey === category ? ' active' : ''}`}
                  onClick={() => setCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Nav.Link>
              ))}
            </Nav>
            <Nav>
              <Nav.Link eventKey={'join our community'} as={Link} to='/pages' className="text-light list" onClick={handleJoinCommunityClick}>
                <FaUserCircle style={{ width: '20px', color: '#fff' }} /> Join Our Community
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

</>
);
  }

  