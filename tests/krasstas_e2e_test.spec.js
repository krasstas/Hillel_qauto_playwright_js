import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage.js";
import { HeaderPage } from "../page-objects/HeaderPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";
import { LoginPage } from "../page-objects/LoginPage.js";

test.only("New Full E2E Test", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addItemToCart(0);
  await productsPage.addItemToCart(1);
  await productsPage.addItemToCart(2);

  const headerPage = new HeaderPage(page);
  await headerPage.goToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.removeCheapestProduct();
  await checkoutPage.continueToCheckout();

  const loginPage = new LoginPage(page);
  await loginPage.moveToSignupPage();

  // await page.pause();
});
