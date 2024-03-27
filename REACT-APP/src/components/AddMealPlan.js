import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./AddMealPlan.css";
import AddMealPlanRecipe from "./AddMealPlanRecipe";
import { useUser } from "./UserContext";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toast, ToastContainer } from 'react-toastify';

function AddMealPlan({ isOpen, onClose, editMode, mealPlanID }) {

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [uploadedRecipes, setUploadedRecipes] = useState([]);
    const [recipeView, setRecipeView] = useState('uploaded');
    const [recipeID, setRecipeID] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const { user, setUser } = useUser();
    const [activeRecipeID, setActiveRecipeID] = useState('');
    const [value, setValue] = useState(new dayjs());
    const [alignment, setAlignment] = useState();

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
      console.log(alignment);
    };


    // functions that require APIs
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
        console.log(alignment)

        if (alignment){
            if (recipeID === '' || alignment === '') {
                toast.error("Please select a recipe and a meal type.");
                return;
            }
            if (editMode) {
                console.log(`Edit Meal ${value.format('YYYY-MM-DD')}`);
                axios
                    .put(`http://localhost:8080/editMealPlan/${mealPlanID}`, {
                        recipeID: recipeID,
                        type: alignment,
                        userID: user.userID, 
                        date: value.format('YYYY-MM-DD'),
                        mealPlanID: mealPlanID
                    })
                    .then((res) => {
                        console.log(res);
                        console.log(`Edit Meal ${value.format('YYYY-MM-DD')}`);
                    })
            }
            else {
            console.log(`Add Meal ${value.format('YYYY-MM-DD')}`);
            axios
                .post(`http://localhost:8080/addMealPlan`, {
                    recipeID: recipeID,
                    type: alignment,
                    userID: user.userID, 
                    date: value.format('YYYY-MM-DD')
                })
                .then((res) => {
                    console.log(res);
                    console.log(`Add Meal ${value.format('YYYY-MM-DD')}`);
                })
            }
            window.location.reload();
            onClose();
        } else {
            toast.error("Please select a recipe and a meal type.");
            return;

        }
    }

    useEffect(() => {
        console.log(alignment);
    }, [alignment]);

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

    const handleRecipeClick = (recipeID) => {
        setActiveRecipeID(recipeID);
    };

    return (
        <Fragment>
            <ToastContainer position="top-center" autoClose={2000}/>
            {isOpen ? (
                <div className="overlay">
                    <div className="overlay__background" onClick={onClose} />
                    <div className="overlay__container">
                        <div className="overlay__view">
                            <input id="text-input" type="text" placeholder="Search" value={searchValue} onChange={handleSearchChange}/>
                            <div className="section-container">
                                <div id="section">
                                    <div id="recipes-container">
                                        { recipeView === 'uploaded' ? 
                                            // show uploaded recipes
                                            (<div class="recipes">
                                                {uploadedRecipes.map((recipe, index) => (
                                                    <AddMealPlanRecipe
                                                        key={index}
                                                        recipe={recipe}
                                                        index={index}
                                                        setRecipeID={setRecipeID}
                                                        isSearched={searchValue}
                                                        activeRecipeID={activeRecipeID} 
                                                        onRecipeClick={handleRecipeClick} 
                                                    />
                                                ))}
                                            </div>) 

                                            :
                                            // show saved recipes
                                            (<div class="recipes">
                                                {savedRecipes.map((recipe, index) => (
                                                    <AddMealPlanRecipe
                                                        key={index}
                                                        recipe={recipe}
                                                        index={index}
                                                        setRecipeID={setRecipeID}
                                                        isSearched={searchValue}
                                                        activeRecipeID={activeRecipeID} 
                                                        onRecipeClick={handleRecipeClick} 
                                                    />
                                                ))}
                                            </div>)
                                        }
                                    </div>
                                    <button id="view-toggle" onClick={setView}>
                                        { recipeView === 'uploaded' ? "Show Saved Recipes" : "Show Uploaded Recipes"}
                                    </button>
                                </div>
                                <div id="section">
                                    <div id="text">Choose a Date</div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} style={{"height": "50vh"}}/>
                                    </LocalizationProvider> 
                                    <div id="type-input">
                                        <div id="text">What is this meal for?</div>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleChange}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value="breakfast">Breakfast</ToggleButton>
                                            <ToggleButton value="lunch" >Lunch</ToggleButton>
                                            <ToggleButton value="dinner" >Dinner</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    <button id="add-Button" onClick={addMeal}>Add to Calendar</button>
                                </div>                     
                            </div>
                        </div>
                    </div>
                </div>
            )
        : null
        }
        </Fragment>
    );
}

export default AddMealPlan;