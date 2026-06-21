import { expect, test } from "@playwright/test";

test.describe("layout shell", () => {
  test("navbar renders logo and nav links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
    await expect(nav.getByText("N0ctane")).toBeVisible();
    await expect(nav.getByText("Home")).toBeVisible();
    await expect(nav.getByText("Projects")).toBeVisible();
    await expect(nav.getByText("Skills")).toBeVisible();
    await expect(nav.getByText("About")).toBeVisible();
    await expect(nav.getByText("Contact")).toBeVisible();
  });

  test("nav links have correct hrefs", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("header li a").all();
    const links = await Promise.all(
      hrefs.map(async (a) => ({
        href: await a.getAttribute("href"),
        text: await a.textContent(),
      })),
    );
    expect(links).toContainEqual(
      expect.objectContaining({ href: "/projects" }),
    );
    expect(links).toContainEqual(
      expect.objectContaining({ href: "/about" }),
    );
    expect(links).toContainEqual(
      expect.objectContaining({ href: "/skills" }),
    );
    expect(links).toContainEqual(
      expect.objectContaining({ href: "/contact" }),
    );
  });

  test("theme toggle exists and switches mode", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByLabel("Toggle theme");
    await expect(toggle).toBeVisible();
    await toggle.click();
  });

  test("footer renders with social links and copyright", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("N0ctane")).toBeVisible();
    await expect(footer.getByText("All rights reserved")).toBeVisible();
    await expect(footer.getByLabel("GitHub")).toBeVisible();
    await expect(footer.getByLabel("LinkedIn")).toBeVisible();
    await expect(footer.getByLabel("Twitter")).toBeVisible();
    await expect(footer.getByLabel("Email")).toBeVisible();
    await expect(footer.getByText("Built with Next.js & shadcn")).toBeVisible();
  });

  test("mobile sheet opens on small viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    const sheet = page.locator('[data-slot="sheet-content"]');
    await expect(sheet.getByText("Skills")).toBeVisible();
  });
});
