const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC02 - UI10: Validation Error Without Leave Type', function() {
  let driver;
  const testCase = testData.testCases.UI10;

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
    const generateButton = await driver.wait(
      until.elementLocated(By.css('.oxd-button')),
      testData.config.waitTime
    );
    await generateButton.click();
    
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('.oxd-input-field-error-message')),
      testData.config.waitTime
    );
    
    const isDisplayed = await errorMessage.isDisplayed();
    assert.strictEqual(isDisplayed, true, 'Error message should be displayed');
    
    await driver.sleep(1000);
  });
});
