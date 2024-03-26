import React, { useState } from "react";
import "./SignUp.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import logoLight from "../images/prepper_logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUser  } from "./UserContext";
import axios from "axios";


function SignUp({ onSignUp, onClose }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(true);

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleFNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReEntPassChange = (e) => {
        setConfirmedPassword(e.target.value);
    };

    const signUp = async () => {
        if (!firstName || !lastName || !email || !password || !confirmedPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmedPassword) {
            toast.error("Passwords must match");
            return;
        }

        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/addUser', {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                isGoogle: false
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.status === 200) {
                const data = response.data;
                const user = {
                    userID: data.userID,
                    name: `${firstName} ${lastName}`,
                    email: email,
                    picture: null,
                };
        
                console.log(user)
                setUser(user);
                navigate("/meal-planner");
                closeSignUp();
            } else {

                toast.error("Unknown error")
                
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 409) {
                toast.error("Email already in use.");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    const closeSignUp = () => {
        setShowSignUp(false);
        onClose();

    };

    return (
        <>
            <ToastContainer position="top-center" />

            {showSignUp && (
                <div className="signup-container">
                    <div className="exit">
                        <button onClick={closeSignUp}>X</button>
                    </div>
                    <img className="placeholder-image" src={logoLight} alt="Placeholder" />

                    <hr className="divider" />

                    <div className="login-section">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" onChange={handleFNameChange} type="text" />
                    </div>
                    <div className="login-section">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" onChange={handleLNameChange} type="text" />
                    </div>
                    <div className="login-section">
                        <label htmlFor="email">Email</label>
                        <input id="email" onChange={handleEmailChange} type="email" />
                    </div>
                    <div className="login-section">
                        <label htmlFor="password">Password</label>
                        <input id="password" onChange={handlePasswordChange} type="password" />
                    </div>
                    <div className="login-section">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" onChange={handleReEntPassChange} type="password" />
                    </div>
                    <div className="login-buttons">
                        <button onClick={signUp}>Signup</button>
                    </div>
                </div>)}
            {showSignUp && <div className="overlay"></div>}
        </>
    );
}
export default SignUp;
