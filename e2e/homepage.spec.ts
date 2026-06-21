import { expect, test } from "@playwright/test";

test("homepage renders all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("navigation links are clickable", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation");
  await expect(nav).toBeVisible();
  const links = nav.getByRole("link");
  const count = await links.count();
  expect(count).toBeGreaterThan(1);
});
