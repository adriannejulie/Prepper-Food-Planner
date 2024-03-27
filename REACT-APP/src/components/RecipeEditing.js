import React, { useEffect, useState } from "react";
import "./RecipeViewing.css";
import "./RecipeEditing.css";
import AddIngredient from "../components/AddIngredient.js";
import { MdAccountBox, MdHourglassTop, MdModeEdit } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import {Cloudinary } from "../components/CloudinaryImageUpload";
import { Image, Transformation } from 'cloudinary-react';
import { CloudinaryContext, uploadMultiple } from 'cloudinary-react'; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecipeEditing({ aRecipe, updateRecipe }) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState(aRecipe?.title);
    const [cookTime, setCookTime] = useState(aRecipe?.prepTime);
    const [recipeCalories, setRecipeCalories] = useState(aRecipe?.calories);
    const [recipeSteps, setRecipeSteps] = useState(aRecipe?.instructions);
    const [showIngredientPopup, setShowIngredientPopup] = useState(false);
    const [image, setImage] = useState(aRecipe?.image);

    useEffect(() => {
        try{
            const recipeIngredients = aRecipe.ingredients.split(",");
            const recipeMeasurements = aRecipe.measurements.split(",");
            setAmounts(recipeMeasurements)
            setIngredients(recipeIngredients)
        }
        catch{
            setAmounts([""])
            setIngredients([""])
        }
    }, [aRecipe])

    
    const handleTitleChange = (e) => {
        setRecipeTitle(e.target.value);
    }


    const handleCookTimeChange = (e) => {
        setCookTime(e.target.value);
    }


    const handleCaloriesChange = (e) => {
        setRecipeCalories(e.target.value);
    }


    const handleInstructionsChange = (e) => {
        setRecipeSteps(e.target.value);
    }


    const showHidePopup = () => {
        setShowIngredientPopup(!showIngredientPopup);
    }


    const saveIngredientsAdded = (newAmounts, addedIngredients, deleteArr) => {


        newAmounts = newAmounts.filter((_, index) => !deleteArr.includes(index))
        addedIngredients = addedIngredients.filter((_, index) => !deleteArr.includes(index))



        var removalIndex = addedIngredients.indexOf("");

        //If there are any empty fields
        for (let i = 0; i < addedIngredients.length && removalIndex !== -1; i++) { 
            //If empty
            if((newAmounts[removalIndex] === "" || newAmounts[removalIndex] === "null") && addedIngredients[removalIndex] === ""){
                //Get rid of it
                newAmounts.splice(removalIndex, 1);
                addedIngredients.splice(removalIndex, 1);
            }
            //Get the next index
            removalIndex = newAmounts.indexOf("", removalIndex);
        }
        
        //if it's not blank
        if(!(addedIngredients.includes(""))){
            setAmounts(newAmounts);
            setIngredients(addedIngredients);
            var replaceIndex = newAmounts.indexOf("");
            //if the amount is not filled in, replace it with null Amount
            for (let i = 0; i < newAmounts.length && replaceIndex !== -1; i++) {
                newAmounts[replaceIndex] = "null";
                replaceIndex = newAmounts.indexOf("", replaceIndex);
            }
            var stepsAsString = newAmounts.join(",");
            var instructionsAsString = addedIngredients.join(",");
        }
        else{
            toast.error("You have entered an amount for a blank ingredient. Please either remove the amount or enter an ingredient.");
        }
    }


    const handleImageUpload = async (e) =>{


        const res_image =  await Cloudinary(e);
        console.log(res_image)
        setImage(res_image)
        
    }



    return (
        <><ToastContainer position="top-center" autoClose={2000}/>
        <div className="recipe-grid">
            <div className="recipe-view-header">
                {showIngredientPopup && <AddIngredient hidePopup={showHidePopup} ingredients={recipeIngredients} amounts={amounts} saveIngredients={saveIngredientsAdded}/>}
                <div className="align-icons-text"><input className="recipe-title-styling" value={recipeTitle} onChange={handleTitleChange}></input><button className="checkmark-button" onClick={() => updateRecipe(amounts, recipeIngredients, recipeTitle, cookTime, recipeCalories, recipeSteps, aRecipe.recipeID, image)}><ImCheckmark className="checkmark-icon-style"/></button></div>
                <div className="align-icons-text"><MdAccountBox /> Author: {aRecipe?.author}</div>
                <div className="cooktime-calories-container">
                    <div className="align-icons-text"><MdHourglassTop className="icon-background"/><input className="duration-cooktime-input" value={cookTime} onChange={handleCookTimeChange}></input>Minutes</div>
                    <div className="align-icons-text"><FaBicycle className="icon-background"/><input className="duration-cooktime-input" value={recipeCalories} onChange={handleCaloriesChange}></input> Calories</div>
                </div>
            </div>
            <label className="image-container">
                <div className="icon-on-image"><div className="photo-icon-background"><MdModeEdit /></div></div>
                <img className="recipe-image" src={image} alt="Recipe"/>
                <input className="hide-element" type="file" name="myfile" accept="image/*" onChange={e => handleImageUpload(e)}/>
            </label>
            <textarea placeholder="Write your recipe here" className="recipe-instructions-container recipe-instructions-styling" value={recipeSteps} onChange={handleInstructionsChange}></textarea>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients<button className="edit-ingredients-button" onClick={showHidePopup}><MdModeEdit className="edit-ingredients-icon"/></button></div>
                <div className="ingredients-list">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
        </>
    );
}

export default RecipeEditing;