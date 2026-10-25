import { BaseComponent } from './BaseComponent.js';

export class vTimelineComponent extends BaseComponent {
  item({ text, index } = {}) {
    let locator = this.locator.locator('.v-timeline-item');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new BaseComponent(this.page, locator);
  }

  visPanel({ text, index } = {}) {
    let locator = this.locator.locator('.vis-panel').filter({ hasText: text });
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new vTimelineComponent(this.page, locator);
  }

  visPanelRow({ text, index } = {}) {
    let locator = this.locator.locator('.vis-label').filter({ hasText: text });
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new vTimelineComponent(this.page, locator);
  }

  visGroup({ index } = {}) {
    let locator = this.locator.locator('.vis-group');
    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }

  visItem({ text, className, index } = {}) {
    let locator = this.locator.locator('.vis-item');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (className) {
      locator = locator.locator(`.${className}`);
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }

  tooltip({ text, index } = {}) {
    let locator = this.locator.locator('.vis-tooltip').filter({ hasText: text });

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }

  div({ text, className, index } = {}) {
    let locator = this.locator.locator('div');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (className) {      
      locator = this.locator.locator(`div.${className}`);
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }
}