import React, {useState, useEffect} from "react";
import "./MealPlanner.css";
import MealPlan from "../components/MealPlan.js";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AddMealPlan from "../components/AddMealPlan.js";
import axios from 'axios';

function MealPlanner() {

    const [value, setValue] = useState(new dayjs());
    const [meals, setMeals] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(value.format("YYYY-MM-DD"));
    
                const response = await axios.get(`http://localhost:8080/getMealPlans/${value.format("YYYY-MM-DD")}`); // needs to be changed for userID
                const data = response.data ? response.data : [];
                
                setMeals(data);
                setMealTypes(data.map((meal) => meal.type));
                console.log(data);

            } catch (error) {
                console.error("Error fetching meal plans:", error);
            }
        };
    
        fetchData();
    }, [value]);

      useEffect(() => {
        console.log("Get Recipe");
        const fetchRecipes = async () => {
            const newRecipes = [];
            for (let i = 0; i < meals.length; i++) {
                const res = await axios.get(`http://localhost:8080/getRecipe/${meals[i].recipeID}`);
                newRecipes.push(res.data ? res.data : {});
                console.log(res);
            }
            setRecipes(newRecipes);
            console.log(newRecipes);
        };
        fetchRecipes();
    }, [meals]);

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
        window.location.reload();
    }

    return (
        <div className="meal-planner">
            <AddMealPlan isOpen={showOverlay} onClose={toggleOverlay} date={value.format("YYYY-MM-DD")}/>
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
                        {recipes.map((recipe, index) => {
                            return <MealPlan key={index} recipe={recipe} type={mealTypes[index]}></MealPlan>
                        })}
                    </div>)
                }

            </div>
        </div>
    );
}

export default MealPlanner;
