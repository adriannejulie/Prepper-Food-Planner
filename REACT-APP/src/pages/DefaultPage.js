import React, { useState, useEffect } from "react";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
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
            <div className="default-container"></div>
        </div>
    );
    
    
}

export default DefaultPage;
