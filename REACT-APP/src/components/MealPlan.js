import React, { useState, useEffect } from 'react';
import './MealPlan.css';
import { MdDelete, MdModeEdit, MdHourglassTop, MdOutlineAccessTime } from "react-icons/md";
import axios from 'axios';
import AddMealPlan from './AddMealPlan';


function MealPlan ({ meal, index }) {

    const [ editMode , setEditMode ] = useState(false);
    const [ showOverlay, setShowOverlay ] = useState(false);
    const [ recipe, setRecipe ] = useState([]);

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
                const response = await axios.delete(`http://localhost:8080/removeMealPlan/${meal.mealPlanID}`); 
                const data = response.data ? response.data : [];
                
                console.log(data);

            } catch (error) {
                console.error("Error deleting meal:", error);
            }
        };
    
        deleteMeal();
        window.location.reload();
    }

    useEffect(() => {
        console.log("Get Recipe");
        const fetchRecipes = async () => {
                const res = await axios.get(`http://localhost:8080/getRecipe/${meal.recipeID}`);
                setRecipe(res.data ? res.data : []);
        };
        fetchRecipes();
    }, []);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='meal' key={index}>
            <AddMealPlan isOpen={ showOverlay } onClose={ toggleOverlay } editMode={ editMode } mealPlanID={ meal.mealPlanID }/> 
            <div className='mealplan-section'>
                <div id='img'>
                    <img className="meal-plan-img" src={recipe.image} alt="React Image"></img>
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
                            <p style={{color: "white", justifySelf:"center"}}>{capitalize(meal.type)}</p>
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