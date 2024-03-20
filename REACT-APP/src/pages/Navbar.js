import logoPlaceholderImage from "../images/prepper_logo.png";
import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useUser } from "../components/UserContext";

function Navbar() {
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
        localStorage.removeItem('user'); 
        navigate("/");
        handleMenuClose();
    };
    

    const handleAccount = () => {
        navigate("/account-info")
        handleMenuClose();
    }

    return (
        <div className="content">
            <img src={logoPlaceholderImage} alt="Logo" className="logo" />
            <div className="header">
                <div className={`${location.pathname === "/meal-planner" ? "active-link" : ""}`}>
                    {user ? (
                        <Link to="/meal-planner" className="link ">
                            Meal Planner {location.pathname === "/meal-planner" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                        </Link>
                    ) : (
                        <span className="link ">
                            Meal Planner {location.pathname === "/meal-planner" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                        </span>
                    )}
                </div>
                <div className={`${location.pathname === "/my-recipes" ? "active-link" : ""}`}>
                    {user ? (
                        <Link to="/my-recipes" className="link ">
                            My Recipes {location.pathname === "/my-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                        </Link>
                    ) : (
                        <span className="link ">
                            My Recipes {location.pathname === "/my-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                        </span>
                    )}
                </div>
                <div className={`${location.pathname === "/find-recipes" ? "active-link" : ""}`}>
                    {user ? (
                        <Link to="/find-recipes" className="link ">
                            Find Recipes {location.pathname === "/find-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
                        </Link>
                    ) : (
                        <span className="link ">
                            Find Recipes {location.pathname === "/find-recipes" ? <ArrowDropDownIcon className="dropdown-icon" /> : <ArrowRightIcon className="dropdown-icon" />}
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
                            <p className="dropdown-trigger" onClick={handleMenuOpen}>{user.name}</p>
                        </>
                    ) : (
                        <>
                            <p>Account</p>
                        </>
                    )}
                </div>

            </div>
        </div>

    );
}

export default Navbar;
