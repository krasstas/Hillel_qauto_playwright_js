export class LoginPage {
  constructor(page) {
    this.page = page;

    this.noAccountYetRegisterButton = page.locator(
      '[data-qa="go-to-signup-button"]'
    );
  }

  moveToSignupPage = async () => {
    await this.noAccountYetRegisterButton.waitFor();
    await this.noAccountYetRegisterButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
