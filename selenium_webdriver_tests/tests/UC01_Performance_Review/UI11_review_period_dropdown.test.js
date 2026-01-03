const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI11: Click Review Period dropdown', function() {
  let driver;
  const testCase = testData.testCases.UI11;

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
    
    // Click vào dropdown Review Period
    const reviewPeriodDropdown = await driver.findElement(
      By.css('.oxd-select-text--focus > .oxd-select-text-input')
    );
    await reviewPeriodDropdown.click();
    
    await driver.sleep(1000);
  });
});
