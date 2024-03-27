import React, { useEffect, useState } from "react";
import "./RecipeViewing.css";
import { MdAccountBox, MdHourglassTop, MdModeEdit } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

function RecipeViewing({ aRecipe, swapToEditing, editAbility }) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);

    useEffect(() => {
        console.log(aRecipe);
        const recipeIngredients = aRecipe.ingredients.split(",");
        const recipeMeasurements = aRecipe.measurements.split(",");
        setAmounts(recipeMeasurements)
        setIngredients(recipeIngredients)
    }, [aRecipe])

    
    return (
        <div className="recipe-grid">
            <div className="recipe-view-header">
                <h1 className="align-icons-text">{aRecipe?.title} <button className={(editAbility) ? "recipe-header-button" : "hide-button"} onClick={() => swapToEditing(aRecipe)}><MdModeEdit className="header-icon-style"/></button></h1>
                <div className="align-icons-text"><MdAccountBox /> Author: {aRecipe?.author}</div>
                <div className="cooktime-calories-container">
                    <div className="align-icons-text"><MdHourglassTop className="icon-background"/>{aRecipe?.prepTime} Minutes</div>
                    <div className="align-icons-text"><FaBicycle className="icon-background"/>{aRecipe?.calories} Calories</div>
                </div>
            </div>
            <img className="recipe-image" src={aRecipe?.image} alt="Recipe"></img>
            <div className="recipe-instructions-container" dangerouslySetInnerHTML={{ __html: aRecipe?.instructions.replace(/\n/g, '<br>')}}></div>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients</div>
                <div className="ingredients-list">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
    );
}

export default RecipeViewing;