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
          <Navbar expand="lg" bg="dark" variant="dark" sticky= 'top'className="categoryNav"collapseOnSelect>
              <div className="container-fluid ">
                <Navbar.Brand as={Link} to="/">
                  <span className="logo1">N&M</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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

  