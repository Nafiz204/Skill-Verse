import { test, expect } from '@playwright/test';

test.describe('Level 3 System Test: Route Protection & Middleware Safeguards', () => {
  test('redirects unauthenticated access away from protected learner routes to /auth', async ({ page }) => {
    // Attempting to visit learner dashboard directly without logging in
    await page.goto('/learner/dashboard');
    
    // System should protect the route and enforce redirect to auth page
    await expect(page).toHaveURL(/\/auth/);
  });

  test('public landing page is accessible and displays main brand header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Skill Verse/i);
  });
});
