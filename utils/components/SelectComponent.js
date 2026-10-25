import { BaseComponent } from './BaseComponent.js';

export class SelectComponent extends BaseComponent {
  async select({ value } = {}) {
    const input = this.locator.locator('input');
    await input.click();
    await input.fill(value);

    const option = this.page.getByRole('option', {
      name: value,
      exact: true,
    });

    await option.click();
  }

  async selectMany({ values = [] } = {}) {
    for (const value of values) {
      await this.select({ value });
    }
  }

  async values() {
    const chips = this.locator
      .locator('.v-input__control .v-input__slot .v-select__slot .v-select__selections');
    await chips.waitFor();
    return await chips.allTextContents();
  }

  async clear() {
    const chips = this.locator.locator('.v-chip .v-icon');
    while ((await chips.count()) > 0) {
      await chips.first().click();
    }
  }

  async hasValue({ value } = {}) {
    const values = await this.values();
    return values.includes(value);
  }

  label() {
    return this.locator.locator('label');
  }
}