import { expect } from "@playwright/test";
export class PaymentPage {
  constructor(page) {
    this.page = page;

    this.promoCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.promoCodeInput = page.getByPlaceholder("Discount code");
    this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
    this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
    this.validUntilInput = page.getByPlaceholder("Valid until");
    this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC");
    this.payButton = page.getByRole("button", { name: "pay" });
  }

  applyDiscount = async () => {
    await this.promoCode.waitFor();
    const discountCode = await this.promoCode.innerText();
    await this.promoCodeInput.waitFor();
    await this.promoCodeInput.fill(discountCode);
    await expect(this.promoCodeInput).toHaveValue(discountCode);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.cardOwner);
    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(paymentDetails.cardNumber);
    await this.validUntilInput.waitFor();
    await this.validUntilInput.fill(paymentDetails.expirationDate);
    await this.creditCardCvcInput.waitFor();
    await this.creditCardCvcInput.fill(paymentDetails.cardCVC);
    await this.page.pause();
  };
}
