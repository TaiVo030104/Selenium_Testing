const { By, until } = require('selenium-webdriver');

// Load test data
const testData = require('../testdata.json');

/**
 * Login to OrangeHRM
 * @param {WebDriver} driver - Selenium WebDriver instance
 */
async function login(driver) {
  await driver.get(testData.config.loginUrl);
  
  // Wait for login page to load
  const usernameInput = await driver.wait(
    until.elementLocated(By.name('username')),
    testData.config.waitTime
  );
  await usernameInput.sendKeys(testData.config.username);
  
  // Enter password
  const passwordInput = await driver.findElement(By.name('password'));
  await passwordInput.sendKeys(testData.config.password);
  
  // Click login button
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));
  await loginButton.click();
  
  // Wait for dashboard to load (verify login success)
  await driver.wait(
    until.elementLocated(By.css('.oxd-topbar-header-breadcrumb')),
    testData.config.waitTime
  );
}

/**
 * Navigate to Performance Review page
 * @param {WebDriver} driver - Selenium WebDriver instance
 */
async function navigateToPerformanceReview(driver) {
  await driver.get(testData.config.baseUrl);
  
  // Wait for page to load
  await driver.wait(
    until.elementLocated(By.css('.oxd-autocomplete-text-input > input')),
    testData.config.waitTime
  );
}

module.exports = {
  login,
  navigateToPerformanceReview,
  testData
};
