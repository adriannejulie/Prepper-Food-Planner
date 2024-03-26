const { Builder, By, until } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

(async function loginAutomation() {
    try {
        await driver.get('http://localhost:3000/');
        await driver.manage().window().maximize();

        // INVALID LOGIN (REQ-01)
        const loginLink = await driver.findElement(By.xpath("//a[contains(text(), 'Log In')]"));
        await loginLink.click();

        await driver.wait(until.elementLocated(By.css('#emailInput')));
        const emailInput = await driver.findElement(By.css('#emailInput'));
        await emailInput.sendKeys('invalid@email.com');

        const passwordInput = await driver.findElement(By.css('#password'));
        await passwordInput.sendKeys('invalid');

        const loginButton = await driver.findElement(By.xpath('//button[contains(text(), "Login")]'));
        await loginButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
})();
