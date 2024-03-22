import React, { useEffect, useState } from 'react';
import './AddMealPlanRecipe.css';
import axios from 'axios';
import { MdPerson, MdHourglassTop, MdOutlinePedalBike } from "react-icons/md";

const AddMealPlanRecipe = ( { recipe, index, setRecipeID, isSearched, activeRecipeID, onRecipeClick }) => {
    const containsSearch = 
        recipe.title.toLowerCase().includes(isSearched.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(isSearched.toLowerCase());

    const isActive = recipe.recipeID === activeRecipeID;

    const [ author, setAuthor ] = useState('No Author');
    const [ fullDesc, setFullDesc ] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getUser/${recipe.userID}`); 
                const data = response.data ? response.data : [];
                
                setAuthor(data.firstName + " " + data.lastName);
                console.log(author);

            } catch (error) {
                console.error("Error fetching author:", error);
            }
        };
    
        fetchData();

    }, []);

    return (
        <div
            className={`recipe-view ${!containsSearch ? "hide" : ""} ${isActive ? "active" : ""}`}
            onClick={() => {
                setRecipeID(recipe.recipeID);
                onRecipeClick(recipe.recipeID);
            }}
        >
            <img id="img-container" src={recipe.image} alt="Recipe Image"></img>
            <div id="meal-info-container">
                <div id="name-and-author-container">
                    <div id="text-container">
                        {recipe.title}
                    </div>
                    <div id="text-container">
                        <MdPerson /> 
                        <p>{author}</p>
                    </div>
                </div>
                <div id="time-desc-cals-container">
                    <div id='desc'>
                        {recipe.description}
                    </div>
                    <div id='time-cals'>
                        <div id="text-container">
                            <MdHourglassTop style={{height: "2vh"}}/>
                            <p>{recipe.prepTime} Minutes</p>
                        </div>
                        <div id="text-container">
                            <MdOutlinePedalBike style={{height: "2vh"}}/>
                            <p>{recipe.calories} Calories</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddMealPlanRecipe;