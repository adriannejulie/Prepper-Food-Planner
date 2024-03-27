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
import { useUser } from "../components/UserContext";

function MealPlanner() {

    const [value, setValue] = useState(new dayjs());
    const [meals, setMeals] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(value.format("YYYY-MM-DD"));
    
                const response = await axios.get(`http://localhost:8080/getMealPlans/${value.format("YYYY-MM-DD")}/${user.userID}`); 
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
            <AddMealPlan isOpen={showOverlay} onClose={toggleOverlay} editMode={false} mealPlanID={null}/>
            <div id="plannerSection">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        value={value} 
                        onChange={(newValue) => setValue(newValue)} 
                        style={{"height": "50vh"}}/>
                </LocalizationProvider> 
                <button className="button" onClick={addMeal}>
                    <MdOutlineAddBox style={{height: "5vh", color:"white"}}/>
                    <p style={{color: "white"}}>Add Meal</p>
                </button>
                <button className="button" onClick={findRecipes}>
                    <MdSearch style={{height: "5vh", color:"white"}}/>
                    <p style={{color: "white"}}>Find Recipes</p>
                </button>
            </div>
            <div id="mealPlans-container">
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
                            return <MealPlan key={index} meal={meal} index={index}></MealPlan>
                        })}
                    </div>)
                }

            </div>
        </div>
    );
}

export default MealPlanner;
