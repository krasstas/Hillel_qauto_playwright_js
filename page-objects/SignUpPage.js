import { expect } from '@playwright/test';
import { BasePageObject } from './BasePageObject.page.js';
import { BaseComponent } from '../utils/components/BaseComponent.js';

export class SignUpPage extends BasePageObject {
  constructor(page) {
    super(page);

    this.emailInput = page.getByPlaceholder('E-Mail');
    this.passwordInput = page.getByPlaceholder('Password');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  signUpAsNewUser = async (userRegistrationDetails) => {
    await this.emailInput.waitFor();
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(userRegistrationDetails.email);
    await this.passwordInput.waitFor();
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(userRegistrationDetails.password);
    await this.registerButton.waitFor();
    await expect(this.registerButton).toBeEnabled();

    await this.page.waitForTimeout(1000);

    await this.registerButton.click();

    await this.page.waitForTimeout(1000);
  };
}
