// This Test automatically:
// Sets up a testing account for future automated tests

const { Builder, By, until } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

(async function loginAutomation() {
    try {
        await driver.get('http://localhost:3000/');
        await driver.manage().window().maximize();

        const signupLink = await driver.findElement(By.xpath("//a[contains(text(), 'Sign Up')]"));
        await signupLink.click();

        await driver.wait(until.elementLocated(By.css('#firstName')));
        const firstNameInput = await driver.findElement(By.css('#firstName'));
        await firstNameInput.sendKeys('testFirstName');

        const lastNameInput = await driver.findElement(By.css('#lastName'));
        await lastNameInput.sendKeys('testLastName');

        const emailInput1 = await driver.findElement(By.css('#email'));
        await emailInput1.sendKeys('test@selenium.com');

        const passwordInput1 = await driver.findElement(By.css('#password'));
        await passwordInput1.sendKeys('selenium');

        const confirmPassword = await driver.findElement(By.css('#confirmPassword'));
        await confirmPassword.sendKeys('selenium');

        const signUpButton = await driver.findElement(By.xpath('//button[contains(text(), "Signup")]'));
        await signUpButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.quit();
    }
})();