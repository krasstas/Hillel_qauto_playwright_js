import { BaseComponent } from './BaseComponent.js';

export class VWindowComponent extends BaseComponent {
  itemActive({ text, index } = {}) {
    let locator = this.locator.locator('.v-window-item--active');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new VWindowComponent(this.page, locator);
  }

  item({ text, index } = {}) {
    let locator = this.locator.locator('.v-window-item');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new VWindowComponent(this.page, locator);
  }
}