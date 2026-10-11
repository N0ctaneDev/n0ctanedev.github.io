import { expect, test } from "@playwright/test";

test("landing page renders hero text and navbar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("N0").first()).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("Home")).toBeVisible();
});
