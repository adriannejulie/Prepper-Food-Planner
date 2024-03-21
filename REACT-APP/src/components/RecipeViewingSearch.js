import React, { useEffect, useState } from "react";
import "./RecipeViewingSearch.css";
import { MdAccountBox, MdHourglassTop} from "react-icons/md";
import { IoMdArrowRoundBack, IoMdSave  } from "react-icons/io";
import { FaBicycle } from "react-icons/fa";
import TextWithLineBreaks from '../components/TextWithLineBreaks';


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
        <div className="recipe-viewing-grid alata">
            <div className="recipe-title-container">
                <h1 className="align-icons-title">
                    {aRecipe?.title}
                    <div className="title-icons">
                        <button className="back-button" onClick={onBack}><IoMdArrowRoundBack className="icon-style-header"/></button>
                        <button className="save-button" onClick={onSave}><IoMdSave className="icon-style-header"/></button>
                    </div>
                </h1>
                <div className="icon-header">
                    <div className="align-icon-format"><MdAccountBox className="background-for-icon"/> Author: {aRecipe?.author}</div>
                    <div className="cooktime-calories-container">
                        <div className="align-icon-format"><MdHourglassTop className="background-for-icon"/>{aRecipe?.prepTime} Minutes</div>
                        <div className="align-icon-format"><FaBicycle className="background-for-icon"/>{aRecipe?.calories} Calories</div>
                    </div>
                </div>
            </div>
            <img className="the-recipe-image" src={aRecipe?.image}></img>
            <div className="container-for-instructions">
                <div className="instruction-text">
                    <TextWithLineBreaks className="instruction-text" text= {aRecipe?.instructions} />
                </div>
            </div>
            <div className="recipe-ingredients-container" >
                <div className="ingredients-container-title">Ingredients</div>
                <div className="recipes-ingredients">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
    );
}

export default RecipeViewingSearch;