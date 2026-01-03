const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI01: Search with valid employee name', function() {
  let driver;
  const testCase = testData.testCases.UI01;

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
    // Click vào ô input autocomplete
    const employeeInput = await driver.wait(
      until.elementLocated(By.css('.oxd-autocomplete-text-input > input')),
      testData.config.waitTime
    );
    await employeeInput.click();
    
    // Nhập tên nhân viên
    await employeeInput.sendKeys(testCase.input);
    
    // Click nút Search
    const searchButton = await driver.findElement(By.css('.oxd-button--secondary'));
    await searchButton.click();
    
    // Chờ kết quả tải
    await driver.sleep(2000);
  });
});
