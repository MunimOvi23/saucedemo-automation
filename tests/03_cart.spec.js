const { test, expect } = require('@playwright/test');

// This runs BEFORE every single test below
// It automatically logs in so we don't repeat login code in every test
test.beforeEach(async ({ page }) => {

  // Step 1: Open the login page
  await page.goto('https://www.saucedemo.com');

  // Step 2: Type username
  await page.fill('#user-name', 'standard_user');

  // Step 3: Type password
  await page.fill('#password', 'secret_sauce');

  // Step 4: Click login button
  await page.click('#login-button');

});


test.describe('CART PAGE TESTS', () => {


  // TEST 1: Add 1 item -> cart badge shows "1"
  test('Adding one item shows badge count of 1', async ({ page }) => {

    // Click "Add to cart" on the backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // CHECK: The cart icon at top right shows number 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });


  // TEST 2: Add 2 items -> cart badge shows "2"
  test('Adding two items shows badge count of 2', async ({ page }) => {

    // Add first item (backpack)
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Add second item (bike light)
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // CHECK: Cart badge shows 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });


    // TEST 3: Add all 6 items -> cart badge shows "6"
    test('Adding all 6 items shows badge count of 6', async ({ page }) => {

    // Always click the FIRST remaining "Add to cart" button
    // Because after each click, that button disappears from the list
    for (let i = 0; i < 6; i++) {
        await page.locator('[data-test^="add-to-cart"]').first().click();
    }

    // CHECK: Cart badge shows 6
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
    });



  // TEST 4: Add then remove item -> badge disappears
  test('Removing item hides the cart badge', async ({ page }) => {

    // First add the backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Then remove it
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // CHECK: Badge is gone because cart is empty
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });


  // TEST 5: Click cart icon -> opens cart page
  test('Clicking cart icon opens the cart page', async ({ page }) => {

    // Add an item first
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Click the cart icon at the top right corner
    await page.click('.shopping_cart_link');

    // CHECK: We are now on the cart page
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });


  // TEST 6: Cart page shows the item we added
  test('Cart page displays the correct item name', async ({ page }) => {

    // Add the backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart page
    await page.click('.shopping_cart_link');

    // CHECK: Backpack name is visible on cart page
    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });


  // TEST 7: Cart page shows correct price of item
  test('Cart page displays the correct item price', async ({ page }) => {

    // Add the backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart page
    await page.click('.shopping_cart_link');

    // CHECK: Backpack price is $29.99
    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');
  });


  // TEST 8: Remove item from cart page → item disappears
  test('Removing item from cart page removes it', async ({ page }) => {

    // Add the backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart page
    await page.click('.shopping_cart_link');

    // Remove the backpack from cart page
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // CHECK: No items left in cart
    await expect(page.locator('.inventory_item_name')).not.toBeVisible();
  });


  // TEST 9: "Continue Shopping" button goes back to inventory
  test('Continue shopping button goes back to products page', async ({ page }) => {

    // Add an item and go to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Click "Continue Shopping" button
    await page.click('[data-test="continue-shopping"]');

    // CHECK: We are back on the inventory/products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  // TEST 10: "Checkout" button goes to checkout step 1
  test('Checkout button goes to checkout step 1', async ({ page }) => {

    // Add an item and go to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Click the "Checkout" button
    await page.click('[data-test="checkout"]');

    // CHECK: We are on checkout step 1 page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });


});