import React, { useState } from 'react';
import './AddMealPlanRecipe.css';

const AddMealPlanRecipe = ( { recipe, index,  setRecipeID }) => {

    return (
        <button id="recipe-view" onClick={() => {setRecipeID(recipe.recipeID)}} key={index}>
            <img id="img" src={recipe.image} alt="Recipe Image"></img>
            <div id="meal-name">
                {recipe.description}
            </div>
        </button>
    );
};

export default AddMealPlanRecipe;