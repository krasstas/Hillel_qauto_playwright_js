import { test } from "@playwright/test";

test("Adding To Cart", async ({ page }) => {
  await page.goto("localhost:2221");
  await page.pause();

  const addToBasketButton = page
    .getByRole("button", { name: "Add to Basket" })
    .first();
  await addToBasketButton.click();
});
