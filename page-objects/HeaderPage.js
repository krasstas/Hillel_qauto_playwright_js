import { isDesktopViewport } from "../utils/isDesktopViewport";
export class HeaderPage {
  constructor(page) {
    this.page = page;

    this.cartCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.burgerMenuButton = page.locator('[data-qa="burger-button"]');
  }

  getCartCount = async () => {
    await this.cartCounter.waitFor();
    const counterText = await this.cartCounter.innerText();
    return parseInt(counterText, 10);
  };

  goToCheckout = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerMenuButton.waitFor();
      await this.burgerMenuButton.click();
    }
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket", { timeOut: 1000 });
  };
}
