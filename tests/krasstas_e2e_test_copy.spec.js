import { test } from "@playwright/test";
import { ProductsPageCopy } from "../page-objects/ProductsPageCopy";

test("NEW E2E Test By KraSStaS", async ({ page }) => {
  // ProductsPage.visit();
  const productsPageCopy = new ProductsPageCopy(page);
  await productsPageCopy.visit();
  await page.pause();
});
