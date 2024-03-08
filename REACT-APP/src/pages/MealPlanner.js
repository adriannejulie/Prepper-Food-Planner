import React, {useState} from "react";
import "./MealPlanner.css";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MealPlanner() {

    const [value, setValue] = useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
        </LocalizationProvider> 
    );
    // return (
    //     <div className="container">
    //             MealPlanner
    //     </div>
    // );
}

export default MealPlanner;
