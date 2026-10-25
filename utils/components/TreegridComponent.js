import { BaseComponent } from './BaseComponent.js';
import { InputComponent } from './InputComponent.js';

export class TreegridComponent extends BaseComponent {
  headerFilter({ text } = {}) {
    const locator = this.locator.locator('header [role="columnheader"]').filter({ hasText: text });
    return new InputComponent(this.page, locator);
  }

  headerFilterIcon({ icon } = {}) {
    const locator = this.locator.locator(`header [role="columnheader"]:has(.${icon})`);
    return new InputComponent(this.page, locator);
  }

  headerCell({ text, icon, src, index } = {}) {
    let locator = this.locator.locator('.b-grid-header');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (icon) {
      locator = locator.filter({ has: this.page.locator(`.${icon}`) });
    }
    if (src) {
      locator = locator.filter({ has: this.page.locator(`img[src*="${src}"]`) });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TreegridComponent(this.page, locator);
  }

  row({ text, index } = {}) {
    let locator = this.locator.locator('.b-grid-row');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new TreegridComponent(this.page, locator);
  }

  cell({ text = '', index = 0 } = {}) {
    const locator = this.locator.locator('.b-grid-cell').filter({ hasText: text }).nth(index);
    return new TreegridComponent(this.page, locator);
  }

  cellByAttr({ name, value } = {}) {
    const locator = this.locator.locator(`.b-grid-cell[${name}="${value}"]`);
    return new TreegridComponent(this.page, locator);
  }

  rows() {
    const locator = this.locator.locator('.b-grid-body-container div[role="row"]');
    return new BaseComponent(this.page, locator);
  }

  clearButton({ icon, text } = {}) {
    let locator;
    if (icon) {
      locator = this.headerCell({ icon }).locator.locator('.mdi-close-circle');
    }

    if (text) {
      locator = this.headerCell({ text }).locator.locator('.mdi-close-circle');
    }
    return new BaseComponent(this.page, locator);
  }

  getElementByClass({ className } = {}) {
    const locator = this.locator.locator(`.${className}`);
    return new BaseComponent(this.page, locator);
  }
}