import { BaseComponent } from './BaseComponent.js';

export class DropdownMenuComponent extends BaseComponent {
  getRow({ text } = {}) {
    const locator = this.locator.getByRole('menuitem').filter({ hasText: text });
    return new BaseComponent(this.page, locator);
  }
}