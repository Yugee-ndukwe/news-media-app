import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './footer.css'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";


export function Footer({setCountry,setCategory}){

    const categories = ['top', 'business', 'technology', 'health', 'science', 'sports','entertainment','politics','tourism'];

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
    return(
        <>
        <footer>
            <div className="container my-4">
                <div className="row my-5 ">
                    <p className="logo">N&M</p>
                <h3 className="title my-3">Explore our Channel</h3>
                {/* <hr /> */}
                    <div className="col-10 col-lg-10 my-3  firstRow">
                        <ul>
                        {categories.map((category) => (
                      <li
                        key={category}
                        eventKey={category}
                        // as={Link}
                        // className={`text-light list${activeKey === category ? ' active' : ''}`}
                        onClick={() => setCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </li>
                    ))}
                        </ul>
                    </div>
                    <div className="col-10 col-lg-10 my-3 secondRow">
                        <ul>
                        {Object.keys(countryNames).map((countryCode) => (
                        <li
                          as={Link}
                        //   className={`nav-item  ${activeKey === countryCode ? 'active' : ''}`}
                          key={countryCode}
                          onClick={() => {
                            setCountry(countryCode);
                            // setActiveKey(countryCode);
                          }}
                        >
                          {countryNames[countryCode]}
                        </li>
                      ))}
                        </ul>
                    </div>
                    
                    <div className="col-11 col-lg-10 my-3  contact">
                        <p>Contact Us<span> @ ugonmandukwe@gmail.com</span></p>
                    </div>
                    <div>
                    <div className="col-10 col-lg-10 my-3 social">
                        <FaFacebook/>
                       <FaWhatsapp/>
                       <FaInstagram/>
                        </div>
                    </div>
                    <div className="col-10 col-lg-10 copyright">
                    <span>&#169; Copyright 2024, Yugee Ndukwe</span>
                    </div>  
                </div>
            </div>
            <hr />
        </footer>
        </>
    )
}