// import * as dotenv from "dotenv";
// dotenv.config();
// dotenv добавлен НАПРЯМУЮ в playwright.config, по этому тут закомментирован.
import { test } from "@playwright/test";
import { MyAccountPageMocking } from "../page-objects/MyAccountPageMocking.js";
import { getLoginToken } from "../api-requests/getLoginToken.js";
import { userApiLoginDetails } from "../data/userDetails.js";

test.only("My account using coockie injection and mocking network request", async ({
  page,
}) => {
  const loginToken = await getLoginToken(userApiLoginDetails);
  await page.route("**api/user**", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Server not responding" }),
    });
  });
  const myAccountPage = new MyAccountPageMocking(page);
  await myAccountPage.visit();

  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );

  await myAccountPage.visit();
  await myAccountPage.waitForPageTitle();
  await myAccountPage.waitForServerErrorMessage();
  // await page.pause();
});
