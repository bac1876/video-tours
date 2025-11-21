const { chromium } = require('playwright');

async function deployToRailway() {
  console.log('Starting Railway deployment automation...');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Railway new project from GitHub
    console.log('Opening Railway new project page...');
    await page.goto('https://railway.app/new', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to load
    await page.waitForTimeout(3000);

    // Look for "Deploy from GitHub repo" option
    console.log('Looking for GitHub deployment option...');
    const githubSelectors = [
      'text=Deploy from GitHub repo',
      'text=GitHub Repo',
      'button:has-text("GitHub")',
      'a:has-text("GitHub")',
      '[href*="github"]'
    ];

    for (const selector of githubSelectors) {
      try {
        await page.click(selector, { timeout: 3000 });
        console.log(`Clicked: ${selector}`);
        break;
      } catch (e) {
        console.log(`Selector ${selector} not found, trying next...`);
      }
    }

    await page.waitForTimeout(2000);

    // Search for the repository
    console.log('Searching for video-tours repository...');
    const searchSelectors = [
      'input[placeholder*="Search"]',
      'input[placeholder*="repository"]',
      'input[type="text"]',
      'input[type="search"]'
    ];

    for (const selector of searchSelectors) {
      try {
        await page.fill(selector, 'video-tours', { timeout: 3000 });
        console.log(`Filled search with selector: ${selector}`);
        await page.waitForTimeout(1000);
        break;
      } catch (e) {
        console.log(`Search selector ${selector} not found, trying next...`);
      }
    }

    // Click on the video-tours repository
    console.log('Selecting video-tours repository...');
    await page.click('text=video-tours', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Click deploy or confirm button
    console.log('Clicking deploy button...');
    const deploySelectors = [
      'button:has-text("Deploy")',
      'button:has-text("Deploy Now")',
      'button:has-text("Add variables")',
      'button:has-text("Continue")'
    ];

    for (const selector of deploySelectors) {
      try {
        await page.click(selector, { timeout: 3000 });
        console.log(`Clicked deploy with selector: ${selector}`);
        break;
      } catch (e) {
        console.log(`Deploy selector ${selector} not found, trying next...`);
      }
    }

    // Wait for deployment to start
    console.log('Waiting for deployment to initialize...');
    await page.waitForTimeout(5000);

    // Get the project URL
    const url = page.url();
    console.log(`\nProject created! URL: ${url}`);

    console.log('\nKeeping browser open for 30 seconds so you can see the deployment...');
    await page.waitForTimeout(30000);

    await browser.close();
    console.log('\nDone! Check your Railway dashboard for deployment status.');
    return true;

  } catch (error) {
    console.error('Error during deployment:', error.message);
    console.log('\nKeeping browser open for manual intervention...');
    await page.waitForTimeout(60000);
    await browser.close();
    return false;
  }
}

deployToRailway().then(success => {
  process.exit(success ? 0 : 1);
});
