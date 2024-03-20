import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./AddMealPlan.css";
import AddMealPlanRecipe from "./AddMealPlanRecipe";

function AddMealPlan({ isOpen, onClose }) {

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [recipeView, setRecipeView] = useState('uploaded');
    const [recipeID, setRecipeID] = useState('');

    useEffect(() => {
        axios
            // .get(`http://localhost:8080/getSavedRecipes/${userID}`) // This is for when userID is implemented
            .get(`http://localhost:8080/getSavedRecipes/1`)
            .then((res) => {
                setSavedRecipes(res.data ? res.data : []);
            })
            console.log(savedRecipes);
    }, [isOpen]);

    useEffect(() => {
        axios
            // .get(`http://localhost:8080/getRecipes/${userID}`) // This is for when userID is implemented
            .get(`http://localhost:8080/getRecipes/1`)
            .then((res) => {
                setUploadedRecipes(res.data ? res.data : []);
            })
            console.log(uploadedRecipes);
    }, [isOpen]);


    const handleBreakfastToggle = () => {

        if (!breakfast){
            setBreakfast(true)
            setLunch(false)
            setDinner(false)
            console.log('breakfast');
        }
    };

    const handleLunchToggle = () => {

        if (!lunch){
            setBreakfast(false)
            setLunch(true)
            setDinner(false)
            console.log('lunch');
        }
    };

    const handleDinnerToggle = () => {

        if (!dinner){
            setBreakfast(false)
            setLunch(false)
            setDinner(true)
            console.log('dinner');
        }
    };

    const addMeal = () => {
        console.log("Add Meal");
        onClose();
    }

    const searchMeal = () => {
        console.log("Search Meal");
    }   

    const setView = () => {
        if (recipeView === 'uploaded') {
            setRecipeView('saved');
        } else {
            setRecipeView('uploaded');
        }
    }

    const testid = (recipeID) => {
        console.log(recipeID);
    }


    return (
        <Fragment>
            {isOpen && (
                <div className="overlay">
                <div className="overlay__background" onClick={onClose} />
                <div className="overlay__container">
                    <div className="overlay__controls">
                        <button className="overlay__close" type="button" onClick={onClose}>
                            X
                        </button>
                        <input id="text-input" type="text" placeholder="Search" onSubmit={searchMeal}/>
                    </div>
                    <div className="overlay__view">
                        <button id="view-toggle" onClick={setView}>
                            { recipeView === 'uploaded' ? "Show Saved Recipes" : "Show Uploaded Recipes"}
                        </button>
                        <div className="recipe-viewer">
                            { recipeView === 'uploaded' ? 
                                // show uploaded recipes
                                (<div>
                                    {uploadedRecipes.map((recipe, index) => (
                                        <AddMealPlanRecipe key={index} recipe={recipe} index={index} setRecipeID={testid}/>
                                    ))}
                                </div>) 

                                :
                                // show saved recipes
                                (<div>
                                    {savedRecipes.map((recipe, index) => (
                                        <AddMealPlanRecipe key={index} recipe={recipe} index={index} setRecipeID={testid}/>
                                    ))}
                                </div>)

                            }
                        </div>
                        <div className="add-controls">
                            <div id="type-input">
                                <div id="text">What is this meal for?</div>
                                <div className="carousel-options">
                                    <div className={breakfast ? ("c-option carousel-hightlight alata-regular carousel-hightlight-to-none") : ("c-option carousel-inverse alata-regular")}
                                    onClick={handleBreakfastToggle} > Breakfast </div>
                                    <div className={lunch ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleLunchToggle} > Lunch </div>
                                    <div className={dinner ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleDinnerToggle} > Dinner </div>
                                </div>
                            </div>
                            <button id="add-Button" onClick={addMeal}>Add to Calendar</button>
                            <div></div>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </Fragment>
    );
}

export default AddMealPlan;