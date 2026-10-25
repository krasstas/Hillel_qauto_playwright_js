import { BaseComponent } from './BaseComponent.js';

export class BWidget extends BaseComponent {
  item({ text, index } = {}) {
    let locator = this.locator.locator('.b-menu-item');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BWidget(this.page, locator);
  }
}