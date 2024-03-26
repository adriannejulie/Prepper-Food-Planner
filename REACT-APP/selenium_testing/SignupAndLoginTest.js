// This Test automatically:
// 1. creates a new user
// 2. logs out
// 3. logs in with the created user

const { Builder, By, until } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

function generateRandomEmail() {
    const randomPart = Math.random().toString(36).substring(2, 15);
    const emailDomain = "@test.com";
    return randomPart + emailDomain;
}

(async function loginAutomation() {
    try {
        const testingEmail = generateRandomEmail();

        await driver.get('http://localhost:3000/');
        await driver.manage().window().maximize();

        //SIGNUP (REQ-02)
        const signupLink = await driver.findElement(By.xpath("//a[contains(text(), 'Sign Up')]"));
        await signupLink.click();

        await driver.wait(until.elementLocated(By.css('#firstName')));
        const firstNameInput = await driver.findElement(By.css('#firstName'));
        await firstNameInput.sendKeys('testFirstName');

        const lastNameInput = await driver.findElement(By.css('#lastName'));
        await lastNameInput.sendKeys('testLastName');

        const emailInput1 = await driver.findElement(By.css('#email'));
        await emailInput1.sendKeys(testingEmail);

        const passwordInput1 = await driver.findElement(By.css('#password'));
        await passwordInput1.sendKeys('testPassword');

        const confirmPassword = await driver.findElement(By.css('#confirmPassword'));
        await confirmPassword.sendKeys('testPassword');

        const signUpButton = await driver.findElement(By.xpath('//button[contains(text(), "Signup")]'));
        await signUpButton.click();

        await driver.sleep(3000);

        //LOGOUT (REQ-03)
        await driver.wait(until.elementLocated(By.css('.dropdown-trigger')), 10000);
        const accountDropdownTrigger = await driver.findElement(By.css('.dropdown-trigger'));
        await accountDropdownTrigger.click();

        await driver.wait(until.elementLocated(By.xpath("//li[contains(., 'Logout')]")), 10000);
        const logoutButton = await driver.findElement(By.xpath("//li[contains(., 'Logout')]"));
        await logoutButton.click();


        //LOGIN (REQ-00)
        const loginLink = await driver.findElement(By.xpath("//a[contains(text(), 'Log In')]"));
        await loginLink.click();

        await driver.wait(until.elementLocated(By.css('#emailInput')));
        const emailInput = await driver.findElement(By.css('#emailInput'));
        await emailInput.sendKeys(testingEmail);

        const passwordInput = await driver.findElement(By.css('#password'));
        await passwordInput.sendKeys('testPassword');

        const loginButton = await driver.findElement(By.xpath('//button[contains(text(), "Login")]'));
        await loginButton.click();
        await driver.sleep(3000); 

        //DELETE ACCOUNT (REQ-22)
        await driver.wait(until.elementLocated(By.css('.dropdown-trigger')), 10000);
        const accountDropdownTrigger2 = await driver.findElement(By.css('.dropdown-trigger'));
        await accountDropdownTrigger2.click();

        await driver.wait(until.elementLocated(By.xpath("//li[contains(., 'Account')]")), 10000);
        const accountButton = await driver.findElement(By.xpath("//li[contains(., 'Account')]"));
        await accountButton.click();

        await driver.wait(until.elementLocated(By.css('.delete-button.elem-button')), 10000);
        const deleteAccountButton = await driver.findElement(By.css('.delete-button.elem-button'));
        await driver.wait(until.elementIsVisible(deleteAccountButton), 10000);
        await driver.wait(until.elementIsEnabled(deleteAccountButton), 10000);
        await deleteAccountButton.click();


    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000); 
        await driver.quit();
    }
})();
