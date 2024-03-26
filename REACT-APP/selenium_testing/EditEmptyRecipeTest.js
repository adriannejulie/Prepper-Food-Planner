// This Test automatically:
// 1. Adds a recipe
// 2. Edits a recipe

const { Builder, By, until, Key } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

(async function loginAutomation() {
    try {

        await driver.get('http://localhost:3000/');
        await driver.manage().window().maximize();

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

        //ADD A VALID RECIPE
        const savedRecipesButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Add Recipe')]")), 10000);
        await savedRecipesButton.click();
        await driver.wait(until.elementLocated(By.css('.recipe-title-styling')), 10000);
        const titleInput = await driver.findElement(By.css('.recipe-title-styling'));
        await titleInput.sendKeys('Recipe to be edited');

        // Fill out the cook time input
        const cookTimeInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await cookTimeInput[0].sendKeys('15');

        // Fill out the calories input
        const caloriesInput = await driver.findElements(By.css('.duration-cooktime-input'));
        await caloriesInput[1].sendKeys('100');


        // Fill out the recipe steps 
        const instructionsTextarea = await driver.findElement(By.css('.recipe-instructions-container'));
        await instructionsTextarea.sendKeys('Test Instructions: Mix all ingredients and bake for 15 minutes.');

        // Open ingredients window
        const openIngredientsButton = await driver.findElement(By.css('.edit-ingredients-button'));
        await openIngredientsButton.click();

        //Add an ingredient
        const addIngredientsButton = await driver.findElement(By.css('.add-ingredient-button'));
        await addIngredientsButton.click();

        //Fill in ingredient
        await driver.wait(until.elementLocated(By.css('.amount-box')), 10000);
        const amountBoxes = await driver.findElements(By.css('.amount-box'));
        await amountBoxes[amountBoxes.length - 1].sendKeys('2 cups');

        await driver.wait(until.elementLocated(By.css('.ingredient-box')), 10000);
        const ingredientBoxes = await driver.findElements(By.css('.ingredient-box'));
        await ingredientBoxes[ingredientBoxes.length - 1].sendKeys('Sugar');

        // Save ingredients after editing
        const saveIngredientsButton = await driver.findElement(By.css('.save'));
        await saveIngredientsButton.click();

        // Close ingredients window
        const closeIngredientsButton = await driver.findElement(By.css('.close'));
        await closeIngredientsButton.click();

        // Add a photo 
        // Navigate to the image upload section
        const fileInput = await driver.findElement(By.css('input[type="file"]'));
        await driver.executeScript("arguments[0].style.display = 'block';", fileInput);

        // Set the file
        const filePath = require('path').resolve(__dirname, '../src/images/braden-headshot.png');

        // Upload the file
        await fileInput.sendKeys(filePath);
        await driver.sleep(3000);

        // Save Recipe
        const saveCompleteRecipeButton = await driver.findElement(By.css('.checkmark-button'));
        await saveCompleteRecipeButton.click();

        await driver.sleep(3000);


        // REMOVE A REQUIRED PORTION (REQ-20)
        const editRecipeButton = await driver.wait(until.elementLocated(By.css('.recipe-header-button')), 10000);
        await editRecipeButton.click();

        // Wait for the edit fields to appear and start editing
        await driver.wait(until.elementLocated(By.css('.recipe-title-styling')), 10000);
        const editTitleInput = await driver.findElement(By.css('.recipe-title-styling'));
        await editTitleInput.clear();
        await editTitleInput.sendKeys('Invalid Edit Test Recipe');

        //Leave instructions blank
        const instructionsInput = await driver.findElement(By.css('.recipe-instructions-container'));
        await instructionsInput.click();
        const existingTextLength = (await instructionsInput.getAttribute('value')).length;
        const backspaceSeries = Array(existingTextLength).fill(Key.BACK_SPACE).join('');
        await instructionsInput.sendKeys(backspaceSeries);
        await driver.sleep(1000);


        // Attempt to save the edited recipe
        const saveEditedRecipeButton = await driver.findElement(By.css('.checkmark-button'));
        await saveEditedRecipeButton.click();

        // Verify edit was not allowed
        await driver.sleep(3000);
    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
})();
