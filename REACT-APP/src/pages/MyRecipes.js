import React, { useState, useEffect} from "react";
import "./MyRecipes.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recipe from "../components/Recipe.js";
import RecipeViewing from "../components/RecipeViewing.js";
import RecipeEditing from "../components/RecipeEditing.js";
import NewRecipe from "../components/NewRecipe.js";
import { MdBookmark, MdDehaze } from "react-icons/md";
import axios from "axios";
import { useUser } from "../components/UserContext";


function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [viewingUploadedRecipes, setViewingUploadedRecipes] = useState(true);
    const [activeRecipe, setActiveRecipe] = useState("");
    const [currentSavedRecipe, setCurrentSavedRecipe] = useState("");
    const [currentUploadedRecipe, setCurrentUploadedRecipe] = useState("");
    const { user, setUser } = useUser();


    
    useEffect(() => {

        console.log(user)
        axios
            .get(`http://localhost:8080/getSavedRecipes/${user.userID}`) // This is for when userID is implemented
            //.get(`http://localhost:8080/getSavedRecipes/1`)
            .then((res) => {
                setSavedRecipes(res.data ? res.data : []);
                if(res.data.length > 0){
                    setCurrentSavedRecipe(res.data[0]);
                }
            })
            console.log(savedRecipes);
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/getRecipes/${user.userID}`) // This is for when userID is implemented
            //.get(`http://localhost:8080/getRecipes/1`)
            .then((res) => {
                setUploadedRecipes(res.data ? res.data : []);
                if(res.data.length > 0){
                    selectedRecipeUploaded(res.data[0]);
                }
            })
            console.log(uploadedRecipes);
    }, []);

    const chanegRecipeView = () => {
        if(currentUploadedRecipe.title !== "" && currentUploadedRecipe.measurements !== "" && currentUploadedRecipe.ingredients !== "" && currentUploadedRecipe.steps !== "" && currentUploadedRecipe.duration !== "" && currentUploadedRecipe.calories !== ""){
            setViewingUploadedRecipes(!viewingUploadedRecipes);
            if(viewingUploadedRecipes){
                if(currentSavedRecipe !== ""){
                    setActiveRecipe(<RecipeViewing aRecipe={currentSavedRecipe} swapToEditing={editRecipe} editAbility={false}/>);
                }
            }
            else{
                if(currentUploadedRecipe !== ""){
                    setActiveRecipe(<RecipeViewing aRecipe={currentUploadedRecipe} swapToEditing={editRecipe} editAbility={true}/>);
                }
            }
        }
        else{
            window.alert("you have not filled out all necessary columns for a recipe");
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
        if(amounts.length > 0 && recipeIngredients.length > 0 && recipeTitle.length > 0 && cookTime.length > 0 && recipeCalories.length > 0 && recipeSteps.length > 0){
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
            axios
                .put(`http://localhost:8080/updateRecipe/${iDOfRecipe}`, {
                    "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                    "title" : recipeTitle,
                    "measurements" : amounts.join(","),
                    "ingredients" : recipeIngredients.join(","),
                    "instructions" : recipeSteps,
                    "prepTime" : cookTime,  
                    "calories" : recipeCalories,
                    "userID" : user.userID,
                    "saves" : "6",
                    "isPublic": true
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        window.alert("Recipe has been updated");
                    }
                })
                .catch ((err) => {
                    console.log(err);
                    window.alert("There was an error updating the recipe");
                });
        }
        else{
            console.log(cookTime);
            console.log(amounts.length > 0 , recipeIngredients.length > 0 , recipeTitle.length > 0 , cookTime.length > 0, recipeCalories > -1 , recipeSteps.length > 0);
            window.alert("One or more fields are empty. Please ensure all fields are all filled in.");
        }
    }


    const saveNewRecipe = (amounts, recipeIngredients, recipeTitle, cookTime, recipeCalories, recipeSteps) => {
        console.log("gets the users saved recipes back");
        if(amounts.length > 0 && recipeIngredients.length > 0 && recipeTitle.length > 0 && cookTime.length > 0 && recipeCalories.length > 0 && recipeSteps.length > 0){
            axios
                .post(`http://localhost:8080/addRecipe`, {
                    "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                    "title" : recipeTitle,
                    "measurements" : amounts.join(","),
                    "ingredients" : recipeIngredients.join(","),
                    "instructions" : recipeSteps,
                    "prepTime" : cookTime,  
                    "calories" : recipeCalories,
                    "userID" : user.userID,
                    "saves" : "0",
                    "isPublic": false
                })
                .then((res) => {
                    // setUploadedRecipes(res.data ? res.data : []);
                    console.log(res.data);
                    if (res.status === 200) {
                        window.alert("Recipe has been added to your recipes");
                    }
                    
                })
                .catch ((err) => {
                    console.log(err);
                    window.alert("There was an error adding the recipe");
                });
                
        }
        else{
            window.alert("One or more fields are empty. Please ensure all fields are all filled in.");
        }
        
    }


    const addNewRecipe = () => {
        setViewingUploadedRecipes(true);
        if(true){
            const newRecipeTemplate = {
                "recipeID": uploadedRecipes[uploadedRecipes.length - 1].recipeID + 1,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "",
                "measuremnents" : "",
                "ingredients" : "",
                "steps" : "",
                "duration" : "",  
                "calories" : "",
                "author" : ""
            }
            var recipes = uploadedRecipes;
            recipes.push(newRecipeTemplate);
            setUploadedRecipes([...recipes]); 
            setCurrentUploadedRecipe(newRecipeTemplate);
            setActiveRecipe(<NewRecipe aRecipe={newRecipeTemplate} newRecipeSave={saveNewRecipe}/>);
        }
        else{
            window.alert("One or more fields in the current recipe are missing. Please ensure you have filled out all the fields for a recipe before creating another one.");
        }
    }


    return (
        <div className="meal-planner-container">
                <div className="recipes-container">
                <div className="menu">
                        <button className="recipe-list-show-hide menu-buttons"><MdDehaze className="icon-size menu-buttons"/></button>
                        <button onClick={addNewRecipe}>Add Recipe + </button>
                    </div>
                    <div className="saved-uploaded-selection menu-buttons"><MdBookmark className="icon-size menu-buttons"/>{(viewingUploadedRecipes) ? "Uploaded Recipes" : "Saved Recipes"}
                        <button className="swap-recipe-view menu-buttons" onClick={chanegRecipeView}><ArrowDropDownIcon className="menu-buttons menu-buttons" /></button>
                    </div>
                    {(viewingUploadedRecipes) ? uploadedRecipes.map((theRecipes) => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeUploaded} key={theRecipes.recipeID} isActiveRecipe={(currentUploadedRecipe.recipeID === theRecipes.recipeID)}/>)) : savedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeSaved} key={theRecipes.recipeID} isActiveRecipe={(currentSavedRecipe.recipeID === theRecipes.recipeID)}/>))}
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