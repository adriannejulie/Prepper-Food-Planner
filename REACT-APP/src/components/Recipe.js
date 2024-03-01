import React from "react";
import "./Recipe.css";

function Recipe({ aRecipe }) {    
    return (
        <button className="users-recipe">
            <div className="recipe-name">{aRecipe.title}</div>
            <div className="recipe-time-calories">{aRecipe.duration} Minutes</div>
            <div className="recipe-time-calories">{aRecipe.calories} Calories</div>
        </button>
    );
}

export default Recipe;
