import React, { useState, useEffect } from "react";
import "./FindRecipes.css";
import RecipeViewingSearch from "../components/RecipeViewingSearch.js";
import { MdAccountBox, MdHourglassTop } from "react-icons/md";
import { FaBicycle, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../components/UserContext";


function RecipeCard({ recipe, searchValue, handleClick }) {
  const containsSearch =
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchValue.toLowerCase());

    return (
        <>
            <div className={`foundRecipe ${!containsSearch ? 'hide' : ''}`} onClick={() => handleClick(recipe.recipeID)}>
            <img className="image" src={recipe.image} alt="Recipe"></img>
            <div className="top-container">
                <div className="title">{recipe.title}</div>
                <div className="author"><MdAccountBox className="icon-auth"/>{recipe.author}</div>
            </div>
            <div className="bottom-container">
                <div className="time"><MdHourglassTop className="icon-find"/>{recipe.prepTime} Minutes</div>
                <div className="calories"><FaBicycle className="icon-find"/>{recipe.calories} Calories</div>
            </div>
            </div>
        </>
    );
}

function FindRecipes() {
    const [searchValue, setSearchValue] = useState("");
    const [receivedRecipes, setReceivedRecipes] = useState(null);
    const [receivedRecipesAuth, setReceivedRecipesAuth] = useState(null);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [showRecipeViewing, setShowRecipeViewing] = useState(false);
    const [showAllRecipes, setShowAllRecipes] = useState(false);
    

    const { user, setUser } = useUser();


    useEffect(() => {

        if(receivedRecipes){

            const getAuthorPromise = async () => {
                try{
                    const fetchAuthorData = await Promise.all(

                        receivedRecipes.map(async (item) => {

                            const response = await axios.get(`http://localhost:8080/getUser/${item.userID}`)
                            const data = await response.data
                            const author =  data.firstName.concat(" ", data.lastName)

                            return {
                                ...item,
                                author: author
                            };
                            
                        })
                        
                        
                        
                    );
                    setReceivedRecipesAuth(fetchAuthorData);
                    
                } catch (err){
        
                    console.error(err)
                } 
            }
            getAuthorPromise()
        }
        
    }, [receivedRecipes])

    const loadPublicRecipes = async() => {
        try{
            const response = await axios.get('http://localhost:8080/getPublicRecipes', {
            });

            if (response.status === 200){

                setReceivedRecipes(response.data)

            
            }
        } catch (error){
            
            console.log(error)
        };
    }

    useEffect(() => {

        loadPublicRecipes()

    }, []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClickRecipe = (recipeId) => {
        setSelectedRecipeId(recipeId);
    };

    useEffect(() => {
        console.log(selectedRecipeId);
        if (selectedRecipeId) {
        setShowRecipeViewing(true);
        }
    }, [selectedRecipeId]);

    const handleBackToList = () => {
        setSelectedRecipeId(null);
        setShowRecipeViewing(false);
    };



    const handleSaveRecipe = () => {
        return;
        axios
        .post(`http://localhost:8080/addSavedRecipe`, {
            userID: user.id,
            recipeID: selectedRecipeId,
        })

        .then((res) => {
            console.log(res.data);
            console.log(res.status);
            if (res.status === 200) {
            alert("Recipe saved successfully");
            }
        })
        .catch((err) => {
            alert("Recipe already saved");
            console.log(err);
        });
    };

    useEffect(() => {

        if(receivedRecipesAuth){

            console.log(receivedRecipesAuth)
            setShowAllRecipes(true)
        }

    }, [receivedRecipesAuth])

    useEffect(() => {
        console.log(showAllRecipes)
    }, [showAllRecipes])


    return (
            <div className="container">
                {!showRecipeViewing && (
                    <div className="box">
                        <div className="search-wrapper">
                            <label htmlFor="search" className="browse-title"><FaSearch className="title-icon"/>Browse Recipes</label>
                            <input className="find-recipe-input" type="search" id="search" value={searchValue} onChange={handleSearchChange}/>
                        </div>
                        
                        <div className="recipeContainer">
                            {receivedRecipesAuth && receivedRecipesAuth.map(recipe => (
                                <RecipeCard key={recipe.recipeID} recipe={recipe} searchValue={searchValue} handleClick={handleClickRecipe} />
                            ))}
                        </div>
                    </div>
                )}
                {showRecipeViewing && (
                    <RecipeViewingSearch aRecipe={receivedRecipesAuth.find(recipe => recipe.recipeID === selectedRecipeId)} onBack={handleBackToList} onSave={handleSaveRecipe}/>
                )}

            </div>
        )
    

    }

export default FindRecipes;
