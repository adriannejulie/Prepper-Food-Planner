import React, { useState } from "react";
import "./SignUp.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";


function SignUp({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFNameChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleLNameChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReEntPassChange = (e) => {
        setEmail(e.target.value);
    };

    const signUp = () => {
        /*fetch(url, {
            method: 'POST',
            body: {
                email: email,
                password: password
            }
        }).then(response => {
            if (response.status === 200){}
            else{
                window.alert("Incorrect email or password entered");
            }
        });*/

        // Call onClose function to close the signup component
    };

    const navLogin = () => {
        onClose(); // Close the sign-up component
    };

    return (
        <div className="signup-container">
            <img
                className="placeholder-image"
                src={logoPlaceholderImage}
                alt="Placeholder"
            />
            <div className="login-google">
                <GoogleOAuthProvider clientId="771652846868-uppchj2m6nn6dnaqu0i5g3ehv26l4cuc.apps.googleusercontent.com">
                    <GoogleLogin />
                </GoogleOAuthProvider>
            </div>
            <hr className="divider" />

            <div className="login-section">
                <p>First Name</p>
                <input
                    onChange={handleFNameChange}
                    type="text"
                />
            </div>    
            <div className="login-section">
                <p>Last Name</p>
                <input
                    onChange={handleLNameChange}
                    type="text"
                />
            </div>
            <div className="login-section">
                <p>Email</p>
                <input
                    onChange={handleEmailChange}
                    type="email"
                />
            </div>
            <div className="login-section">
                <p>Password</p>
                <input
                    onChange={handlePasswordChange}
                    type="password"
                />
            </div>
            <div className="login-section">
                <p>Confirm Password</p>
                <input
                    onChange={handleReEntPassChange}
                    type="password"
                />
            </div>
            <div className="login-buttons">
                <button onClick={signUp}>Signup</button>
                <button onClick={navLogin}>Return to login screen</button>
            </div>
        </div>
    );
}

export default SignUp;
