import { expect } from "@playwright/test";
export class ThankYouPage {
  constructor(page) {
    this.page = page;

    this.backToShopButton = page.getByRole("button", { name: "Back to shop" });
    this.thankYouPageTitle = page.getByRole("heading", {
      name: "Thank you for shopping with us!",
    });
    this.thankYouPageText = page.getByText(
      "Head back to the shop to find more items that strike your fancy."
    );
  }

  BackToShopMainPage = async () => {
    await this.backToShopButton.waitFor();
    await expect(this.thankYouPageTitle).toHaveText(
      "Thank you for shopping with us!"
    );
    await expect(this.thankYouPageText).toHaveText(
      "Head back to the shop to find more items that strike your fancy."
    );
    await this.backToShopButton.click();
    await this.page.waitForURL("/", { timeOut: 1000 });
  };
}
