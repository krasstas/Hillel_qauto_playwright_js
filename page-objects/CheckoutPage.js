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
    //  [ '499$', '599$', '320$' ] --> [ 499, 599, 320 ]
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });

    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIndx = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton =
      this.basketItemRemoveButton.nth(smallestPriceIndx);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    console.warn({ justNumbers });
    await this.page.pause();
  };
}
