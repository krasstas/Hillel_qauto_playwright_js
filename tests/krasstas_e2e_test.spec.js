import { test } from "@playwright/test";
// import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { ProductsPage } from "../page-objects/ProductsPage.js";
import { HeaderPage } from "../page-objects/HeaderPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";
import { LoginPage } from "../page-objects/LoginPage.js";
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js";
import { deliveryDetails as usersAddress } from "../data/deliveryDetails.js";

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

  const registerPage = new RegisterPage(page);

  // const emailId = uuidv4();
  // const email = emailId + "@testmail.com";
  const email = faker.internet.email({ provider: "testmail.com" });

  let password = faker.internet.password({
    length: faker.number.int({ min: 8, max: 15 }),
    exclude: " ",
  });
  while (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password)
  ) {
    password = faker.internet.password({
      length: faker.number.int({ min: 8, max: 15 }),
      exclude: " ",
    });
  }
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const street = faker.location.streetAddress();
  const postCode = faker.location.zipCode();
  const city = faker.location.city();

  await deliveryDetails.fillDeliveryDetails(
    firstName,
    lastName,
    street,
    postCode,
    city
  );

  await page.pause();
});
