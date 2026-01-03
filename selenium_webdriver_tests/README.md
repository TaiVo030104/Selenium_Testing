# Selenium WebDriver Tests cho OrangeHRM

## Giới thiệu
Đây là bộ test tự động sử dụng Selenium WebDriver với JavaScript/Node.js để kiểm thử ứng dụng OrangeHRM.

## Yêu cầu hệ thống

- **Node.js**: phiên bản 14.x trở lên
- **npm**: phiên bản 6.x trở lên
- **Chrome Browser**: phiên bản mới nhất
- **ChromeDriver**: sẽ được tự động cài đặt qua selenium-webdriver

## Cài đặt

### Bước 1: Cài đặt dependencies

```bash
cd selenium_webdriver_tests
npm install
```

### Bước 2: Kiểm tra ChromeDriver

Selenium WebDriver sẽ tự động tải ChromeDriver phù hợp với phiên bản Chrome của bạn. Nếu gặp lỗi, bạn có thể tải thủ công từ: https://chromedriver.chromium.org/

## Cấu trúc thư mục

```
selenium_webdriver_tests/
├── package.json                          # Cấu hình npm và dependencies
├── README.md                             # Tài liệu hướng dẫn
├── tests/
│   ├── UC01_Performance_Review.test.js   # Test cases cho Performance Review
│   ├── UC02_Leave_Entitlement_Leave_Type.test.js
│   └── UC03_Leave_Entitlement_Employee.test.js
└── utils/
    └── helpers.js                        # Các hàm tiện ích (nếu cần)
```

## Chạy tests

### Chạy tất cả tests

```bash
npm test
```

### Chạy test cho UC01 (Performance Review)

```bash
npm run test:uc01
```

### Chạy test cho UC02 (Leave Entitlement - Leave Type)

```bash
npm run test:uc02
```

### Chạy test cho UC03 (Leave Entitlement - Employee)

```bash
npm run test:uc03
```

## Cấu trúc Test Case

Mỗi test case bao gồm:

1. **Setup (beforeEach)**: Khởi tạo WebDriver và mở browser
2. **Test Steps**: Các bước thực hiện test
3. **Assertions**: Kiểm tra kết quả (nếu có)
4. **Teardown (afterEach)**: Đóng browser

### Ví dụ Test Case

```javascript
it('UI01 - Search with valid employee name', async function() {
  await driver.get(baseUrl);
  
  const employeeInput = await driver.wait(
    until.elementLocated(By.css('.oxd-autocomplete-text-input > input')),
    10000
  );
  await employeeInput.click();
  await employeeInput.sendKeys('John  Smith');
  
  const searchButton = await driver.findElement(By.css('.oxd-button--secondary'));
  await searchButton.click();
  
  await driver.sleep(2000);
});
```

## Các Test Cases trong UC01

| Test ID | Mô tả | Input | Mục đích |
|---------|-------|-------|----------|
| UI01 | Tìm kiếm với tên hợp lệ | "John  Smith" | Kiểm tra chức năng tìm kiếm cơ bản |
| UI02 | Nhập số vào trường tên | "1234" | Kiểm tra validation |
| UI03 | Nhập ký tự đặc biệt | "@" | Kiểm tra xử lý ký tự đặc biệt |
| UI04 | Nhập chuỗi 100 ký tự | 100 chars | Kiểm tra giới hạn độ dài |
| UI05 | Nhập chuỗi >150 ký tự | 161 chars | Kiểm tra xử lý chuỗi quá dài |
| UI06 | Tìm kiếm với trường trống | (empty) | Kiểm tra xử lý trường trống |
| UI07 | Nhập khoảng trắng | "        " | Kiểm tra trim/validation |
| UI08 | SQL Injection | " OR '1'='1" | Kiểm tra bảo mật SQL |
| UI09 | XSS Attack | `<script>alert('XSS')</script>` | Kiểm tra bảo mật XSS |
| UI10 | Ký tự Unicode | "Nguyễn Văn Á" | Kiểm tra hỗ trợ tiếng Việt |
| UI11 | Click dropdown | - | Kiểm tra tương tác UI |

## Tùy chỉnh cấu hình

### Thay đổi browser

Mặc định sử dụng Chrome. Để dùng Firefox:

```javascript
driver = await new Builder().forBrowser('firefox').build();
```

### Thay đổi timeout

Trong `package.json`, sửa `--timeout 30000` (30 giây) thành giá trị mong muốn.

### Thay đổi base URL

Sửa biến `baseUrl` trong file test:

```javascript
const baseUrl = 'http://your-domain.com/web/index.php/performance/searchEvaluatePerformanceReview';
```

## Headless Mode (chạy không hiển thị browser)

Để chạy test ở chế độ headless (không mở cửa sổ browser):

```javascript
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--disable-gpu');

driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
```

## Xử lý lỗi thường gặp

### Lỗi: ChromeDriver version không khớp

**Giải pháp**: Cập nhật Chrome browser hoặc cài đặt ChromeDriver tương ứng.

### Lỗi: Element not found

**Giải pháp**: Tăng thời gian chờ hoặc kiểm tra lại selector:

```javascript
await driver.wait(until.elementLocated(By.css('selector')), 15000);
```

### Lỗi: Timeout

**Giải pháp**: Tăng timeout trong package.json hoặc trong test:

```javascript
this.timeout(60000); // 60 giây
```

## Tích hợp CI/CD

### GitHub Actions

```yaml
name: Selenium Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          cd selenium_webdriver_tests
          npm install
      - name: Run tests
        run: |
          cd selenium_webdriver_tests
          npm test
```

## Báo cáo kết quả

Để tạo báo cáo HTML, cài thêm mochawesome:

```bash
npm install --save-dev mochawesome
```

Cập nhật script trong `package.json`:

```json
"test": "mocha tests/**/*.test.js --timeout 30000 --reporter mochawesome"
```

## Tài liệu tham khảo

- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [Mocha Documentation](https://mochajs.org/)
- [Node.js Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver)

## Liên hệ & Hỗ trợ

Nếu gặp vấn đề, vui lòng tạo issue hoặc liên hệ team QA.
