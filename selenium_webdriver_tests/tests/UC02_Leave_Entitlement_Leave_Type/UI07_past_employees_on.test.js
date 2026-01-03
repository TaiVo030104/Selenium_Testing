const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC02 - UI07: Include Past Employees ON', function() {
  let driver;
  const testCase = testData.testCases.UI07;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect(testData.config.windowSize);
    await login(driver);
    await navigateToLeaveEntitlement(driver);
  });

  afterEach(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it(testCase.name, async function() {
    const leaveTypeDropdown = await driver.wait(
      until.elementLocated(By.css('.oxd-select-text--after > .bi-caret-up-fill')),
      testData.config.waitTime
    );
    await leaveTypeDropdown.click();
    
    const pastEmployeesSwitch = await driver.findElement(By.css('.oxd-switch-input'));
    await pastEmployeesSwitch.click();
    
    const generateButton = await driver.findElement(By.css('.oxd-button'));
    await generateButton.click();
    
    await driver.sleep(2000);
  });
});
