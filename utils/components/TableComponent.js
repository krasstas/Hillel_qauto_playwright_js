import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent.js';
import { ChipComponent } from './ChipComponent.js';
import { RowComponent } from './RowComponent.js';

export class TableComponent extends BaseComponent {
  header() {
    const locator = this.locator.locator('thead');
    return new TableComponent(this.page, locator);
  }

  rowGroupHeader({ text, index } = {}) {
    let locator = this.locator.locator('tr.v-row-group__header');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new RowComponent(this.page, locator);
  }

  filter({ text, icon, img, index = 0 } = {}) {
    let locator;
    if (text) locator = this.locator.locator('[aria-haspopup="menu"]').filter({ hasText: text });
    if (icon) {
      locator = this.locator.filter({ has: this.page.locator(`.${icon}`) });
    }
    if (img) {
      locator = this.locator.filter({ has: this.page.locator(`img[src*="${img}"]`) });
    }
    locator = locator.nth(index);

    return new TableComponent(this.page, locator);
  }

  clearFilterIcon() {
    const locator = this.locator.locator('.mdi-close-circle');
    return new TableComponent(this.page, locator);
  }

  async clearFilter() {
    await this.clearFilterIcon().click();
  }

  row({ textOrIndex, exact = true } = {}) {
    let locator = this.locator.locator('tbody tr');

    if (typeof textOrIndex === 'number') {
      locator = locator.nth(textOrIndex);
    } else if (textOrIndex) {
      locator = locator.filter({ hasText: textOrIndex, exact });
    }

    return new RowComponent(this.page, locator);
  }

  rowByClass({ className, index = 0 } = {}) {
    let locator = this.locator.locator(`tbody tr.${className}`);
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new TableComponent(this.page, locator);
  }

  rowWithClassInside({ className, index } = {}) {
    let locator = this.locator.locator('tbody tr').filter({ has: this.page.locator(`.${className}`) });
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new RowComponent(this.page, locator);
  }

  footerRow({ text, index = 0 } = {}) {
    const locator = this.locator.locator('tfoot tr').filter({ hasText: text }).nth(index);
    return new RowComponent(this.page, locator);
  }

  rows() {
    const locator = this.locator.locator('tbody tr');
    return new BaseComponent(this.page, locator);
  }

  async rowsCount() {
    return await this.locator.locator('tbody tr').count();
  }

  async rowsCountWithClassInside({ className } = {}) {
    return await this.locator
      .locator('tbody tr')
      .filter({ has: this.page.locator(`.${className}`) })
      .count();
  }

  async expectRowsCount({ count } = {}) {
    const expectedCount = typeof count === 'string' ? parseInt(count, 10) : count;
    await expect(this.locator.locator('tbody tr')).toHaveCount(expectedCount);
  }

  async getRowsCount() {
    const rows = this.locator.locator('tbody tr');
    await rows.first().waitFor({ state: 'visible' });
    return await rows.count();
  }

  async getIndex(locator) {
    return await locator.first().evaluate((node) => {
      return Array.from(node.parentNode.children).indexOf(node);
    });
  }

  dropdownTable() {
    return new TableComponent(this.page, this.locator.locator('td table'));
  }

  tableRows({ className } = {}) {
    return this.locator.locator(`tr${className ? `.${className}` : ''}`);
  }

  async expectOnlyRows({ expected = [] } = {}) {
    const rows = this.rows().locator;
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).textContent();
      const valid = expected.some((e) => text.includes(e));
      expect(valid, `Unexpected row: ${text}`).toBeTruthy();
    }
  }

  tableChip({ className, chipText } = {}) {
    let locator = this.locator.locator(`.v-chip.${className}`).filter({ hasText: chipText });
    return new ChipComponent(this.page, locator);
  }

  rowWithOutScope({ text, index } = {}) {
    let locator = this.locator.locator('tr');
    if (text) {
      locator = locator.filter({ hasText: text });
    }
    if (index !== undefined) {
      locator = locator.nth(index);
    }
    return new RowComponent(this.page, locator);
  }
}