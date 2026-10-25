import { expect } from '@playwright/test';
import { BasePageObject } from './BasePageObject.page.js';
import { BaseComponent } from '../components/BaseComponent.js';

export class SandboxPage extends BasePageObject {
  constructor(page) {
    super(page);
  }

  /**
   * Пример базового метода навигации
   * @param {string} [parameters]
   */

  async navigate(parameters) {
    const query = parameters ? `?${parameters}` : '';
    await this.page.goto(`${query}`, { waitUntil: 'load' });
  }
}
