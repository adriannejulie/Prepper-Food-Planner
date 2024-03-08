import React, {useState, useEffect} from "react";
import "./MealPlanner.css";
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

function MealPlanner() {

    const [value, setValue] = useState(new dayjs());

    useEffect(() => {
        console.log(value.format("YYYY-MM-DD"));
      }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </LocalizationProvider> 
    );
}

export default MealPlanner;
