DROP DATABASE IF EXISTS prepper;
CREATE DATABASE Prepper;
USE Prepper;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	userID int NOT NULL auto_increment,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL, 
	isGoogle boolean NOT NULL,
    
    PRIMARY KEY(userID)
);

INSERT INTO  users  ( email ,  password ,  isGoogle )
VALUES ('google@gmail.com', '123456', true);
INSERT INTO  users  ( email ,  password ,  isGoogle )
VALUES ('noGoogle@example.com', 'password123', false);

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes  (
	 recipeID  int NOT NULL auto_increment,
	--  image  varchar(255), -- do they have to upload an image? or it can be blank?
	 title  varchar(255) NOT NULL,
	 ingredients  varchar(255) NOT NULL,
	 description  varchar(255) NOT NULL, 
	 steps  varchar(10000) NOT NULL, 
	 duration  int NOT NULL,
	 calories  int NOT NULL,
	 saves  int NOT NULL,
	 isPublic  boolean NOT NULL,
     
     PRIMARY KEY(recipeID)
);

INSERT INTO  recipes  ( title ,  ingredients ,  description ,  steps ,  duration ,  calories ,  saves ,  isPublic )
VALUES ('Chicken Alfredo Pasta', '6 ounce fettuccine pasta, 8 ounce cream cheese, 6 tbsp butter, 1/2 cup milk, 1/2 tsp garlic powder, 2 chicken breast(cooked)', 'Delicious homemade chicken alfredo', '1. Boil pasta, cook for 8-10 minutes 2. While pasta is cooking, melt cream cheese and butter in skillet over low heat. Stir until smooth. Stir in milk, and season with garlic powder, salt and pepper. Simmer for 3 minutes, stirring constantly 3. Mix in chicken, cook 3 minutes over medium heat, simmer 5 minutes, server of fettuccine', 40, 645, 0, true);

INSERT INTO  recipes  ( title ,  ingredients ,  description ,  steps ,  duration ,  calories ,  saves ,  isPublic )
VALUES ('Apple Spinach Salad', '2 cups baby spinach, 1 medium apple(sliced), 2 tbsp celery(chopped), 2 tbsp pecans, 2 tbsp dressing', 'Healthy green salad', '1. Toss ingredients with dressing in a large bowl', 5, 100, 0, true);

INSERT INTO  recipes  ( title ,  ingredients ,  description ,  steps ,  duration ,  calories ,  saves ,  isPublic )
VALUES ('Buttermilk Pancakes', '1 cup flour, 1 tsp salt, 1 tsp baking soda, 1 large egg, 1.125 cup buttermilk, 2 tbsp butter(melted), Syrup(Optional)', 'Yummy Buttermilk pancakes', '1. Preheat and grease skillet 2. Mix flour, salt, baking soda. Then add egg, buttermilk, and butter. Batter should look thick, spongy, and puffy.  3. Drop 1/3 cup of batter, spread lightly, cook until lightly browned on each side, 1-2 minutes per side.', 30, 210, 0, true);

DROP TABLE IF EXISTS savedRecipes;
CREATE TABLE  savedRecipes  (
	 userID  int NOT NULL,
	 recipeID  int NOT NULL,
     
     FOREIGN KEY(userID) REFERENCES users(userID),
     FOREIGN KEY(recipeID) REFERENCES recipes(recipeID)
);

INSERT INTO  savedRecipes  ( userID ,  recipeID )
VALUES (1, 1);
INSERT INTO  savedRecipes  ( userID ,  recipeID )
VALUES (1, 2);

DROP TABLE IF EXISTS mealPlan;
CREATE TABLE  mealPlan  (
	 userID  int NOT NULL,
	 recipeID  int NOT NULL,
	 date  date NOT NULL,
	 mealType  ENUM('breakfast', 'lunch', 'dinner') NOT NULL,
     
	 FOREIGN KEY(userID) REFERENCES users(userID),
     FOREIGN KEY(recipeID) REFERENCES recipes(recipeID)
);

INSERT INTO  mealPlan  ( userID ,  recipeID ,  date ,  mealType )
VALUES (1, 3, '2021-03-01', 'breakfast');
INSERT INTO  mealPlan  ( userID ,  recipeID ,  date ,  mealType )
VALUES (1, 1, '2021-03-01', 'lunch');
INSERT INTO  mealPlan  ( userID ,  recipeID ,  date ,  mealType )
VALUES (1, 2, '2021-03-01', 'dinner');
INSERT INTO  mealPlan  ( userID ,  recipeID ,  date ,  mealType )
VALUES (2, 3, '2021-03-02', 'breakfast');
INSERT INTO  mealPlan  ( userID ,  recipeID ,  date ,  mealType )
VALUES (2, 2, '2021-03-05', 'lunch');

DELIMITER //

CREATE TRIGGER deleteUser
BEFORE DELETE ON users FOR EACH ROW
BEGIN
	DELETE FROM savedRecipes WHERE userID = OLD.userID;
    DELETE FROM mealPlan WHERE userID = OLD.userID;
END;

//

DELIMITER ;

DELIMITER //

CREATE TRIGGER deleteRecipe
BEFORE DELETE ON recipes FOR EACH ROW
BEGIN
	DELETE FROM savedRecipes WHERE recipeID = OLD.recipeID;
    DELETE FROM mealPlan WHERE recipeID = OLD.recipeID;
END;

//

DELIMITER ;
	

