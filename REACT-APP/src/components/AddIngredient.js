import React, { useEffect, useState } from "react";
import "./AddIngredient.css";
import { MdOutlineClose, MdSave } from "react-icons/md";
import EditIngredient from "./EditIngredient.js";

function AddIngredient({ hidePopup, ingredients, amounts, saveIngredients}) {
    const [recipesMeasurements, setRecipesMeasurements] = useState(amounts);
    const [recipesIngredients, setRecipesIngredients] = useState(ingredients);

    const [deleteList, setDeleteList] = useState([]);

    const addNewIngredient = () => {
        setRecipesMeasurements([...recipesMeasurements, ""]);
        setRecipesIngredients([...recipesIngredients, ""]);
    }


    const handleChangedIngredient = (changedIngredient, i) => {
        var newIngredients = recipesIngredients;
        newIngredients[i] = changedIngredient;
        setRecipesIngredients(newIngredients);
    }


    const handleChangedMeasurement = (changedMeasurement, i) => {
        var newMeasurements = recipesMeasurements;
        newMeasurements[i] = changedMeasurement;
        setRecipesMeasurements(newMeasurements);
    }
    const findElement = (arr, target) => arr.indexOf(target);

    const addToDeleteList = (spot) => {

        

        const index = findElement(deleteList, spot)

        //Can find it
        if (index !== -1){
            setDeleteList(deleteList.filter(item => item !== spot));

            //Can't
        } else {
            setDeleteList([...deleteList, spot])
        }

        

    }

    const saveAndHidePopUp = () => {

        saveIngredients(recipesMeasurements, recipesIngredients, deleteList); 
        hidePopup()

    }


    useEffect(() => {

        console.log(deleteList)
    }, [deleteList])


    return (
        <div className="add-ingredient-popup">
            <div className="ingredient-container">
                <div className="buttons-container">
                    <div className="hide-buttons">
                        <button className="icon-buttons save-button" data-testid="saveIngredients"><MdSave className="icon-style"/></button>
                        <button className="icon-buttons close-button" onClick={hidePopup} data-testid="closeIngredientsPopup"><MdOutlineClose className="icon-style"/></button>
                    </div>
                    <button className="add-ingredient-button" onClick={addNewIngredient}>Add an Ingredient</button>
                    <div>
                        <button className="icon-buttons save" onClick={() => {saveAndHidePopUp()}}><MdSave className="icon-style"/></button>
                        <button className="icon-buttons close" onClick={hidePopup}><MdOutlineClose className="icon-style"/></button>
                    </div>
                </div>
                <div className="ingredient-list">
                    {
                    recipesIngredients.map((ingredient, index) => (
                    
                        //If you can find the element in the delete list
                        (findElement(deleteList, index) === -1) ?
                            (<EditIngredient 
                                ingredient={ingredient} 
                                amount={recipesMeasurements[index]}
                                deleteList = {deleteList}
                                changedAmount={handleChangedMeasurement} 
                                changedIngredient={handleChangedIngredient} 
                                addToDeleteList={addToDeleteList}
                                spot={index} 
                                key={index}
                                displayRemove={true}/>
                            )
                            : 
                            (

                                <EditIngredient 
                                ingredient={ingredient} 
                                amount={recipesMeasurements[index]}
                                deleteList = {deleteList}
                                changedAmount={handleChangedMeasurement} 
                                changedIngredient={handleChangedIngredient} 
                                addToDeleteList={addToDeleteList}
                                spot={index} 
                                key={index}
                                displayRemove={false}/>
                            )
                    ))
                    }
                                    
                </div>
            </div>
        </div>
    );
}

export default AddIngredient;