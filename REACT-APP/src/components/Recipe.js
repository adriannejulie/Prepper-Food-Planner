import { React, useState } from "react";
import "./Recipe.css";
import { MdHourglassTop } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

function Recipe({ aRecipe, viewNewRecipe, isActiveRecipe}) {        
    return (
        <button onClick={() => {viewNewRecipe(aRecipe)}} className={isActiveRecipe ? "users-recipe users-recipe-active-color" : "users-recipe users-recipe-default-color"}>
            <div className={isActiveRecipe ? "recipe-name recipe-name-active-colors" : "recipe-name recipe-name-default-colors"}>{aRecipe.title}</div>
            <div className={isActiveRecipe ? "recipe-time-calories recipe-time-calories-active" : "recipe-time-calories recipe-time-calories-default"}><MdHourglassTop className={isActiveRecipe ? "recipe-icon-styling recipe-icon-active-color" : "recipe-icon-styling recipe-icon-default-color"}/><div>{aRecipe.prepTime} Minutes</div><MdHourglassTop className="hide-icon"/></div>
            <div className={isActiveRecipe ? "recipe-time-calories recipe-time-calories-active" : "recipe-time-calories recipe-time-calories-default"}><FaBicycle className={isActiveRecipe ? "recipe-icon-styling recipe-icon-active-color" : "recipe-icon-styling recipe-icon-default-color"}/><div>{aRecipe.calories} Calories</div><FaBicycle className="hide-icon"/></div>
        </button>
    );
}

export default Recipe;
