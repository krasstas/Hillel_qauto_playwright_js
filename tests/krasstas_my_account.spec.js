import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage.js";
import { getLoginToken } from "../api-requests/getLoginToken.js";

test.only("My account using coockie injection", async ({ page }) => {
  const loginToken = await getLoginToken();
  console.warn({ loginToken });
  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();

  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );

  await myAccountPage.visit();
  await myAccountPage.waitForPageTitle();
  await page.pause();
});
