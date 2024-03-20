import React, { useEffect, useState } from "react";
import "./RecipeViewingSearch.css";
import { MdAccountBox, MdHourglassTop} from "react-icons/md";
import { IoMdArrowRoundBack, IoMdSave  } from "react-icons/io";
import { FaBicycle } from "react-icons/fa";

function RecipeViewingSearch({ aRecipe, onBack, onSave}) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);

    useEffect(() => {
        const recipeIngredients = aRecipe.ingredients.split(",");
        const recipeMeasurements = aRecipe.measurements.split(",");
        setAmounts(recipeMeasurements)
        setIngredients(recipeIngredients)
    }, [aRecipe])

    
    return (
        <div className="recipe-grid">
            <div className="title-container">
                <h1 className="align-icons-title">
                    {aRecipe?.title}
                    <button className="back-button" onClick={onBack}><IoMdArrowRoundBack className="header-icon-style"/></button>
                    <button className="save-button" onClick={onSave}><IoMdSave className="header-icon-style"/></button>
                </h1>
                <div className="align-icons-text"><MdAccountBox className="icon-background"/> Author: {aRecipe?.author}</div>
                <div className="cooktime-calories-container">
                    <div className="align-icons-text"><MdHourglassTop className="icon-background"/>{aRecipe?.duration} Minutes</div>
                    <div className="align-icons-text"><FaBicycle className="icon-background"/>{aRecipe?.calories} Calories</div>
                </div>
            </div>
            <img className="recipe-image" src={aRecipe?.image}></img>
            <div className="recipe-instructions-container">{aRecipe?.steps}</div>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients</div>
                <div className="ingredients-list">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
    );
}

export default RecipeViewingSearch;