import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import SignUp from "./SignUp";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "./UserContext";

function Login({ onLogin,onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log(clientId)

    const showUserInformation = (tokenObject) => {
        const token = tokenObject.credential;

        try {
            const decodedToken = jwtDecode(token);
            const user = {
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture
            };

            setUser(user);
            navigate("/meal-planner");
            closeLogin();
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

    const standardLogin = () => {
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
    };

    const closeLogin = () => {
        setShowLogin(false); 
        onClose();

    };

    return (
        <>
            {showLogin && (
                <div className="login-container">
                    <div className="exit">
                        <button onClick={closeLogin}>X</button>
                    </div>
                    <img
                        className="placeholder-image"
                        src={logoPlaceholderImage}
                        alt="Placeholder"
                    />
                    <div className="login-google">
                        <GoogleOAuthProvider clientId={clientId}>
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
                    </div>
                </div>
            )}
            {showLogin && <div className="overlay"></div>}
        </>
    );
}

export default Login;
