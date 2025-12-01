import { test } from "@playwright/test";
// import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage.js";
import { HeaderPage } from "../page-objects/HeaderPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";
import { LoginPage } from "../page-objects/LoginPage.js";
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage.js";
import { PaymentPage } from "../page-objects/PaymentPage.js";
import { userDetails } from "../data/userDetails.js";

import { deliveryDetails as usersAddress } from "../data/deliveryDetails";
import { paymentDetails } from "../data/paymentDetails.js";
import { ThankYouPage } from "../page-objects/ThankYouPage.js";

test.only("Full E2E Test", async ({ page }) => {
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

  const registerPage = new RegisterPage(page);
  await registerPage.signUpAsNewUser(userDetails);

  // Alternative use of UUID instead of a faker.

  // const emailId = uuidv4();
  // const email = emailId + "@testmail.com";

  const deliveryDetails = new DeliveryDetailsPage(page);
  await deliveryDetails.fillDeliveryDetails(usersAddress);
  await deliveryDetails.saveAddress();
  await deliveryDetails.continueToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.applyDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.confirmPurchase();

  const thankYouPage = new ThankYouPage(page);
  await thankYouPage.BackToShopMainPage();
  // await page.pause();
});
