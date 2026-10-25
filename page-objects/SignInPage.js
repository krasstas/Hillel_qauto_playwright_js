import { expect } from '@playwright/test';
import { BasePageObject } from './BasePageObject.page.js';
import { BaseComponent } from '../utils/components/BaseComponent.js';

export class SignInPage extends BasePageObject {
  constructor(page) {
    super(page);

    this.noAccountYetRegisterButton = page.locator(
      '[data-qa="go-to-signup-button"]',
    );
  }

  moveToSignupPage = async () => {
    await this.noAccountYetRegisterButton.waitFor();
    await this.noAccountYetRegisterButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 1000 });
  };
}
