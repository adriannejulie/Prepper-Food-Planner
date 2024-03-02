import logoPlaceholderImage from "../images/prepper_logo.png";
import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useUser } from "../components/UserContext";

function Home() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useUser(); // Destructure setUser from useUser()
    const navigate = useNavigate();
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
        <div className="container">
            <div className="content">
                <img src={logoPlaceholderImage} alt="Logo" className="logo" />
                <div className="header">
                    <div>
                        Meal Planner
                        {user ? (
                            <Link to="/meal-planner" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
                        )}
                    </div>
                    <div>
                        My Recipes
                        {user ? (
                            <Link to="/my-recipes" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
                        )}
                    </div>
                    <div>
                        Find Recipes
                        {user ? (
                            <Link to="/find-recipes" className="link"><ArrowDropDownIcon className="dropdown-icon" /></Link>
                        ) : (
                            <span className="link"> <ArrowDropDownIcon className="dropdown-icon" /></span>
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
        </div>
    );
}

export default Home;
