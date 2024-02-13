import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import Login from "../components/Login";
import "./Home.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        setShowLoginPopup(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setAnchorEl(null);
        navigate("/");
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleLoginPopup = () => {
        setShowLoginPopup(!showLoginPopup);
    };

    return (
        <div className="container">
            <div className="content">
                <img src={logoPlaceholderImage} alt="Logo" className="logo" />
                <div className="header">
                    <div>
                        Meal Planner
                        {isLoggedIn ? (
                            <Link to="/meal-planner" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
                        )}
                    </div>
                    <div>
                        My Recipes
                        {isLoggedIn ? (
                            <Link to="/my-recipes" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
                        )}
                    </div>
                    <div>
                        Find Recipes
                        {isLoggedIn ? (
                            <Link to="/find-recipes" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
                        )}
                    </div>
                    <div className="account">
                        {isLoggedIn ? (
                            <>
                                <Avatar className="avatar" alt="Profile Picture" src={user.picture} />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                                <p>{user.name}</p>
                                <ArrowDropDownIcon className="dropdown-icon" onClick={handleMenuOpen} />

                            </>
                        ) : (
                            <>
                                <p>Account</p>
                                <Login onLogin={handleLogin} />
                                <ArrowDropDownIcon className="dropdown-icon" />

                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
