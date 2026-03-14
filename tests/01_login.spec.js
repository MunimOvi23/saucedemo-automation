const { test, expect } = require('@playwright/test');

test.describe('LOGIN PAGE TESTS', () => {

  // TEST 1: Correct username and password -> should go to inventory page
  test('Valid login goes to inventory page', async ({ page }) => {

    // Step 1: Open the login page
    await page.goto('https://www.saucedemo.com');

    // Step 2: Type the username
    await page.fill('#user-name', 'standard_user');

    // Step 3: Type the password
    await page.fill('#password', 'secret_sauce');

    // Step 4: Click the LOGIN button
    await page.click('#login-button');

    // CHECK
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  // TEST 2: Wrong password -> should show error message
  test('Wrong password shows error message', async ({ page }) => {

    // Step 1: Open the login page
    await page.goto('https://www.saucedemo.com');

    // Step 2: Type the username
    await page.fill('#user-name', 'standard_user');

    // Step 3: Type the password
    await page.fill('#password', 'wrongpassword');   

    // Step 4: Click the LOGIN button
    await page.click('#login-button');

    // CHECK:
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });


  // TEST 3: Empty fields -> should ask for username
  test('Empty username and password shows error', async ({ page }) => {


    // Step 1: Open the login page
    await page.goto('https://www.saucedemo.com');

    // Step 2: Click login without typing anything
    await page.click('#login-button');

    // CHECK: 
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });


  // TEST 4: Locked user -> should NOT be able to login
  test('Locked out user cannot login', async ({ page }) => {

    // Step 1: Open the login page
    await page.goto('https://www.saucedemo.com');

    // Step 2: Type the username
    await page.fill('#user-name', 'locked_out_user');  

    // Step 3: Type the password
    await page.fill('#password', 'secret_sauce');

    // Step 4: Click the LOGIN button
    await page.click('#login-button');

    // CHECK:
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out.');
  });

});