import React, { useState } from "react";
import "./SignUp.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import logoLight from "../images/prepper_logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUser  } from "./UserContext";

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

    const signUp = () => {
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

        fetch('http://localhost:8080/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify({ // Stringify the JavaScript object
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                isGoogle: false
            })
        }).then(response => {
            if (response.status === 200) {
                const user = {
                    name: firstName.concat(" ", lastName),
                    email: email,
                    picture: null,

                }
                setUser(user)
                navigate("/meal-planner")
                closeSignUp()

            } else {
                if (response.status === 400){
                    window.alert("Email already in use.");
                } else {
                    window.alert("Something went wrong ");
                }
            }
        });

        closeSignUp();
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
