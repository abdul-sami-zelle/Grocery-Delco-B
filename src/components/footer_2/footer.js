import React from 'react';
import './style.css';
import { FaSit } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";



const Footer_2 = () => {
    return (
        <>
            <footer className="legalist-footer">
                <div className="footer-container">

                    {/* Top Section: Branding and Newsletter */}
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="logo-wrapper">
                                <img src='/assets/Images/header-logo2.png' />
                            </div>
                            <h1 className="footer-headline desktop">
                                We Provide the <br /> goods that are <br /> best for you.
                            </h1>
                            <h1 className="footer-headline mobile">
                                We Provide the goods that are <br /> best for you.
                            </h1>
                        </div>

                        <div className="footer-subscribe">
                            <div className="hours">Monday - Sunday 10am - 10pm</div>
                            <form className="subscribe-form">
                                <input type="email" placeholder="Enter your email" />
                                <button type="submit">Subscribe</button>
                            </form>
                            <p className="subscribe-disclaimer">
                                By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
                            </p>
                        </div>
                    </div>

                    {/* Middle Section: Links and Socials */}
                    <div className="footer-middle">
                        <div className='location_footer'>
                            <SlLocationPin />
                            <p>1850 Delmar drive, Folcroft, PA <br /><span> United States</span></p>
                        </div>

                        {/* YAHAN UPDATE KIYA HAI */}
                        <div className="social-links-wrapper">
                            <ul className="social-links">
                                <li><a href='https://www.facebook.com/delcofarmersmarket/'><FaFacebook /></a></li>
                                <li><a href='https://www.instagram.com/delcofarmersmarket'><FaInstagram /></a></li>
                                <li><a href='https://www.tiktok.com/@delco.farmers.mar'><FaTiktok /></a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section: Copyright and Legal */}
                    {/* <div className="footer-bottom">
                    <div className="copyright">
                        Copyright © 2024 saastemplate. All rights reserved. <br />
                        <span>Terms of Use</span> <span>Privacy Policy</span>
                    </div>

                    <div className="legal-links">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookies Settings</span>
                    </div>
                </div> */}

                    {/* Background Watermark */}
                    <div className="footer-watermark">DELCO</div>
                </div>


            </footer>

            <section className="subscription">
                <span>
                    © 2026 Delco Farmers Market. Designed & Managed by
                </span>
                <a href="https://zellesolutions.com">Zelle Solutions Pvt. Ltd</a>
            </section>
        </>
    );
};

export default Footer_2;