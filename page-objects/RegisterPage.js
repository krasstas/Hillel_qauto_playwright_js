import { expect } from "@playwright/test";
export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder("E-Mail");
    this.passwordInput = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signUpAsNewUser = async (userDetails) => {
    await this.emailInput.waitFor();
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(userDetails.email);
    await this.passwordInput.waitFor();
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(userDetails.password);
    await this.registerButton.waitFor();
    await expect(this.registerButton).toBeEnabled();

    await this.page.waitForTimeout(1000);

    await this.registerButton.click();

    await this.page.waitForTimeout(1000);
  };
}
