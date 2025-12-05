import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("crm.36773@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("yB2#dlN7Qa");
  await page.getByRole("checkbox", { name: "Remember me" }).check();
  await page.getByRole("button", { name: "Login" }).click();
});
