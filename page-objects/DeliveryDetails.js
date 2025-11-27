import { expect } from "@playwright/test";

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
    this.saveAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostCode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );
  }

  fillDeliveryDetails = async (usersAddress) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(usersAddress.firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(usersAddress.lastName);
    await this.streetInput.waitFor();
    await this.streetInput.fill(usersAddress.street);
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill(usersAddress.postCode);
    await this.cityInput.waitFor();
    await this.cityInput.fill(usersAddress.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption("Ukraine");
  };

  saveAddress = async () => {
    const addressContainerCount = await this.saveAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.saveAddressContainer).toHaveCount(
      addressContainerCount + 1
    );
    await this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(
      await this.firstNameInput.inputValue()
    );
    await this.page.waitForTimeout(1000);
  };

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.pause();
  };
}
