import { expect } from '@playwright/test';
import { BasePageObject } from './BasePageObject.page.js';
import { BaseComponent } from '../utils/components/BaseComponent.js';

export class FooterPage extends BasePageObject {
  constructor(page) {
    super(page);
  }
}
