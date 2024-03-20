import React, { useEffect, useState } from 'react';
import './AddMealPlanRecipe.css';

const AddMealPlanRecipe = ( { recipe, index, setRecipeID, isSearched }) => {
    const containsSearch = 
        recipe.title.toLowerCase().includes(isSearched.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(isSearched.toLowerCase());

    return (
        <button className={`recipe-view ${!containsSearch ? "hide" : ""}`} 
                onClick={() => {setRecipeID(recipe.recipeID)}}>
            <img id="img" src={recipe.image} alt="Recipe Image"></img>
            <div id="meal-name">
                {recipe.title}
            </div>
        </button>
    );
};

export default AddMealPlanRecipe;