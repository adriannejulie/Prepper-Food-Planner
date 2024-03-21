import React, { useEffect, useState } from 'react';
import './AddMealPlanRecipe.css';

const AddMealPlanRecipe = ( { recipe, index, setRecipeID, isSearched, activeRecipeID, onRecipeClick }) => {
    const containsSearch = 
        recipe.title.toLowerCase().includes(isSearched.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(isSearched.toLowerCase());

    const isActive = recipe.recipeID === activeRecipeID;

    return (
        <div
            className={`recipe-view ${!containsSearch ? "hide" : ""} ${isActive ? "active" : ""}`}
            onClick={() => {
                setRecipeID(recipe.recipeID);
                onRecipeClick(recipe.recipeID);
            }}
        >
            <img id="img" src={recipe.image} alt="Recipe Image"></img>
            <div id="meal-name">
                {recipe.title}
            </div>
        </div>
    );
};

export default AddMealPlanRecipe;