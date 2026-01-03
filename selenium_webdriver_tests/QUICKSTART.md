# Hướng dẫn nhanh - Selenium WebDriver cho OrangeHRM

## Bước 1: Cài đặt Node.js

Tải và cài đặt Node.js từ: https://nodejs.org/ (khuyến nghị phiên bản LTS)

Kiểm tra cài đặt:
```bash
node --version
npm --version
```

## Bước 2: Cài đặt dependencies

Mở Command Prompt hoặc PowerShell, chuyển đến thư mục project:

```bash
cd c:\Users\Admin\Downloads\orangehrm\selenium_webdriver_tests
npm install
```

Quá trình cài đặt sẽ tải về:
- `selenium-webdriver`: Thư viện Selenium cho Node.js
- `mocha`: Test framework
- `chai`: Assertion library

## Bước 3: Đảm bảo OrangeHRM đang chạy

Trước khi chạy test, đảm bảo ứng dụng OrangeHRM đang chạy tại:
```
http://localhost:9090
```

## Bước 4: Chạy tests

### Chạy tất cả tests:
```bash
npm test
```

### Chạy test riêng cho UC01:
```bash
npm run test:uc01
```

### Chạy test riêng cho UC02:
```bash
npm run test:uc02
```

### Chạy test riêng cho UC03:
```bash
npm run test:uc03
```

## Kết quả mong đợi

Khi chạy test, bạn sẽ thấy:
1. Chrome browser tự động mở
2. Các thao tác được thực hiện tự động
3. Browser tự động đóng sau mỗi test
4. Kết quả hiển thị trong terminal:

```
  UC01 - Performance Review Tests
    ✓ UI01 - Search with valid employee name (3245ms)
    ✓ UI02 - Input numeric value in employee name field (2156ms)
    ✓ UI03 - Input special character (@) (2089ms)
    ...

  11 passing (35s)
```

## Xử lý lỗi thường gặp

### Lỗi: "ChromeDriver not found"

**Giải pháp 1**: Cài đặt lại dependencies
```bash
npm install
```

**Giải pháp 2**: Cài ChromeDriver thủ công
1. Kiểm tra phiên bản Chrome: chrome://version/
2. Tải ChromeDriver tương ứng: https://chromedriver.chromium.org/
3. Thêm vào PATH hoặc đặt trong thư mục project

### Lỗi: "Connection refused" hoặc "Cannot connect to localhost:9090"

**Nguyên nhân**: OrangeHRM chưa chạy

**Giải pháp**: Khởi động OrangeHRM backend và frontend trước khi chạy test

### Lỗi: "Element not found" hoặc "Timeout"

**Nguyên nhân**: 
- Trang load chậm
- Selector không đúng
- Element chưa hiển thị

**Giải pháp**: 
- Tăng timeout trong test
- Kiểm tra lại selector
- Đảm bảo ứng dụng đang chạy bình thường

## Tùy chỉnh nhanh

### Thay đổi URL của OrangeHRM

Mở file test (ví dụ: `tests/UC01_Performance_Review.test.js`), sửa dòng:

```javascript
const baseUrl = 'http://localhost:9090/web/index.php/performance/searchEvaluatePerformanceReview';
```

Thành URL mới của bạn.

### Chạy ở chế độ headless (không hiển thị browser)

Thêm vào phần `beforeEach` trong file test:

```javascript
const chrome = require('selenium-webdriver/chrome');

beforeEach(async function() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--disable-gpu');
  
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    
  await driver.manage().window().setRect({ width: 1552, height: 832 });
});
```

## Cấu trúc code cơ bản

### Test case đơn giản:

```javascript
it('Test name', async function() {
  // 1. Mở trang
  await driver.get('http://localhost:9090/...');
  
  // 2. Tìm element và thao tác
  const input = await driver.findElement(By.css('.input-class'));
  await input.sendKeys('text to input');
  
  // 3. Click button
  const button = await driver.findElement(By.css('.button-class'));
  await button.click();
  
  // 4. Chờ kết quả
  await driver.sleep(2000);
});
```

### Sử dụng helper functions:

```javascript
const { waitAndClick, waitAndType } = require('../utils/helpers');

it('Test with helpers', async function() {
  await driver.get('http://localhost:9090/...');
  
  await waitAndType(driver, By.css('.input-class'), 'text');
  await waitAndClick(driver, By.css('.button-class'));
});
```

## Tiếp theo

Sau khi chạy thành công test cơ bản, bạn có thể:

1. **Thêm assertions**: Sử dụng `chai` để kiểm tra kết quả
2. **Tạo test mới**: Copy và sửa các test case hiện có
3. **Tạo Page Object Model**: Tổ chức code tốt hơn
4. **Tích hợp CI/CD**: Tự động chạy test khi commit code

Xem thêm chi tiết trong file `README.md`.

## Liên hệ

Nếu gặp vấn đề, vui lòng liên hệ team QA hoặc tạo issue.
