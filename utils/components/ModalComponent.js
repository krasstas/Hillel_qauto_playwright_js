import { BaseComponent } from './BaseComponent.js';
import { expect } from '@playwright/test';

export class ModalComponent extends BaseComponent {
  title() {
    return this.locator.locator('.v-card__title');
  }

  button({ name } = {}) {
    const locator = this.locator.getByRole('button', { name });
    return new BaseComponent(this.page, locator);
  }

  closeIcon({ index = 0 } = {}) {
    const locator = this.locator.locator('.mdi-close').nth(index);
    return new BaseComponent(this.page, locator);
  }

  updateIcon() {
    const locator = this.locator.locator('.mdi-refresh');
    return new BaseComponent(this.page, locator);
  }

  async close({ isHidden = true, index } = {}) {
    await this.closeIcon({ index }).click();
    isHidden ? await this.isHidden() : await this.expectNoClass({ className: 'v-dialog--active' });
  }

  async update({ text } = {}) {
    await this.updateIcon().click();
    await this.expectText({ text });
  }

  async expectTitle({ text } = {}) {
    await expect(this.title()).toContainText(text);
  }
}