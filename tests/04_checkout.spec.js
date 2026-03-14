const { test, expect } = require('@playwright/test');

// This runs BEFORE every single test below
// It logs in + adds item + goes to cart automatically
test.beforeEach(async ({ page }) => {

  // Step 1: Open login page
  await page.goto('https://www.saucedemo.com');

  // Step 2: Type username
  await page.fill('#user-name', 'standard_user');

  // Step 3: Type password
  await page.fill('#password', 'secret_sauce');

  // Step 4: Click login
  await page.click('#login-button');

  // Step 5: Add a product to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Step 6: Go to cart page
  await page.click('.shopping_cart_link');
});

test.describe('CHECKOUT STEP 1 - Your Info Form', () => {


  //TEST 1: Clicking Checkout button opens step 1 form
  test('Checkout button opens the info form', async ({ page }) => {

    // Click the Checkout button on cart page
    await page.click('[data-test="checkout"]');

    // CHECK: We should be on checkout step 1 page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });


  // TEST 2: Submit empty form -> First Name error
  test('Empty form shows First Name is required error', async ({ page }) => {

    await page.click('[data-test="checkout"]');

    // Click Continue without filling anything
    await page.click('[data-test="continue"]');

    // CHECK: Error says First Name is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });


  // TEST 3: Only First Name filled -> Last Name error
  test('Missing Last Name shows Last Name is required error', async ({ page }) => {

    await page.click('[data-test="checkout"]');

    // Fill only First Name
    await page.fill('[data-test="firstName"]', 'John');

    // Click Continue without Last Name and Zip
    await page.click('[data-test="continue"]');

    // CHECK: Error says Last Name is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });


  // TEST 4: First + Last Name filled but no Zip -> Zip error
  test('Missing Zip Code shows Postal Code is required error', async ({ page }) => {

    await page.click('[data-test="checkout"]');

    // Fill First Name and Last Name but NOT Zip
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');

    // Click Continue without Zip
    await page.click('[data-test="continue"]');

    // CHECK: Error says Postal Code is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });


  // TEST 5: All fields filled -> goes to step 2
  test('Filling all fields goes to checkout step 2', async ({ page }) => {

    await page.click('[data-test="checkout"]');

    // Fill all 3 required fields
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');

    // Click Continue
    await page.click('[data-test="continue"]');

    // CHECK: We moved to step 2
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  });


  // TEST 6: Cancel button on step 1 goes back to cart
  test('Cancel button goes back to cart page', async ({ page }) => {

    await page.click('[data-test="checkout"]');

    // Click Cancel
    await page.click('[data-test="cancel"]');

    // CHECK: We are back on cart page
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

});

test.describe('CHECKOUT STEP 2 - Order Review', () => {

  // Helper function: fills step 1 form and goes to step 2
  // We use this in every test below so we don't repeat the same code
  async function goToStepTwo(page) {
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
  }


  // TEST 7: Step 2 page loads correctly
  test('Step 2 page URL is correct', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: We are on step 2
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  });


  // TEST 8: Step 2 shows the item we ordered
  test('Step 2 shows the correct item name', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: Backpack name is visible in the order summary
    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });


  // TEST 9: Step 2 shows the item price
  test('Step 2 shows the correct item price', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: Price is $29.99
    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');
  });


  // TEST 10: Step 2 shows the subtotal
  test('Step 2 shows the subtotal line', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: Subtotal line is visible
    await expect(page.locator('.summary_subtotal_label'))
      .toBeVisible();
  });


  // TEST 11: Step 2 shows the tax line
  test('Step 2 shows the tax line', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: Tax line is visible
    await expect(page.locator('.summary_tax_label'))
      .toBeVisible();
  });


  // TEST 12: Step 2 shows the total price
  test('Step 2 shows the total price line', async ({ page }) => {

    await goToStepTwo(page);

    // CHECK: Total price line is visible
    await expect(page.locator('.summary_total_label'))
      .toBeVisible();
  });


  // TEST 13: Cancel button on step 2 goes back to inventory
  test('Cancel button on step 2 goes back to inventory', async ({ page }) => {

    await goToStepTwo(page);

    // Click Cancel
    await page.click('[data-test="cancel"]');

    // CHECK: Back to the products/inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  // TEST 14: Finish button goes to success page
  test('Finish button goes to the success page', async ({ page }) => {

    await goToStepTwo(page);

    // Click the Finish button
    await page.click('[data-test="finish"]');

    // CHECK: We are on the success/complete page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  });

});

test.describe('CHECKOUT COMPLETE - Success Page', () => {

  // Helper function: completes ALL checkout steps
  async function completeCheckout(page) {
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
  }


  // TEST 15: Success page URL is correct
  test('Success page URL is correct', async ({ page }) => {

    await completeCheckout(page);

    // CHECK: We are on the complete page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  });


  // TEST 16: Success page shows "Thank you" message
  test('Success page shows Thank You for your order message', async ({ page }) => {

    await completeCheckout(page);

    // CHECK: "Thank you for your order!" is shown
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });


  // TEST 17: Success page shows confirmation image
  test('Success page shows the confirmation image', async ({ page }) => {

    await completeCheckout(page);

    // CHECK: The pony express image is visible on success page
    await expect(page.locator('.pony_express'))
      .toBeVisible();
  });


  // TEST 18: Back Home button goes back to inventory
  test('Back Home button goes back to products page', async ({ page }) => {

    await completeCheckout(page);

    // Click the "Back Home" button
    await page.click('[data-test="back-to-products"]');

    // CHECK: We are back on the products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  // TEST 19: Cart is empty after completing order
  test('Cart badge is empty after order is complete', async ({ page }) => {

    await completeCheckout(page);

    // Click Back Home
    await page.click('[data-test="back-to-products"]');

    // CHECK: Cart badge is gone (no items left)
    await expect(page.locator('.shopping_cart_badge'))
      .not.toBeVisible();
  });

});