const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI05: Input very long string (>150 characters)', function() {
  let driver;
  const testCase = testData.testCases.UI05;

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
    
    await driver.sleep(1000);
  });
});
