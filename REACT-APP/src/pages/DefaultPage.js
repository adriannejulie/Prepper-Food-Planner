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

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        setShowLoginPopup(false);
    };
    const handleSignup = () => {
        if (!showSignUp) {
            setShowSignUp(true);
        }
    };
    const handleSignUpClose = () => {
        setShowSignUp(false);
    };
    const handleLogin2 = () => {
        setShowLogin(prevState => !prevState);
    };
    useEffect(() => {
    }, [showLogin]);


    return (
        <div className="container">
            <div className="content">
                <img src={logoPlaceholderImage} alt="Logo" className="logo" />
                <div className="default-header">
                    <div onClick={handleLogin2} style={{ cursor: "pointer" }} >
                        Log In
                        <Link className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        {showLogin && <Login onLogin={handleLogin} />
                        }
                    </div>
                    <div onClick={handleSignup} style={{ cursor: "pointer" }}>
                        Sign Up
                        <Link className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        {showSignUp && <SignUp onClose={handleSignUpClose} />}
                    </div>
                </div>
            </div>
            <div className="default-container"></div>
        </div>
    );
}

export default DefaultPage;
