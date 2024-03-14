import React, { useEffect, useState } from "react";
import "./AddIngredient.css";
import { MdOutlineClose, MdSave } from "react-icons/md";
import EditIngredient from "./EditIngredient.js";

function AddIngredient({ hidePopup, ingredients, amounts, saveIngredients}) {
    const [recipesMeasurements, setRecipesMeasurements] = useState(amounts);
    const [recipesIngredients, setRecipesIngredients] = useState(ingredients);
    
    const addNewIngredient = () => {
        setRecipesMeasurements([...recipesMeasurements, ""]);
        setRecipesIngredients([...recipesIngredients, ""]);
    }


    const handleChangedIngredient = (changedIngredient, i) => {
        var newIngredients = recipesIngredients;
        newIngredients[i] = changedIngredient;
        setRecipesIngredients(newIngredients);
    }


    const handleChangedMeasurement = (changedMeasurement, i) => {
        var newMeasurements = recipesMeasurements;
        newMeasurements[i] = changedMeasurement;
        setRecipesMeasurements(newMeasurements);
    }


    return (
        <div className="add-ingredient-popup">
            <div className="ingredient-container">
                <div className="buttons-container">
                    <div className="hide-buttons">
                        <button className="icon-buttons"><MdSave className="icon-style"/></button>
                        <button className="icon-buttons" onClick={hidePopup}><MdOutlineClose className="icon-style"/></button>
                    </div>
                    <button className="add-ingredient-button" onClick={addNewIngredient}>Add an Ingredient</button>
                    <div>
                        <button className="icon-buttons" onClick={() => saveIngredients(recipesMeasurements, recipesIngredients)}><MdSave className="icon-style"/></button>
                        <button className="icon-buttons" onClick={hidePopup}><MdOutlineClose className="icon-style"/></button>
                    </div>
                </div>
                <div className="ingredient-list">
                {recipesIngredients.map((ingredient, index) => (<EditIngredient ingredient={ingredient} amount={recipesMeasurements[index]} changedAmount={handleChangedMeasurement} changedIngredient={handleChangedIngredient} spot={index} key={index}/>))}
                </div>
            </div>
        </div>
    );
}

export default AddIngredient;