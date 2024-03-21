import React, { useState } from 'react';
import './MealPlan.css';
import { MdDelete, MdModeEdit } from "react-icons/md";
import axios from 'axios';
import AddMealPlan from './AddMealPlan';


function MealPlan ({recipe, mealPlanID, type, index }) {

    const [ editMode , setEditMode ] = useState(false);

    const editMeal = () => {
        console.log("Edit Meal");
        setEditMode(!editMode);
    }

    const deleteMeal = () => {
        const deleteMeal = async () => {
            try { 
                const response = await axios.delete(`http://localhost:8080/removeMealPlan/${mealPlanID}`); 
                const data = response.data ? response.data : [];
                
                console.log(data);

            } catch (error) {
                console.error("Error deleting meal:", error);
            }
        };
    
        deleteMeal();
        window.location.reload();
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='meal' key={index}>
            <AddMealPlan isOpen={editMode} onClose={ setEditMode } editMode={editMode} mealPlanID={mealPlanID}/> 
            <div className='mealplan-section'>
                
                <img id='img' src={recipe.image} alt="React Image"></img>
                <div id='meal-name'>
                    {recipe.title}
                </div>

            </div>
            <div className='mealplan-section' style={{backgroundColor: "white"}}>
                <div id='type-and-time'>
                    <div id='type-and-time-text'>{capitalize(type)}</div>
                </div>
                <div id='type-and-time'>
                    <div id='type-and-time-text'>{recipe.prepTime} mins</div>
                </div>
                <div id='icons'>
                    <button id='button' onClick={editMeal}>
                        <MdModeEdit />
                    </button>
                    <button id='button' onClick={deleteMeal}>
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MealPlan;