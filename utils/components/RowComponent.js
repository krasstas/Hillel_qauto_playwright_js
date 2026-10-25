import { BaseComponent } from './BaseComponent.js';
import { ButtonComponent } from './ButtonComponent.js';
import { LinkComponent } from './LinkComponent.js';

export class RowComponent extends BaseComponent {
  button({ name, index } = {}) {
    let locator = this.locator.getByRole('button');
    if (name) locator = locator.filter({ hasText: name });
    if (index !== undefined) locator = locator.nth(index);
    return new ButtonComponent(this.page, locator);
  }

  buttonIcon({ iconClass, buttonHasClass = false } = {}) {
    let locator;

    if (buttonHasClass) {
      locator = this.locator.locator(`button.${iconClass}`);
    } else {
      locator = this.locator.locator(`button:has(i.${iconClass})`);
    }

    return new ButtonComponent(this.page, locator);
  }

  clickableText({ text, exact = true } = {}) {
    return new LinkComponent(this.page, this.locator.getByText(text, { exact }));
  }

  link({ text } = {}) {
    const locator = this.locator.locator('a').filter({ hasText: text });
    return new LinkComponent(this.page, locator);
  }

  td({ text, className, index } = {}) {
    let locator = this.locator.locator('td');

    if (text) locator = locator.filter({ hasText: text });
    if (className) locator = locator.filter({ has: this.page.locator(`.${className}`) });
    if (index !== undefined) locator = locator.nth(index);

    return new BaseComponent(this.page, locator);
  }

  th({ text, className, index } = {}) {
    let locator = this.locator.locator('th');

    if (text) locator = locator.filter({ hasText: text });
    if (className) locator = locator.filter({ has: this.page.locator(`.${className}`) });
    if (index !== undefined) locator = locator.nth(index);

    return new BaseComponent(this.page, locator);
  }

  getElementByClass({ className } = {}) {
    const locator = this.locator.locator(`.${className}`);
    return new BaseComponent(this.page, locator);
  }

  div({ text, className, index = 0 } = {}) {
    const locator = this.locator.locator(`div.${className}`).filter({ hasText: text }).nth(index);
    return new BaseComponent(this.page, locator);
  }

  span({ text, className, index = 0 } = {}) {
    let locator;
    if (text) locator = this.locator.locator('span').filter({ hasText: text });
    if (className) locator = this.locator.locator(`span.${className}`);

    locator = locator.nth(index);
    return new RowComponent(this.page, locator);
  }

  async cellsCount() {
    return await this.locator.locator('td').count();
  }
}