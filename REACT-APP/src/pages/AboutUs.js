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
import Vordan from "../images/vordan.jpg";
import Braden from "../images/braden-headshot.png"
import Nick from "../images/nick.png"
import Julia from "../images/julia.png"

import { useNavigate } from "react-router-dom"; 
import Sarah from "../images/sarah.png";

import "./AboutUs.css";

function AboutUs({ }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


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

    const handleHomePage = () => {
        navigate("/");

    }


    return (
        <div className="container">
            <div className="content">
                <img src={logoLight} alt="Logo" className="logo" onClick={handleHomePage}/>
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
                                
                                <img src={Braden} className="team-member-picture"></img>
                                <div className="team-member-header">Braden Vivas</div>
                                <div className="team-member-bio">Hey All! My name is Braden Vivas, resident project manager! For this project I mostly worked on the front-end side of the project
                                but also dabbled in whatever need to be done! As a leader of this group, it was my duty to make sure things flowed smoothly by managing both front-end and back-end workflows and filling 
                                in any gaps along the way! </div>

                            </div>

                            <div className="team-member-cont">
                              
                                <img src={Julia} className="team-member-picture"></img>
                                <div className="team-member-header">Julia Lat</div>
                                <div className="team-member-bio">Hello! My name is Julia Lat, I'm a back-end engineer at Prepper. In this project, I mainly focused on back-end implementation, integration of the front-end and back-end, and testing. 
                                Hope you enjoy our project!</div>
                            </div>

                            <div className="team-member-cont">
        
                                <img src={teampng} className="team-member-picture"></img>
                                <div className="team-member-header">Cole Thompson</div>
                                <div className="team-member-bio">Hello Everyone! I'm Cole Thompson, one of the members who was apart of the front-end team. Most of my time for this project was spent implementing the required functionality for the My Recipes page of this application.</div>
                            </div>

                            <div className="team-member-cont">
                    
                                <img src={Tordan} className="team-member-picture"></img>
                                <div className="team-member-header">Jordan Torske</div>
                                <div className="team-member-bio">Hi there! Im Jordan Torske, a front-end engineer here at Prepper. I love designing user friendly, engaging and appealing interfaces for users like you! In my free time I enjoy spending time outdoors, skiing and hiking! </div>
                            </div>
                        </div>

                        <div className="team-row">
                            <div className="team-member-cont">
                                <img src={Vordan} className="team-member-picture"></img>
                                <div className="team-member-header">Jordan Vanbeselaere</div>
                                <div className="team-member-bio">I'm not just another Front-End Engineer; I'm a visionary with a keen eye for detail and a knack for turning concepts into captivating digital experiences. Armed with a deep understanding of web technologies and a relentless drive for perfection, I thrive in the ever-evolving landscape of front-end development.</div>
                            </div>

                            <div className="team-member-cont">
                                <img src={Sarah} className="team-member-picture"></img>
                                <div className="team-member-header">Sarah Qin</div>
                                <div className="team-member-bio">Hello Prepper Users! My name is Sarah Qin, the back-end engineer, the backbone of the Prepper, 
                                and the bridge between Prepper Users and healthy lifestyle. If you have any feedback or suggestions, 
                                feel free to reach out and we will make Prepper better together! </div>
                            </div>
                            <div className="team-member-cont">
                                <img src={Nick} className="team-member-picture"></img>
                                <div className="team-member-header">Nicholas Garcia</div>
                                <div className="team-member-bio">Hi! My name is Nicholas Garcia and I am a full-stack developer at Prepper. For this project, I worked mainly on the Meal Planner page,
                                                                 implementing the front-end design, back-end functions, and their integration. I hope that our project helps you meet your meal plan goals!</div>
                            </div>  
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>);
}

export default AboutUs;
