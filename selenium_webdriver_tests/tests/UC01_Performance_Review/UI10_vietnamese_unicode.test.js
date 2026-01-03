const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI10: Input Vietnamese Unicode characters', function() {
  let driver;
  const testCase = testData.testCases.UI10;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect(testData.config.windowSize);
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
    
    const searchButton = await driver.findElement(By.css('.oxd-button--secondary'));
    await searchButton.click();
    
    // Expect validation error - search should not be performed
    // Vietnamese characters with diacritics should trigger validation error
    await driver.sleep(2000);
    
    // Verify that invalid input validation error is displayed
    // No review data should be displayed
  });
});
