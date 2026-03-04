import { test, expect, Page, Locator } from '@playwright/test';

// NOTE: EPAM may show different cookie consent UIs depending on region/session.
async function acceptCookiesIfPresent(page: Page) {
  const acceptButtons = [
    page.getByRole('button', { name: /accept all/i }),
    page.getByRole('button', { name: /^accept$/i }),
    page.getByRole('button', { name: /agree/i }),
  ];

  for (const btn of acceptButtons) {
    if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btn.click();
      break;
    }
  }
}

function headerMenuItem(header: Locator, name: string) {
  return header.getByRole('link', { name }).or(header.getByRole('button', { name }));
}

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate via Services -> Explore Our Client Work and verify Client Work heading', async ({ page }) => {
    // Arrange
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await acceptCookiesIfPresent(page);

    const header = page.locator('header');

    // Act: select "Services" from the header menu
    const services = headerMenuItem(header, 'Services');
    await expect(services).toBeVisible();
    await services.click();

    // Act: click "Explore Our Client Work"
    const exploreClientWork = page.getByRole('link', { name: /explore our client work/i });
    await expect(exploreClientWork).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      exploreClientWork.click(),
    ]);

    // Assert: "Client Work" text is visible
    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  });
});
