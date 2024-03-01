import React, { useState, useEffect } from "react";
import "./MyRecipes.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recipe from "../components/Recipe.js";

function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [viewingUploadedRecipes, setViewingUploadedRecipes] = useState(true);
    
    useEffect(() => {    
        setSavedRecipes([{
        "recipeID": 1,
        "title" : "Italian Spaghetti",
        "calories" : 600,
        "duration" : 45,
    },
    {
        "recipeID": 2,
        "title" : "Steak",
        "calories" : 1400,
        "duration" : 60,
    } ,
    {
        "recipeID": 3,
        "title" : "Steak",
        "calories" : 1400,
        "duration" : 60,
    } ,
    {
        "recipeID": 4,
        "title" : "Steak",
        "calories" : 1400,
        "duration" : 60,
    } 
    ])}, []);


    useEffect(() => {    
        setUploadedRecipes([{
        "recipeID": 1,
        "title" : "Cookies",
        "calories" : 400,
        "duration" : 35,
    }
    ])}, []);


    const chanegRecipeView = () => {
        setViewingUploadedRecipes(!viewingUploadedRecipes);
    }


    return (
        <div className="meal-planner-container">
                <div className="recipes-container">
                    <div className="menu">
                        <button className="recipe-list-show-hide menu-buttons"></button>
                        <div className="saved-uploaded-selection menu-buttons">{(viewingUploadedRecipes) ? "Saved Recipes" : "Uploaded Recipes"}<button className="swap-recipe-view menu-buttons" onClick={chanegRecipeView}><ArrowDropDownIcon className="dropdown-icon menu-buttons" /></button></div>
                    </div>
                    {(viewingUploadedRecipes) ? savedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} key={theRecipes.recipeID}/>)) : uploadedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} key={theRecipes.recipeID}/>))}
                </div>
                <div className="recipe-viewing-container"></div>
        </div>
    );
}

export default MyRecipes;
