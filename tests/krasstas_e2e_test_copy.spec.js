import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductPage";

test("NEW E2E Test By KraSStaS", async ({ page }) => {
  // ProductsPage.visit();
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await page.pause();
});
