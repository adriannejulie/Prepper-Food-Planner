import React, {useState, useEffect} from "react";
import "./MealPlanner.css";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";

function MealPlanner() {

    const [value, setValue] = useState(new dayjs());

    useEffect(() => {
        console.log(value.format("YYYY-MM-DD"));
      }, [value]);

    // temp functions, functionality to be added
    const addMeal = () => {
        console.log("Add Meal");
    }

    const findRecipes = () => {
        console.log("Find Recipes");
    }

    return (
        <div className="meal-planner">
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
                SUSSY
            </div>
        </div>
    );
}

export default MealPlanner;
