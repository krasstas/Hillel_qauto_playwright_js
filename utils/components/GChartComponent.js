import { BaseComponent } from './BaseComponent.js';

export class GChartComponent extends BaseComponent {
  item({ text, index = 0 } = {}) {
    let locator = this.locator.locator('g.node');

    if (text) locator = locator.filter({ hasText: text });

    locator = locator.nth(index);

    return new GChartComponent(this.page, locator);
  }

  itemList() {
    const locator = this.locator.locator('g.node');

    return new BaseComponent(this.page, locator);
  }

  button({ name, index = 0 } = {}) {
    const locator = this.locator.locator('g.node-button-g').filter({ hasText: name }).nth(index);
    return new BaseComponent(this.page, locator);
  }
}