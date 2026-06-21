import { expect, test } from "@playwright/test";

test.describe("contact page", () => {
  test("contact page renders social links and form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(page.getByText("@n0ctanedev")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Message" })).toBeVisible();
  });
});
