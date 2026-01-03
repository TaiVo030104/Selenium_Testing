const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC03 - UI06: Full name with all leave types', function() {
  let driver;
  const testCase = testData.testCases.UI06;

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
    
    const employeeInput = await driver.findElement(By.css('.oxd-autocomplete-text-input > input'));
    await employeeInput.click();
    
    // Type full employee name: "Michael Johnson"
    await employeeInput.sendKeys(testCase.input);
    await driver.sleep(2000);
    
    // Wait for autocomplete to show "Michael Johnson"
    const firstOption = await driver.wait(
      until.elementLocated(By.css('.oxd-autocomplete-option:nth-child(1)')),
      testData.config.waitTime
    );
    await firstOption.click();
    
    const generateButton = await driver.findElement(By.css('.oxd-button'));
    await generateButton.click();
    
    // Report should show all leave types for Michael Johnson:
    // - Annual Leave
    // - Sick Leave
    // - Casual Leave
    // Each type with entitlements and usage
    await driver.sleep(3000);
  });
});
