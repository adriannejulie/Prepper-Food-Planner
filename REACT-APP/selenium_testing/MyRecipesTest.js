// This Test automatically:
// 1. Views all saved recipes
// 2. Views all uploaded recipes

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

        //Navigate to MyRecipes and view Saved Recipes (REQ-06)
        await driver.wait(until.elementLocated(By.xpath("//a[contains(@class, 'link') and contains(text(), 'My Recipes')]")), 10000);
        const myRecipesLink = await driver.findElement(By.xpath("//a[contains(@class, 'link') and contains(text(), 'My Recipes')]"));
        await driver.wait(until.elementIsVisible(myRecipesLink), 10000);
        await myRecipesLink.click();

        await driver.sleep(3000); 

        //View uploaded recipes (REQ-11)
        const savedRecipesButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Saved Recipes')]")), 10000);
        await savedRecipesButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000); 
        await driver.quit();
    }
})();
