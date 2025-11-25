import { expect } from "@playwright/test";
export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.baskeItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }
  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemBeforeRemoval = await this.basketCards.count();
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
    await expect(this.basketCards).toHaveCount(itemBeforeRemoval - 1);
    console.warn({ justNumbers });
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
  // await this.page.pause();
}
