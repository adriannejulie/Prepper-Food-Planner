import logoPlaceholderImage from "../images/prepper_logo.png";
import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Home.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useUser } from "../components/UserContext";

function Home() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useUser(); // Destructure setUser from useUser()
    const navigate = useNavigate();
    const location = useLocation();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/")
        handleMenuClose();
    }

    const handleAccount = () => {
        navigate("/account-info")
        handleMenuClose();
    }

    return (
    <div className="content">
        <img src={logoPlaceholderImage} alt="Logo" className="logo" />
        <div className="header">
            <div className={`${location.pathname === "/meal-planner" ? "active-link" : ""}`}>
                Meal Planner
                {user ? (
                    <Link to="/meal-planner" className="link ">
                        {location.pathname === "/meal-planner" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </Link>
                ) : (
                    <span className="link ">
                        {location.pathname === "/meal-planner" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </span>
                )}
            </div>
            <div className={`${location.pathname === "/my-recipes" ? "active-link" : ""}`}>
                My Recipes
                {user ? (
                    <Link to="/my-recipes" className="link ">
                        {location.pathname === "/my-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </Link>
                ) : (
                    <span className="link ">
                        {location.pathname === "/my-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </span>
                )}
            </div>
            <div className={`${location.pathname === "/find-recipes" ? "active-link" : ""}`}>
                Find Recipes
                {user ? (
                    <Link to="/find-recipes" className="link ">
                        {location.pathname === "/find-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </Link>
                ) : (
                    <span className="link ">
                        {location.pathname === "/find-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                    </span>
                )}
            </div>
                    <div className="account">
                        {user ? (
                            <>
                                <Avatar className="avatar" alt="Profile Picture" src={user.picture} />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleAccount}>Account</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                                <p>{user.name}</p>
                                <ArrowDropDownIcon className="dropdown-icon" onClick={handleMenuOpen} />

                            </>
                        ) : (
                            <>
                                <p>Account</p>
                                <ArrowDropDownIcon className="dropdown-icon" />

                            </>
                        )}
                    </div>

                </div>
            </div>

    );
}

export default Home;
