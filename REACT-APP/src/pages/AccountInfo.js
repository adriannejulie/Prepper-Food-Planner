import React, { useState, useEffect } from "react";
import { MdCreate } from "react-icons/md";

import logoPlaceholderImage from "../images/logo-placeholder-image.png";

import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./AccountInfo.css"
import { useStepContext } from "@mui/material";

//No placeholder args. Can be changed later
function AccountInfo({}){

    

    const [id, setID] = useState("6969696969")
    const [firstName, setFirstName] = useState("Julia")
    const [lastName, setLastName] = useState("Lat")
    const [email, setEmail] = useState("aJ@gmail.com")

    const [changeFirstName, setChangeFirstName] = useState(false)
    const [changeLastName, setChangeLastName] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)


    const [emailError, setEmailError] = useState(false)

    const onChangeEmail = (email) => {

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailError(!emailPattern.test(email))
        setEmail(email)


    }

    useEffect(() => {
        if (emailError) {
          alert("Bad email");
        }
      }, [emailError]);

  



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
                            <div className="icon" onClick={(e) => setChangeEmail(!changeEmail)}><MdCreate /></div>
                            


                        </div>
                        <div className={!emailError ? ("info-section") : ("text-input-error")}>
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
                                <div className="icon"><MdCreate /></div>

                            </div>
                            <div className="info-section">
                                <div className="text">
                                    {firstName}
                                </div>
                            </div>
                        </div>
                        <div className="inner-section">

                            <div className="inner-header">
                                <div className="header-text">
                                    Last Name
                                </div>
                                <div className="icon"><MdCreate /></div>

                            </div>
                            <div className="info-section">
                                <div className="text">
                                    {lastName}

                                </div>
                            </div>
                        </div>
                        
                    </div>


                    <div className="logoutDel">
                        <div className="logout-button">Logout</div>
                        <div className="delete-button">Delete Account</div>
                    </div>
                </div>



            </div>
        </div>


    )

}


export default AccountInfo;






