import React, { useState, useEffect } from "react";
import { MdCreate, MdSave } from "react-icons/md";

import logoPlaceholderImage from "../images/logo-placeholder-image.png";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./AccountInfo.css"
import { useStepContext } from "@mui/material";
import { useUser } from "../components/UserContext";
import axios from 'axios';

//No placeholder args. Can be changed later
function AccountInfo({}){

    const { user, setUser } = useUser();
    const name = user.name.split(" ")
    const navigate = useNavigate();
    
    //Placeholder values
    const [id, setID] = useState(Number(user.userID))
    const [firstName, setFirstName] = useState(name[0])
    const [lastName, setLastName] = useState(name[1])
    const [email, setEmail] = useState(user.email)



    const handleLogout = () => {

        setUser(null)
        navigate("/")
    }

    const handleDelete = async () => {


        try {
            const response = await axios.delete(`http://localhost:8080/users/${user.email}`);
            console.log(response.data);
            setUser(null)
            navigate("/")
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error, update UI accordingly
        }





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
                    
                            


                        </div>
                        <div className= "info-section">
  
                            <div className="text">

                                {email}

                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="name-section">
                        <div className="inner-section">
                            <div className="inner-header">
                                <div className="header-text">
                                    First Name
                                </div>


                            </div>
                            <div className= "info-section">
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

                            </div>
                            <div className= "info-section">
                                <div className="text">

                                    {lastName}

                                </div>
                                
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






