// This Test automatically:
// 1. Adds a recipe
// 2. Edits a recipe

const { Builder, By, until } = require("selenium-webdriver");

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

        //ADD INCOMPLETE RECIPE (REQ-19)
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

        // Dont fill in ingredients

        // Try to Save Recipe
        const saveCompleteRecipeButton = await driver.findElement(By.css('.checkmark-button'));
        await saveCompleteRecipeButton.click();

        // Verify not allowed
        await driver.sleep(3000);

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
})();
