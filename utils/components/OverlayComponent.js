import { BaseComponent } from './BaseComponent.js';
import { InputComponent } from './InputComponent.js';

export class OverlayComponent extends BaseComponent {
  item({ text, exact = true, index, className } = {}) {
    let locator = this.locator.getByRole('option');

    if (text) {
      locator = exact
        ? locator.filter({ hasText: new RegExp(`^${text}$`, 'i') })
        : locator.filter({ hasText: text });
    }

    if (className) {
      locator = className.startsWith('!')
        ? locator.and(this.page.locator(`:not(.${className.slice(1)})`))
        : locator.and(this.page.locator(`.${className}`));
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  listItem({ text, index } = {}) {
    let locator = this.locator.getByRole('listitem');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  input({ index = 0 } = {}) {
    const locator = this.locator.locator('input').nth(index);
    return new InputComponent(this.page, locator);
  }

  checkbox({ index } = {}) {
    let locator = this.locator.locator('input[type="checkbox"]');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new InputComponent(this.page, locator);
  }

  closeIcon() {
    const locator = this.locator.locator('.mdi-close-circle');
    return new BaseComponent(this.page, locator);
  }

  icon({ icon } = {}) {
    const locator = this.locator.locator(`.${icon}`);
    return new BaseComponent(this.page, locator);
  }
}