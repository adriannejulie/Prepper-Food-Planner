import React, { useState, useEffect } from "react";
import "./FindRecipes.css";
import RecipeViewingSearch from "../components/RecipeViewingSearch.js";
import { MdAccountBox, MdHourglassTop } from "react-icons/md";
import { FaBicycle, FaSearch } from "react-icons/fa";
import axios from "axios";

function RecipeCard({ recipe, searchValue, handleClick }) {
  const containsSearch =
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchValue.toLowerCase());

    return (
      <div>
        <div className={`foundRecipe ${!containsSearch ? 'hide' : ''}`} onClick={() => handleClick(recipe.recipeID)}>
            <img className="image" src={recipe.image}></img>
            <div className="top-container">
                <div className="title">{recipe.title}</div>
                <div className="author"><MdAccountBox className="icon-auth"/>{recipe.author}</div>
            </div>
            <div className="bottom-container">
                <div className="time"><MdHourglassTop className="icon-find"/>{recipe.duration} Minutes</div>
                <div className="calories"><FaBicycle className="icon-find"/>{recipe.calories} Calories</div>
            </div>
        </div>
      <div className="bottom-container">
        <div>
          <div className="body">{recipe.description}</div>
        </div>
        <div className="row-container">
          <div className="time">
            <MdHourglassTop className="icon-find" />
            {recipe.duration} Minutes
          </div>
          <div className="calories">
            <FaBicycle className="icon-find" />
            {recipe.calories} Calories
          </div>
        </div>
      </div>
    </div>
  );
}

function FindRecipes() {
  const [searchValue, setSearchValue] = useState("");
  const [receivedRecipes, setReceivedRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showRecipeViewing, setShowRecipeViewing] = useState(false);

    useEffect(() => {
        const sampleRecipes = [
            {
                "recipeID": 1,
                "image" : "https://res.cloudinary.com/dhenatkk5/image/upload/v1710943320/qyn2z07ophdpulzskcxf.png",
                "title" : "Buttermilk Pancakes 1",
                "measurements" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes tr4heta[ojsiofndposnbvotiejokbn vbfjohgiepgjnvcbviepdojvnchb0psdnb ",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            },
            {
                "recipeID": 2,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 2",
                "measurements" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 3,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 3",
                "measurements" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 4,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 4",
                "measurements" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Chris Tanev"
            },
            {
                "recipeID": 5,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 1",
                "measurements" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            },
            {
                "recipeID": 6,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 2",
                "measurements" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 7,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 3",
                "measurements" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 8,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 4",
                "measurements" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Chris Tanev"
            },
            {
                "recipeID": 9,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 1",
                "measurements" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            },
            {
                "recipeID": 10,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 2",
                "measurements" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 11,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 3",
                "measurements" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 12,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 4",
                "measurements" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Chris Tanev"
            },
            {
                "recipeID": 13,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 1",
                "measurements" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            },
            {
                "recipeID": 14,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 2",
                "measurements" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 15,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 3",
                "measurements" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 16,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 4",
                "measurements" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Chris Tanev"
            },
            {
                "recipeID": 17,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 1",
                "measurements" : "1 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            },
            {
                "recipeID": 18,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 2",
                "measurements" : "2 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 19,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 3",
                "measurements" : "3 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter"
            } ,
            {
                "recipeID": 20,
                "image" : "https://res.cloudinary.com/dgabkajhe/image/upload/v1709337647/Screenshot_425_asbwjt.png",
                "title" : "Buttermilk Pancakes 4",
                "measurements" : "4 cup,1 tsp,1 tsp,1,1 1/8 cup,2 tbsp,null",
                "ingredients" : "flour, salt, baking soda, large egg, buttermilk, butter(melted), Syrup(Optional)",
                "description" : "Yummy Buttermilk pancakes",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Chris Tanev"
            }
        ];
        setReceivedRecipes(sampleRecipes);
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
    axios
      .post(`http://localhost:8080/addSavedRecipe`, {
        userID: 2,
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
    return (
      <div>
        <div className="container">
            {!showRecipeViewing && (
                <div className="box">
                    <div className="search-wrapper">
                        <label htmlFor="search" className="browse-title"><FaSearch className="title-icon"/>Browse Recipes</label>
                        <input className="find-recipe-input" type="search" id="search" value={searchValue} onChange={handleSearchChange}/>
                    </div>
                    
                    <div className="recipeContainer">
                        {receivedRecipes.map(recipe => (
                            <RecipeCard key={recipe.recipeID} recipe={recipe} searchValue={searchValue} handleClick={handleClickRecipe} />
                        ))}
                    </div>
                </div>
            )}
            {showRecipeViewing && (
                <RecipeViewingSearch aRecipe={receivedRecipes.find(recipe => recipe.recipeID === selectedRecipeId)} onBack={handleBackToList} onSave={handleSaveRecipe}/>
            )}

        </div>
      </div>
  );
}

export default FindRecipes;
