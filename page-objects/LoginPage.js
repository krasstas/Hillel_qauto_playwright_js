export class LoginPage {
  constructor(page) {
    this.page = page;

    this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]');
  }

  moveToSignupPage = async () => {
    await this.moveToSignupButton.waitFor();
    await this.moveToSignupButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
