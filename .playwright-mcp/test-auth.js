const { chromium } = require('/tmp/aybu-pw-test/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');

const WORKSPACE_DIR = '/home/neo/Desktop/GITHUB MYZ21/AYBUStore';
const PORT = 3000;
const URL = `http://localhost:${PORT}/ui`;

(async () => {
  console.log('Starting local server...');
  const server = spawn('/tmp/aybu-pw-test/node_modules/.bin/serve', ['-l', PORT.toString(), WORKSPACE_DIR], { stdio: 'ignore' });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('Server started. Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.text()}`));
  page.on('pageerror', error => console.log(`BROWSER ERROR: ${error.message}`));

  const testEmail = `testuser_${Date.now()}@aybu.edu.tr`;
  const testPassword = 'Password123!';

  try {
    console.log(`\n--- TEST 1: Registration ---`);
    console.log(`Navigating to ${URL}/register.html...`);
    await page.goto(`${URL}/register.html`);

    await page.fill('#regName', 'Test User');
    await page.fill('#regEmail', testEmail);
    await page.fill('#regPassword', testPassword);
    
    console.log('Clicking Register button...');
    await page.click('#registerForm button[type="submit"]', { force: true });

    console.log('Waiting for status message...');
    const regStatus = page.locator('#registerStatus');
    await regStatus.waitFor({ state: 'visible', timeout: 15000 });
    // Wait until it has either is-success or is-error class
    await page.waitForFunction(() => {
        const el = document.getElementById('registerStatus');
        return el && (el.classList.contains('is-success') || el.classList.contains('is-error'));
    }, { timeout: 15000 });
    const regStatusText = await regStatus.textContent();
    console.log(`Registration Status: ${regStatusText}`);

    if (regStatusText.includes('Islem su an tamamlanamadi')) {
        console.log('ERROR DETECTED during registration. Exiting test early.');
        process.exit(1);
    }

    console.log(`\n--- TEST 2: Login without verification ---`);
    console.log(`Navigating to ${URL}/login.html...`);
    await page.goto(`${URL}/login.html`);

    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);

    console.log('Clicking Login button...');
    await page.click('#loginForm button[type="submit"]', { force: true });

    const loginStatus = page.locator('#loginStatus');
    await loginStatus.waitFor({ state: 'visible', timeout: 15000 });
    // Wait until it has either is-success or is-error class
    await page.waitForFunction(() => {
        const el = document.getElementById('loginStatus');
        return el && (el.classList.contains('is-success') || el.classList.contains('is-error'));
    }, { timeout: 15000 });
    const loginStatusText = await loginStatus.textContent();
    console.log(`Login Status: ${loginStatusText}`);

  } catch (err) {
    console.error('Test failed:', err);
    await page.screenshot({ path: '/home/neo/Desktop/GITHUB MYZ21/AYBUStore/.playwright-mcp/error.png' });
  } finally {
    await browser.close();
    server.kill();
    console.log('Local server stopped.');
  }
})();
