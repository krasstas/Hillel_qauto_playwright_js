import { BaseComponent } from './BaseComponent.js';
import { expect } from '@playwright/test';

export class InputComponent extends BaseComponent {
  input() {
    const locator = this.locator.locator('input');
    return new BaseComponent(this.page, locator);
  }

  async isChecked() {
    await expect(this.locator).toBeChecked();
  }

  async isNotChecked() {
    await expect(this.locator).not.toBeChecked();
  }

  async toBeFocused() {
    await expect(this.locator).toBeFocused();
  }

  async toBeEnabled() {
    await expect(this.locator).toBeEnabled();
  }

  async toBeDisabled() {
    await expect(this.locator).toBeDisabled();
  }
  
  async press({ key, count = 1 } = {}) {
    for (let i = 0; i < count; i++) {
      await this.locator.press(key);
    }
  }

  async getInputValue() {
    return await this.locator.inputValue();
  }
}