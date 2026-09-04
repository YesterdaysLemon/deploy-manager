import { defineConfig } from "@playwright/test";

const port = 4183;

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  expect: {
    timeout: 12_000,
    toHaveScreenshot: {
      animations: "disabled",
      maxDiffPixelRatio: 0.025,
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: process.platform === "win32" ? "msedge" : undefined,
    headless: true,
    // GPU-less CI bots need a deterministic graphics backend. Keep normal
    // local runs on the host GPU and exercise the full scene in both cases.
    launchOptions: process.env.CI ? {
      args: ["--use-gl=angle", "--use-angle=swiftshader"],
    } : undefined,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/dev.mjs",
    env: {
      ...process.env,
      DEPLOY_MANAGER_DEV_PORT: String(port),
      DEPLOY_MANAGER_PROBES_ENABLED: "false",
      DEPLOY_MANAGER_JOURNAL_FILE: ":memory:",
    },
    url: `http://127.0.0.1:${port}/healthz`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
