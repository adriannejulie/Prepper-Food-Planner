import React from "react";
import "./RecipeViewing.css";

function RecipeViewing({ aRecipe }) {    
    return (
        <div className="recipe-grid">
            <div>
                <h1>Italian Spaghetti</h1>
                <p1>Author: Harry Potter</p1>
                <p1>30 Minutes</p1>
                <p1>600 Calories</p1>
            </div>
            <img className="recipe-image" src="https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png"></img>
            <div className="recipe-instructions-container"></div>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients</div>
                <div className="ingredients-list">Ingredients</div>
            </div>
        </div>
    );
}

export default RecipeViewing;