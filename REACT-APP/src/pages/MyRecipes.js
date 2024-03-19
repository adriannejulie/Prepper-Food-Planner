import React, { useState, useEffect} from "react";
import "./MyRecipes.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recipe from "../components/Recipe.js";
import RecipeViewing from "../components/RecipeViewing.js";
import RecipeEditing from "../components/RecipeEditing.js";
import { MdBookmark, MdDehaze } from "react-icons/md";
import axios from "axios";

function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [viewingUploadedRecipes, setViewingUploadedRecipes] = useState(true);
    const [activeRecipe, setActiveRecipe] = useState("");
    const [currentSavedRecipe, setCurrentSavedRecipe] = useState("");
    const [currentUploadedRecipe, setCurrentUploadedRecipe] = useState("");

    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/getSavedRecipes/${userID}`)
            .then((res) => {
                setSavedRecipes(res.data ? res.data : []);
            })
            console.log(savedRecipes);
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/getRecipes/${userID}`)
            .then((res) => {
                setUploadedRecipes(res.data ? res.data : []);
            })
            console.log(uploadedRecipes);
    }, []);

    const chanegRecipeView = () => {
        setViewingUploadedRecipes(!viewingUploadedRecipes);
        if(viewingUploadedRecipes){
            if(currentSavedRecipe !== ""){
                setActiveRecipe(<RecipeViewing aRecipe={currentSavedRecipe} swapToEditing={editRecipe} editAbility={false}/>);
            }
        }
        else{
            if(currentSavedRecipe !== ""){
                setActiveRecipe(<RecipeViewing aRecipe={currentUploadedRecipe} swapToEditing={editRecipe} editAbility={true}/>);
            }
        }
    }


    const editRecipe = (recipeViewing) => {
        setCurrentUploadedRecipe(recipeViewing);
        setActiveRecipe(<RecipeEditing aRecipe={recipeViewing} updateRecipe={updateRecipeContents}/>);
    }


    const selectedRecipeSaved = (recipeLookingAt) => {
        setCurrentSavedRecipe(recipeLookingAt);
        setActiveRecipe(<RecipeViewing aRecipe={recipeLookingAt} swapToEditing={editRecipe} editAbility={false}/>);
    }


    const selectedRecipeUploaded = (recipeLookingAt) => {
        setCurrentUploadedRecipe(recipeLookingAt);
        setActiveRecipe(<RecipeViewing aRecipe={recipeLookingAt} swapToEditing={editRecipe} editAbility={true}/>);
    }


    const updateRecipeContents = (amounts, recipeIngredients, recipeTitle, cookTime, recipeCalories, recipeSteps, iDOfRecipe) => {
        var recipes = uploadedRecipes;
        var recipeIndex = recipes.findIndex(singleRecipe => singleRecipe.recipeID === iDOfRecipe);
        recipes[recipeIndex].title = recipeTitle; 
        recipes[recipeIndex].measurements = amounts.join(","); 
        recipes[recipeIndex].ingredients = recipeIngredients.join(","); 
        recipes[recipeIndex].intructions = recipeSteps; 
        recipes[recipeIndex].prepTime = cookTime; 
        recipes[recipeIndex].calories = recipeCalories; 
        setUploadedRecipes([...uploadedRecipes]);
        setCurrentUploadedRecipe(recipes[recipeIndex]);
        setActiveRecipe(<RecipeViewing aRecipe={recipes[recipeIndex]} swapToEditing={editRecipe} editAbility={true}/>);
    }


    return (
        <div className="meal-planner-container">
                <div className="recipes-container">
                    <div className="menu">
                    <button className="recipe-list-show-hide menu-buttons"><MdDehaze className="icon-size menu-buttons"/></button>
                        <div className="saved-uploaded-selection menu-buttons"><MdBookmark className="icon-size menu-buttons"/>{(viewingUploadedRecipes) ? "Uploaded Recipes" : "Saved Recipes"}
                            <button className="swap-recipe-view menu-buttons" onClick={chanegRecipeView}><ArrowDropDownIcon className="menu-buttons menu-buttons" /></button>
                        </div>
                    </div>
                    {(viewingUploadedRecipes) ? uploadedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeUploaded} key={theRecipes.recipeID} isActiveRecipe={(currentUploadedRecipe.recipeID === theRecipes.recipeID)}/>)) : savedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeSaved} key={theRecipes.recipeID} isActiveRecipe={(currentSavedRecipe.recipeID === theRecipes.recipeID)}/>))}
                </div>
                <div className="recipe-viewing-container">
                    {activeRecipe}
                </div>
        </div>
    );
}

export default MyRecipes;


/*
The code below will change
the heading with id = "myH"
and the paragraph with id = "myP"
in my web page:
*/