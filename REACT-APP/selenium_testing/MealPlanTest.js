// This Test automatically:
// 1. Adds a meal to the schedule
// 2. Edits that meal and changes meal time to breakfast

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

        //CREATING MEALPLAN
        const addMealButton = await driver.findElement(By.css('.button'));
        await addMealButton.click();

        // Select the first recipe (
        const firstRecipe = await driver.findElements(By.css('.recipes'));
        await firstRecipe[0].click();

        // Select Lunch for meal
        await driver.wait(until.elementLocated(By.css('.lunch')), 10000);
        const lunchToggle = await driver.findElement(By.css('.lunch'));
        await lunchToggle.click();

        // Click add to calendar
        const addToCalendarButton = await driver.findElement(By.id('add-Button'));
        await addToCalendarButton.click();

        await driver.sleep(5000);

        //EDIT MEALPLAN
        // Find all the edit buttons within the 'meals-planned' container
        const editButtons = await driver.findElements(By.css('.edit'));

        // Check if there are edit buttons present and click the first one
        await editButtons[0].click();

        // Select the first recipe again
        const recipesInEdit = await driver.findElements(By.css('.recipes'));
        await recipesInEdit[0].click();

        // Select 'Breakfast' for the meal type
        await driver.wait(until.elementLocated(By.css('.breakfast')), 10000);
        const breakfastToggle = await driver.findElement(By.css('.breakfast'));
        await breakfastToggle.click();


        // Click add to calendar
        const editToCalendarButton = await driver.findElement(By.id('add-Button'));
        await editToCalendarButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
})();