import React, { useEffect, useState } from "react";
import "./RecipeViewingSearch.css";
import { MdAccountBox, MdHourglassTop} from "react-icons/md";
import { IoMdArrowRoundBack, IoMdSave  } from "react-icons/io";
import { FaBicycle } from "react-icons/fa";

function RecipeViewingSearch({ aRecipe, onBack, onSave}) {    
    const [amounts, setAmounts] = useState([]);
    const [recipeIngredients, setIngredients] = useState([]);

    useEffect(() => {
        const recipeIngredients = aRecipe.ingredients.split(",");
        const recipeMeasuremnents = aRecipe.measuremnents.split(",");
        setAmounts(recipeMeasuremnents)
        setIngredients(recipeIngredients)
    }, [aRecipe])

    
    return (
        <div className="recipe-grid">
            <div className="title-container">
                <h1 className="align-icons-title">
                    {aRecipe?.title}
                    <button className="back-button" onClick={onBack}><IoMdArrowRoundBack className="header-icon-style"/></button>
                    <button className="save-button" onClick={onSave}><IoMdSave className="header-icon-style"/></button>
                </h1>
                    <div className="align-icon-format icon-spacing">
                        <MdAccountBox /> 
                        <div>
                            Author: {aRecipe?.author}
                        </div>
                    </div>
                    <div className="cooktime-calories-row">
                        <div className="icon-spacing-cal">
                            <div className="align-icon-format icon-spacing-cal"><MdHourglassTop className="icon-background"/>
                                <div>  {aRecipe?.prepTime} Minutes </div>
                            </div>
                        </div>
                        <div className="icon-spacing-cal">
                            <div className="align-icon-format icon-spacing-cal"><FaBicycle className="icon-background"/>
                                <div>{aRecipe?.calories} Calories</div>
                            </div>
                        </div>
                    </div>
            </div>
            <img className="the-recipe-image" src={aRecipe?.image} alt="Recipe"></img>
            <div className="container-for-instructions">
            <div className="instruction-text" dangerouslySetInnerHTML={{ __html: aRecipe?.instructions.replace(/\n/g, '<br>')
 }} />
            </div>
            <img className="recipe-image" src={aRecipe?.image}></img>
            <div className="recipe-instructions-container">{aRecipe?.steps}</div>
            <div className="ingredients-container" >
                <div className="ingredients-header">Ingredients</div>
                <div className="ingredients-list">{recipeIngredients.map((ingredient, index) => (<div key={index}>{("null" !== amounts[index]) ? amounts[index] : ""} {ingredient}</div>))}</div>
            </div>
        </div>
    );
}

export default RecipeViewingSearch;

//<div className="instruction-text">
                    
   //                 <TextWithLineBreaks className="instruction-text" text= {aRecipe?.instructions} />
     //           </div>