import { test, expect } from '@playwright/test';

test('home page renders with the expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Mauricio_Páez | Developer');
});
