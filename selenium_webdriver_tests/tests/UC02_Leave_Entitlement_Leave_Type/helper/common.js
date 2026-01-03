const { By, until } = require('selenium-webdriver');
const testData = require('../testdata.json');

async function login(driver) {
  await driver.get(testData.config.loginUrl);
  
  const usernameInput = await driver.wait(
    until.elementLocated(By.name('username')),
    testData.config.waitTime
  );
  await usernameInput.sendKeys(testData.config.username);
  
  const passwordInput = await driver.findElement(By.name('password'));
  await passwordInput.sendKeys(testData.config.password);
  
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));
  await loginButton.click();
  
  await driver.wait(
    until.elementLocated(By.css('.oxd-topbar-header-breadcrumb')),
    testData.config.waitTime
  );
}

async function navigateToLeaveEntitlement(driver) {
  await driver.get(testData.config.baseUrl);
  
  await driver.wait(
    until.elementLocated(By.css('.oxd-input-group')),
    testData.config.waitTime
  );
}

module.exports = {
  login,
  navigateToLeaveEntitlement,
  testData
};
