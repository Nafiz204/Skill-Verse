import { test, expect } from '@playwright/test';

test.describe('Level 3 System Test: Landing Page Navigation & Call-to-Actions', () => {
  test('landing page loads header, title, and action buttons properly', async ({ page }) => {
    await page.goto('/');

    // Check main title presence
    await expect(page).toHaveTitle(/Skill Verse/i);

    // Verify main body container is rendered
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Verify presence of interactive links or buttons
    const ctaButtons = page.locator('a, button');
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});
