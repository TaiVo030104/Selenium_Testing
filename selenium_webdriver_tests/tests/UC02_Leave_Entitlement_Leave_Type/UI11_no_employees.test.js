const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC02 - UI11: Leave type with no employees', function() {
  let driver;
  const testCase = testData.testCases.UI11;

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
    // Select a leave type with no employees assigned
    // (This would require knowing which leave type has no employees)
    const leaveTypeDropdown = await driver.wait(
      until.elementLocated(By.css('.oxd-select-text--after > .bi-caret-up-fill')),
      testData.config.waitTime
    );
    await leaveTypeDropdown.click();
    
    // Select a leave type (assuming it has no employees)
    const leaveTypeInput = await driver.findElement(By.css('.oxd-grid-item:nth-child(2) .oxd-select-text-input'));
    await leaveTypeInput.click();
    
    const generateButton = await driver.findElement(By.css('.oxd-button'));
    await generateButton.click();
    
    // Expect "No Records Found" message
    await driver.sleep(2000);
  });
});
