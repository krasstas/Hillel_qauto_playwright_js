import { BaseComponent } from './BaseComponent.js';
import { ChipComponent } from './ChipComponent.js';
import { InputComponent } from './InputComponent.js';
import { SelectComponent } from './SelectComponent.js';

export class FilterComponent extends BaseComponent {
  input() {
    const locator = this.locator.locator('input[type="text"]');
    return new InputComponent(this.page, locator);
  }

  inputHidden() {
    const locator = this.locator.locator('input[type="hidden"]');
    return new InputComponent(this.page, locator);
  }

  inputFile() {
    const locator = this.locator.locator('input[type="file"]');
    return new InputComponent(this.page, locator);
  }

  numberInput() {
    const locator = this.locator.locator('input[type="number"]');
    return new InputComponent(this.page, locator);
  }

  textarea() {
    const locator = this.locator.locator('textarea');
    return new InputComponent(this.page, locator);
  }

  checkbox() {
    const locator = this.locator.locator('input[type="checkbox"]');
    return new InputComponent(this.page, locator);
  }

  radio({ value } = {}) {
    const locator = this.locator.locator(`input[type="radio"][value="${value}"]`);
    return new InputComponent(this.page, locator);
  }

  select({ label } = {}) {
    const locator = this.locator.locator('.v-input').filter({ hasText: label });
    return new SelectComponent(this.page, locator);
  }

  chip({ text, imgSrc, index = 0 } = {}) {
    let chip = this.locator.locator('.v-chip');
    if (text) chip = chip.filter({ hasText: text });
    if (imgSrc) chip = chip.filter({ has: this.page.locator(`img[src*="${imgSrc}"]`) });
    chip = chip.nth(index);
    return new ChipComponent(this.page, chip);
  }

  img({ text } = {}) {
    const locator = this.locator.locator(`img[src*="${text}"]`);
    return new BaseComponent(this.page, locator);
  }

  applyButton() {
    return new BaseComponent(this.page, this.locator.getByRole('button', { name: /поиск/i }));
  }

  searchButton() {
    const locator = this.locator.locator('.mdi-magnify');
    return new BaseComponent(this.page, locator);
  }

  clearButton() {
    const locator = this.locator.getByRole('button').filter({ has: this.page.locator('.mdi-close-circle') });
    return new BaseComponent(this.page, locator);
  }

  clearIcon({ index = 0 } = {}) {
    const locator = this.locator.locator('.mdi-close-circle').nth(index);
    return new BaseComponent(this.page, locator);
  }

  clearIconByClass({ className, index = 0 } = {}) {
    const locator = this.locator.locator(`.${className}`).nth(index);
    return new BaseComponent(this.page, locator);
  }

  clearIconByAriaLabel({ ariaLabel, index = 0 } = {}) {
    const locator = this.locator.locator(`i[aria-label="${ariaLabel}"]`).nth(index);
    return new BaseComponent(this.page, locator);
  }

  async reset() {
    await this.locator.locator('.mdi-close').click();
  }

  async type({ value, options } = {}) {
    await this.input().type(value, options);
  }

  alert({ text, index } = {}) {
    let locator = this.locator.getByRole('alert');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  passwordInput() {
    const locator = this.locator.locator('input[type="password"]');
    return new InputComponent(this.page, locator);
  }
}