import React, { useEffect, useState } from 'react';
import './AddMealPlanRecipe.css';
import axios from 'axios';
import { MdAccountBox, MdHourglassTop } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

const AddMealPlanRecipe = ( { recipe, index, setRecipeID, isSearched, activeRecipeID, onRecipeClick }) => {
    const containsSearch = 
        recipe.title.toLowerCase().includes(isSearched.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(isSearched.toLowerCase());

    const isActive = recipe.recipeID === activeRecipeID;

    const [ author, setAuthor ] = useState('No Author');


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
        <>
            <div className={`recipe-view ${!containsSearch ? "hide" : ""} ${isActive ? "active" : ""}`}
                 onClick={() => {
                 setRecipeID(recipe.recipeID);
                 onRecipeClick(recipe.recipeID);
            }}>
                <img className="image" src={recipe.image} alt="Recipe"></img>
                <div id="top-container">
                    <div className="title">{recipe.title}</div>
                    <div className="author"><MdAccountBox className="icon-auth"/>{author}</div>
                </div>
                <div id="bottom-container">
                    <div id="time"><MdHourglassTop className="icon-find"/>{recipe.prepTime} Minutes</div>
                    <div id="calories"><FaBicycle className="icon-find"/>{recipe.calories} Calories</div>
                </div>
            </div>
        </>
    );
};

export default AddMealPlanRecipe;