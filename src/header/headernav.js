import React from 'react';
import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    setCountry(countryCode);
  };

  return (
    <>
      <header>
        <Navbar expand="lg" collapseOnSelect>
          <div className="container-fluid bg-warning custom-nav">
            <Navbar.Brand as={Link} to="#" className="news">
              NEWS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
              <Nav className="ms-auto mb-2 mb-lg-0" variant="underline" activeKey={activeKey}>
                {Object.keys(countryNames).map((countryCode) => (
                  <Nav.Link
                    as="li"
                    className={`nav-item cursor-pointer ${activeKey === countryCode ? 'active' : ''}`}
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
    </>
  );
}
