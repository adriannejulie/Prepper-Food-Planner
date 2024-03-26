import React, { useState } from 'react';
import './MealPlan.css';
import { MdDelete, MdModeEdit, MdHourglassTop, MdOutlineAccessTime } from "react-icons/md";
import axios from 'axios';
import AddMealPlan from './AddMealPlan';


function MealPlan ({recipe, mealPlanID, type, index }) {

    const [ editMode , setEditMode ] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const editMeal = () => {
        setEditMode(!editMode);
        setShowOverlay(!showOverlay);
        console.log("Edit Meal");
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
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
            <AddMealPlan isOpen={ showOverlay } onClose={ toggleOverlay } editMode={ editMode } mealPlanID={ mealPlanID }/> 
            <div className='mealplan-section'>
                <div id='img'>
                    <img src={recipe.image} alt="React Image"></img>
                </div>
                <div id='meal-name'>
                    {recipe.title}
                </div>

            </div>
            <div className='typetime' style={{backgroundColor: "white"}}>
                <div id='type-and-time'>
                    <div id='type-and-time-text'>
                        <div id='icon'>
                            <MdOutlineAccessTime style={{height: "2vh", color:"white"}}/>
                        </div>
                        <div id='time-text'>
                            <p style={{color: "white", justifySelf:"center"}}>{capitalize(type)}</p>
                        </div>
                    </div>
                </div>
                <div id='type-and-time'>
                    <div id='type-and-time-text'>
                        <div id='icon'>
                            <MdHourglassTop style={{height: "2vh", color:"white"}}/>
                        </div>
                        <div id='time-text'>
                            <p style={{color: "white"}}>{recipe.prepTime} M</p>
                        </div>
                    </div>
                </div>
                <div id='edit-and-delete'>
                    <button className='edit' id='button' onClick={editMeal}>
                        <MdModeEdit />
                    </button>
                    <button className='delete' id='button' onClick={deleteMeal}>
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MealPlan;