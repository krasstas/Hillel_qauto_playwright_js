import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New Full E2E Test", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.addItemToCart(0);
  await productsPage.addItemToCart(1);
  await productsPage.addItemToCart(2);
  await page.pause();
});
