import { BaseComponent } from './BaseComponent.js';
import { expect } from '@playwright/test';

export class NavComponent extends BaseComponent {
  closeIcon() {
    const locator = this.locator.locator('.mdi-close');
    return new BaseComponent(this.page, locator);
  }

  drawerCardScrollable({ text, index } = {}) {
    let locator = this.locator.locator('.drawer-card-scrollable');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new NavComponent(this.page, locator);
  }

  vListItem({ text, index } = {}) {
    let locator = this.locator.locator('.v-list-item');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new NavComponent(this.page, locator);
  }

  async close({ isHidden = true } = {}) {
    await this.closeIcon().click();
    if (isHidden) {
      await expect(this.locator).toBeHidden();
    } else {
      await expect(this.locator).not.toHaveClass('v-navigation-drawer--active');
    }
  }
}