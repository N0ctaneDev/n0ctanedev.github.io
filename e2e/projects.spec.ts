import { expect, test } from "@playwright/test";

test.describe("projects page", () => {
  test("projects page renders all project cards", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(page.getByText("Project One")).toBeVisible();
    await expect(page.getByText("Project Two")).toBeVisible();
  });

  test("navigating to a project detail page shows the title", async ({
    page,
  }) => {
    await page.goto("/projects/project-one");
    await expect(
      page.getByRole("heading", { name: "Project One" }),
    ).toBeVisible();
  });
});
