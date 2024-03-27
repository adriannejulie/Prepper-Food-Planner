import React, { useEffect, useState } from "react";
import "./EditIngredient.css";
import { FaTrash } from "react-icons/fa";


function EditIngredient({ ingredient, amount, deleteList, changedAmount, changedIngredient, addToDeleteList, spot, displayRemove}) {
    const [addedIngredient, setIngredient] = useState(ingredient);
    const [measurement, setMeasurement] = useState(amount);

    const handleAmountChange = (e) => {
        setMeasurement(e.target.value);
    }


    const handleIngredientChange = (e) => {
        setIngredient(e.target.value);
    }

    
    return (
        (displayRemove) ? (
        <div className="ingredient-row alata-font ">
            <input className="amount-box" value={("null" !== measurement) ? measurement : ""} onChange={(e) => {handleAmountChange(e); changedAmount(e.target.value, spot);}}></input>
                <div className="dash-box">-</div>
                <input className="ingredient-box" value={addedIngredient} onChange={(e) => {handleIngredientChange(e); changedIngredient(e.target.value, spot)}}></input>
                <FaTrash className="trash" onClick={() => addToDeleteList(spot)}/>
        </div>
        ) : (
        <div className="ingredient-row alata-font">
        <input className="amount-box red" value={("null" !== measurement) ? measurement : ""} onChange={(e) => {handleAmountChange(e); changedAmount(e.target.value, spot);}}></input>
            <div className="dash-box">-</div>
            <input className="ingredient-box red" value={addedIngredient} onChange={(e) => {handleIngredientChange(e); changedIngredient(e.target.value, spot)}}></input>
            <FaTrash className="trash" onClick={() => addToDeleteList(spot)}/>
        </div>

        )
    );
}

export default EditIngredient;


