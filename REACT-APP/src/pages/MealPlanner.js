import React, {useState, useEffect} from "react";
import "./MealPlanner.css";
import MealPlan from "../components/MealPlan.js";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AddMealPlan from "../components/AddMealPlan.js";

function MealPlanner() {

    const [value, setValue] = useState(new dayjs());
    const [meals, setMeals] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(value.format("YYYY-MM-DD"));

        // dummy data using for testing
        if (value.format("YYYY-MM-DD") === "2024-03-25") {
            setMeals(["Christmas Dinner", "Easter Lunch", "Thanksgiving Breakfast"]);
        }
        else {
            setMeals([]);
        }

        console.log(meals);
      }, [value]);

    // temp functions, functionality to be added
    const addMeal = () => {
        setShowOverlay(!showOverlay);
        console.log("Add Meal");
    }

    const findRecipes = () => {
        navigate("/find-recipes");
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    }

    return (
        <div className="meal-planner">
            <AddMealPlan isOpen={showOverlay} onClose={toggleOverlay} />
            <div className="section">
                <div id="section-calendar">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider> 
                </div>
                <button className="button" onClick={addMeal}>
                    <MdOutlineAddBox />
                    Add Meal
                </button>
                <button className="button" onClick={findRecipes}>
                    <MdSearch />
                    Find Recipes
                </button>
            </div>
            <div className="section">
                {
                    meals.length === 0 ? 

                    // no meals are planned on the selected date
                    (<div id="no-meals-planned">
                        No Meals Planned for Today
                    </div>)
                        
                    : 

                    // meals are planned on the selected date
                    (<div id="meals-planned">
                        {meals.map((meal, index) => {
                            return <MealPlan key={index} meal={meal}></MealPlan>
                        })}
                    </div>)
                }

            </div>
        </div>
    );
}

export default MealPlanner;
