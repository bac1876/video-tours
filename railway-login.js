const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function loginToRailway() {
  console.log('Starting Railway login automation...');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome' // Use existing Chrome installation
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Railway login
    console.log('Opening Railway login page...');
    await page.goto('https://railway.app/login', { waitUntil: 'networkidle' });

    // Take a screenshot to see what's on the page
    await page.screenshot({ path: 'railway-page.png' });
    console.log('Screenshot saved to railway-page.png');

    // Wait a bit for page to fully load
    await page.waitForTimeout(3000);

    // Try multiple selectors for the GitHub login button
    const githubButtonSelectors = [
      'text=Login with GitHub',
      'text=Sign in with GitHub',
      'button:has-text("GitHub")',
      'a:has-text("GitHub")',
      '[href*="github"]',
      'button[type="button"]'
    ];

    let clicked = false;
    for (const selector of githubButtonSelectors) {
      try {
        console.log(`Trying selector: ${selector}`);
        await page.click(selector, { timeout: 3000 });
        clicked = true;
        console.log(`Clicked button with selector: ${selector}`);
        break;
      } catch (e) {
        console.log(`Selector ${selector} not found, trying next...`);
      }
    }

    if (!clicked) {
      console.log('Could not find GitHub login button. Please check railway-page.png');
      console.log('Keeping browser open for 30 seconds for manual login...');
      await page.waitForTimeout(30000);
    }

    // Wait for redirect back to Railway dashboard
    console.log('Waiting for Railway dashboard or manual login...');
    await page.waitForURL('**/dashboard**', { timeout: 120000 });
    console.log('Successfully logged in to Railway!');

    // Get the auth token from localStorage
    const token = await page.evaluate(() => {
      return localStorage.getItem('auth_token') ||
             sessionStorage.getItem('auth_token') ||
             document.cookie.split(';').find(c => c.includes('token'));
    });

    if (token) {
      // Save token to Railway config
      const configDir = path.join(os.homedir(), '.railway');
      const configFile = path.join(configDir, 'config.json');

      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      const config = {
        token: token.replace('token=', '').trim()
      };

      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      console.log('Railway token saved successfully!');
    }

    await browser.close();
    return true;

  } catch (error) {
    console.error('Error during login:', error.message);
    await browser.close();
    return false;
  }
}

loginToRailway().then(success => {
  process.exit(success ? 0 : 1);
});
