import { test, expect, Page, Locator } from '@playwright/test';

// NOTE: EPAM may show different cookie consent UIs depending on region/session.
async function acceptCookiesIfPresent(page: Page) {
  // implemented below
}

function headerMenuItem(header: Locator, name: string) {
  return header.getByRole('link', { name }).or(header.getByRole('button', { name }));
}

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate via Services -> Explore Our Client Work and verify Client Work heading', async ({ page }) => {
    // implemented below
  });
});
