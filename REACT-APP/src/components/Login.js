import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const showUserInformation = (tokenObject) => {
        const token = tokenObject.credential;

        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            const user = {
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture
            };

            onLogin(user);
        } catch (error) {
            console.error("Error decoding JWT:", error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const standardLogin = () =>{
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
    }

    const signUp = () =>{
        navigate('/signup');
    }

    return (
        <div className="login-container">
            <img
                className="placeholder-image"
                src={logoPlaceholderImage}
                alt="Placeholder"
            />
            <div className="login-google">
                <GoogleOAuthProvider clientId="771652846868-uppchj2m6nn6dnaqu0i5g3ehv26l4cuc.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={showUserInformation} />
                </GoogleOAuthProvider>
            </div>
            <hr className="divider" />

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
                <label>
                    <input
                        type="checkbox"
                    />
                    Remember Me
                    <a href="#">Forgot Password?</a>
                </label>
            </div>
            <div className="login-buttons">
                <button onClick={standardLogin}>Login</button>
                <button onClick={signUp}>Signup</button>
            </div>
        </div>
    );
}

export default Login;
