import { expect } from '@playwright/test';
import { BasePageObject } from './BasePageObject.page.js';
import { BaseComponent } from '../utils/components/BaseComponent.js';

export class HomePage extends BasePageObject {
  constructor(page) {
    super(page);

    this.header = page.locator('header');

    this.pageTitle = page.getByRole('heading', { name: 'Do more!' });
    this.heroDescription = page.getByText(
      'With the help of the Hillel auto project',
    );
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.heroVideoIframe = page
      .frameLocator('iframe.hero-video_frame[src*="youtube.com/embed"]')
      .locator('#player');

    this.aboutSection = page.locator('#aboutSection');

    this.aboutBlockFuelExpenses = this.aboutSection
      .locator('.about-block')
      .nth(0);
    this.aboutBlockFuelExpensesImage = this.aboutBlockFuelExpenses.locator(
      'img.about-picture-img',
    );
    this.aboutBlockFuelExpensesTitle =
      this.aboutBlockFuelExpenses.getByText('Log fuel expenses');
    this.aboutBlockFuelExpensesText = this.aboutBlockFuelExpenses.getByText(
      'Keep track of your replacement',
    );

    this.aboutBlockInstructions = this.aboutSection
      .locator('.about-block')
      .nth(0);
    this.aboutBlockInstructionsImage = this.aboutBlockInstructions.locator(
      'img.about-picture-img',
    );
    this.aboutBlockInstructionsTitle = this.aboutBlockInstructions.getByText(
      'Instructions and manuals',
    );
    this.aboutBlockInstructionsText = this.aboutBlockInstructions.getByText(
      'Watch over 100 instructions',
    );
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
