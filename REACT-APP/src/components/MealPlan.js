import React, { useEffect, useState } from 'react';
import './MealPlan.css';
import { MdOutlineBookmarkBorder, MdModeEdit } from "react-icons/md";
import axios from 'axios';


function MealPlan ({meal, recipeID, type, index}) {

    const [recipe, setRecipe] = useState();

    // has bugs, will probably move to MealPlanner.js and pass necessary data as props
    // useEffect(() => {
    //     console.log("Get Recipe");
    //     axios
    //         .get(`http://localhost:8080/getRecipe/${recipeID}`)
    //         .then((res) => {
    //             setRecipe(res.data ? res.data : []);
    //             console.log(res);
    //     })
    //     console.log(recipe);
    // }, []);

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
                    <p id='meal-name'>{type}</p>
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