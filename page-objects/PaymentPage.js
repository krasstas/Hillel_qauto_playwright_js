export class PaymentPage {
  constructor(page) {
    this.page = page;

    this.promoCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
  }

  applyDiscount = async () => {
    await this.page.pause();
  };
}
