import { expect } from "@playwright/test";
import { BaseComponent } from "./BaseComponent.js";

export class ButtonComponent extends BaseComponent {
  async clickAndWaitLoader({ loader } = {}) {
    if (loader) {
      await Promise.all([
        loader.waitFor({ state: 'hidden' }),
        this.click()
      ]);
    } else {
      await this.click();
    }
  }

  async isDisabled() {       
    return await this.locator.isDisabled();
  }

  async isEnabled() {
    return await this.locator.isEnabled();
  }

  async toBeEnabled() {
    await expect(this.locator).toBeEnabled();
  }

  async toBeDisabled() {
    await expect(this.locator).toBeDisabled();
  }
}