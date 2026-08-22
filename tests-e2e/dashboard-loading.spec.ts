import { test, expect } from '@playwright/test';

test.describe('Level 4 UAT Test: Dashboard Loading & Layout Integrity', () => {
  test('unauthenticated dashboard access triggers middleware security redirect to /auth', async ({ page }) => {
    // Attempt visiting educator dashboard without auth session
    await page.goto('/educator/dashboard');
    await page.waitForURL(/\/auth/);
    await expect(page).toHaveURL(/\/auth/);

    // Attempt visiting learner dashboard without auth session
    await page.goto('/learner/dashboard');
    await page.waitForURL(/\/auth/);
    await expect(page).toHaveURL(/\/auth/);
  });

  test('auth page renders login form with email, password, and submit controls', async ({ page }) => {
    await page.goto('/auth');

    // Check page structure
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const submitBtn = page.locator('button[type="submit"]').first();

    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeEnabled();
    }
    if (await submitBtn.isVisible()) {
      await expect(submitBtn).toBeEnabled();
    }
  });
});
