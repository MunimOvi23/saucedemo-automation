# 🧪 Saucedemo Automation Testing Project

An end-to-end automation testing project built with **Playwright** and **JavaScript**, testing the complete user journey on [saucedemo.com](https://www.saucedemo.com) — a demo e-commerce website.

---

## 🛠️ Tech Stack

| Tool                                  | Purpose                      |
| ------------------------------------- | ---------------------------- |
| [Playwright](https://playwright.dev/) | Browser automation framework |
| JavaScript                            | Programming language         |
| Node.js                               | Runtime environment          |
| HTML Reporter                         | Test results and reporting   |

---

## 📁 Project Structure

```
saucedemo-automation/
├── tests/
│   ├── 01_login.spec.js        # Login page tests
│   ├── 02_inventory.spec.js    # Inventory/Products page tests
│   ├── 03_cart.spec.js         # Shopping cart tests
│   └── 04_checkout.spec.js     # Full checkout flow tests
├── playwright.config.js         # Playwright configuration
└── package.json
```

---

## 🌐 Application Under Test

**Website:** [https://www.saucedemo.com](https://www.saucedemo.com)

| Page            | URL                       |
| --------------- | ------------------------- |
| Login           | `/`                       |
| Inventory       | `/inventory.html`         |
| Cart            | `/cart.html`              |
| Checkout Step 1 | `/checkout-step-one.html` |
| Checkout Step 2 | `/checkout-step-two.html` |
| Order Complete  | `/checkout-complete.html` |

**Test Credentials Used:**

| Username          | Password       | Type            |
| ----------------- | -------------- | --------------- |
| `standard_user`   | `secret_sauce` | Valid user ✅   |
| `locked_out_user` | `secret_sauce` | Blocked user ❌ |

---

## ✅ Test Coverage

### 🔐 Login Page — `01_login.spec.js`

| #    | Test Case                   | Expected Result              |
| ---- | --------------------------- | ---------------------------- |
| TC01 | Valid login                 | Redirects to inventory page  |
| TC02 | Wrong password              | Error message displayed      |
| TC03 | Empty username and password | "Username is required" error |
| TC04 | Locked out user             | "locked out" error message   |

---

### 🛍️ Inventory Page — `02_inventory.spec.js`

| #    | Test Case                             | Expected Result                             |
| ---- | ------------------------------------- | ------------------------------------------- |
| TC05 | Page shows 6 products                 | Product count = 6                           |
| TC06 | Sort A to Z                           | First product = Sauce Labs Backpack         |
| TC07 | Sort Z to A                           | First product = Test.allTheThings() T-Shirt |
| TC08 | Sort price low to high                | First price = $7.99                         |
| TC09 | Sort price high to low                | First price = $49.99                        |
| TC10 | Click product name                    | Opens product detail page                   |
| TC11 | All products have prices              | Price count = 6                             |
| TC12 | All products have Add to Cart buttons | Button count = 6                            |

---

### 🛒 Cart Page — `03_cart.spec.js`

| #    | Test Case                    | Expected Result               |
| ---- | ---------------------------- | ----------------------------- |
| TC13 | Add 1 item                   | Cart badge shows 1            |
| TC14 | Add 2 items                  | Cart badge shows 2            |
| TC15 | Add all 6 items              | Cart badge shows 6            |
| TC16 | Remove item                  | Cart badge disappears         |
| TC17 | Click cart icon              | Opens cart page               |
| TC18 | Cart shows correct item name | "Sauce Labs Backpack" visible |
| TC19 | Cart shows correct price     | "$29.99" visible              |
| TC20 | Remove item from cart page   | Item disappears               |
| TC21 | Continue Shopping button     | Returns to inventory page     |
| TC22 | Checkout button              | Opens checkout step 1         |

---

### 💳 Checkout — `04_checkout.spec.js`

**Step 1 — Your Info:**
| # | Test Case | Expected Result |
|---|---|---|
| TC23 | Checkout button opens form | URL = checkout-step-one.html |
| TC24 | Empty form submission | "First Name is required" error |
| TC25 | Missing Last Name | "Last Name is required" error |
| TC26 | Missing Zip Code | "Postal Code is required" error |
| TC27 | All fields filled | Moves to step 2 |
| TC28 | Cancel button | Returns to cart page |

**Step 2 — Order Review:**
| # | Test Case | Expected Result |
|---|---|---|
| TC29 | Step 2 URL is correct | URL = checkout-step-two.html |
| TC30 | Shows correct item name | "Sauce Labs Backpack" visible |
| TC31 | Shows correct item price | "$29.99" visible |
| TC32 | Shows subtotal | Subtotal line visible |
| TC33 | Shows tax | Tax line visible |
| TC34 | Shows total | Total line visible |
| TC35 | Cancel button | Returns to inventory page |
| TC36 | Finish button | Opens success page |

**Order Complete:**
| # | Test Case | Expected Result |
|---|---|---|
| TC37 | Success page URL | URL = checkout-complete.html |
| TC38 | Thank you message | "Thank you for your order!" shown |
| TC39 | Confirmation image | Pony express image visible |
| TC40 | Back Home button | Returns to inventory page |
| TC41 | Cart is empty after order | Cart badge not visible |

---

## 📊 Total Test Summary

| File                 | Tests        |
| -------------------- | ------------ |
| 01_login.spec.js     | 4            |
| 02_inventory.spec.js | 8            |
| 03_cart.spec.js      | 10           |
| 04_checkout.spec.js  | 19           |
| **Total**            | **41 tests** |

---

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/saucedemo-automation.git

# 2. Go into the project folder
cd saucedemo-automation

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install
```

---

## ▶️ Running the Tests

```bash
# Run ALL tests (with browser visible)
npx playwright test --headed --project=chromium

# Run a specific file
npx playwright test tests/01_login.spec.js --headed --project=chromium
npx playwright test tests/02_inventory.spec.js --headed --project=chromium
npx playwright test tests/03_cart.spec.js --headed --project=chromium
npx playwright test tests/04_checkout.spec.js --headed --project=chromium

# View HTML test report
npx playwright show-report
```

---

## 📸 Test Report

After running tests, open the HTML report:

```bash
npx playwright show-report
```

This shows a full breakdown of:

- ✅ Passed tests
- ❌ Failed tests
- 🕐 Time taken per test
- 📸 Screenshots on failure

---

## 🔑 Key Concepts Used

| Concept                  | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `test.describe()`        | Groups related tests together                  |
| `test.beforeEach()`      | Runs setup code before every test (e.g. login) |
| `page.goto()`            | Opens a URL in the browser                     |
| `page.fill()`            | Types text into an input field                 |
| `page.click()`           | Clicks a button or element                     |
| `expect().toHaveURL()`   | Checks the current page URL                    |
| `expect().toHaveText()`  | Checks text content of an element              |
| `expect().toBeVisible()` | Checks if an element is visible                |
| `expect().toHaveCount()` | Checks number of matching elements             |
| `[data-test^="..."]`     | CSS "starts with" attribute selector           |
| `.first()`               | Selects the first matching element             |
| Helper functions         | Reusable code to avoid repetition              |

---

## 👤 Author

**Your Name**

- GitHub: [@MunimOvi23](https://github.com/MunimOvi23)
- LinkedIn: [MUNIM BIN MUQUITH](https://www.linkedin.com/in/munim-bin-muquith/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
