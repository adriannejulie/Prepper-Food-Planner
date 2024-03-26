import React, { useEffect, useState } from "react";
import "./RecipeViewingSearch.css";
import { MdAccountBox, MdHourglassTop} from "react-icons/md";
import { IoMdArrowRoundBack, IoMdSave  } from "react-icons/io";
import { FaBicycle } from "react-icons/fa";
import TextWithLineBreaks from '../components/TextWithLineBreaks';
import { useUser } from "../components/UserContext";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RecipeViewingSearch({ aRecipe, onBack, onSave}) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);
    const { user, setUser } = useUser();

    useEffect(() => {
        console.log(aRecipe)
        const recipeIngredients = aRecipe.ingredients.split(",");
        const recipeMeasurements = aRecipe.measurements.split(",");
        setAmounts(recipeMeasurements)
        setIngredients(recipeIngredients)
    }, [aRecipe])

    const handleSaveRecipe = () => {
        console.log(aRecipe.recipeID)
        console.log(user.id)
        axios
        .post(`http://localhost:8080/addSavedRecipe`, {
            recipeID: aRecipe.recipeID,
            userID: user.userID,
        })

        .then((res) => {
            console.log(res.data);
            console.log(res.status);
            if (res.status === 200) {
            toast.success("Recipe saved successfully");
            }
        })
        .catch((err) => {
            toast.success("Recipe already saved");
            console.log(err);
        });
    };
    
    return (
        <> <ToastContainer position="top-center" autoClose={2000}/>
        <div className="the-recipe-grid alata">
            <div>
                <h1 className="align-icons-title">
                    {aRecipe?.title}
                    <div className="title-icons">
                        <button className="back-save-button" onClick={onBack}><IoMdArrowRoundBack className="header-button-icons"/></button>
                        <button className="back-save-button" onClick={handleSaveRecipe}><IoMdSave className="header-button-icons"/></button>
                    </div>
                </h1>
                    <div className="align-icon-format icon-spacing">
                        <MdAccountBox /> 
                        <div>
                            Author: {aRecipe?.author}
                        </div>
                    </div>
                    <div className="cooktime-calories-row">
                        <div className="icon-spacing-cal">
                            <div className="align-icon-format icon-spacing-cal"><MdHourglassTop className="icon-background"/>
                                <div>  {aRecipe?.prepTime} Minutes </div>
                            </div>
                        </div>
                        <div className="icon-spacing-cal">
                            <div className="align-icon-format icon-spacing-cal"><FaBicycle className="icon-background"/>
                                <div>{aRecipe?.calories} Calories</div>
                            </div>
                        </div>
                    </div>
            </div>
            <img className="the-recipe-image" src={aRecipe?.image} alt="Recipe"></img>
            <div className="container-for-instructions">
            <div className="instruction-text" dangerouslySetInnerHTML={{ __html: aRecipe?.instructions.replace(/\n/g, '<br>')}}/></div>
            <div className="recipe-ingredients-container" >
                <div className="ingredients-container-title">Ingredients</div>
                <div className="recipes-ingredients">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div></>
    );
}

export default RecipeViewingSearch;

//<div className="instruction-text">
                    
   //                 <TextWithLineBreaks className="instruction-text" text= {aRecipe?.instructions} />
     //           </div>