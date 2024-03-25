// This Test automatically:
// 1. Adds a recipe
// 2. Edits a recipe

const { Builder, By, until } = require("selenium-webdriver");

const driver = new Builder().forBrowser("firefox").build();

(async function loginAutomation() {
    try {

        await driver.get('http://localhost:3000/');

        //Log in to test account
        const loginLink = await driver.findElement(By.xpath("//a[contains(text(), 'Log In')]"));
        await loginLink.click();

        await driver.wait(until.elementLocated(By.css('#emailInput')));
        const emailInput = await driver.findElement(By.css('#emailInput'));
        await emailInput.sendKeys('test@selenium.com');

        const passwordInput = await driver.findElement(By.css('#password'));
        await passwordInput.sendKeys('selenium');

        const loginButton = await driver.findElement(By.xpath('//button[contains(text(), "Login")]'));
        await loginButton.click();

        //Navigate to MyRecipes
        await driver.wait(until.elementLocated(By.xpath("//a[contains(@class, 'link') and contains(text(), 'My Recipes')]")), 10000);
        const myRecipesLink = await driver.findElement(By.xpath("//a[contains(@class, 'link') and contains(text(), 'My Recipes')]"));
        await driver.wait(until.elementIsVisible(myRecipesLink), 10000);
        await myRecipesLink.click();

        //ADD RECIPE
        const savedRecipesButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Add Recipe')]")), 10000);
        await savedRecipesButton.click();
        await driver.wait(until.elementLocated(By.css('.recipe-title-styling')), 10000);
        const titleInput = await driver.findElement(By.css('.recipe-title-styling'));
        await titleInput.sendKeys('Test Recipe Title');

        // Fill out the cook time input
        const cookTimeInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await cookTimeInput[0].sendKeys('45');

        // Fill out the calories input
        const caloriesInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await caloriesInput[1].sendKeys('300');


        // Fill out the recipe steps 
        const instructionsTextarea = await driver.findElement(By.css('.recipe-instructions-container'));
        await instructionsTextarea.sendKeys('Test Instructions: Mix all ingredients and bake for 45 minutes.');

        // Open ingredients window
        const addIngredientsButton = await driver.findElement(By.css('.edit-ingredients-button'));
        await addIngredientsButton.click();

        //Add ingredients
        await driver.wait(until.elementLocated(By.css('.amount-box')), 10000);
        const amountBoxes = await driver.findElements(By.css('.amount-box'));
        await amountBoxes[amountBoxes.length - 1].sendKeys('2 cups');

        await driver.wait(until.elementLocated(By.css('.ingredient-box')), 10000);
        const ingredientBoxes = await driver.findElements(By.css('.ingredient-box'));
        await ingredientBoxes[ingredientBoxes.length - 1].sendKeys('Sugar');

        //Save ingredients
        const saveButton = await driver.findElement(By.css('[data-testid="saveIngredients"]'));
        await driver.executeScript("arguments[0].click();", saveButton);

        //Close ingredients window
        const closeButton = await driver.findElement(By.css('[data-testid="closeIngredientsPopup"]'));
        await driver.executeScript("arguments[0].click();", closeButton);

        //Finish recipe
        const saveRecipeButton = await driver.findElement(By.css('.checkmark-button'));
        await saveRecipeButton.click();

        await driver.sleep(3000);


        // EDIT RECIPE
        const editRecipeButton = await driver.wait(until.elementLocated(By.css('.recipe-header-button')), 10000);
        await editRecipeButton.click();

        // Wait for the edit fields to appear and start editing
        await driver.wait(until.elementLocated(By.css('.recipe-title-styling')), 10000);
        const editTitleInput = await driver.findElement(By.css('.recipe-title-styling'));
        await editTitleInput.clear();
        await editTitleInput.sendKeys('Edited Test Recipe Title');

        //Edit cooking time
        const editCookTimeInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await editCookTimeInput[0].clear();
        await editCookTimeInput[0].sendKeys('55');

        const editCaloriesInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await editCaloriesInput[1].clear();
        await editCaloriesInput[1].sendKeys('350');

        // Edit calories
        const editInstructionsTextarea = await driver.findElement(By.css('.recipe-instructions-container'));
        await editInstructionsTextarea.clear();
        await editInstructionsTextarea.sendKeys('Edited Instructions: Mix all ingredients and cook for 55 minutes.');

        //Edit ingredients
        const editIngredientsButton = await driver.findElement(By.css('.edit-ingredients-button'));
        await editIngredientsButton.click();

        // Clear existing ingredient amounts and names, then add new ones
        await driver.wait(until.elementLocated(By.css('.amount-box')), 10000);
        const amountEditBoxes = await driver.findElements(By.css('.amount-box'));
        await amountEditBoxes[0].clear(); 
        await amountEditBoxes[0].sendKeys('1 cup');

        await driver.wait(until.elementLocated(By.css('.ingredient-box')), 10000);
        const ingredientEditBoxes = await driver.findElements(By.css('.ingredient-box'));
        await ingredientEditBoxes[0].clear(); 
        await ingredientEditBoxes[0].sendKeys('Flour'); 

        // Save the edited ingredients
        const saveEditedIngredientsButton = await driver.findElement(By.css('[data-testid="saveIngredients"]'));
        await driver.executeScript("arguments[0].click();", saveEditedIngredientsButton);

        // Close the ingredients editing window
        const closeEditedIngredientsButton = await driver.findElement(By.css('[data-testid="closeIngredientsPopup"]'));
        await driver.executeScript("arguments[0].click();", closeEditedIngredientsButton);

        // Save the edited recipe
        const saveEditedRecipeButton = await driver.findElement(By.css('.checkmark-button'));
        await saveEditedRecipeButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000); 
        await driver.quit();
    }
})();
