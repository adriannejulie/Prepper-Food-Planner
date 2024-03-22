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
        <>
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
        </>
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
                "description" : "Yummy Buttermilk pancakes tr4heta[ojsiofndposnbvotiejokbn vbfjohgiepgjnvcbviepdojvnchb0psdnb AJHDVHJAWVDHJAWJHDVKHWVKDVJAHWDVGHJAWVD JHAWV DJH WHJKD VHKBWKAHBDHKAWBDKHJAWVDHKAVWDKHJAVW DHKAW DHJW VD AKHWVDKHAWVBDKHWVDKHWAVHKDVHKAWVHDVAWVDHKWAVDHJKA WDMNAV SJHDVWAKHDVBAJHVZ DJHAWVDHKAWVD HKV",
                "steps" : "1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.",
                "duration" : "30",  
                "calories" : "210",
                "author" : "Harry Potter",
                "instructions": `
                Vegetable Lasagna\n\nIngredients:\n\n- 12 lasagna noodles\n- 
                2 tablespoons olive oil\n- 1 onion, finely chopped\n- 3 cloves garlic, minced\n- 1 red bell pepper, diced\n- 1 yellow bell pepper, diced\n- 1 zucchini, diced\n- 1 yellow squash, diced\n- 
                1 cup mushrooms, sliced\n- 1 teaspoon dried oregano\n- 1 teaspoon dried basil\n- 1/2 teaspoon dried thyme\n- Salt and pepper to taste\n- 2 (24-ounce) jars marinara sauce\n- 1 (15-ounce) 
                container ricotta cheese\n- 1/2 cup grated Parmesan cheese\n- 2 cups shredded mozzarella cheese\n- Fresh basil leaves, for garnish\n\nInstructions:\n\n1. Preheat your oven to 375°F (190°C). 
                Grease a 9x13 inch baking dish with olive oil or non-stick spray.\n\n2. Cook the lasagna noodles according to the package instructions until they are al dente. Drain and set aside.\n\n3. In a 
                large skillet, heat the olive oil over medium heat. Add the chopped onion and garlic, and sauté until they are softened and fragrant, about 3-4 minutes.\n\n4. Add the diced bell peppers, 
                zucchini, yellow squash, and mushrooms to the skillet. Cook, stirring occasionally, until the vegetables are tender, about 8-10 minutes.\n\n5. Stir in the dried oregano, basil, thyme, salt,
                and pepper, and cook for an additional 2 minutes. Remove the skillet from the heat and set aside.\n\n6. Spread a thin layer of marinara sauce on the bottom of the prepared baking dish. Place
                4 lasagna noodles on top of the sauce, slightly overlapping them.\n\n7. Spread half of the ricotta cheese over the noodles, followed by half of the vegetable mixture. Sprinkle with 1/3 of
                the Parmesan cheese and 1/3 of the mozzarella cheese.\n\n8. Repeat the layers with the remaining noodles, ricotta cheese, vegetable mixture, Parmesan cheese, and mozzarella cheese.\n\n9. 
                Top the lasagna with the remaining marinara sauce, making sure to cover the noodles completely.\n\n10. Cover the baking dish with aluminum foil and bake in the preheated oven for 30 minutes.
                \n\n11. Remove the foil and bake for an additional 15 minutes, or until the cheese is melted and bubbly.\n\n12. Remove the lasagna from the oven and let it cool for 10 minutes before slicing.
                \n\n13. Garnish with fresh basil leaves before serving. Enjoy your delicious vegetable lasagna!\n\nThis vegetable lasagna is perfect for a cozy family dinner or for entertaining guests. 
                Serve it with a side salad and some garlic bread for a complete and satisfying meal.
                `
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
      )
    
}

export default FindRecipes;
