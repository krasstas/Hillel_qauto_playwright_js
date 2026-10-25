import { BaseComponent } from './BaseComponent.js';

export class ListBoxComponent extends BaseComponent {
  option({ optionText, exact = false, index, className } = {}) {
    let locator = this.locator.getByRole('option');

    if (optionText) {
      locator = exact
        ? locator.filter({ hasText: new RegExp(`^${optionText}$`) })
        : locator.filter({ hasText: optionText });
    }

    if (className) {
      locator = locator.and(this.page.locator(`.${className}`));
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  listitem({ text, index } = {}) {
    let locator = this.locator.getByRole('listitem');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new BaseComponent(this.page, locator);
  }
}