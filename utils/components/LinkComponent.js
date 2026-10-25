import { BaseComponent } from './BaseComponent.js';

export class LinkComponent extends BaseComponent {
  async href() {
    return await this.locator.getAttribute('href');
  }
}
