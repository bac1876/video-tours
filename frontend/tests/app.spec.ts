import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Sora Walkthrough Generator', () => {
  test('should upload image and show preview', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');

    // Wait for page to load - the actual h1 text is "Sora Walkthrough"
    await expect(page.locator('h1')).toContainText('Sora Walkthrough');

    // Find the file input (it's hidden in the dropzone)
    const fileInput = page.locator('input[type="file"]');

    // Upload the test image
    const testImagePath = path.resolve(__dirname, '../../DSC01298.jpg');
    await fileInput.setInputFiles(testImagePath);

    // Wait for image preview to appear - alt text is the filename
    await expect(page.locator('img[alt="DSC01298.jpg"]')).toBeVisible({ timeout: 10000 });

    // Verify the continue button shows correct count
    await expect(page.locator('button:has-text("Continue with 1 photo")')).toBeVisible();

    console.log('✅ Image upload test passed!');
  });

  test('should show selected photos count', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');

    // Upload an image
    const fileInput = page.locator('input[type="file"]');
    const testImagePath = path.resolve(__dirname, '../../DSC01298.jpg');
    await fileInput.setInputFiles(testImagePath);

    // Wait for the preview section and verify count text
    await expect(page.locator('h3:has-text("Selected Photos (1/15)")')).toBeVisible({ timeout: 10000 });

    console.log('✅ Photo count test passed!');
  });

  test('should allow clicking continue button and navigate to reorder step', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');

    // Upload an image
    const fileInput = page.locator('input[type="file"]');
    const testImagePath = path.resolve(__dirname, '../../DSC01298.jpg');
    await fileInput.setInputFiles(testImagePath);

    // Wait for continue button
    const continueButton = page.locator('button:has-text("Continue with 1 photo")');
    await expect(continueButton).toBeVisible({ timeout: 10000 });

    // Click continue button
    await continueButton.click();

    // Wait for navigation to reorder step - heading is "Arrange Room Order"
    await expect(page.locator('h2:has-text("Arrange Room Order")')).toBeVisible({ timeout: 10000 });

    // Verify the generate button is visible
    await expect(page.locator('button:has-text("Generate Walkthrough")')).toBeVisible();

    console.log('✅ Navigation to reorder step test passed!');
  });
});
