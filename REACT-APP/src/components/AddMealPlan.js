import { Fragment, useEffect, useState } from "react";

import "./AddMealPlan.css";

function AddMealPlan({ isOpen, onClose }) {

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // fetch recipes from database
    }, []);


    const handleBreakfastToggle = () => {

        if (!breakfast){
            setBreakfast(true)
            setLunch(false)
            setDinner(false)
        }
    };

    const handleLunchToggle = () => {

        if (!lunch){
            setBreakfast(false)
            setLunch(true)
            setDinner(false)
        }
    };

    const handleDinnerToggle = () => {

        if (!dinner){
            setBreakfast(false)
            setLunch(false)
            setDinner(true)
        }
    };

    const addMeal = () => {
        console.log("Add Meal");
        onClose();
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
                    <input id="text-input" type="text" placeholder="Search"/>
                </div>
                <div className="overlay__view">
                    <div className="recipe-viewer">
                        {recipes.length === 0 ?
                        
                            // no recipes found
                            (<div id="no-recipes-found">
                                <div id="text">No recipes found</div>
                            </div>)
                            
                            :
                            
                            // format when api works
                            // recipes found
                            (<div id="recipes-found">
                                <div id="recipes">
                                    {recipes.map((recipe, index) => {
                                        return <div key={index} className="recipe">{recipe}</div>
                                    })}
                                </div>
                            </div>)
                        }

                    </div>
                    <div className="add-controls">
                        <div id="text">What is this meal for?</div>
                        <div className="carousel-options">
                            <div className={breakfast ? ("c-option carousel-hightlight alata-regular carousel-hightlight-to-none") : ("c-option carousel-inverse alata-regular")}
                            onClick={handleBreakfastToggle} > Breakfast </div>
                            <div className={lunch ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleLunchToggle} > Lunch </div>
                            <div className={dinner ? ("c-option carousel-hightlight alata-regular") : ("c-option carousel-inverse alata-regular")} onClick={handleDinnerToggle} > Dinner </div>
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