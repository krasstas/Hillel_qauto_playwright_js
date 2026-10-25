import { BaseComponent } from './BaseComponent.js';

export class TreeView extends BaseComponent {
  row({ text } = {}) {
    const locator = this.locator.locator('.v-treeview-node').filter({ hasText: text });
    return new TreeView(this.page, locator);
  }

  childrenRows({ index = 0 } = {}) {
    const locator = this.locator.locator('.v-treeview-node__children').nth(index);
    return new TreeView(this.page, locator);
  }

  rootRow({ text, index } = {}) {
    let locator = this.locator.locator('.v-treeview-node__root');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TreeView(this.page, locator);
  }
}