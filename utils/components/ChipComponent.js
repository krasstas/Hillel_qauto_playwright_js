import { BaseComponent } from './BaseComponent.js';
import { expect } from '@playwright/test';

export class ChipComponent extends BaseComponent {
  async select() {
    await this.locator.click();
  }

  async text() {
    return (await this.locator.textContent())?.trim();
  }

  async close() {
    await this.locator.locator('.v-chip__close').waitFor();
    await this.locator.locator('.v-chip__close').click();
  }

  async isSelected() {
    return (await this.locator.getAttribute('aria-selected')) === 'true';
  }

  async expectClass({ className } = {}) {
    await expect(this.locator).toHaveClass(new RegExp(className));
  }

  async expectClassHidden({ className } = {}) {
    await expect(this.locator).not.toHaveClass(new RegExp(className));
  }
}