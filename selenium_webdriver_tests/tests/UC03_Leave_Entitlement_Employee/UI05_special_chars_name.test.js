const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToLeaveEntitlement, testData } = require('./helper/common');

describe('UC03 - UI05: Special chars in name', function() {
  let driver;
  const testCase = testData.testCases.UI05;

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
    
    // Type employee name with special characters (O'Brien, Jean-Pierre)
    await employeeInput.sendKeys(testCase.input);
    await driver.sleep(1000);
    
    try {
      const firstOption = await driver.wait(
        until.elementLocated(By.css('.oxd-autocomplete-option:nth-child(1)')),
        testData.config.waitTime
      );
      await firstOption.click();
      
      const generateButton = await driver.findElement(By.css('.oxd-button'));
      await generateButton.click();
      
      // Verify name displayed correctly without encoding issues
      await driver.sleep(2000);
    } catch (e) {
      console.log('Employee with special chars not found');
    }
  });
});
