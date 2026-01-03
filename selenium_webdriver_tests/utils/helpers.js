const { By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

/**
 * Các hàm tiện ích cho Selenium tests
 */

/**
 * Chờ và click vào element
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 * @param {number} timeout - Timeout in milliseconds (default: 300000)
 */
async function waitAndClick(driver, locator, timeout = 300000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await element.click();
}

/**
 * Chờ và nhập text vào element
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 * @param {string} text - Text to input
 * @param {number} timeout - Timeout in milliseconds (default: 300000)
 */
async function waitAndType(driver, locator, text, timeout = 300000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await element.clear();
  await element.sendKeys(text);
}

/**
 * Chụp screenshot khi test fail
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {string} testName - Tên test case
 */
async function takeScreenshot(driver, testName) {
  try {
    const screenshotDir = path.join(__dirname, '..', 'screenshots');
    
    // Tạo thư mục screenshots nếu chưa có
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${testName}_${timestamp}.png`;
    const filepath = path.join(screenshotDir, filename);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(filepath, screenshot, 'base64');
    
    console.log(`Screenshot saved: ${filepath}`);
    return filepath;
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

/**
 * Chờ element biến mất
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 * @param {number} timeout - Timeout in milliseconds (default: 300000)
 */
async function waitForElementToDisappear(driver, locator, timeout = 300000) {
  await driver.wait(async () => {
    try {
      const elements = await driver.findElements(locator);
      return elements.length === 0;
    } catch (error) {
      return true;
    }
  }, timeout);
}

/**
 * Kiểm tra element có hiển thị không
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 * @returns {boolean} True nếu element hiển thị
 */
async function isElementVisible(driver, locator) {
  try {
    const element = await driver.findElement(locator);
    return await element.isDisplayed();
  } catch (error) {
    return false;
  }
}

/**
 * Lấy text của element
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 * @param {number} timeout - Timeout in milliseconds (default: 300000)
 * @returns {string} Text content của element
 */
async function getElementText(driver, locator, timeout = 300000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  return await element.getText();
}

/**
 * Scroll đến element
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} locator - Element locator
 */
async function scrollToElement(driver, locator) {
  const element = await driver.findElement(locator);
  await driver.executeScript('arguments[0].scrollIntoView(true);', element);
  await driver.sleep(500); // Chờ animation scroll
}

/**
 * Chọn option trong dropdown
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {By} dropdownLocator - Dropdown locator
 * @param {string} optionText - Text của option cần chọn
 */
async function selectDropdownOption(driver, dropdownLocator, optionText) {
  await waitAndClick(driver, dropdownLocator);
  await driver.sleep(500); // Chờ dropdown mở
  
  const optionLocator = By.xpath(`//*[contains(text(), '${optionText}')]`);
  await waitAndClick(driver, optionLocator);
}

/**
 * Đợi page load xong
 * @param {WebDriver} driver - Selenium WebDriver instance
 * @param {number} timeout - Timeout in milliseconds (default: 300000)
 */
async function waitForPageLoad(driver, timeout = 300000) {
  await driver.wait(async () => {
    const readyState = await driver.executeScript('return document.readyState');
    return readyState === 'complete';
  }, timeout);
}

/**
 * Refresh page và chờ load
 * @param {WebDriver} driver - Selenium WebDriver instance
 */
async function refreshPage(driver) {
  await driver.navigate().refresh();
  await waitForPageLoad(driver);
}

/**
 * Đóng tất cả alert/popup
 * @param {WebDriver} driver - Selenium WebDriver instance
 */
async function dismissAllAlerts(driver) {
  try {
    const alert = await driver.switchTo().alert();
    await alert.dismiss();
  } catch (error) {
    // Không có alert
  }
}

module.exports = {
  waitAndClick,
  waitAndType,
  takeScreenshot,
  waitForElementToDisappear,
  isElementVisible,
  getElementText,
  scrollToElement,
  selectDropdownOption,
  waitForPageLoad,
  refreshPage,
  dismissAllAlerts
};
