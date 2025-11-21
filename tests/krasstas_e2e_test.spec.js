import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New Full E2E Test", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await page.pause();
});
