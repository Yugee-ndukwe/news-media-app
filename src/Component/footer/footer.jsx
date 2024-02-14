import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './footer.css'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";


export function Footer(){
    return(
        <>
        <footer>
            <div className="container my-4">
                <div className="row my-5 py-5">
                    <p className="logo">N&M</p>
                <h3 className="title my-3">Explore our Channel</h3>
                {/* <hr /> */}
                    <div className="col-10 col-lg-10 my-3 d-flex justify-content-evenly firstRow">
                        <p className="category">Technology</p>
                        <p  className="category">Health</p>
                        <p  className="category">Sport</p>
                        <p  className="category">Entertainment</p>
                        <p  className="category">Business</p>
                        <p  className="category">Science</p>
                    </div>
                    <div className="col-10 col-lg-10 my-3 secondRow">
                        <ul>
                        <li>Us</li>
                        <li>Uk</li>
                        <li>Canada</li>
                        <li>Australia</li>
                        <li>Nigeria</li>
                        <li>China</li>
                        <li>Mexico</li>
                        <li>UAE</li>
                        <li>Russia</li>
                        <li>Italy</li>
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