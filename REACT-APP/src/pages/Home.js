// Home.js

import React, { useState } from "react";
import Login from "../components/Login";
import { Avatar, Menu, MenuItem } from '@mui/material';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="container">
            <div className="content">
                {!isLoggedIn && <Login onLogin={handleLogin} />}
                {isLoggedIn && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px' }}>
                        <Avatar alt="Profile Picture" src={user.picture} onClick={handleMenuOpen} />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
