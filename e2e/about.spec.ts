import { expect, test } from "@playwright/test";

test.describe("about page", () => {
  test("about page renders bio text", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await expect(page.getByText("I'm a full-stack developer")).toBeVisible();
  });

  test("experience timeline renders", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Tech Corp")).toBeVisible();
    await expect(page.getByText("StartupXYZ")).toBeVisible();
  });
});
