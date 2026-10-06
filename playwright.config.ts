import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:${port}`, ...devices["Desktop Chrome"] },
  projects: [
    { name: "shots", testMatch: /shots\.spec\.ts/ },
    { name: "e2e", testMatch: /e2e\/.*\.spec\.ts/ },
    { name: "a11y", testMatch: /a11y\/.*\.spec\.ts/ },
  ],
  // Dev server: DRAFT and placeholder markers are visible, which is what review needs.
  webServer: {
    command: `pnpm exec next dev --port ${port}`,
    url: `http://localhost:${port}/robots.txt`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
