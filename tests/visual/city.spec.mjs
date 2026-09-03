import { expect, test } from "@playwright/test";

async function openCity(page, viewport) {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".city3d-loading")).toBeHidden();
  await expect(page.locator(".city3d-canvas")).toHaveAttribute("role", "application");
  await expect(page.getByRole("button", { name: "Watch a release" })).toBeVisible();
}

test("desktop city keeps its visual contract", async ({ page }) => {
  await openCity(page, { width: 1280, height: 900 });
  await expect(page).toHaveScreenshot("release-city-desktop.png", { fullPage: true });
});

test("mobile city stays focused and usable", async ({ page }) => {
  await openCity(page, { width: 390, height: 844 });
  await expect(page.locator("body")).toHaveScreenshot("release-city-mobile.png");
});

test("keyboard navigation exposes places and reduced motion freezes ambient life", async ({ page }) => {
  await openCity(page, { width: 1024, height: 768 });
  const canvas = page.locator(".city3d-canvas");
  await canvas.focus();
  await canvas.press("ArrowRight");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Caddy gate");
  await expect(page.locator("#entity-position")).toHaveText("3/13");

  await expect(page.locator("#city-3d-scene")).toHaveAttribute("data-motion", "reduced");
  await page.waitForTimeout(350);
  await expect(page.locator("#city-3d-scene")).toHaveAttribute("data-motion", "reduced");
});

test("factual release receipts drive the primary city state", async ({ page }) => {
  let topologyCalls = 0;
  await page.route("**/api/topology", async (route) => {
    const response = await route.fetch();
    const topology = await response.json();
    topologyCalls += 1;
    if (topologyCalls > 1) {
      topology.releaseCursor = 1;
      topology.liveDeployments = ["portfolio"];
      topology.releases = [{
        id: "00000000-0000-4000-8000-000000000001",
        appId: "portfolio",
        release: "aaaaaaa",
        source: "signed-webhook",
        status: "running",
        phase: "accepted",
        createdAt: "2026-09-03T19:00:00.000Z",
        updatedAt: "2026-09-03T19:00:00.000Z",
        sequence: 1,
        queuePosition: 0,
        events: [{
          sequence: 1,
          at: "2026-09-03T19:00:00.000Z",
          status: "running",
          phase: "accepted",
        }],
      }];
    }
    await route.fulfill({ response, json: topology });
  });

  await openCity(page, { width: 1024, height: 768 });
  const toast = page.locator("#simulation-toast");
  await expect(toast).toHaveAttribute("data-source", "live", { timeout: 7_000 });
  await expect(toast).toContainText("LIVE · release accepted");
  await expect(page.getByRole("button", { name: "Watch a release" })).toBeDisabled();
  await expect(page.locator("#city-3d-scene")).toHaveAttribute("data-motion", "reduced");
});
