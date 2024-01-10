import React, { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
// import ReactForms from './ReactForms';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

export function BasicExample({onCategoryChange}) {
  const [category, setCategory] = useState('general')
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleJoinCommunityClick = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleCategoryClick = (category) => {
    // Call the callback function to update the category in the parent component
    onCategoryChange(category);
  };
    return (
    
      // <Navbar expand="lg" bg="dark">
      //   <Container>
      //     <Navbar.Brand as={Link} to="/" className="text-light">
      //       News<span className="badge bg-danger">&Media</span>
      //     </Navbar.Brand>
      //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //     <Navbar.Collapse id="basic-navbar-nav">
      //       <Nav className="me-auto">
      //         <Nav.Link as={Link} to="" className="text-light">
      //           Home
      //         </Nav.Link>
      //         <Nav.Link as={Link} to="/news" className="text-light">
      //           Technology
      //         </Nav.Link>
      //         <ul>
      //       <li><Link to="/category/business">Business</Link></li>
      //       <li><Link to="/category/entertainment">Entertainment</Link></li>
      //       <li><Link to="/category/health">Health</Link></li>
      //       {/* Add more categories as needed */}
      //     </ul>
      //       </Nav>
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary main-nav"  data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand logo1" href="#"><span>N&M</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
      <li className="nav-item category">
  <Link to="/category/general" className="nav-link " aria-current="page">General</Link>
</li>
<li className="nav-item category">
  <Link to="/category/technology" className="nav-link  firstNav">Technology</Link>
</li>
<li class="nav-item category">
  <Link to="/category/health" className="nav-link">Health</Link>
</li>
<li class="nav-item category">
  <Link to="/category/sports" className="nav-link">Sports</Link>
</li>
<li class="nav-item category">
  <Link to="/category/entertainment" className="nav-link">Entertainment</Link>
</li>
<li class="nav-item category">
  <Link to="/category/science" className="nav-link">Science</Link>
</li>
<li class="nav-item category">
  <Link to="/category/business" className="nav-link">Business</Link>
</li>
<li class="nav-item category ms-5 mx-5" >
  <Link to='/pages' className="nav-link" onClick={handleJoinCommunityClick}>
      <FaUserCircle style={{ width: '20px', color: '#fff' }} /> Join Our Community
  </Link>
</li>

      </ul>
      
    </div>
  </div>
</nav>

</>
);
  }

  