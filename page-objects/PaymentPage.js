import { expect } from "@playwright/test";
export class PaymentPage {
  constructor(page) {
    this.page = page;

    this.promoCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.promoCodeInput = page.getByPlaceholder("Discount code");
  }

  applyDiscount = async () => {
    await this.promoCode.waitFor();
    const discountCode = await this.promoCode.innerText();
    await this.promoCodeInput.waitFor();
    await this.promoCodeInput.fill(discountCode);
    await expect(this.promoCodeInput).toHaveValue(discountCode);
    await this.page.pause();
  };
}
