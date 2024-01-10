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
                <div className="row my-4">
                    <p className="logo">N&M</p>
                <h3 className="title">Explore our Channel</h3>
                {/* <hr /> */}
                    <div className="col-10 col-lg-10 d-flex justify-content-evenly firstRow">
                        <p className="category">Technology</p>
                        <p  className="category">Health</p>
                        <p  className="category">Sport</p>
                        <p  className="category">Entertainment</p>
                        <p  className="category">Business</p>
                        <p  className="category">Science</p>
                    </div>
                    <div className="col-lg-10 secondRow">
                        <p>Uk</p>
                        <p>Nigeria</p>
                        <p>France</p>
                        <p>China</p>
                        <p>Iran</p>
                        <p></p>
                    </div>
                    
                    <div className="  contact">
                        <p>Contact Us<span> @ ugonmandukwe@gmail.com</span></p>
                    </div>
                    <div>
                    <div className="social">
                        <FaFacebook/>
                       <FaWhatsapp/>
                       <FaInstagram/>
                        </div>
                    </div>
                    <div className="copyright">
                    <span>&#169; Copyright 2024, Yugee Ndukwe</span>
                    </div>  
                </div>
            </div>
            <hr />
        </footer>
        </>
    )
}