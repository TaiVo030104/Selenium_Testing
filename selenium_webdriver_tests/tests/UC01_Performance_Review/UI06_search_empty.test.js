const { Builder, By, until } = require('selenium-webdriver');
const { login, navigateToPerformanceReview, testData } = require('./helper/common');

describe('UC01 - UI06: Search with empty field', function() {
  let driver;
  const testCase = testData.testCases.UI06;

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
    const searchButton = await driver.wait(
      until.elementLocated(By.css('.oxd-button--secondary')),
      testData.config.waitTime
    );
    await searchButton.click();
    
    await driver.sleep(1000);
  });
});
