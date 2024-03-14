import React, { useEffect, useState } from "react";
import "./EditIngredient.css";


function EditIngredient({ ingredient, amount, changedAmount, changedIngredient, spot }) {
    const [measurement, setMeasurement] = useState(amount);
    const [addedIngredient, setIngredient] = useState(ingredient);


    const handleAmountChange = (e) => {
        setMeasurement(e.target.value);
    }


    const handleIngredientChange = (e) => {
        setIngredient(e.target.value);
    }
    
    
    return (
        <div className="ingredient-row">
            <input className="amount-box" value={("null" !== measurement) ? measurement : ""} onChange={(e) => {handleAmountChange(e); changedAmount(e.target.value, spot);}}></input>
                <div className="dash-box">-</div>
                <input className="ingredient-box" value={addedIngredient} onChange={(e) => {handleIngredientChange(e); changedIngredient(e.target.value, spot)}}></input>
        </div>
    );
}

export default EditIngredient;


