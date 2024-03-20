import React from 'react';
import logo from "../images/prepper_logo.png";
import './NotFoundPage.css';


function NotFoundPage() {
    return (
        <div class="main-container">
            <p>Oops! Page not found.</p>
            <img src={logo} alt="Logo" className="logo" />
        </div>
    );
}

export default NotFoundPage;
