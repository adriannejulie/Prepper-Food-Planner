import React from "react";
import "./MyRecipes.css";

function MyRecipes() {
    return (
        <div className="meal-planner-container">
                <div className="recipes-container">
                    <button className="recipe-list-show-hide">&#xe236;</button>
                    <button className="saved-uploaded-selection">Saved Recipes</button>
                </div>
                <div className="recipe-viewing-container"></div>
        </div>
    );
}

export default MyRecipes;
