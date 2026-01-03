const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC02 - UI01: Leave Type Radio Button', function() {
  let driver;
  const testCase = testData.testCases.UI01;

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
    // Click vào Leave Type Radio Button (default selected)
    const leaveTypeRadio = await driver.wait(
      until.elementLocated(By.css('.oxd-input-group:nth-child(1) > div > .oxd-radio-wrapper > label')),
      testData.config.waitTime
    );
    await leaveTypeRadio.click();
    
    await driver.sleep(1000);
  });
});
