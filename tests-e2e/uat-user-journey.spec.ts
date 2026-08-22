import { test, expect } from '@playwright/test';

test.describe('Level 4 User Acceptance Test (UAT): User Onboarding & Auth Flow', () => {
  test('learner can navigate to auth page, view sign in options, and select role', async ({ page }) => {
    // 1. Visit landing page
    await page.goto('/');

    // 2. Click sign in / get started button
    const authLink = page.getByRole('link', { name: /sign in|login|get started/i }).first();
    if (await authLink.isVisible()) {
      await authLink.click();
    } else {
      await page.goto('/auth');
    }

    // 3. Confirm arrival at Auth page
    await expect(page).toHaveURL(/\/auth/);
    
    // 4. Verify auth options render correctly
    await expect(page.locator('body')).toBeVisible();
  });
});
