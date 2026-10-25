import { BaseComponent } from './BaseComponent.js';

export class TableFooterComponent extends BaseComponent {
  perPage() {
    const locator = this.locator.locator('.v-data-table-footer__items-per-page .v-input__control');
    return new BaseComponent(this.page, locator);
  }
}
