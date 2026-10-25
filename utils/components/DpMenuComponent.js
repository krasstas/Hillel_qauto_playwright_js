import { BaseComponent } from "./BaseComponent.js";
import { expect } from "@playwright/test";

export class DpMenuComponent extends BaseComponent {
  gridCell({ text, index, id } = {}) {
    let locator = this.locator.getByRole('gridcell');
    if (id) {
      locator = this.locator.locator(`[role="gridcell"]#${id}`);
    }

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new DpMenuComponent(this.page, locator);
  }

  async isActive() {
    await expect(this.locator).toHaveAttribute('aria-selected', 'true');
  }

  async isNotActive() {
    await expect(this.locator).not.toHaveAttribute('aria-selected', 'true');
  }
}