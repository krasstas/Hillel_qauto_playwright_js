import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage.js";

test("My account using coockie injection", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();
});
