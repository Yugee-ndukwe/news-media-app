// HeaderNav.js
import React from 'react';
import './headernav.css'
import VID from '../assests/Video.png'

export function HeaderNav({ setSelectedCountry }) {
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
    if (setSelectedCountry) {
      setSelectedCountry(countryCode);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  header-nav">
      <div className='container-fluid'>
      <a class="navbar-brand news" href="#">NEWS</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul  className="navbar-nav ms-auto mb-2 mb-lg-0">
        {Object.keys(countryNames).map((countryCode) => (
          <li  className="nav-item country mx-3" key={countryCode} onClick={() => handleCountryClick(countryCode)}>
            {countryNames[countryCode]}
          </li>
        ))}
      </ul>
    </div>
      </div>
      </nav>

      <div>
          <img src={VID} style={{width: '100%'}} alt='vid'/>
      </div>
    </>
  );
}
