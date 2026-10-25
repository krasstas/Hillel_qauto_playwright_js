import { BaseComponent } from './BaseComponent.js';

export class SvgComponent extends BaseComponent {
  path({ d, index } = {}) {
    let locator = this.locator.locator('path');
    if (d) {
      locator = locator.filter({ has: this.locator.locator(`[d*="${d}"]`) });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  g({ className, seriesName, path, index } = {}) {
    let locator = this.locator.locator(className ? `g.${className}` : `g`);

    if (seriesName) {
      locator = locator.and(this.page.locator(`[seriesname="${seriesName}"]`));
    }

    if (path) {
      locator = locator.filter({ has: this.page.locator(path) });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new SvgComponent(this.page, locator);
  }

  tagText({ className, text, index } = {}) {
    let locator = this.locator.locator(className ? `text.${className}` : `text`);

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new SvgComponent(this.page, locator);
  }
}