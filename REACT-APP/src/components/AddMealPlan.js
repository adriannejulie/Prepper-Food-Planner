import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./AddMealPlan.css";
import AddMealPlanRecipe from "./AddMealPlanRecipe";
import { useUser } from "./UserContext";

function AddMealPlan({ isOpen, onClose, date }) {

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [recipeView, setRecipeView] = useState('uploaded');
    const [recipeID, setRecipeID] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const { user, setUser } = useUser();


    // functions that require APIs
    // userID = 1 is a placeholder for when userID is implemented
    useEffect(() => {
        axios
            .get(`http://localhost:8080/getSavedRecipes/${user.userID}`)
            .then((res) => {
                setSavedRecipes(res.data ? res.data : []);
            })

        console.log(savedRecipes);
    }, [isOpen]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/getRecipes/${user.userID}`) 
            .then((res) => {
                setUploadedRecipes(res.data ? res.data : []);
            })
        console.log(uploadedRecipes);
    }, [isOpen]);

    const addMeal = () => {
        console.log(`Add Meal ${date}`);
        axios
            .post(`http://localhost:8080/addMealPlan`, {
                recipeID: recipeID,
                type: breakfast ? "breakfast" : lunch ? "lunch" : "dinner",
                userID: 1, // This is for when userID is implemented
                date: date
            })
            .then((res) => {
                console.log(res);
                console.log(`Add Meal ${date}`);
            })

        onClose();
    }

    useEffect(() => {
        console.log(recipeID);
    }, [recipeID]);


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

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        console.log(searchValue);
    };

    const setView = () => {
        if (recipeView === 'uploaded') {
            setRecipeView('saved');
        } else {
            setRecipeView('uploaded');
        }
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
                        <input id="text-input" type="text" placeholder="Search" value={searchValue} onChange={handleSearchChange}/>
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
                                        <AddMealPlanRecipe key={index} recipe={recipe} index={index} setRecipeID={setRecipeID} isSearched={searchValue}/>
                                    ))}
                                </div>) 

                                :
                                // show saved recipes
                                (<div>
                                    {savedRecipes.map((recipe, index) => (
                                        <AddMealPlanRecipe key={index} recipe={recipe} index={index} setRecipeID={setRecipeID} isSearched={searchValue}/>
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