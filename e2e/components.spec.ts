import { expect, test } from "@playwright/test";

test.describe("reusable components", () => {
  test("section-wrapper renders section headings", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  });

  test("project-card renders project data and links to detail", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Project One")).toBeVisible();
    await expect(
      page.getByText("Real-time collaborative platform"),
    ).toBeVisible();
    const cardLink = page.locator('a[href="/projects/project-one"]');
    await expect(cardLink).toBeVisible();
  });

  test("skill-badge renders with monospace prefix", async ({ page }) => {
    await page.goto("/");
    const badge = page.getByText(">React").first();
    await expect(badge).toBeVisible();
  });

  test("contact-form renders input fields and submit button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Message" })).toBeVisible();
    await expect(page.getByText("Send Message")).toBeVisible();
  });
});
