const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI07: Input whitespace characters', function() {
  let driver;
  const testCase = testData.testCases.UI07;

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
    // Wait to verify no results are displayed or error is shown
    await driver.sleep(2000);
    
    // Verify that invalid input validation error is displayed
    // (This would need to check for specific error message in actual implementation)
  });
});
