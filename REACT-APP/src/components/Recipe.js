import React from "react";
import "./Recipe.css";
import { MdHourglassTop } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

function Recipe({ aRecipe, viewNewRecipe }) {    
    return (
        <button onClick={() => viewNewRecipe(aRecipe)} className="users-recipe">
            <div className="recipe-name">{aRecipe.title}</div>
            <div className="recipe-time-calories"><MdHourglassTop className="recipe-icon-styling"/>{aRecipe.duration} Minutes</div>
            <div className="recipe-time-calories"><FaBicycle className="recipe-icon-styling"/>{aRecipe.calories} Calories</div>
        </button>
    );
}

export default Recipe;
