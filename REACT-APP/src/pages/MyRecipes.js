import React, { useState, useEffect } from "react";
import "./MyRecipes.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recipe from "../components/Recipe.js";
import RecipeViewing from "../components/RecipeViewing.js";
import RecipeEditing from "../components/RecipeEditing.js";
import { MdBookmark, MdDehaze } from "react-icons/md";

function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [viewingUploadedRecipes, setViewingUploadedRecipes] = useState(true);
    const [activeRecipe, setActiveRecipe] = useState("");
    const [currentSavedRecipe, setCurrentSavedRecipe] = useState("");
    const [currentUploadedRecipe, setCurrentUploadedRecipe] = useState("");
    
    useEffect(() => {    
        setSavedRecipes([{
        "recipeID": 1,
        "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
        "title" : "Buttermilk Pancakes",
        "measuremnents" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
        "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
        "description" : "Yummy Buttermilk pancakes",
        "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
        "duration" : "30",  
        "calories" : "210",
        "author" : "Harry Potter"
    },
    {
        "recipeID": 2,
        "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
        "title" : "Buttermilk Pancakes",
        "measuremnents" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
        "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
        "description" : "Yummy Buttermilk pancakes",
        "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
        "duration" : "30",  
        "calories" : "210",
        "author" : "Harry Potter"
    } ,
    {
        "recipeID": 3,
        "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
        "title" : "Buttermilk Pancakes",
        "measuremnents" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
        "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
        "description" : "Yummy Buttermilk pancakes",
        "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
        "duration" : "30",  
        "calories" : "210",
        "author" : "Harry Potter"
    } ,
    {
        "recipeID": 4,
        "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
        "title" : "Buttermilk Pancakes",
        "measuremnents" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
        "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
        "description" : "Yummy Buttermilk pancakes",
        "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
        "duration" : "30",  
        "calories" : "210",
        "author" : "Chris Tanev"
    } 
    ])}, []);


    useEffect(() => {    
        setUploadedRecipes([{
            "recipeID": 1,
            "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
            "title" : "Buttermilk Pancake",
            "measuremnents" : "null,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
            "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
            "description" : "Yummy Buttermilk pancakes",
            "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
            "duration" : "30",  
            "calories" : "210",
            "author" : "Harry Potter"
    },
    {
        "recipeID": 2,
        "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
        "title" : "Buttermilk Pancake",
        "measuremnents" : "null,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
        "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
        "description" : "Yummy Buttermilk pancakes",
        "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
        "duration" : "30",  
        "calories" : "210",
        "author" : "Harry Potter"
    }
    ])}, []);


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
        recipes[recipeIndex].measuremnents = amounts.join(","); 
        recipes[recipeIndex].ingredients = recipeIngredients.join(","); 
        recipes[recipeIndex].steps = recipeSteps; 
        recipes[recipeIndex].duration = cookTime; 
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