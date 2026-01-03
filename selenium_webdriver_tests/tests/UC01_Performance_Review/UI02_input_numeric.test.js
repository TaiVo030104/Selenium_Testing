const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI02: Input numeric value in employee name field', function() {
  let driver;
  const testCase = testData.testCases.UI02;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect(testData.config.windowSize);
    
    // Login and navigate
    await login(driver);
    await navigateToPerformanceReview(driver);
  });

  afterEach(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it(testCase.name, async function() {
    const employeeInput = await driver.wait(
      until.elementLocated(By.css('.oxd-autocomplete-text-input > input')),
      testData.config.waitTime
    );
    await employeeInput.click();
    await employeeInput.sendKeys(testCase.input);
    
    // Click vào form để trigger validation
    const form = await driver.findElement(By.css('.oxd-form'));
    await form.click();
    
    await driver.sleep(1000);
  });
});
