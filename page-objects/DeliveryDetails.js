import { th } from "@faker-js/faker";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First name");
    this.lastNameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postCodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.sortCountryDropdown = page.locator('[data-qa="country-dropdown"]');
  }

  fillDeliveryDetails = async (firstName, lastName, street, postCode, city) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill();
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill();
    await this.streetInput.waitFor();
    await this.streetInput.fill();
    await this.postCodeInput.waitFor();
    await this.postCodeInput.fill();
    await this.cityInput.waitFor();
    await this.cityInput.fill();
  };
}
