import { expect, test } from "@playwright/test";

async function openCity(page, viewport) {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".city3d-loading")).toBeHidden({ timeout: 45_000 });
  await expect(page.locator("#city-3d-scene")).not.toHaveAttribute(
    "data-asset-warnings",
    /\d+/,
  );
  await expect(page.locator(".city3d-canvas")).toHaveAttribute("role", "application");
  await expect(page.getByRole("button", { name: "Watch a release" })).toBeVisible();
}

test("desktop city keeps its visual contract", async ({ page }) => {
  await openCity(page, { width: 1280, height: 900 });
  // This is a fixed, viewport-sized scene. A page capture avoids the element
  // screenshot's scroll/stability handshake on software-rendered CI browsers.
  await expect(page).toHaveScreenshot(
    "release-city-desktop.png",
    { fullPage: false, timeout: 30_000 },
  );
});

test("mobile city stays focused and usable", async ({ page }) => {
  await openCity(page, { width: 390, height: 844 });
  await expect(page).toHaveScreenshot("release-city-mobile.png", { fullPage: false });
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

test.describe("normal-motion phone gestures", () => {
  test.use({ viewport: {width:393,height:852}, isMobile:true, hasTouch:true, reducedMotion:"no-preference" });

  test("building titles are touch and keyboard controls, with the phone render budget", async ({page}) => {
    await page.goto("/");
    await expect(page.locator(".city3d-loading")).toBeHidden({timeout:45000});
    const stage=page.locator("#city-3d-scene");
    await expect(stage).toHaveAttribute("data-render-profile","mobile");
    await expect(stage).toHaveAttribute("data-frame-budget","33");
    expect(await page.locator("canvas").evaluate(e=>e.width*e.height)).toBeLessThanOrEqual(650000);
    const title=page.locator("#detail-title");
    await title.tap();
    await expect(page.locator("#selection-details")).toBeVisible();
    await title.tap();
    await expect(page.locator("#selection-details")).not.toBeVisible();
    const label=page.getByRole("button",{name:"Show details for Deploy Manager",exact:true});
    await label.tap();
    await expect(page.locator("#selection-details")).toBeVisible();
    await title.tap();
    await label.focus();await label.press("Enter");
    await expect(page.locator("#selection-details")).toBeVisible();
    expect(page.context().pages()).toHaveLength(1);
    await title.tap();
    const box=await label.boundingBox(),cdp=await page.context().newCDPSession(page);
    const x=box.x+box.width/2,y=box.y+box.height/2;
    await cdp.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x,y}]});
    for(let i=1;i<=12;i++)await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:x+i*5,y}]});
    await cdp.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});await cdp.detach();
    await expect(page.locator("#selection-details")).not.toBeVisible();
  });

  test("a swipe starting on the city invitation rotates without activating it or trailing", async ({page}) => {
    await page.goto("/");
    await expect(page.locator(".city3d-loading")).toBeHidden({timeout:45000});
    const link=page.getByRole("link",{name:"Build your own city — setup options",exact:true});
    const box=await link.boundingBox(), cdp=await page.context().newCDPSession(page);
    const before=await page.locator("#city-3d-scene").evaluate(e=>e.style.getPropertyValue("--north-rotation"));
    const x=box.x+box.width/2,y=box.y+box.height/2;
    await cdp.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x,y}]});
    let maxDrift=0;
    for(let i=1;i<=16;i++) {
      await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:x-i*5,y}]});
      maxDrift=Math.max(maxDrift,await page.locator(".city3d-ghost-anchor").evaluate(e=>{
        const match=e.style.transform.match(/translate\(([-.0-9]+)px,\s*([-.0-9]+)px\)/),r=e.getBoundingClientRect();
        return match?Math.hypot(r.x+r.width/2-Number(match[1]),r.bottom-Number(match[2])):0;
      }));
    }
    await cdp.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
    await cdp.detach();
    expect(maxDrift).toBeLessThan(1);
    await expect(page.locator("#build-city-dialog")).not.toBeVisible();
    const after=await page.locator("#city-3d-scene").evaluate(e=>e.style.getPropertyValue("--north-rotation"));
    expect(after).not.toBe(before);
    const finalBox=await link.boundingBox();
    expect(finalBox.x).toBeGreaterThanOrEqual(0);expect(finalBox.x+finalBox.width).toBeLessThanOrEqual(393);
    await link.tap();
    await expect(page.locator("#build-city-dialog")).toBeVisible();
    await page.getByRole("button",{name:"Close setup options"}).tap();
    await expect(page.locator("#build-city-dialog")).not.toBeVisible();
    expect(page.context().pages()).toHaveLength(1); // No tap-through into a setup link.
  });

  test("pinching changes zoom without selecting a building or opening setup; peek details expand",async({page})=>{
    await page.goto("/");await expect(page.locator(".city3d-loading")).toBeHidden({timeout:45000});
    const title=await page.locator("#detail-title").textContent();
    const before=Number(await page.locator("#city-3d-scene").getAttribute("data-camera-zoom"));
    const cdp=await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{id:1,x:145,y:430},{id:2,x:245,y:430}]});
    for(let i=1;i<=10;i++)await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{id:1,x:145-i*4,y:430},{id:2,x:245+i*4,y:430}]});
    await cdp.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});await cdp.detach();
    await expect(page.locator("#detail-title")).toHaveText(title);
    await expect(page.locator("#build-city-dialog")).not.toBeVisible();
    expect(Number(await page.locator("#city-3d-scene").getAttribute("data-camera-zoom"))).toBeGreaterThan(before);
    await expect(page.locator("#selection-details")).not.toBeVisible();
    await page.getByRole("button",{name:"Show building details"}).tap();
    await expect(page.locator("#selection-details")).toBeVisible();
    await expect(page.getByRole("button",{name:"Hide building details"})).toHaveAttribute("aria-expanded","true");
  });
});
