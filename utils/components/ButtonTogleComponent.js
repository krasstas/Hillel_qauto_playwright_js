import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent.js';
import { ButtonComponent } from './ButtonComponent.js';

export class ButtonToggleComponent extends BaseComponent {
  button({ buttonText } = {}) {
    const locator = this.locator.locator('button').filter({ hasText: buttonText });
    return new ButtonComponent(this.page, locator);
  }

  async expectButtonsState({ disabled } = {}) {
    const buttons = this.locator.locator('button');
    const count = await buttons.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);

      if (disabled) {
        await expect(button).toBeDisabled();
      } else {
        await expect(button).toBeEnabled();
      }
    }
  }
}