import { HeaderPage } from "./HeaderPage.js";
import { expect } from "@playwright/test";
export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addButtons = page.locator('[data-qa="product-button"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addItemToCart = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const headerPage = new HeaderPage(this.page);
    const cartCountBeforAdding = await headerPage.getCartCount();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const cartCountAfterAdding = await headerPage.getCartCount();
    expect(cartCountAfterAdding).toBeGreaterThan(cartCountBeforAdding);
  };
}
