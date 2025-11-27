export class DeliveryDetails {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First name");
    this.lastNameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postCodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
    this.continueToPaymentButton = page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
  }

  fillDeliveryDetails = async (firstName, lastName, street, postCode, city) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(lastName);
    await this.streetInput.waitFor();
    await this.streetInput.fill(street);
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill(postCode);
    await this.cityInput.waitFor();
    await this.cityInput.fill(city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption("Ukraine");
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await this.page.pause();
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
  };
}
