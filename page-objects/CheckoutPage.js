export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.baskeItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
  }
  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    await this.baskeItemPrice.first().waitFor();
    const allPriceTexts = await this.baskeItemPrice.allInnerTexts();
    console.warn({ allPriceTexts });
    await this.page.pause();
  };
}
