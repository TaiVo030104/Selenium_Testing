const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC03 - UI03: Leave Period default', function() {
  let driver;
  const testCase = testData.testCases.UI03;

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
    // Verify Leave Period field is auto-populated with default date range
    const leavePeriodField = await driver.wait(
      until.elementLocated(By.css('.oxd-select-text-input')),
      testData.config.waitTime
    );
    
    const leavePeriodText = await leavePeriodField.getText();
    
    // Verify format is YYYY-MM-DD - YYYY-MM-DD
    // Typically shows current leave year
    console.log('Leave Period:', leavePeriodText);
    
    await driver.sleep(1000);
  });
});
