import React, { useState, useEffect } from "react";
import logoLight from "../images/prepper_logo.png";
import logodark from "../images/prepper-logo-dark.png"
import backgroundCal from "../images/backgroundCalendar.png"
import previewPlaceholder from "../images/placeholder-preview.png";
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { MdEmail } from "react-icons/md";
import { FaGithubAlt } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import teampng from "../images/team_png.png";
import Tordan from "../images/tordan.png";


import "./AboutUs.css";

function AboutUs({ }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnimation = () => {
        setIsAnimating(!isAnimating);
      };
    
    const handleLogin = () => {
        if (!showSignUp) {
            setShowLogin(true);
        }
    };
    const handleLoginClose = () => {
        setShowLogin(false);
    };

    const handleSignup = () => {
        if (!showSignUp) {
            setShowSignUp(true);
        }
    };
    const handleSignUpClose = () => {
        setShowSignUp(false);
    };



    return (
        <div className="container">
            <div className="content">
                <img src={logoLight} alt="Logo" className="logo" />
                <div className="default-header">
                    <div className="login-signup-button tertiary alata-regular">
                        <Link onClick={handleLogin} className="link white">
                            Log In
                            
                        </Link>
                        {showLogin && <Login onClose={handleLoginClose} />}
                    </div>
                    <div className="login-signup-button primary alata-regular">
                        <Link onClick={handleSignup} className="link white">
                            Sign Up
                        </Link>
                        {showSignUp && <SignUp onClose={handleSignUpClose} />}
                    </div>
                </div>
            </div>

            <div className="wrapper">
            <div className="min-h">
            <div className="default-container">
                <div className="welcome-container">
                    
                    

                    <div className="eye-catcher">
                        <div className="big-title alata-regular white"> 
                            About Us
                        </div>
                    </div>
                        

                </div>

                <div className="offwhite ideas white-background">

                    <div className="mid-section middle-top">


                        <div className="text-top alata-regular">
                            <div className="mid-header">Served by Students</div>
                            <div className="mid-text">We are students from the University of Calgary aiming to build software for the future!
                            As a team of seven team members for our course, SENG 401, we made a meal planner web application to showcase our skills while also creating something useful to us! </div>

                        </div>

                    </div>

                    <div className="mid-spacer white-background"></div>

                    <div className="mid-section">

                        <img src={teampng} className="picture-half" />
                        <div className="text-half alata-regular">
                            <div className="mid-header">Power to planning</div>
                            <div className="mid-text">We believe that everyone has a recipe to share! Keeping meal plans for future reference and sampling from other's home-grown recipes
                            made for a perfect blend of functionality and uniqueness!</div>

                        </div>
                        

                    </div>


                    <div className="team-container alata-regular">

                        <div className="team-header"> Meet the team!</div>
                        <div className="team-row">
                            <div className="team-member-cont">
                                
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Braden Vivas</div>
                                <div className="team-member-bio">Hey All! My name is Braden Vivas, resident project manager! For this project I mostly worked on the front-end side of the project
                                but also dabbled in whatever need to be done! As a leader of this group, it was my duty to make sure things flowed smoothly by managing both front-end and back-end workflows and filling 
                                in any gaps along the way! </div>

                            </div>

                            <div className="team-member-cont">
                              
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Julia Lat</div>
                                <div className="team-member-bio">Julia Lat</div>
                            </div>

                            <div className="team-member-cont">
        
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Cole Thompson</div>
                                <div className="team-member-bio">Cole Thompson</div>
                            </div>

                            <div className="team-member-cont">
                    
                                <img src={Tordan} className="team-member-picture"></img>
                                <div className="team-member-header">Jordan Torske</div>
                                <div className="team-member-bio">Hi there! Im Jordan Torske, a front-end engineer here at Prepper. I love designing user friendly, engaging and appealing interfaces for users like you! In my free time I enjoy spending time outdoors, skiing and hiking! </div>
                            </div>
                        </div>

                        <div className="team-row">
                            <div className="team-member-cont">
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Jordan Vanbeselaere</div>
                                <div className="team-member-bio">Jordan Vanbeselaere</div>
                            </div>

                            <div className="team-member-cont">
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Sarah Qin</div>
                                <div className="team-member-bio">Sarah Qin</div>
                            </div>

                            <div className="team-member-cont">
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Nicholas Garcia</div>
                                <div className="team-member-bio">Nicholas Garcia</div>
                            </div>  
                        </div>


                    </div>
                   

                    <div className="footer">
                        <img src={logodark} className="footer-logo footer-content"/>
                        <div className="contacts white playfair-display footer-contact">
                            <div className="contact-header"> Contact Us</div>
                            <div className="contact-header"> Fake-Phone-Number</div>
                        </div>
                        <div className= "contact-icons footer-content">
                                <a href= "mailto:prepper.planner@gmail.com" className="icon white">
                                <MdEmail/>
                                </a>
                                <a  href= "https://github.com/adriannejulie/Prepper-Food-Planner" className="icon white">
                                <FaGithubAlt />
                                </a>
                                
                        </div>
                        <div className="info-pages white playfair-display footer-content">
                            <div className="contact-header" >About Us</div>
                            <RxDividerHorizontal className="contact-header white" />
                            <div className="contact-header">FAQ</div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            </div>
        </div>
    );
    
    
}

export default AboutUs;
