import React, { useState, useEffect} from "react";
import "./MyRecipes.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recipe from "../components/Recipe.js";
import RecipeViewing from "../components/RecipeViewing.js";
import RecipeEditing from "../components/RecipeEditing.js";
import NewRecipe from "../components/NewRecipe.js";
import { MdBookmark, MdDehaze, MdAdd } from "react-icons/md";
import axios from "axios";
import { useUser } from "../components/UserContext";


function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [viewingUploadedRecipes, setViewingUploadedRecipes] = useState(false);
    const [activeRecipe, setActiveRecipe] = useState("");
    const [currentSavedRecipe, setCurrentSavedRecipe] = useState("");
    const [currentUploadedRecipe, setCurrentUploadedRecipe] = useState("");
    const { user, setUser } = useUser();
    const [toggleRecipeSidebar, setToggleRecipeSidebar] = useState(false);
    const noActiveRecipe = <h1 className="no-active-recipe">No Active Recipe.</h1>;


    
    useEffect(() => {

        console.log(user)
        axios
            .get(`http://localhost:8080/getSavedRecipes/${user.userID}`) // This is for when userID is implemented
            //.get(`http://localhost:8080/getSavedRecipes/1`)
            .then((res) => {
                setSavedRecipes(res.data ? res.data : []);
                if(res.data.length > 0){
                    selectedRecipeSaved(res.data[0]);
                }
                else{
                    setActiveRecipe(noActiveRecipe);
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
                    setCurrentUploadedRecipe(res.data[0]);
                    console.log("we are logging", res.data ? res.data : []);
                }
                else{
                    setActiveRecipe(noActiveRecipe);
                }
                console.log(uploadedRecipes);
            })
    }, []);

    const chanegRecipeView = () => {
        if(currentUploadedRecipe.title !== "" && currentUploadedRecipe.measurements !== "" && currentUploadedRecipe.ingredients !== "" && currentUploadedRecipe.instructions !== "" && currentUploadedRecipe.prepTime !== "" && currentUploadedRecipe.calories !== ""){
            setViewingUploadedRecipes(!viewingUploadedRecipes);
            if(viewingUploadedRecipes){
                if(currentSavedRecipe !== ""){
                    setActiveRecipe(<RecipeViewing aRecipe={currentSavedRecipe} swapToEditing={editRecipe} editAbility={false}/>);
                }
                else{
                    setActiveRecipe(noActiveRecipe);
                }
            }
            else{
                if(currentUploadedRecipe !== ""){
                    setActiveRecipe(<RecipeViewing aRecipe={currentUploadedRecipe} swapToEditing={editRecipe} editAbility={true}/>);
                }
                else{
                    setActiveRecipe(noActiveRecipe);
                }
            }
        }
        else{
            window.alert("you have not filled out all necessary columns for a recipe");
        }
    }


    const editRecipe = (recipeViewing) => {
        console.log(uploadedRecipes);
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


    const updateRecipeContents = (amounts, recipeIngredients, recipeTitle, cookTime, recipeCalories, recipeSteps, iDOfRecipe, recipeImage) => {
        console.log(uploadedRecipes);
        if(amounts.length > 0 && recipeIngredients.length > 0 && recipeTitle.length > 0 && cookTime.length > 0 && recipeCalories.length > 0 && recipeSteps.length > 0){
            var recipes = uploadedRecipes;
            var recipeIndex = recipes.findIndex(singleRecipe => singleRecipe.recipeID === iDOfRecipe);
            console.log(iDOfRecipe);
            console.log(recipes);
            console.log(uploadedRecipes);
            recipes[recipeIndex].title = recipeTitle; 
            recipes[recipeIndex].measurements = amounts.join(","); 
            recipes[recipeIndex].ingredients = recipeIngredients.join(","); 
            recipes[recipeIndex].intructions = recipeSteps; 
            recipes[recipeIndex].prepTime = cookTime; 
            recipes[recipeIndex].calories = recipeCalories; 
            recipes[recipeIndex].image = recipeImage; 
            setUploadedRecipes([...uploadedRecipes]);
            setCurrentUploadedRecipe(recipes[recipeIndex]);
            setActiveRecipe(<RecipeViewing aRecipe={recipes[recipeIndex]} swapToEditing={editRecipe} editAbility={true}/>);
            axios
                .put(`http://localhost:8080/updateRecipe/${iDOfRecipe}`, {
                    "image" : recipeImage,
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


    const saveNewRecipe = (amounts, recipeIngredients, recipeTitle, cookTime, recipeCalories, recipeSteps, recipeImage) => {
        console.log("gets the users saved recipes back");
        if(amounts.length > 0 && recipeIngredients.length > 0 && recipeTitle.length > 0 && cookTime.length > 0 && recipeCalories.length > 0 && recipeSteps.length > 0){
            axios
                .post(`http://localhost:8080/addRecipe`, {
                    "image" : recipeImage,
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
                        selectedRecipeUploaded(res.data);
                        const recipes = uploadedRecipes;
                        recipes[recipes.length - 1] = res.data;
                        setUploadedRecipes(recipes);
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
        console.log(uploadedRecipes);
        setViewingUploadedRecipes(true);
        console.log(currentUploadedRecipe !== "")
        if((uploadedRecipes.length === 0) || (currentUploadedRecipe !== "" && currentUploadedRecipe.title.length > 0 && currentUploadedRecipe.measurements.length > 0 && currentUploadedRecipe.ingredients.length > 0 && currentUploadedRecipe.instructions.length > 0 && currentUploadedRecipe.prepTime.length > 0 && currentUploadedRecipe.calories.length > 0)){
            const newRecipeTemplate = {
                "recipeID": ((uploadedRecipes.length > 0) ? uploadedRecipes[uploadedRecipes.length - 1].recipeID + 1 : 0),
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1711148973/Screenshot_682_sztx0w.png", 
                "title" : "",
                "measurements" : "",
                "ingredients" : "",
                "instructions" : "",
                "prepTime" : "",  
                "calories" : "",
                "author" : "",
                "saves" : "0"
            }
            console.log("ayo", newRecipeTemplate.recipeID)
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


    const toggleSideMenu = () => {
        setToggleRecipeSidebar(!toggleRecipeSidebar);
    }


    return (
        <div className="meal-planner-container">
                {toggleRecipeSidebar ?
                <div className="collapsed-container">
                    <button className="menu-buttons collapsed-button-display" onClick={toggleSideMenu}><MdDehaze className="menu-buttons"/></button>
                    <button className="menu-buttons collapsed-button-display" onClick={addNewRecipe}><MdAdd className="menu-buttons"/> </button>
                    <button className="menu-buttons collapsed-button-display" onClick={chanegRecipeView}><MdBookmark className="menu-buttons"/></button>
                </div> :
                <div className="recipes-container">
                    <div className="menu">
                        <button className="recipe-list-show-hide menu-buttons" onClick={toggleSideMenu}><MdDehaze className="icon-size menu-buttons"/></button>
                        <button className="add-recipe-button menu-buttons" onClick={addNewRecipe}>Add Recipe +</button>
                    </div>
                    <button onClick={chanegRecipeView} className="saved-uploaded-selection menu-buttons"><MdBookmark className="icon-size menu-buttons"/>{(viewingUploadedRecipes) ? "Uploaded Recipes" : "Saved Recipes"}
                        <div className="swap-recipe-view menu-buttons" ><ArrowDropDownIcon className="menu-buttons menu-buttons" /></div>
                    </button>
                    {(viewingUploadedRecipes) ? ((uploadedRecipes.length > 0) ? uploadedRecipes.map((theRecipes) => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeUploaded} key={theRecipes.recipeID} isActiveRecipe={(currentUploadedRecipe.recipeID === theRecipes.recipeID)}/>)) : <h3 className="no-recipes-in-container">No Recipes Uploaded</h3>) : ((savedRecipes.length > 0) ? savedRecipes.map(theRecipes => (<Recipe aRecipe={theRecipes} viewNewRecipe={selectedRecipeSaved} key={theRecipes.recipeID} isActiveRecipe={(currentSavedRecipe.recipeID === theRecipes.recipeID)}/>)) : <h3 className="no-recipes-in-container">No Recipes Saved</h3>)}
                </div>}
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