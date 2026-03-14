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


test.describe('🛍️ INVENTORY PAGE TESTS', () => {


  // TEST 1: Check that exactly 6 products are displayed
  test('Inventory page shows 6 products', async ({ page }) => {

    // Find all product cards on the page
    const products = page.locator('.inventory_item');

    // CHECK: There should be exactly 6 products
    await expect(products).toHaveCount(6);
  });


  // TEST 2: Sort products from A to Z
  test('Sort products A to Z works', async ({ page }) => {

    // Click the sort dropdown and select "Name (A to Z)"
    await page.selectOption('[data-test="product-sort-container"]', 'az');

    // Get the first product name after sorting
    const firstProduct = page.locator('.inventory_item_name').first();

    // CHECK: First product should be "Sauce Labs Backpack"
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');
  });


  // TEST 3: Sort products from Z to A
  test('Sort products Z to A works', async ({ page }) => {

    // Click the sort dropdown and select "Name (Z to A)"
    await page.selectOption('[data-test="product-sort-container"]', 'za');

    // Get the first product name after sorting
    const firstProduct = page.locator('.inventory_item_name').first();

    // CHECK: First product should be "Test.allTheThings() T-Shirt (Red)"
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });


  // TEST 4: Sort products by price low to high
  test('Sort products by price low to high', async ({ page }) => {

    // Click the sort dropdown and select "Price (low to high)"
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Get the first price shown
    const firstPrice = page.locator('.inventory_item_price').first();

    // CHECK: Cheapest product is $7.99
    await expect(firstPrice).toHaveText('$7.99');
  });


  // TEST 5: Sort products by price high to low
  test('Sort products by price high to low', async ({ page }) => {

    // Click the sort dropdown and select "Price (high to low)"
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    // Get the first price shown
    const firstPrice = page.locator('.inventory_item_price').first();

    // CHECK: Most expensive product is $49.99
    await expect(firstPrice).toHaveText('$49.99');
  });


  // TEST 6: Clicking a product name opens its detail page
  test('Clicking product name opens detail page', async ({ page }) => {

    // Click on the first product name in the list
    await page.locator('.inventory_item_name').first().click();

    // CHECK: URL should change to product detail page
    await expect(page).toHaveURL(/inventory-item/);
  });


  // TEST 7: Each product has a price visible
  test('All products have a price displayed', async ({ page }) => {

    // Find all price labels on the page
    const prices = page.locator('.inventory_item_price');

    // CHECK: There should be 6 prices (one per product)
    await expect(prices).toHaveCount(6);
  });


  // TEST 8: Each product has an Add to Cart button
  test('All products have Add to Cart button', async ({ page }) => {

    // Find all "Add to cart" buttons
    const addToCartButtons = page.locator('[data-test^="add-to-cart"]');

    // CHECK: There should be 6 buttons (one per product)
    await expect(addToCartButtons).toHaveCount(6);
  });


});