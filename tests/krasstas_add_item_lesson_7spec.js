import { test } from "@playwright/test";

test("Adding To Cart", async ({ page }) => {
  await page.goto("localhost:2221");
});
