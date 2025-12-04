import { expect } from "@playwright/test";
export class MyAccountPage {
  constructor(page) {
    this.page = page;

    this.myAccountPageTitle = page.getByRole("heading", { name: "My Account" });
    this.serverErrorMessage = page.locator('[data-qa="error-message"]');
  }

  visit = async () => {
    await this.page.goto("/my-account");
  };

  waitForPageTitle = async () => {
    await expect(this.myAccountPageTitle).toHaveText("My Account");
  };

  waitForServerErrorMessage = async () => {
    await expect(this.serverErrorMessage).toHaveText("Server not responding");
  };
}
