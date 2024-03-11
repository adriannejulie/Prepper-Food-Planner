import React, { useState, useEffect } from "react";
import logoPlaceholderImage from "../images/prepper_logo.png";
import previewPlaceholder from "../images/placeholder-preview.png";
import clip1 from "../images/clip1.png";
import clip2 from "../images/clip2.png";
import clip3 from "../images/clip3.png";
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import "./DefaultPage.css";

function DefaultPage({ }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

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

    
    useEffect(() => {
    }, [showLogin]);


    return (
        <div className="container">
            <div className="content">
                <img src={logoPlaceholderImage} alt="Logo" className="logo" />
                <div className="default-header">
                    <div>
                        <Link onClick={handleLogin} className="link">
                            Log In
                            <ArrowDropDownIcon className="dropdown-icon" />
                        </Link>
                        {showLogin && <Login onClose={handleLoginClose} />}
                    </div>
                    <div>
                        <Link onClick={handleSignup} className="link">
                            Sign Up
                            <ArrowDropDownIcon className="dropdown-icon" />
                        </Link>
                        {showSignUp && <SignUp onClose={handleSignUpClose} />}
                    </div>
                </div>
            </div>
                <div className="wrapper">
                <div className="min-h">
                <div className="default-container">
                    <div className="welcome-container">
                        
                        <div className="slanted-background">
                            Plan with Prepper!
                        </div>
                    </div>

                    <div className="offwhite ideas">
                        <div className="idea">

                            <div className="image-holder">
                                <img src={previewPlaceholder} className="preview-image"/>
                            </div>
                            <div className="text-holder">
                                <img src={clip1} className="clip-image"/>
                            </div>
                        </div>

                        <div className="idea">
                            <div className="text-holder">
                                <img src={clip2} className="clip-image"/>
                            </div>
                            <div className="image-holder">
                                    <img src={previewPlaceholder} className="preview-image"/>
                            </div>
                            
                        </div>

                        <div className="idea">
                            <div className="image-holder">
                                    <img src={previewPlaceholder} className="preview-image"/>
                            </div>
                            <div className="text-holder">
                                <img src={clip3} className="clip-image"/>
                                
                            </div>
                        </div>

                        <div className="interest">

                            <div className="header1">Interested in what we offer?</div>
                            <div className="button secondary" onClick={handleSignup}>Join Here!</div>
                            <div className="header2">Already a member?</div>
                            <div className="button tertiary" onClick={handleLogin}>Sign In</div>

                        </div>
                    </div>

                </div>
                </div>
                </div>
        </div>
    );
    
    
}

export default DefaultPage;
