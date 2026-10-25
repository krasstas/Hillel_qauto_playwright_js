import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent.js';
import { ButtonComponent } from './ButtonComponent.js';

export class PaginationComponent extends BaseComponent {
  nextButton() {
    return new ButtonComponent(
      this.page,
      this.locator.locator('button[aria-label="Next page"], .v-pagination__next button').first()
    );
  }

  prevButton() {
    return new ButtonComponent(
      this.page,
      this.locator.locator('button[aria-label="Previous page"], .v-pagination__prev button').first()
    );
  }

  pageButton({ pageNumber } = {}) {
    return new ButtonComponent(
      this.page,
      this.locator.locator('.v-pagination__item', { hasText: String(pageNumber) }).first()
    );
  }

  async #isDisabled(btn) {
    if (await btn.locator.isDisabled()) {
      return true;
    }

    const className = (await btn.locator.getAttribute('class')) || '';
    return (
      className.includes('v-btn--disabled') || className.includes('v-pagination__item--disabled')
    );
  }

  async hasNextPage() {
    return !(await this.#isDisabled(this.nextButton()));
  }

  async hasPrevPage() {
    return !(await this.#isDisabled(this.prevButton()));
  }

  async expectHasNextPage({ expected = true } = {}) {
    expect(await this.hasNextPage()).toBe(expected);
  }

  async expectHasPrevPage({ expected = true } = {}) {
    expect(await this.hasPrevPage()).toBe(expected);
  }

  async goToNextPage() {
    await expect(async () => {
      expect(await this.hasNextPage()).toBe(true);
    }).toPass();
    await this.nextButton().click();
  }

  async goToPrevPage() {
    await expect(async () => {
      expect(await this.hasPrevPage()).toBe(true);
    }).toPass();
    await this.prevButton().click();
  }

  async goToPage({ pageNumber } = {}) {
    await this.pageButton({ pageNumber }).click();
  }
}