import React, { useEffect,useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./Login.css";
import logoLight from "../images/prepper_logo.png";
import logoPlaceholderImage from "../images/logo-placeholder-image.png";
import SignUp from "./SignUp";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ onLogin, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const showUserInformation = async (tokenObject) => {
        const token = tokenObject.credential;
        const decodedToken = jwtDecode(token);

        const name = decodedToken.name.split(" ")
        const email = decodedToken.email


        console.log(email)
        console.log(name)

        try {

            const response = await axios.post('http://localhost:8080/addUser', {

            
                email: email,
                firstName: name[0],
                lastName: name[1],
                password: null,
                google: true,

            
            });

            //email already exists
            if ( response.status === 200){

                //sign up
                const user = {
                    userID: response.data.userID,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    picture: decodedToken.picture
                };
    
                console.log(user)
                setUser(user);
                navigate("/meal-planner");
                closeLogin();
            }  else {
                toast.error("Unknown error")
            }


            
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Account already exists with Prepper. Please login locally.");
            } else {
                toast.error("Error decoding JWT: " + error.message);
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const standardLogin = async () => {
        try{
            const response = await axios.get('http://localhost:8080/login', {
            params: {
                email: email,
                password: password,
                isGoogle: false
            }
            });

            
            if (response.status === 200){

                console.log(response.data.firstName)
                console.log(response.data.lastName)
                const user = {
                    userID: response.data.userID,
                    name: response.data.firstName.concat(" ", response.data.lastName),
                    email: email,
                    picture: null,
                }

                    console.log(user)
                    setUser(user)
                    navigate("/meal-planner")
                    closeLogin()
            }
        } catch (error){
            if (error.response && error.response.status === 409){

                toast.error("Account created with google. Please login with google instead")
                
            } else if (error.response && error.response.status === 401){
                toast.error("Invalid Password. Please try again")
                
            } else if (error.response && error.response.status === 404){

                toast.error("Email not associated with Prepper. Please sign in with Google or create and account with us!")
            } else {
                console.log(error)
                toast.error("Unknown Error")
            }
        };
    };

    const closeLogin = () => {
        setShowLogin(false);
        onClose();

    };

    return (
        <>
            <ToastContainer position="top-center" />
            {showLogin && (
                <div className="login-container">
                    <div className="exit">
                        <button onClick={closeLogin}>X</button>
                    </div>
                    <img
                        className="placeholder-image"
                        src={logoLight}
                        alt="Placeholder"
                    />
                    <div className="login-google">
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin onSuccess={showUserInformation} />
                        </GoogleOAuthProvider>
                    </div>
                    <hr className="divider" />
                    <div className="login-section">
                        <label htmlFor="emailInput">Email</label>
                        <input
                            id="emailInput"
                            onChange={handleEmailChange}
                            type="email"
                        />
                    </div>
                    <div className="login-section">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            onChange={handlePasswordChange}
                            type="password"
                        />
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
