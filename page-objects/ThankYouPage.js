export class ThankYouPage {
  constructor(page) {
    this.page = page;

    this.backToShopButton = page.getByRole("button", { name: "Back to shop" });
  }

  BackToShopMainPage = async () => {
    await this.backToShopButton.waitFor();
    await this.backToShopButton.click();
    await this.page.waitForURL("/", { timeOut: 1000 });
  };
}
