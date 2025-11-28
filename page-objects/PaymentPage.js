export class PaymentPage {
  constructor(page) {
    this.page = page;
  }

  applyDiscount = async () => {
    await this.page.pause();
  };
}
