const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC03 - UI02: Validation Error Without Employee Name', function() {
  let driver;
  const testCase = testData.testCases.UI02;

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
    const employeeRadio = await driver.wait(
      until.elementLocated(By.css('.oxd-input-group:nth-child(2) > div > .oxd-radio-wrapper > label')),
      testData.config.waitTime
    );
    await employeeRadio.click();
    
    // Click Generate without selecting employee
    const generateButton = await driver.findElement(By.css('.oxd-button'));
    await generateButton.click();
    
    // Verify validation error appears
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('.oxd-input-field-error-message')),
      testData.config.waitTime
    );
    
    const isDisplayed = await errorMessage.isDisplayed();
    assert.strictEqual(isDisplayed, true, 'Validation error should be displayed');
    
    await driver.sleep(1000);
  });
});
