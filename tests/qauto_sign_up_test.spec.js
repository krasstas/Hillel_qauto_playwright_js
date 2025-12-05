import { test, expect } from "@playwright/test";

test("qauto_sign_up_test", async ({ page }) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.locator("#signupName").click();
  await page.locator("#signupName").fill("Stanislav");
  await page.locator("#signupName").press("Tab");
  await page.locator("#signupLastName").fill("Kras");
  await page.locator("#signupLastName").press("Tab");
  await page.getByRole("textbox", { name: "Name Last name Email" }).click();
  await page
    .getByRole("textbox", { name: "Name Last name Email" })
    .fill("crm.36773@gmail.com");
  await page.getByRole("textbox", { name: "Name Last name Email" }).click();
  await page.getByRole("textbox", { name: "Password", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("yB2#dlN7Qa");
  await page.getByRole("textbox", { name: "Re-enter password" }).click();
  await page
    .getByRole("textbox", { name: "Re-enter password" })
    .fill("yB2#dlN7Qa");
  await page.getByRole("button", { name: "Register" }).click();
});
