import { expect, test } from "@playwright/test";

test.describe("skills page", () => {
  test("skills page renders category headings and skill badges", async ({
    page,
  }) => {
    await page.goto("/skills");
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByText("Frontend")).toBeVisible();
    await expect(page.getByText("Backend")).toBeVisible();
    await expect(page.getByText(">React").first()).toBeVisible();
  });
});
