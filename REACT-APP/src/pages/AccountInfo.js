import React, { useState, useEffect } from "react";
import { MdCreate, MdSave } from "react-icons/md";

import logoPlaceholderImage from "../images/logo-placeholder-image.png";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./AccountInfo.css"
import { useStepContext } from "@mui/material";
import { useUser } from "../components/UserContext";

//No placeholder args. Can be changed later
function AccountInfo({}){

    const { user, setUser } = useUser();
    const name = user.name.split(" ")
    const navigate = useNavigate();
    
    //Placeholder values
    const [id, setID] = useState(user.userID)
    const [firstName, setFirstName] = useState(name[0])
    const [lastName, setLastName] = useState(name[1])
    const [email, setEmail] = useState(user.email)

    const [changeFirstName, setChangeFirstName] = useState(false)
    const [changeLastName, setChangeLastName] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)


    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const onChangeEmail = (email) => {

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailError(!emailPattern.test(email))
        setEmail(email)

        //Change email here!


    }

    const onChangeFirstName = (name) => {

        //Nothing to check for yet
        setFirstNameError(false)
        setFirstName(name)
    }

    const onChangeLastName = (name) => {
        setLastNameError(false)
        setLastName(name)
    }



    const handleLogout = () => {

        setUser(null)
        navigate("/")
    }

    const handleDelete = () => {
        //Nothing to do delete from yet
        setUser(null)
        navigate("/")

    }


    return(

        <div className="main-cont">
            <div className="account-frame">

                <div className="name">
                    Hello {firstName} {lastName}!
                </div>
                <div className="inner-container">
                    <div className="inner-section">
                        <div className="inner-header">
                            <div className="header-text">
                                Account ID
                            </div>

                        </div>
                        <div className="info-section">
                            <div className="text">

                                {id}

                            </div>
                        </div>
                        
                    </div>
                    <div className="inner-section">
                        <div className="inner-header">
                            <div className="header-text">
                                Email
                            </div>
                            

                            { !changeEmail ?
                            (<div className="icon elem-button" onClick={(e) => setChangeEmail(!changeEmail)}><MdCreate /></div>)
                            :
                            ( !emailError ? (<div className="icon elem-button" onClick={(e) => setChangeEmail(!changeEmail)}><MdSave /></div>) 
                            : <div className="icon error-icon"><MdSave /></div>
                            
                            )
                            }
                            


                        </div>
                        <div className={!emailError ? (changeEmail ? "info-section text-input-select" : "info-section") : ("info-section text-input-error")}>
                            { changeEmail ?
                            (<input
                                className= "text-input"
                                value={email}
                                onChange={(e) => onChangeEmail(e.target.value)}
                            
                            
                            />)
                            :
                            (<div className="text">

                                {email}

                            </div>)
                            } 
                        </div>
                        
                    </div>
                    
                    <div className="name-section">
                        <div className="inner-section">
                            <div className="inner-header">
                                <div className="header-text">
                                    First Name
                                </div>

                                { !changeFirstName ?
                                (<div className="icon elem-button" onClick={(e) => setChangeFirstName(!changeFirstName)}><MdCreate /></div>)
                                :
                                ( !firstNameError ? (<div className="icon elem-button" onClick={(e) => setChangeFirstName(!changeFirstName)}><MdSave /></div>) 
                                : <div className="icon error-icon"><MdSave /></div>
                                
                                )
                                }

                            </div>
                            <div className={!firstNameError ? (changeFirstName ? "info-section text-input-select" : "info-section") : ("info-section text-input-error")}>
                                { changeFirstName ?
                                (<input
                                    className= "text-input"
                                    value={firstName}
                                    onChange={(e) => onChangeFirstName(e.target.value)}
                                
                                
                                />)
                                :
                                (<div className="text">

                                    {firstName}

                                </div>)
                                } 
                            </div>
                        </div>
                        <div className="inner-section">

                            <div className="inner-header">
                                <div className="header-text">
                                    Last Name
                                </div>
                                { !changeLastName ?
                                (<div className="icon elem-button" onClick={(e) => setChangeLastName(!changeLastName)}><MdCreate /></div>)
                                :
                                ( !lastNameError ? (<div className="icon elem-button" onClick={(e) => setChangeLastName(!changeLastName)}><MdSave /></div>) 
                                : <div className="icon error-icon"><MdSave /></div>
                                
                                )
                                }

                            </div>
                            <div className={!lastNameError ? (changeLastName ? "info-section text-input-select" : "info-section") : ("info-section text-input-error")}>
                                { changeLastName ?
                                (<input
                                    className= "text-input"
                                    value={lastName}
                                    onChange={(e) => onChangeLastName(e.target.value)}
                                
                                
                                />)
                                :
                                (<div className="text">

                                    {lastName}

                                </div>)
                                } 
                            </div>
                        </div>
                        
                    </div>


                    <div className="logoutDel">
                        <div className="logout-button elem-button" onClick={handleLogout}>Logout</div>
                        <div className="delete-button elem-button" onClick={handleDelete}>Delete Account</div>
                    </div>
                </div>



            </div>
        </div>


    )

}


export default AccountInfo;






