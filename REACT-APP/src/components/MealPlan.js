import React, { useEffect, useState } from 'react';
import './MealPlan.css';
import { MdOutlineBookmarkBorder, MdModeEdit } from "react-icons/md";
import axios from 'axios';


function MealPlan ({recipe, type, index}) {

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
                
                <img id='img' src={recipe.image} alt="React Image"></img>
                <div id='meal-name'>
                    {recipe.title}
                </div>

            </div>
            <div className='mealplan-section' style={{backgroundColor: "white"}}>
                <div id='type-and-time'>
                    <p id='meal-name'>{type}</p>
                </div>
                <div id='type-and-time'>
                    <p id='meal-name'>{recipe.prepTime}</p>
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