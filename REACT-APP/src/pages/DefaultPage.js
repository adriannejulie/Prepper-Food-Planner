import React, { useState, useEffect } from "react";
import logoLight from "../images/prepper_logo.png";
import logodark from "../images/prepper-logo-dark.png"
import backgroundCal from "../images/backgroundCalendar.png"
import previewPlaceholder from "../images/placeholder-preview.png";
import { Link, Navigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { MdEmail } from "react-icons/md";
import { FaGithubAlt } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { useNavigate } from "react-router-dom"; 


import prepperCalendar from "../images/prepper-calendar.jpeg"
import prepperRecipe from "../images/prepper-recipe.jpeg"
import prepperSave from "../images/prepper-recipe.jpeg"
import prepperSearch from "../images/prepper-search.jpeg"

import "./DefaultPage.css";

function DefaultPage({ }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const [showCarousel1, setShowCarousel1] = useState(true);
    const [showCarousel2, setShowCarousel2] = useState(false);
    const [showCarousel3, setShowCarousel3] = useState(false);


    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    useEffect( () => {
        console.log(image)
    }, [image])

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

    const handleCarouselToggle1 = () => {

        if (!showCarousel1){
            setShowCarousel1(true)
            setShowCarousel2(false)
            setShowCarousel3(false)
        }
    };

    const handleCarouselToggle2 = () => {

        if (!showCarousel2){
            setShowCarousel1(false)
            setShowCarousel2(true)
            setShowCarousel3(false)
        }
    };

    const handleCarouselToggle3 = () => {

        if (!showCarousel3){
            setShowCarousel1(false)
            setShowCarousel2(false)
            setShowCarousel3(true)
        }
    };

    const carouselText1 = "Pick a recipe from your own catalog or browser for public on our forum. Pick a day and plan what dishes you want to eat"
    const carouselText2 = "Cook up your own recipes and save them for later. You can also grab a bite of other people’s recipes for your meal plan."
    const carouselText3 = "Search through our catalog of recipes, uploaded by other chefs like you. Search by name, author, or whatever is in your pantry"

    const handleAboutUs = () => {

        navigate("/about-us")
    }


    
    useEffect(() => {
    }, [showLogin]);


    return (
        <div className="landing-page-container">
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
                    
                    

                    <img src={backgroundCal} className="faded-image" />
                    <div className="eye-catcher">
                        <div className="big-title alata-regular white"> 
                            Plan with Prepper!
                        </div>
                        <Link onClick={handleSignup} className="link eye-catcher-join alata-regular white">
                            Start Planning!
                        </Link>
                    </div>
                        

                </div>

                <div className="offwhite ideas">

                    <div className="mid-section">

                        <img src={prepperSave} className="picture-half-landing" />
                        <div className="text-half-landing alata-regular">
                            <div className="mid-header-landing">How it works</div>
                            <div className="mid-text">Plan, Create and Share with Prepper!<br></br>Schedule a meal that you create and upload yourself or find using our catalog of recipes uploaded by other users!</div>

                        </div>

                    </div>


                    <div className="carousel">
                        <div className="carousel-options">
                            <div className={showCarousel1 ? ("c-option carousel-hightlight alata-regular carousel-hightlight-to-none") : ("c-option carousel-inverse alata-regular")}
                            onClick={handleCarouselToggle1} >Plan </div>
                            <div className={showCarousel2 ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleCarouselToggle2} >Prep</div>
                            <div className={showCarousel3 ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleCarouselToggle3} >Search and Share</div>

                        </div>
                        <div className="carousel-content">

                                <div className="caro-pic-holder-landing">
                                    <img src={showCarousel1 ? (prepperCalendar) : (

                                        showCarousel2 ? (prepperRecipe) : (

                                            showCarousel3 ? (prepperSearch) : (

                                                previewPlaceholder //ERROR
                                            )
                                        )

                                    )} className="picture-caro-landing" />
                                </div>

                                <div className="carousel-descr alata-regular ">
                                    <div className="carousel-header">
                                    {showCarousel1 ? ("Plan your day out") : (
                                            showCarousel2 ? ("Prep & Share") : (
                                                showCarousel3 ? ("Discover a new dish") : ("None")
                                            )
                                        )}
                                    </div>
                                    <div className="carousel-text">

                                        {showCarousel1 ? (carouselText1) : (
                                            showCarousel2 ? (carouselText2) : (
                                                showCarousel3 ? (carouselText3) : ("None")
                                            )
                                        )}
                                    
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                   

                    <div className="interest alata-regular">

                        <div className="header1 ">Interested in what we offer?</div>
                        <div className="join-button secondary" onClick={handleSignup}>Join Here!</div>
                        <div className="header2">Already a member?</div>
                        <div className="join-button tertiary" onClick={handleLogin}>Sign In</div>

                    </div>

                    <div className="footer">
                        <img src={logodark} className="footer-logo footer-content"/>
                        <div className="contacts white playfair-display footer-contact">
                            <div className="contact-header"> Contact Us</div>
                            <div className="contact-header">+1-437-542-1660</div>
                        </div>
                        <div className= "contact-icons footer-content">
                                <a href= "mailto:prepper.planner@gmail.com" className="icon white">
                                <MdEmail/>
                                </a>
                                <a href="https://github.com/adriannejulie/Prepper-Food-Planner" className="icon white" target="blank" rel="noopener noreferrer">
                                    <FaGithubAlt />
                                </a>
                                
                        </div>
                        <div className="info-pages white playfair-display footer-content">
                            <div style={{ cursor: 'pointer' }} className="contact-header" onClick={handleAboutUs}>About Us</div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            </div>
        </div>
    );
    
    
}

export default DefaultPage;
