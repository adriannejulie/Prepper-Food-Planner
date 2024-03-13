import React, { useState } from 'react';
import './MealPlan.css';
import { MdOutlineBookmarkBorder, MdModeEdit } from "react-icons/md";

// dunno about this import
import Recipe from './Recipe';

function MealPlan ({meal, index}) {

    // dunno if this will actually work?
    // const [recipe, setRecipe] = useState(Recipe);

    // temp function, functionality to be added
    const getRecipe = (recipeID) => {
        console.log("Get Recipe");
    }

    const editMeal = () => {
        console.log("Edit Meal");
    }

    // this is a sus button
    const saveMeal = () => {
        console.log("Save Meal");
    }

    return (
        <div className='meal' key={index}>
            <div className='mealplan-section'>
                
                <img id='img' src="https://reactjs.org/logo-og.png" alt="React Image"></img>
                <div id='meal-name'>
                    {meal}
                </div>

            </div>
            <div className='mealplan-section' style={{backgroundColor: "white"}}>
                <div id='type-and-time'>
                    <p id='meal-name'>Breakfast</p>
                </div>
                <div id='type-and-time'>
                    <p id='meal-name'>30-45min</p>
                </div>
                <div id='icons'>
                    <button id='button' onClick={editMeal}>
                        <MdModeEdit />
                    </button>
                    <button id='button' onClick={saveMeal}>
                        <MdOutlineBookmarkBorder />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MealPlan;