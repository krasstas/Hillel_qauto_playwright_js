export class HeaderPage {
  constructor(page) {
    this.page = page;
    this.cartCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
  }

  getCartCount = async () => {
    await this.cartCounter.waitFor();
    const counterText = await this.cartCounter.innerText();
    return parseInt(counterText, 10);
  };

  goToCheckout = async () => {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
