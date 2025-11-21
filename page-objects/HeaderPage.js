export class HeaderPage {
  constructor(page) {
    this.page = page;

    this.cartCounter = page.locator('[data-qa="header-basket-count"]');
  }

  getCartCount = async () => {
    await this.cartCounter.waitFor();
    const counterText = await this.cartCounter.innerText();
    return parseInt(counterText, 10);
  };
}
